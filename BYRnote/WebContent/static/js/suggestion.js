function initSuggestion() {
    $('#suggestion-form').draggable();
    $('#createSuggestion').click(function() {
        $('#suggestion-form').show();
        return false;
    });
    $('#cancel-suggestion-dialog').click(function() {
        $('#suggestion-form').hide();
        return false;
    });
    $("#suggestionForm").ajaxForm({
        success: function(data, statusText, xhr, $form) {
            $('#suggestion-form').hide();
            $('#suggestion-form').find('textarea').val('');
            $('#notification').show(0).delay(2000).hide(0);
        },
        dataType: 'json'
    });
}
$(document).ready(initSuggestion);
