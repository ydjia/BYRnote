$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
        header : {
            left : 'prev,next today',
            center : 'title',
            right : ''
        },
        buttonText : {
            today : '今天',
        },
        titleFormat : {
            day : 'MMM d yyyy' // Tuesday, Sep 8, 2009
        },
        events : function(start, end, callback) {
            $.ajax('/' + $('#companyId').val() + '/worklog/tw', {
                type : 'GET',
                data : {
                    'startTime' : start,
                    'endTime' : end
                },
                dataType : 'html',
                success : function(data) {
                    $('#worklog-list').remove();
                    $('#calendar').after(data);
                    $('.right-content').width(950);
                    $('.wl').each(function() {
                        if ($(this).attr('groupid').length > 0) {
                            $(this).height(23);
                            $('#user_' + $(this).attr('groupid')).append($(this)).append("</br>");
                            var temp = $('#time_' + $(this).attr('groupid')).text() * 1;
                            temp += $(this).attr('time') * 1;
                            $('#time_' + $(this).attr('groupid')).text(temp);
                        }
                    });
                    if ($('tr[id]').length == 0) {
                        $('#team-worklog-table').hide();
                        $('.right-content-title:last').hide().next().next().hide();
                        $('.right-content-title:first').next().next().next().next().html("<p style='text-align:center'>今天暂无工作记录</p>");
                    }
                    $(".people p").css("color", "black");
                },
            });
        },
        defaultView : 'agendaDay'
    });
    $('div .fc-content').hide();
    
});
