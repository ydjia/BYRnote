(function($) {
    $(document).ready(function() {
        $('.delete-invitation a').click(function(){
            if (confirm('确定删除邀请吗？')) {
                var form = $('<form>').attr('method', 'post');
                form.attr('action', $(this).attr('href'));
                form.append($('<input>').attr('name', '_method').val('delete'));
                form.appendTo('body').submit();
            }
            
            return false;
        });
    });
})(jQuery);