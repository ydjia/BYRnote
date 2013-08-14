(function($) {
	$(document).ready(function() {
		$('.comment_item .comment_edit_a').click(function(){
			var baseUrl = $(this).parent().find('input:first').val();
			var id = $(this).parent().find('input:last').val();
			var fileUrl = $("#file_drop_zone input[type=hidden]:first").val();
			var divId = "#comment_item_" + id;
			var content = $(divId + " .comment_content .comment_content_main").html();
			var editHtml = '<div class="comment_edit_div comment_item new">'
				+ '<div class="comment_content">'
				+ '<form id="commentForm_'
				+ id
				+ '" action="'
				+ url
				+ '" method="post">'
				+ '<header>'
				+ '<div>'
				+ '<div id="wysiwyg_toolbar">'
				+ '<a data-wysihtml5-command="bold" title="CTRL+B" href="javascript:;" unselectable="on">bold</a>'
				+ '<a data-wysihtml5-command="italic" title="CTRL+I" href="javascript:;" unselectable="on">italic</a>'
				+ '<a data-wysihtml5-command="insertUnorderedList" href="javascript:;" unselectable="on">Bullets</a>'
				+ '<a data-wysihtml5-command="insertOrderedList" href="javascript:;" unselectable="on">Numbers</a>'
				+ '</div>'
				+ '<textarea id="content_'
				+ id
				+ '" name="content" class="body" rows="4" placeholder="发表评论">'
				+ content
				+ '</textarea>'
				+ '</div>'
				+ '<div class="attachments" id="file_drop_zone_'
				+ id
				+ '">'
				+ '<div class="file_input_button">'
				+ '<input type="hidden" value="'
				+ fileUrl
				+ '">'
				+ '<span>请将附件拖动到此区域&nbsp; 或者</span>'
				+ '<a class="decorated" href="#" tabindex="-1">点击上传</a>'
				+ '<input type="file" id="file_uploader_'
				+ id
				+ '" multiple="" style="display: none;">'
				+ '</div>'
				+ '<ul id="file_list_'
				+ id
				+ '">'
				+ '</ul>'
				+ '</div>'
				+ '</header>'
				+ '<footer>'
				+ '<div class="submit">'
				+ '<input class="btn btn-commit" type="submit" value="修改评论">'
				+ '<input commentId="'
				+ id
				+ '" class="btn btn-commit comment_edit_cancle" type="button" value="取消" style="margin-left:20px">'
				+ '</div>'
				+ '</footer>'
				+ '</div>'
				+ '</div>';
            $("#comment_item_" + id + " .comment_show .comment_content").hide();
            $("#comment_item_" + id + " .comment_show").append(editHtml);
            console.log('2');
            var editor = new wysihtml5.Editor('content_' + id, {
                toolbar: 'wysiwyg_toolbar',
                parserRules: wysihtml5ParserRules
            });
            setAjaxForm("#commentForm_" + id);
            setAutoFilt();
            initFileUploadDropZone(id);
            
            //取消编辑
            $('#comment_item_' + id + ' .comment_edit_cancle').click(function(){
            	$("#comment_item_" + id + " .comment_show .comment_content").show();
                $("#comment_item_" + id + " .comment_show div:last-child").remove();
            });
            return false;
        });
	});
	$('.comment_item .comment_delete_a').click(function(){
		var url = $(this).attr('requestUrl');
        var id = $(this).attr('discussionId');
        if(confirm('是否删除该评论?')){
            $.ajax({
                url: url,
                type : 'DELETE',
                dataType: 'json',
                data : {_method: 'delete', id: id, deleted: true},
                success : function(){
                	location=location;
                }
            });
        }
        return false;
	});
    
    function setAjaxForm(id){
    	$(id).ajaxForm({
            beforeSerialize: function(jqForm, options) {
                $(id + ' li').each(function(index) {
                    var name = 'attachments[' + index + '].id';
                    $(this).find('input[type=hidden]:first').attr('name', name);
                });
                
                $(id + ' .subscribers_body .subscribers ul li').each(function(index) {
                    var name = 'subscribers[' + index + '].id';
                    $(this).find('input[type=checkbox]:first').attr('name', name);
                });
                return true;
            },
            success: function(data, statusText, xhr, $form) {
                if (data.result == 'success') {
                    location.reload();
                }
            },
            dataType: 'json'
        });
    }
    
    function setAutoFilt(){
    	function autofit() {
    		var editorFrames = $("iframe");
    		for (var i=0; i<editorFrames.length; i++)
        	{
	            var editorFrame = editorFrames[i].contentWindow.document;
	            // console.log(editorFrame.body.scrollHeight,editorFrame.body.clientHeight,editorFrame.body.offsetHeight);
	            var h = editorFrame.body.clientHeight;
	            $("body").find("iframe").height(h + 40).scrollTop(h);
        	}
        }
    	var editorFrames = $("iframe");
    	for (var i=0; i<editorFrames.length; i++)
    	{
    		var editorFrame = editorFrames[i];
            // 这句是关键，要让html高度为0，body才会在内容小于边界高度的时候自动缩减自己的高度
            $(editorFrame.contentWindow.document).find('html')
                    .height(0);
            // 注意：为了完成自适应，修改了wysihtml5的源码，搜索console.log即可
            $(editorFrame.contentWindow.document.body).css("overflow-y", "hidden")
                    .keyup(autofit).keydown(autofit).focus(autofit).change(autofit);
    	}
    }
    
    function initFileUploadDropZone(id){
        $('#file_drop_zone_' + id).dropableFileUpload({
            requestUrl : $('#file_drop_zone_' + id + ' input:first-child').val(),
            accept: 'application/json',
            onSuccess : function(data) {
                data = JSON.parse(data);
                var li = $('<li>').append($('<a>').attr('class', 'icon-remove'))
                        .append($('<span>').text(data.attachment.name))
                        .append($('<input>').attr('type', 'hidden').attr('value', data.attachment.id));
                $("#file_list_" + id).append(li);
            },
            onProgress : function() {
            },
            fileInputSelector : "#file_uploader_" + id
        });
        $('#file_drop_zone_' + id + ' > a ').click(function(){$(this).next("input").click();});
    }
})(jQuery);