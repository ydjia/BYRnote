(function($) {
    var initDivFloat = function() {
        $('.auto_float').each(function(){
             var floater = $(this);
             if( ! floater.offset() ) return;
             var originalTop = floater.offset().top;
             $(window).scroll(function(){
                 var left = floater.offset().left;
                 console.log(document.body.scrollTop + floater.height() > $('.container.sheet').offset().top + $('.container.sheet').height());
                 console.log(document.body.scrollTop ,floater.height(), $('.container.sheet').offset().top , $('.container.sheet').height())
                 if( document.body.scrollTop + floater.height() > $('.container.sheet').offset().top + $('.container.sheet').height() ){
                     floater.removeClass('fixed').attr('style',null).css({
                         'position': 'absolute',
                         'top': ($('.container.sheet').height()-floater.height()-10) +'px'
                     });
                     if(floater.hasClass('left')) floater.css('left', '0px');
                     else  floater.css('right', '0px');
                     return;
                 }
                 if( originalTop < $(window).scrollTop() && ! floater.hasClass('fixed') ){
                     floater.addClass('fixed').attr('style',null).css('left', left+'px');
                 }
                 else if( originalTop >= $(window).scrollTop() && floater.hasClass('fixed') ){
                     floater.removeClass('fixed').attr('style',null);
                 }
             });
        });
    };
    
    var initTextareaAutoFit = function() {
        $('textarea.autofit').each(function(){
            var fitter = this;
            console.log(fitter.scrollHeight + " " + fitter.clientHeight);
            $(this).height(fitter.scrollHeight);
            
            function autofit() {
                var h = fitter.scrollHeight;
                if(h > fitter.clientHeight)
                  $(fitter).height(h + 20).scrollTop(h);
            }
            $(fitter).css("overflow-y", "hidden").keyup(autofit).keydown(autofit).focus(autofit).change(autofit);
        });
    };
    
    var ajaxDefaultSetup = function() {
        $.ajaxSetup({
            error : function(XMLHttpRequest, data, textStatus, jqXHR) {
            	if(XMLHttpRequest.status == 403){
            		if (data.status == 'loginRequired'){
                    	location = data.next;
                    	return;
                    }
            		alert("对不起，您可能需要更高等级的船票权限哦");
            	}
            		else if (textStatus === 'timeout')
                    console.error('ERROR : request timeout!');
                else if (textStatus === 'abort')
                    console.error('ERROR : request aborted!');
                else if (textStatus === 'parsererror')
                    console.error('ERROR ' + jqXHR.status
                            + ': response data is not a valid JSON object!');
                else
                	alert("哦，好像出错了");
            }
        
        });
    };
    
    $(document).ready(function() {
        initDivFloat();
        initTextareaAutoFit();
        ajaxDefaultSetup();
    });
})(jQuery);