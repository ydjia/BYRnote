(function($) {
    $(document).ready(function() {
        var init = new ProjectInit();
        $.ias({
            container: '.todolist_comments',
            item: '.comment_item',
            pagination: '.sheet .navigation',
            next: '.next-page a',
            trigger: '查看更多讨论',
            loader: '<img src="/static/img/loader.gif" />'
        });
    });
})(jQuery);