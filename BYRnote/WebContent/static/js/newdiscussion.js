(function($) {
    $(document).ready(function() {
        var init = new ProjectInit();
        var editor = new wysihtml5.Editor('content', {
            toolbar : 'wysiwyg_toolbar',
            parserRules : wysihtml5ParserRules
        });
        
        init.initNewDiscussion($('#discussionCommand'));
        
        if(BrowserDetect.browser != "Chrome")
            af = setInterval('autofit()',200);

        $('#file_list li').each(function(){
            var item = $(this);
            item.find('a.icon-remove').click(function() {
                item.remove();
                return false;
            });
        });
        $("#discussionCommand").submit(function() {
            $('#file_list li').each(function(index) {
                var id = 'attachments[' + index + '].id';
                var name = 'attachments[' + index + '].name';
                $(this).find('input[type=hidden]:first').attr('name', id);
                $(this).find('input[type=hidden]:last').attr('name', name);
            });

            $('#discussionCommand .subscribers_body .subscribers ul li').each(function(index) {
                var name = 'subscribers[' + index + '].id';
                $(this).find('input[type=checkbox]:first').attr('name', name);
            });

            return true;
        });
        init.initFileUploadDropZone('#file_drop_zone');
        init.initSubscribersZone();
        if ($('.disscussion-form-validate ').text().length > 0) {
            $('.disscussion-form-validate ').fadeOut(6000);
        }
    });

})(jQuery);