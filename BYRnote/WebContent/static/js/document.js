(function($) {
    $(document).ready(function() {
        var url = $('#doc_url').val() + '/getLocker';
        
        function updateDocumentLocker() {
            $.ajax({
                url: url,
                type : 'POST',
                success : function(data) {
                    var editButton = $($.parseHTML(data));
                    $('#editButton').replaceWith(editButton);
                    editButton.click(editButtonClick);
                }
            });
        };
        
        function editButtonClick() {
            $('#editButton').attr('disabled', true);
            $.ajax({
                url: url,
                type : 'POST',
                success : function(data) {
                    var editButton = $($.parseHTML(data.trim()));
                    //console.log(editButton,editButton.attr('href'));
                    if(editButton.is('button')) {
                        editButton.click(editButtonClick);
                        $('#editButton').replaceWith(editButton);
                    }
                    else if(editButton.is('a')) {
                        location = editButton.attr('href');
                    }
                }
            });
            return false;
        };
        
        $('#editButton').click(editButtonClick);
        
        setInterval(function(){updateDocumentLocker();},5000);
        
        //just for home document
        $('.document_page').each(function(){
            var doc_url = $(this).find('.goto_url').val();
            $(this).click(function(){location = doc_url;});
        });
    });
})(jQuery);