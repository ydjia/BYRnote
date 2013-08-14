$(document).ready(
        function() {
            var calendar = $('#calendar').fullCalendar(
                    {
                        header : {
                            left : 'prev,next today',
                            center : 'title',
                            right : 'agendaWeek,agendaDay,month'
                        },
                        contentHeight : 650,
                        allDaySlot : false,
                        defaultView : 'agendaWeek',
                        firstHour : new Date().getHours() - 14,
                        theme : true,
                        selectable : true,
                        unselectAuto : false,
                        selectHelper : true,
                        // 获得需要展示的日志
                        events : function(start, end, callback) {
                            var events = [];
                            $.ajax('/' + $('#companyId').val() + '/worklog', {
                                type : 'GET',
                                data : {
                                    'startTime' : start,
                                    'endTime' : end
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
                                                //backgroundColor : "#b3e025",
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
                        // 新建日志
                        select : function(start, end, allDay, jsEvent, view) {
                            var bgClass = 'bgcolor'+ (parseInt($('#projects').val()) % 8 + 1);
                            $(".fc-select-helper").addClass(bgClass).find('.fc-event-skin').addClass(bgClass);
                            
                            var left = $(".fc-select-helper").offset().left * 1 + $(".fc-select-helper").width() * 1
                                    + 32;
                            var top = $(".fc-select-helper").offset().top * 1 + $(".fc-select-helper").height() * 1 / 2
                                    - 100;
                            $("#box").css("left", left);
                            $("#box").css("top", top);
                            $("#box").css("z-index", 15);
                            $('#box').hide();

                            $('#box').show();
                            $("#content").focus();
                            $("#content").val("");

                            $('a[action="delete"]').hide();

                            $('a[action="cancel"]').unbind();
                            $('a[action="cancel"]').bind("click", function() {
                                $('#content').val("");
                                $('#box').hide();
                                calendar.fullCalendar('unselect');
                            });

                            $('a[action="save"]').unbind();
                            $('a[action="save"]').bind("click", function() {
                                var title = $('#content').val();
                                var projectId = $("#projects").val();
                                $('#box').hide();
                                $.ajax('/' + $('#companyId').val() + '/worklog', {
                                    type : 'POST',
                                    data : {
                                        'description' : title,
                                        'startTime' : start,
                                        'endTime' : end,
                                        'projectId' : projectId
                                    },
                                    dataType : 'json',
                                    success : function(data) {
                                        if (data.status == 'ok') {
                                            data = data.worklog;
                                            calendar.fullCalendar('renderEvent', {
                                                id : data.id,
                                                title : title,
                                                start : start,
                                                end : end,
                                                allDay : false,
                                                //backgroundColor : "#b3e025",
                                                projectId : data.projectId
                                            }, true);
                                        } else {
                                            alert('添加日志失败');
                                        }
                                    },
                                });
                                calendar.fullCalendar('unselect');
                            });
                        },
                        firstDay : 1,
                        viewDisplay : function(view) {
                            $('#box').hide();
                            if (view.name == "agendaWeek" && view.start.getTime() <= new Date().getTime()
                                    && view.end.getTime() >= new Date().getTime())
                                $('.time-now').show();
                            else
                                $('.time-now').hide();

                        },
                        // 修改、删除日志
                        eventClick : function(event, jsEvent, view) {
                            calendar.fullCalendar('unselect');
                            var left = $(this).offset().left * 1 + $(this).width() * 1 + 32;
                            ;
                            var top = $(this).offset().top * 1 + $(this).height() * 1 / 2 - 100;
                            ;

                            $("#box").css("left", left);
                            $("#box").css("top", top);
                            $("#box").css("position", "absolute");
                            $("#box").css("z-index", 15);
                            $('#box').show();

                            $('#content').val(event.title);
                            $("#content").focus();
                            $("#projects").val(event.projectId);

                            $('a[action="delete"]').show().unbind();
                            $('a[action="delete"]').bind("click", function() {
                                $.ajax('/' + $('#companyId').val() + '/worklog/' + event.id, {
                                    type : 'DELETE',
                                    dataType : 'json',
                                    success : function(data) {
                                        if (data.status == 'ok') {
                                            calendar.fullCalendar('removeEvents', event.id);
                                            $('#box').hide();
                                        } else {
                                            alert('删除失败');
                                        }
                                    },
                                });
                            });

                            $('a[action="cancel"]').unbind();
                            $('a[action="cancel"]').bind("click", function() {
                                $('#content').val("");
                                $('#box').hide();
                                calendar.fullCalendar('unselect');
                            });

                            $('a[action="save"]').unbind();
                            $('a[action="save"]').bind("click", function() {
                                title = $('#content').val();
                                projectId = $("#projects").val();
                                $('#box').hide();
                                $.ajax('/' + $('#companyId').val() + '/worklog/' + event.id, {
                                    type : 'POST',
                                    data : {
                                        '_method' : 'PUT',
                                        'id' : event.id,
                                        'description' : title,
                                        'startTime' : event.start,
                                        'endTime' : event.end,
                                        'projectId' : projectId,
                                    },
                                    dataType : 'json',
                                    success : function(data) {
                                        if (data.status == 'ok') {
                                            event.title = title;
                                            event.projectId = projectId;
                                            event.backgroundColor = data.worklog.color;
                                            $('#content').val("");
                                            calendar.fullCalendar('updateEvent', event);
                                        } else {
                                            alert('更新失败');
                                        }
                                    },
                                });
                            })
                        },
                        // 拖拽日志
                        eventDrop : function(event, dayDelta, minuteDelta, allDay, revertFunc) {
                            $.post('/' + $('#companyId').val() + '/worklog/' + event.id, {
                                '_method' : 'PUT',
                                'id' : event.id,
                                'startTime' : event.start,
                                'endTime' : event.end
                            }, function(data) {
                                if (data.status == 'ok') {
                                } else {
                                    alert('更新失败');
                                }
                            });
                        },
                        // 调整日志大小
                        eventResize : function(event, dayDelta, minuteDelta, revertFunc, jsEvent, ui, view) {
                            console.log('sdasdasdas');
                            $(".fc-select-helper").addClass('bgcolor'+ (parseInt($('#projects').val()) % 8 + 1) );
                            $.ajax('/' + $('#companyId').val() + '/worklog/' + event.id, {
                                type : 'POST',
                                data : {
                                    '_method' : 'put',
                                    'id' : event.id,
                                    'startTime' : event.start,
                                    'endTime' : event.end
                                },
                                dataType : 'json',
                                success : function(data) {
                                    if (data.status == 'ok') {
                                    } else {
                                        alert('更新失败');
                                    }
                                },
                            });
                        },
                        eventAfterRender : function(event, element, view) {
                            var bgClass = 'bgcolor'+ (event.projectId % 8 + 1);
                            element.addClass(bgClass).find('.fc-event-skin').addClass(bgClass);
                        },
                        editable : true
                    });
            var left = $('.fc-today').position().left * 1;
            var top = (new Date().getHours() + new Date().getMinutes() / 60) * 42;
            $(".time-now").css("left", left);
            $(".time-now").css("top", top);
            $(".time-now").width($('.fc-today').width() * 1);
            $("#calendar >div:first >div:first >div:first >div:first >div:first").prepend($(".time-now"));
            /*
             * $("*").scroll(function(obj) { var data=obj["currentTarget"];
             * for(var p in data){ alert(p+" "+data[p]); } });
             */
            $("#calendar >div:first >div:first >div:first >div:first ").scrollTop("500px");
            
        });
