(function($) {
    $(document).ready(function(){
        var editor = new wysihtml5.Editor('content', {
            toolbar: 'wysiwyg_toolbar',
            parserRules: wysihtml5ParserRules
        });
        
        
        setAjaxForm("#commentForm");
        
        setAutoFilt();
        
        initFileUploadDropZone();
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
            var editorFrame = $("body").find("iframe")[0].contentWindow.document;
            // console.log(editorFrame.body.scrollHeight,editorFrame.body.clientHeight,editorFrame.body.offsetHeight);
            var h = editorFrame.body.clientHeight;
            $("body").find("iframe").height(h + 40).scrollTop(h);
        }
        // 这句是关键，要让html高度为0，body才会在内容小于边界高度的时候自动缩减自己的高度
        $($("body").find("iframe")[0].contentWindow.document).find('html')
                .height(0);
        // 注意：为了完成自适应，修改了wysihtml5的源码，搜索console.log即可
        $($("iframe")[0].contentWindow.document.body).css("overflow-y", "hidden")
                .keyup(autofit).keydown(autofit).focus(autofit).change(autofit);
    }
    
    function initFileUploadDropZone(){
        $('#file_drop_zone').dropableFileUpload({
            requestUrl : $('#file_drop_zone input:first-child').val(),
            accept: 'application/json',
            onSuccess : function(data) {
                data = JSON.parse(data);
                var li = $('<li>').append($('<a>').attr('class', 'icon-remove'))
                        .append($('<span>').text(data.attachment.name))
                        .append($('<input>').attr('type', 'hidden').attr('value', data.attachment.id));
                $("#file_list").append(li);
            },
            onProgress : function() {
            },
            fileInputSelector : "#file_uploader"
        });
        $('#file_drop_zone > a ').click(function(){$(this).next("input").click();});
    }
})(jQuery);