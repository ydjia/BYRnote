(function($) {
    $(document).ready(function() {
        var loader = '<img src="/static/img/loader.gif" />';
        
        $('select.select_version').change(function(){
            location = './'+ $(this).val();
        });
        
        $('.other_versions li').click(function(){
            var version = $(this).html().trim();
            var that = $(this);
            $(this).siblings().css('visibility', 'hidden');
            $(this).hide().after(loader);
            $.ajax({
                url: location.href + '/comparedTo/' + version,
                type : 'GET',
                dataType : 'json',
                success : function(data) {
                    console.log(data);
                    
                    var diff_title_results = diff_lineMode(data.sourceHistory.title, data.destinyHistory.title);
                    var diff_content_results = diff_lineMode(data.sourceHistory.content, data.destinyHistory.content);
                    
                    $('.document_body header h4 > .history_title').html(getDiffedHtml(diff_title_results));
                    $('div.document_content').html(getDiffedHtml(diff_content_results));
                    
                    that.siblings().css('visibility', 'visible');
                    that.show().siblings('img').remove();
                }
            });
        });
        
        $('.recover_button').click(function(){
            if(confirm('确认从版本"' + $(this).attr('version') + '"中恢复？')) {
                $.ajax({
                    url: location.href + '/recover',
                    type : 'POST',
                    dataType : 'json',
                    success : function(data) {
                        location = '../';
                    }
                });
            }
        });
        
        function diff_lineMode(text1, text2) {
            var dmp = new diff_match_patch();
            var diffs = dmp.diff_main(text1, text2);
            dmp.diff_cleanupSemantic(diffs);
            return diffs;
        }
        
        function getDiffedHtml(diffs){
            var diffed_texts = [];
            for(var i in diffs){
                if(diffs[i][0] == 0)
                    diffed_texts[i] = diffs[i][1];
                else if(diffs[i][0] == 1)
                    diffed_texts[i] = '<ins>' + diffs[i][1] + '</ins>';
                else if(diffs[i][0] == -1)
                    diffed_texts[i] = '<del>' + diffs[i][1] + '</del>';
            }
            return diffed_texts.join('');
        }
    });
})(jQuery);