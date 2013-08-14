(function($){
    $(document).ready(function() {
        $.ias({
            container: '.retrospect_content',
            item: '.progress_day',
            pagination: '.navigation',
            next: '.next-page a',
            trigger: '查看更多日记',
            loader: '<img src="/static/img/loader.gif" />'
        });
    });
})(jQuery);