(function($) {
    $(document).ready(function() {
        var init = new ProjectInit();
        $.ias({
            container: '.search_container',
            item: '.search_item',
            pagination: '.sheet .navigation',
            next: '.next-page a',
            trigger: '查看更多搜索结果',
            loader: '<img src="/static/img/loader.gif" />'
        });
    });
})(jQuery);