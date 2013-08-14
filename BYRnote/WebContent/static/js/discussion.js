(function($) {
    $(document).ready(function() {
        var init = new ProjectInit();
        init.initDiscussion();
        
        $('.tool .delete ').click(function(){
            var url = $(this).attr('requestUrl');
            var id = $(this).attr('discussionId');
            if(confirm('是否删除该讨论?')){
                $.ajax({
                    url: url,
                    type : 'DELETE',
                    dataType: 'json',
                    data : {_method: 'delete', id: id, deleted: true},
                    success : function(data){
                        if (data.status == 'loginRequired'){
                        	location = data.next;
                        }
                        location = '../';
                    },
                });
            }
            return false;
        });
        $('.tool .edit ').click(function(){
        	window.location.href=$(this).attr('requestUrl') + "/update";
        });
    });
})(jQuery);