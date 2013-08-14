(function($) {
	$('.attachment_delete').click(function(){
		var url = $(this).attr('requestUrl');
        var id = $(this).attr('attachmentId');
        if(confirm('是否删除该附件?')){
            $.ajax({
                url: url,
                type : 'DELETE',
                dataType: 'json',
                data : {_method: 'delete', id: id, deleted: true},
                success : function(data){
                    if (data.status == 'loginRequired'){
                    	location = data.next;
                    	return;
                    }
                    location = location;
                },
            });
        }
        return false;
	});

    
    $('.upload_delete ').click(function(){
        var url = $(this).attr('requestUrl');
        var id = $(this).attr('uploadId');
        if(confirm('是否删除该次上传?')){
            $.ajax({
                url: url,
                type : 'DELETE',
                dataType: 'json',
                data : {_method: 'delete', id: id, deleted: true},
                success : function(data){
                    if (data.status == 'loginRequired'){
                    	location = data.next;
                    	return;
                    }
                    location = data.url;
                },
            });
        }
        return false;
    });
	
})(jQuery);