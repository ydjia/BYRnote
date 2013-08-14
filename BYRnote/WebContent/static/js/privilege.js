(function($){
    $(document).ready(function() {
        $('a.person_remove').click(function(){
            if (confirm('确认移除吗？')) {
                var url = $(this).attr('href');
                var form = $('<form>').attr('action', url).attr('method', 'post')
                .append($('<input>').attr('type', 'hidden')
                        .attr('name', '_method').attr('value', 'delete'));
                form.appendTo('body').submit();
            }
            return false;
        });
    });
})(jQuery);
