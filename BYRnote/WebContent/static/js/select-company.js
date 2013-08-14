$(function() {
    $('.company-select ol li').click(function(){
        window.location = "/" + $(this).find("input:first").val();
        return false; 
    });
});
