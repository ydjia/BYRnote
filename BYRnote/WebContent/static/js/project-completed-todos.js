(function($){
    $(document).ready(function() {
        $.ias({
            container: '.sheet_body',
            item: '.entry',
            pagination: '.sheet .navigation',
            next: '.next-page a',
            trigger: '查看更多',
            loader: '<img src="/static/img/loader.gif" />'
        });
    });
})(jQuery);