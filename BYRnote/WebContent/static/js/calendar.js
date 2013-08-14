(function($) {

    var events = [];

    $(document).ready(function() {
        initCalendar();
        initFoldCalendr();
        initDatePicker();
        initProjectSelect();
    });

    /**
     * 获得页面展示的todo
     */
    var getCalendarTodos = function(start, end, callback) {
        var url = '/' + $('#companyId').val() + '/calendar/from/' + start.getTime() + '/to/' + end.getTime();
        $.ajax(url, {
            type : 'GET',
            dataType : 'json',
            success : function(data) {
                if (data.status == 'ok') {
                    var data = data.todos;
                    for (i = 0; i < data.length; i++) {
                        events.push({
                            id : data[i].id,
                            title : cutTodoContent(data[i].content),
                            originTitle : data[i].content,
                            start : new Date(data[i].dueDate),
                            end : new Date(data[i].dueDate),
                            allDay : false,
                            projectName : data[i].project.name,
                            projectId : data[i].projectId,
                            assigneeId : data[i].assigneeId,
                            todoList : data[i].todolist
                        });
                    }
                    callback(events);
                } else {
                    alert('添加日历失败');
                }
            },
        });

    }

    /**
     * 拖动改变todo的duedate
     */
    var changeDueDate = function(event, dayDelta, minuteDelta, allDay, revertFunc) {
        var url = '/' + $('#companyId').val() + '/projects/' + event.projectId + "/todos/" + event.id;
        var data = {
            '_method' : 'PUT',
            'id' : event.id,
            'dueDate' : event.start
        };
        updateTodo(url, data, function(data) {
        });
    }

    /**
     * 点击todo展示对话窗口
     */
    var showBox = function(div, event, jsEvent) {
        var left = $(div).offset().left * 1 + $('th.fc-fri.ui-widget-header').width() * 1 + 7;
        var top = $(div).offset().top * 1 + $(div).height() * 1 / 2 - 45;
        var dueDate = new Date(event.start);
        $(".assignee_date").css("left", left).css("top", top).css("z-index", 15).show();
        $(".datepicker").hide();
        var click_date_num = 0
        $(".click-show-date").click(function() {
            click_date_num += 1;
            if (click_date_num % 2 == 1)
                $(".datepicker").show();
            else
                $(".datepicker").hide();
        })
        $(".todo-oper-project-name").text(event.projectName);
        $(".todo-oper-todolist-name").text(event.todoList.name);
        $(".todo-oper-todo-name").val(event.originTitle);
        $(".todo-oper-todo-name").change();//一定要在改变内容以后再触发change事件
        $(".todo-oper-assignee").val(event.assigneeId);
        $('.datepicker').datepicker('setDate', dueDate);
        $(".click-show-date").text($.fullCalendar.formatDate( dueDate,'yyyy年M月d日' ));
        jsEvent.stopPropagation();
    }

    /**
     * 完成、重新打开todo
     */
    function completeTodo($div, event) {
        var flag = $div.find("input")[0].checked ? true : false;
        var url = '/' + $('#companyId').val() + '/projects/' + event.projectId + "/todos/" + event.id;
        var data = {
            '_method' : 'PUT',
            'id' : event.id,
            'completed' : flag
        };
        var success = function($div, flag) {
            return function(data) {
                if (data.status == 'ok') {
                    if (flag == true) {
                        $div.find("span").css("text-decoration", "line-through");
                        events = $.map(events, function(n) {
                            return n.id != event.id ? n : null;
                        });
                    } else {
                        $div.find("span").css("text-decoration", "none");
                        events.push(event);
                    }
                } else {
                    alert('完成失败');
                }
            }
        }
        updateTodo(url, data, success($div, flag));
    }
    var updateTodo = function(url, data, successFunc) {
        $.ajax({
            url : url,
            type : 'POST',
            data : data,
            dataType : 'json',
            success : successFunc
        });
    }

    var todoOperation = function(event, jsEvent, view) {
        if (jsEvent.target.nodeName == "LABEL") {
            return;
        }
        if (jsEvent.target.nodeName == "INPUT") {
            completeTodo($(this), event);
            return;
        }

        showBox(jsEvent.target, event, jsEvent);

        $('.link-hide-popover').click(function(event) {
            $('.assignee_date').hide();
            event.stopPropagation();
        })

        /**
         * 删除todo
         */
        $('.link-delete-todo').unbind().bind("click", function() {
            $('.assignee_date').hide();
            var url = '/' + $('#companyId').val() + '/projects/' + event.projectId + "/todos/" + event.id;
            var data = {
                '_method' : 'PUT',
                'id' : event.id,
                'deleted' : true
            };
            var success = function(jsEvent) {
                return function(data) {
                    if (data.status == 'ok') {
                        $(jsEvent.target).fadeOut("3000");
                        $("#calendar").fullCalendar('removeEvents', event.id);
                        $('#box').hide();
                        events = $.map(events, function(n) {
                            return n.id == event.id ? null : n;
                        });
                    } else {
                        alert('删除失败');
                    }
                }
            }
            updateTodo(url, data, success(jsEvent));
            return false;

        })

        /**
         * 保存todo的修改，包括日期、执行人，现在没有对todo的描述进行修改
         */
        $('.btn-save-todo').unbind().bind(
                "click",
                function() {
                    $('.assignee_date').hide();
                    var url = '/' + $('#companyId').val() + '/projects/' + event.projectId + "/todos/" + event.id;
                    var dueDate = $('.click-show-date').text() == "没有指定日期" ? undefined : $('.datepicker').datepicker(
                            'getDate');
                    var assigneeId = $(".todo-oper-assignee").val() != "null" ? $(".todo-oper-assignee").val() : null;
                    var data = {
                        '_method' : 'PUT',
                        'id' : event.id,
                        'selective' : false,
                        'content' : $('.todo-oper-todo-name')[0].value,
                        'dueDate' : dueDate,
                        'assigneeId' : assigneeId
                    };
                    var success = function() {
                        return function(data) {
                            if (data.status == 'ok') {
                                event.assigneeId = data.todo.assigneeId;
                                event.start = new Date(data.todo.dueDate);
                                event.end = new Date(data.todo.dueDate);
                                event.originTitle=  data.todo.content;
                                event.title= cutTodoContent(data.todo.content);
                                events = $.map(events, function(n) {
                                    return n.id == event.id ? event : n;
                                });
                                $('#content').val("");
                                $("#calendar").fullCalendar('updateEvent', event);
                            } else {
                                alert('更新失败');
                            }
                        }
                    }
                    updateTodo(url, data, success());

                })
    }
    var customTodoView = function(event, element, view) {
        var todoName = element.find('.fc-event-title').html();
        //element.find('.fc-event-title').replaceWith( $('<p class="fc-event-title"></p>').append(todoName) );
        
        var bgClass = 'bgcolor' + (event.projectId % 8 + 1) + ' opaque';//calendar-todo
        element.addClass(bgClass).find('.fc-event-inner').addClass('todo-wrapper').find('.fc-event-title').addClass('todo-content').siblings().remove();
        var $input = $('<input type="checkbox" id="checkbox_' + event.id + '">');//<label title="完成任务" for="checkbox_' + event.id + '"> </label>
        //var $checkbox = $("<div></div>").addClass("squaredFour").append($input);
        
        element.find(".fc-event-skin").prepend($input);
    }

    function initCalendar() {
        var calendar = $('#calendar').fullCalendar({
            header : {
                left : 'prev,next today',
                center : 'title',
                right : ''
            },
            contentHeight : 650,
            allDaySlot : false,
            defaultView : 'month',
            fistHour : 7,
            theme : true,
            // selectable : true,
            // select : addEvent,
            unselectAuto : false,
            firstDay : 1,
            disableResizing : true,
            editable : true,
            eventAfterRender : customTodoView,
            events : getCalendarTodos,
            eventDrop : changeDueDate,
            eventClick : todoOperation,
            viewDisplay : function(view) {
                $('#box').hide();
                events = [];
            }
        });
        
        $(".todo-oper-todo-name").each(function(){
            var fitter = this;
            $(this).height(fitter.scrollHeight);
            
            function autofit() {
                $(fitter).height(1);
                var h = fitter.scrollHeight;
                console.log(fitter.scrollHeight + " " + fitter.clientHeight);
                if(h > fitter.clientHeight)
                  $(fitter).height(h).scrollTop(h);
            }
            $(fitter).css("overflow-y", "hidden").keyup(autofit).keydown(autofit).focus(autofit).change(autofit);
        })

        
        /**
         * 弹出框失去焦点自动消失
         */
        $('body').click(function(event) {
            $(".assignee_date").hide();
        })
        $(".assignee_date").click(function(event){
            return false;
        })

    }

    function initDatePicker() {
        $('.datepicker').datepicker({
            showOtherMonths : true,
            dateFormat : 'yy年m月d日',
            onSelect : function(dateText) {
                $('.datepicker').hide();
                $('.click-show-date').text(dateText);
            }
        });
        $('.no_due_date').click(function() {
            $('.datepicker').hide();
            $('.click-show-date').text("没有指定日期");
            return false;
        })
    }

    function initProjectSelect() {
        $('input[type="checkbox"].project-checkbox').attr("checked", true);
        $('input[type="checkbox"].project-checkbox').on("click", projectSelectHandler);
        $('a.project-name').click(function() {
            if (!$(this).prev().find('.project-checkbox')[0].checked) {
                $(this).prev().find('.project-checkbox').trigger("click");
            }
            var $other_li = $(this).parents("li").siblings();
            $other_li.each(function(i) {
                $li = $(this);
                if ($li.find('.project-checkbox')[0].checked)
                    $li.find('.project-checkbox').trigger("click");
            });
        })
    }
    var projectSelectHandler = function(event) {
        var $ch_box = $(event.target);
        if ($ch_box[0].checked) {
            var projectId = $ch_box.parents("li").attr("id").replace(/project_/, "") * 1;
            var showEvents = events;
            showEvents = $.grep(showEvents, function(n, i) {
                return n.projectId == projectId
            }, false);
            for ( var i = 0, len = showEvents.length; i < len; i++) {
                $("#calendar").fullCalendar("renderEvent", {
                    id : showEvents[i].id,
                    title : showEvents[i].title,
                    start : showEvents[i].start,
                    end : showEvents[i].end,
                    allDay : showEvents[i].end,
                    projectName : showEvents[i].projectName,
                    projectId : showEvents[i].projectId,
                    assigneeId : showEvents[i].assigneeId,
                    todoList : showEvents[i].todoList
                }, true);
            }
        } else {
            var projectId = $ch_box.parents("li").attr("id").replace(/project_/, "") * 1;
            $("#calendar").fullCalendar("removeEvents", function(event) {
                return event.projectId == projectId;
            })
        }
    }

    /**
     * 收起展开根据相聚选择todo
     */
    var initFoldCalendr = function() {
        $('<a href="javascript:;">展开</a>').appendTo($('.fc-header-right'));
        $(".fc-header-right a").click(function() {
            if ($('.calendar-select:visible').length > 0) {
                $('#calendar').animate({
                    width : '+=222px'
                }, 1/100000, function() {
                    $('.calendar-select').hide();
                    $('#calendar').fullCalendar('render');
                    $(".fc-header-right a").text("收起");
                });
            } else {
                $('#calendar').animate({
                    width : '-=222px'
                }, 1/100000, function() {
                    $('.calendar-select').show();
                    $('#calendar').fullCalendar('render');
                    $(".fc-header-right a").html("展开");
                });
            }
        })
    }

    function cutTodoContent(title) {
        return title.length > 24 ? title.substring(0, 23) + "..." : title;
    }
})(jQuery);
