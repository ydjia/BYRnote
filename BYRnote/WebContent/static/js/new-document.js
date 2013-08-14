(function($) {
    $(document).ready(function() {
        var editor = new wysihtml5.Editor('content', {
            toolbar : 'document_toolbar',
            parserRules : wysihtml5ParserRules
        });
        var init = new ProjectInit();
        init.initNewDocument($('#documentCommand'));
        
        documentSubmitted = false;
        $('#documentCommand').submit(function(){
            documentSubmitted = true;
        });

        function checkDocumentSaved(){
            console.log(documentSubmitted);
            if(documentSubmitted) return null;
            else return "文档编辑的结果没有保存，仍然要离开编辑页面?";
        }

        $(window).on('beforeunload', function() {
            return checkDocumentSaved();
        });
        
        $('#delete_doc').click(function() {
            var baseurl = $(this).attr('baseurl');
            var docid = $(this).attr('docid');
            var requestUrl = baseurl + '/' + docid;
            console.log('delete doc: ' + requestUrl);
            if (confirm("是否删除此文档?")) {
                $.ajax({
                    url : requestUrl,
                    type : 'POST',
                    dataType : 'json',
                    data : {
                        _method: 'put',
                        id : docid,
                        deleted : true
                    },
                    success : function(data) {
                        location = baseurl;
                    }
                });
            }
        });
        
        function sendEditingHeartBeat() {
            $.ajax({
                url: './editing',
                type : 'POST',
                dataType: 'json',
                success : function(data) {
                }
            });
        };
        
        setInterval(function(){sendEditingHeartBeat();},5000);
        
        setTimeout('$($("iframe")[0].contentWindow.document.body).focus()',300);
    });
})(jQuery);