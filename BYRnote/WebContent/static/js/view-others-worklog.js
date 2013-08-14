$(document).ready(function() {
    var calendar = $('#calendar').fullCalendar({
        header : {
            left : 'prev,next today',
            center : 'title',
            right : 'agendaWeek,agendaDay,month'
        },
        contentHeight: 650,
        allDaySlot : false,
        defaultView : 'month',
        fistHour : 7,
        theme : true,
        selectable : false,
        unselectAuto : false,
        firstDay : 1,
        // 获得需要展示的日志
        events : function(start, end, callback) {
            var events = [];
            $.ajax('/' + $('#companyId').val() + '/worklog', {
                type : 'GET',
                data : {
                    'startTime' : start,
                    'endTime' : end,
                    'creatorId' : $('#userId').text() * 1
                },
                dataType : 'json',
                success : function(data) {
                    if (data.status == 'ok') {
                        var data = data.worklogList;
                        for (i = 0; i < data.length; i++) {
                            events.push({
                                id : data[i].id,
                                title : data[i].description,
                                start : new Date(data[i].startTime),
                                end : new Date(data[i].endTime),
                                backgroundColor : "#b3e025",
                                allDay : false,
                                projectId : data[i].projectId
                            });
                        }
                        callback(events);
                    } else {
                        alert('添加日志失败');
                    }
                },
            });
        },
        viewDisplay : function(view) {
            $('#box').hide();
        },
        editable : false
    });
    
});
