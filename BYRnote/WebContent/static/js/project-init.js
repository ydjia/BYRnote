function ProjectInit() {
    /**
     * local variable: todosWithDueDate;
     * 经过一番思想挣扎，最后决定直接用js来计算出相关数据
     * 其他方案：
     * 1.用jsp在页面上将格式化的数据打出来，通过js获取
     * 2.增加一个service方法来获取有duedate的所有todo
     * 
     * sample data：
     * {
     *  '2013/05/25':[{name:"重新考虑数据库设计", id:'1'}],
     *  '2013/04/22':[{name:"完成交互设计", id:'1'},{name:"完善Calendar功能", id:'1'}],
     *  '2013/04/23':[{name:"异常处理机制", id:'1'}]
     * }
     */
    var todosWithDueDate;// TODO todo在增删改的时候如果如果duedate有相关变化，则更新这个数据
    
    var noAssigneeString = '未指派';
    var buttonEnableText = '保存';
    var buttonDisableText = '正在保存...';
    
    var addTodolistHtml = '<li class="input_tasklist"> <div><input placeholder="任务列表名称" class="stationery" type="text" /> </div> <div> <button class="btn btn-commit">保存</button><button class="btn cancel">取消</button> </div> </li>';
    var editLiHtml = '<li class="input_task"> <div> <span> <input class="disable_checkbox" type="checkbox" disabled="disabled"> <input placeholder="任务名称" class="stationery" type="text" /></span> </div> <div> <button class="btn btn-commit">保存</button><button class="btn cancel">取消</button></div> </li>';
    var loaderImg = '<img src="/static/img/loader.gif" />';
    
    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            return this.replace(/{(\d+)}/g, function(match, number) {
                return typeof args[number] != 'undefined' ? args[number]
                        : match;
            });
        };
    }
    
    this.util = {};
    var util = this.util;
    this.util.isNameStringValid = function(nameString){
        return nameString && nameString != noAssigneeString;
    };
    
    this.util.initSpanState = function(span){
        if(span.parents('li.task_item')[0]){
            $('body').click();
        }
        span.addClass('nobody');
    };
    
    this.util.displaySpanState = function(span){
        span.removeClass('nobody');
    };
    
    this.util.removeNothingBg = function(button){
        button.parents('header.has_buttons').removeClass('nothing');
    }
    
    this.util.closeOtherDatePickers = function(currentClickAnchor){
        $('.assignee_date:visible').each(function(){
            if(currentClickAnchor.next(".assignee_date")[0] != this){
                var span = $(this).fadeOut(100).parent().removeClass('open');
                if( span.find('a.assignee > name').html().trim() === noAssigneeString )
                   span.addClass('nobody');
            }
        });

    };

    this.util.getTodosItemHtml = function(todos){
        return $.map(todos,function(todo, i){
            return '<li id="{0}" class="task_item"><p> <a href="{2}/todos/{0}" title="{1}">{1}</a></p></li>'
            .format(todo.id,todo.name,location.origin + location.pathname);
        }).join(' ');
    };
    
    this.util.setCalendarBlur = function(){
        $('body')[0].onclick = function() {
            var parentSpan = $('.assignee_date:visible').fadeOut(100).parent();
            parentSpan.removeClass('open');
            if( parentSpan[0] && !util.isNameStringValid(parentSpan.find('a.assignee > name').html().trim()) 
                    && !parentSpan.find('a.assignee > time').html().trim())
                parentSpan.addClass('nobody');
        };
    };
    
    this.util.setDefaultDate = function(dateString, datePicker){
        if(dateString) datePicker.datepicker( "setDate", dateString );
        else datePicker.find('.ui-state-active').removeClass('ui-state-active');
    };
    
    /**
     * 可拖动的todolist的效果，每个list由一个ul及其包含的多个li组成 为ul套用名字为className的class即可出现效果
     * 
     * 参数updateHandler是一个函数，在每次拖动结束且list发生变化时触发 如果是跨list的拖动，则会在两个相关的ul上分别触发一次
     * 
     * 其参数格式为(event,ui)，例子如下： function(event,ui){
     * alert(event.target,ui.item[0]，$(event.target).sortable('toArray')); } 其中：
     * event.target是ul的html对象 ui.item[0]是被拖动的li的html对象
     * $(event.target).sortable('toArray')则能返回ul下所有li的id组成的一个数组（带顺序的哦亲）
     */
    this.util.bindSortableLists = function(className, updateHandler) {
        $("ul." + className).each(function() {
            $(this).sortable({
                connectWith : "." + className,
                delay : 200,
                items : "> li",
                axis : "y",
                update : updateHandler,
                dropOnEmpty: true,//貌似没用
                tolerance: "pointer",
//                out : function(event, ui) {
//                    console.log(ui.item);
//                    $( ".selector" ).sortable( "refreshPositions" );
//                    ui.item.siblings().not('.sortable_placeholder').hide();
//                },
//                over : function(event, ui) {
//                    $( ".selector" ).sortable( "refreshPositions" );
//                    $('.sortable_placeholder').siblings().show();
//                },
//                start : function(event, ui) {
//                    $( ".selector" ).sortable( "refreshPositions" );
//                    $('.one_taskgroup').each(function(){
//                        if(this != ui.item.parent()[0])
//                           $(this).children().hide();
//                    });
//                },
//                stop : function(event, ui) {
//                    $( ".selector" ).sortable( "refreshPositions" );
//                    $('.one_taskgroup').children().show();
//                },
                placeholder: "sortable_placeholder"
            });
        });
    };
    
    this.util.delayedAppendTooltip = function(currentDay, dateString, todos){
        var appendTarget;
        $('.has_events').each(function(){
            if($(this).find('a').html() === currentDay)
                appendTarget = this;
        });
        var simpleTodo = $(util.getTodosItemHtml(todos))
        util.initTodo(simpleTodo);
        var newTooltip = $("<div class='calendar_tooltip'></div>").html("<h6><time>"+dateString+"</time></h6>").fadeIn(200).click(function(event){event.stopPropagation();}).append(simpleTodo);
        //var newTooltip = $("<div class='calendar_tooltip'></div>").html("<h6><time>"+dateString+"</time></h6>"+util.getTodosItemHtml(todos)).fadeIn(200).click(function(event){event.stopPropagation();});
        $(appendTarget).append(newTooltip);
    };
    
    this.util.setCalendarLocaleToChinese = function(){
        $.datepicker.regional['zh-CN'] = {
                closeText: '关闭',
                prevText: '<上月',
                nextText: '下月>',
                currentText: '今天',
                monthNames: ['一月','二月','三月','四月','五月','六月',
                '七月','八月','九月','十月','十一月','十二月'],
                monthNamesShort: ['一','二','三','四','五','六',
                '七','八','九','十','十一','十二'],
                dayNames: ['星期日','星期一','星期二','星期三','星期四','星期五','星期六'],
                dayNamesShort: ['周日','周一','周二','周三','周四','周五','周六'],
                dayNamesMin: ['日','一','二','三','四','五','六'],
                weekHeader: '周',
                dateFormat: 'yy/mm/dd',
                firstDay: 1,
                isRTL: false,
                showMonthAfterYear: false,
                yearSuffix: ''};
        $.datepicker.setDefaults($.datepicker.regional['zh-CN']);
    };
    
    this.util.loadTodosWithDueDate = function(){
        var data = {};
        $('.assignee time').each(function(){
            var dateString = $(this).html().trim();
            if(dateString){
                data[dateString] = data[dateString] || [];
                
                var name = $(this).parents('.pill').siblings('a').html();
                var id = $(this).parents('li.task_item').attr('id');
                var todo = {name: name, id: id};
                data[dateString].push(todo);
            } 
        });
        todosWithDueDate = data;
    };
    
    this.util.createTodo = function(url, data, successFunc){
        console.log('new todo:', data);
        $.ajax({
            url: url,
            type : 'POST',
            data: data,
            success : successFunc
         });
    };
    
    this.util.updateTodo = function(selective, url, todoId, data, successFunc){
        var ajaxData = $.extend({}, {_method: 'put', id: todoId}, data);
        console.log("ajax data is:", ajaxData);
        $.ajax({
            url: url + '?selective='+selective,
            type : 'POST',
            dataType: 'json',
            data: ajaxData,
            success : successFunc
        });
    };
    this.util.completeTodo = function(url, todoId, completed, successFunc){
        var ajaxData = {_method: 'put', id: todoId, completed: completed};
        console.log("set completed:", completed);
        $.ajax({
            url: url,
            type : 'POST',
            data: ajaxData,
            success : successFunc
         });
    };
    this.util.deleteTodo = function(url, todoId, successFunc){
        console.log("delete todo id:", todoId);
        $.ajax({
            url: url,
            type : 'POST',
            dataType: 'json',
            data : {_method: 'put', id: todoId, deleted: true},
            success : successFunc
         });
    }
    
    this.util.createTodolist = function(url, data, successFunc){
        console.log('new todolist:', data);
        $.ajax({
            url: url,
            type : 'POST',
            data: data,
            success : successFunc
         });
    };
    
    this.util.updateTodolist = function(url, todolistId, data, successFunc){
        var ajaxData = $.extend({}, {_method: 'put', id: todolistId}, data);
        console.log("ajax data is:", ajaxData);
        $.ajax({
            url: url,
            type : 'POST',
            dataType: 'json',
            data: ajaxData,
            success : successFunc
         });
    };
    
    this.util.deleteTodolist = function(url, todolistId, successFunc){
        console.log("delete todolist id:", todolistId);
        $.ajax({
            url: url,
            type : 'POST',
            dataType: 'json',
            data : {_method: 'put', id: todolistId, deleted: true},
            success : successFunc
         });
    }
    
    this.util.getAssigneeTimeAddHandler = function(that, dateText, isAssigneedDueDate, span ){
        return function(data) {
            var nameString = that.children('name').html().trim();
            console.log('更新成功',dateText,data);
            if(dateText){//if set due date
                that.children('time').html(dateText);
                if( !isAssigneedDueDate && util.isNameStringValid(nameString) ){
                    that.children('name').after('<span>·</span>');
                }
                if( nameString === noAssigneeString){
                    that.children('name').html('');
                }
                util.displaySpanState(span);
            }
        };
    };
    
    this.util.getAssigneeTimeRemoveHandler = function(that, isAssigneedDueDate, span ){
        return function(data) {
            var nameString = that.children('name').html().trim();
            console.log(nameString,data);
            if( isAssigneedDueDate && util.isNameStringValid(nameString) ){
                that.children('time').html('');
                that.children('span').remove();
            }
            if(!util.isNameStringValid(nameString)){
                util.initSpanState(span);
                that.children('name').html(noAssigneeString);
                that.children('time').html('');
            }
        };
    };
    
    this.util.getAssigneeNameRefreshHandler = function(that, assigneeId, assigneeName, isAssigneedWithPerson, span){
        return function(data) {
            var timeString = that.children('time').html().trim();
            console.log('更新成功',assigneeId,data);
            if(assigneeId != 'null'){
                that.children('name').attr('id',assigneeId).html(assigneeName);
                if( !isAssigneedWithPerson && timeString){
                    that.children('name').after('<span>·</span>');
                }
                util.displaySpanState(span);
            }
            else{//取消/不指定执行人
                if( isAssigneedWithPerson && timeString){
                    that.children('name').attr('id',null).html('');
                    that.children('span').remove();
                }
                if(!timeString){
                    util.initSpanState(span);
                    that.children('name').html(noAssigneeString);
                }
            }
        };
    };
    
    this.util.getTodolistId = function(li_list){
        return li_list.children('ul.connectedTaskLists').attr('todolistid');
    }
    
    this.util.setTodoOperators = function(task_item, standAlone){
        var li = task_item;
        var task_operation = li.find('.task_operation');
        var nameAnchor = li.find('.wrapper > span > a');
        var nameSpan = li.find('.wrapper > span > span:first');
        var todoId = li.attr('id');
        var url = nameAnchor.attr('href');
        task_operation.find('.update').click(function(){
            var editLi = $(editLiHtml);
            var input = editLi.find('input.stationery').val(nameAnchor.html().trim());
            editLi.children('div:eq(1)').find('button.cancel').click(function() {// 取消事件
                li.show();
                editLi.remove();
                return false;// 停止事件冒泡和默认浏览器行为
            });
            editLi.children('div:eq(1)').find('button:first').click(function() {// 提交事件
                var taskName = input.val();
                if( !taskName ){
                    input.focus();
                    return;
                }
                var button = $(this);
                button.attr('disabled','true');
                button.html(buttonDisableText);

                var dueDate, assigneeId;
                if( ! li.find('.pill').hasClass('nobody') ){
                    assigneeId = li.find('a.assignee > name').attr('id');
                    if(li.find('a.assignee > time').html().trim())
                        dueDate = li.find('a.assignee > time').html().trim();
                }
                
                util.updateTodo('true', url, todoId, {content: taskName, dueDate: dueDate, assigneeId: assigneeId}, function(){
                    button.attr('disabled',null);
                    button.html(buttonEnableText);
                    console.log(li,editLi,nameAnchor);
                    li.show();
                    editLi.remove();
                    nameAnchor.html(taskName);
                    nameSpan.html(taskName);
                });
            });
            editLi.insertAfter(li.hide()).show();
        });
        task_operation.find('.delete').click(function(){
            if(confirm('确认删除该任务?')){
                var todoId = task_operation.parent().attr('id');
                util.deleteTodo(url, todoId, function(){
                    if(standAlone) location = $('#projectUrl').val();
                    else li.animate({opacity:"0"},300,'linear',function(){li.slideUp(300,function(){li.remove();});})
                });
            }
        });
    };
    this.util.setCheckboxComplete = function(task_item, standAlone){
        var li = task_item;
        var checkbox = li.find('input[type="checkbox"]');
        var todoId = li.attr('id');
        //console.log(li);
        //console.log(todoId);
        var url = li.find('.wrapper > span > a').attr('href');
        
        checkbox.click(function(){
            var completed = checkbox[0].checked;
            li.html(loaderImg);
            util.completeTodo(url, todoId, completed, function(data){
                //console.log(standAlone, data);
                var newTodo = $($.parseHTML($.trim(data))).hide();
                util.initTodo(newTodo, standAlone);
                if(standAlone){
                    li.replaceWith(newTodo);
                }
                else{
                    if(completed){
                        newTodo.find('input[type="checkbox"]')[0].checked = true;
                        li.parent().siblings('.completed_todo').append(newTodo);
                    }
                    else{
                        var ul = task_item.parents('li.list').find('ul.connectedTaskLists');
                        ul.append(newTodo);
                    }
                    li.remove();
                }
                newTodo.fadeIn(300);
            });
        });
    };
    this.util.setAssigneeDatepicker = function(task_item){
        var assignee_item = task_item.find('a.assignee');
        var span = assignee_item.parent();
        var todoId = task_item.attr('id');
        var url = task_item.find('.wrapper > span > a').attr('href');
        assignee_item.next('.assignee_date').click(false);
        var datepicker = assignee_item.next('.assignee_date').find('.datepicker')
             .datepicker({
                 showOtherMonths: true,
                 onSelect : function(dateText) {
                     var isAssigneedDueDate = assignee_item.children('time').html().trim();
                     var assigneeId = assignee_item.children('name').attr('id');
                     console.log(dateText);
                     
                     util.updateTodo('false', url, todoId, {dueDate: dateText, assigneeId: assigneeId}, 
                             util.getAssigneeTimeAddHandler(assignee_item, dateText, isAssigneedDueDate, span));
                     span.removeClass('nobody');
                 }
             });
        
        assignee_item.next('.assignee_date').find('.no_due_date>a').click(function(){
            var isAssigneedDueDate = assignee_item.children('time').html().trim();
            var assigneeId = assignee_item.children('name').attr('id');//有可能是null

            if( !isAssigneedDueDate ) {
                util.initSpanState(span);
                return false;
            }
            util.updateTodo('false', url, todoId, {dueDate: undefined, assigneeId: assigneeId? assigneeId: null}, 
                    util.getAssigneeTimeRemoveHandler(assignee_item, isAssigneedDueDate, span));
            return false;
        });
        
        var originUserId = assignee_item.children('name').attr('id');
        assignee_item.next('.assignee_date').find('select').change(function() {// 下拉菜单，指派执行人
            var isAssigneedWithPerson = assignee_item.children('name').html().trim();
            var assigneeId = $(this).children('option:selected').val();
            var assigneeName = $(this).children('option:selected').html();
            var dateText = assignee_item.children('time').html().trim();
            console.log("指派执行人:",assigneeId);

            util.updateTodo('false', url, todoId, {dueDate: dateText? dateText:undefined, assigneeId: assigneeId != 'null'? assigneeId : null}, 
                    util.getAssigneeNameRefreshHandler(assignee_item, assigneeId, assigneeName, isAssigneedWithPerson, span));
            span.removeClass('nobody');
        }).val(originUserId);
        
        assignee_item.click(function() {
            var that = $(this);
            var originNobody = span.hasClass('nobody');
            util.displaySpanState(span);
            
            util.closeOtherDatePickers(that);
            
            $(this).parent().addClass('open');
            var datePicker = $(this).next('.assignee_date').fadeIn(500);
            
            util.setDefaultDate($(this).find('time').html().trim(), datepicker);
            
            return false;
        });
    };

    this.util.setAddTaskOperation = function(todolist){
        todolist.find('li.add_task > a').click(function() {
            $(this).parent().hide();
            $(this).parent().next('li.input_task').show().find('input').focus();
            return false;// 停止事件冒泡和默认浏览器行为
        });

        var input_task = todolist.find('li.input_task');
        var input = input_task.find('input.stationery');
        
        input_task.children('div:eq(1)').find('button.cancel').click(function() {// 取消事件
            input_task.hide();
            input_task.siblings('li.add_task').show();

            input.val('');
            return false;// 停止事件冒泡和默认浏览器行为
        });
        input_task.children('div:eq(1)').find('button:first').click(function() {// 提交事件
            var taskName = input.val();
            if( !taskName ){
                input.focus();
                return;
            }
            var button = $(this);
            button.attr('disabled','true');
            button.html(buttonDisableText);
            var url = $(this).attr('requesturl');
            
            var todolistId = input_task.attr('todolistid');
            
            //TODO 关于position字段  是数据库自增呢还是像现在这么算（算出当前list的长度+1作为position）呢
            //var position = input_task.parents('li.list').find('ul.connectedTaskLists').children('li.task_item').length + 1;
            
            var position = 0;
            var lastTodo = input_task.parents('li.list').find('ul.connectedTaskLists').children('li.task_item:last');
            if (lastTodo.length > 0) {
                position = lastTodo.attr("position") * 1.0 + 100.0;
            }
 
            var dueDate, assigneeId;
            if( ! input_task.find('.pill').hasClass('nobody') ){
                assigneeId = input_task.find('a.assignee > name').attr('id');
                if(input_task.find('a.assignee > time').html().trim())
                    dueDate = input_task.find('a.assignee > time').html().trim();
            }
            
            var ajaxData = {
                content: taskName, 
                todolistId: todolistId, 
                position: position, 
                dueDate: dueDate, 
                assigneeId: assigneeId,
                deleted: false
            };

            util.createTodo(url, ajaxData, function(data){
                button.attr('disabled',null);
                button.html(buttonEnableText);
                input.val('');
                input_task.find('select').val('null');
                
                var newTodo = $( $.parseHTML(data.trim()) );
                util.initTodo(newTodo, false);//对todo进行各种初始化
                input_task.parents('li.list').children('.connectedTaskLists').append(newTodo);//添加到页面中

                input_task.find('a.assignee > name').attr('id',null).html(noAssigneeString);
                input_task.find('a.assignee > time').html('');
                input_task.find('a.assignee > span').remove();
                input_task.find('.pill').addClass('nobody');
            });
        });
        
        input_task.find('.pill').css('visibility','visible').find('a.assignee').click(function() {
            var that = $(this);
            var span = that.parent();
            var todoId = that.parents('li.task_item').attr('id');
            
            util.closeOtherDatePickers(that);

            $(this).parent().addClass('open');
            var datepicker = $(this).next('.assignee_date').click(function() {
                return false;
            }).fadeIn(500).// 显示日期/执行人面板
            find('.datepicker').datepicker({
                showOtherMonths: true,
                onSelect : function(dateText) {// 定义日期选择器
                    var isAssigneedDueDate = that.children('time').html().trim();
                    console.log(dateText);
                    util.getAssigneeTimeAddHandler(that, dateText, isAssigneedDueDate, span)({});
                },
                defaultDate: 0
            })
            datepicker.find('.ui-state-active').removeClass('ui-state-active');//在初始化的时候新建任务里面绝对不会存在已有日期
            
            var dueDate;
            if( ! input_task.find('.pill').hasClass('nobody') && input_task.find('a.assignee > time').html().trim())
                dueDate = input_task.find('a.assignee > time').html().trim();
            util.setDefaultDate(dueDate, datepicker);
            
            $(this).next('.assignee_date').find('.no_due_date>a').click(function(){
                var isAssigneedDueDate = that.children('time').html().trim();

                util.getAssigneeTimeRemoveHandler(that, isAssigneedDueDate, span)({});
                return false;
            });
            
            $(this).next('.assignee_date').find('select').change(function() {// 下拉菜单，指派执行人(不发请求)
                var isAssigneedWithPerson = that.children('name').html().trim();
                var assigneeId = $(this).children('option:selected').val();
                var assigneeName = $(this).children('option:selected').html();
                console.log(todoId, assigneeId, assigneeName, span);

                util.getAssigneeNameRefreshHandler(that, assigneeId, assigneeName, isAssigneedWithPerson, span)({});
            });

            return false;
        });
    };
    
    this.util.setTodoListOperator = function(todolist, standAlone){
        var li = todolist;
        var task_operation = li.children('.operable_item').find('.task_operation');
        var nameSpan = li.find('p.list_name > span.todolist_title');
        var nameAnchor = li.find('p.list_name > a');
        var url = nameAnchor.attr('href');
        task_operation.find('.update').click(function(){
            var editLi = $(addTodolistHtml);
            var input = editLi.find('input.stationery').val(nameAnchor.html().trim());
            editLi.children('div:eq(1)').find('button.cancel').click(function() {
                li.children('.operable_item').show();
                editLi.remove();
                return false;// 停止事件冒泡和默认浏览器行为
            });
            editLi.children('div:eq(1)').find('button:first').click(function() {
                var todolistName = input.val();
                if( !todolistName ){
                    input.focus();
                    return;
                }
                var button = $(this);
                button.attr('disabled','true');
                button.html(buttonDisableText);

                util.updateTodolist(url, util.getTodolistId(li),{name: todolistName}, function(){
                    button.attr('disabled',null);
                    button.html(buttonEnableText);
                    li.children('.operable_item').show();
                    editLi.remove();
                    nameAnchor.html(todolistName);
                    nameSpan.html(todolistName);
                });
            });
            editLi.insertAfter(li.children('.operable_item').hide()).show();
        });
        task_operation.find('.delete').click(function(){
            if(confirm('确认删除该任务列表?')){
                var todolistId = util.getTodolistId(li);
                util.deleteTodolist(url, todolistId, function(){
                    if(standAlone) location = $('#projectUrl').val();
                    else li.animate({opacity:"0"},300,'linear',function(){li.slideUp(300,function(){li.remove();});})
                });
            }
        });
    };
    
    this.util.initTodo = function(todo, standAlone){//li.task_item
        util.setTodoOperators(todo, standAlone);
        util.setCheckboxComplete(todo, standAlone);
        util.setAssigneeDatepicker(todo);
    };
    
    this.util.initTodoList = function(todolist, standAlone){//li.list
        util.setTodoListOperator(todolist, standAlone);
        util.setAddTaskOperation(todolist);
    }
    
    this.util.setAddTodolistButton = function(){
        $('#add_todolist_button').click(function(){
            
            var position = 0;
            var firstTodolist = $(this).parent().parent().next('ul').find('li:first');
            if (firstTodolist.length > 0) {
                position = firstTodolist.find('ul:first').attr('position') * 1.0 + 100.0;
            }
            
            console.log("todolist position: " + position);
            
            util.removeNothingBg($(this));
            var add_todolist_button = $(this);
            var url = add_todolist_button.parent().find('a').attr('href');
            var editLi = $(addTodolistHtml);
            var input = editLi.find('input.stationery');
            add_todolist_button.fadeOut(300).parents('header').append(editLi.show());
            
            editLi.children('div:eq(1)').find('button.cancel').click(function() {
                add_todolist_button.fadeIn(300);
                editLi.remove();
                return false;// 停止事件冒泡和默认浏览器行为
            });
            editLi.children('div:eq(1)').find('button:first').click(function() {
                var todolistName = input.val();
                if( !todolistName ){
                    input.focus();
                    return;
                }
                var button = $(this);
                button.attr('disabled','true');
                button.html(buttonDisableText);

                util.createTodolist(url, {name: todolistName, position: position, deleted: false}, function(data){
                    button.attr('disabled',null);
                    button.html(buttonEnableText);
                    add_todolist_button.fadeIn(300);
                    editLi.remove();
                    var newTodolist = $($.parseHTML($.trim(data)));
                    util.initTodoList(newTodolist);
                    $('.task_group').prepend(newTodolist);
                    newTodolist.find('li.add_task > a').click();
                });
            });
        });
    };
    
    this.util.setAjaxForm = function(id) {
        $(id).ajaxForm({
            beforeSerialize: function(jqForm, options) {
                $(id + ' li').each(function(index) {
                    var id = 'attachments[' + index + '].id';
                    var name = 'attachments[' + index + '].name';
                    $(this).find('input[type=hidden]:first').attr('name', id);
                    $(this).find('input[type=hidden]:last').attr('name', name);
                });
                
                $(id + ' .subscribers_body .subscribers ul li').each(function(index) {
                    var name = 'subscribers[' + index + '].id';
                    $(this).find('input[type=checkbox]:first').attr('name', name);
                });
                return true;
            },
            success: function(data, statusText, xhr, $form) {
                if (data.status == 'loginRequired'){
                    location = data.next;
                }
                var newComment = $($.parseHTML($.trim(data)));
                $(id).parents('.comment_item').replaceWith(newComment);
                util.initOneComment( $(newComment[0]) );
                if(newComment.find('#commentForm').length > 0){
                    util.initNewComment();
                }
                
                setTimeout("$('.newly_created').removeClass('newly_created')",300);
            },
        });
    };
    
    this.util.setEditTextAutoFit = function(div){
        function autofit() {
            var editorFrame = div.find("iframe")[0].contentWindow.document;
            var h = editorFrame.body.clientHeight;
            div.find("iframe").height(h + 40).scrollTop(h);
        }
        // 这句是关键，要让html高度为0，body才会在内容小于边界高度的时候自动缩减自己的高度
        $(div.find("iframe")[0].contentWindow.document).find('html').height(0);
        // 注意：为了完成自适应，修改了wysihtml5的源码，搜索console.log即可
        $(div.find("iframe")[0].contentWindow.document.body).css("overflow-y", "hidden").keyup(autofit).keydown(autofit).focus(autofit).change(autofit);
        if(BrowserDetect.browser != "Chrome")
            window.autofit = function(){
                document.getElementsByTagName('iframe')[0].contentWindow.document.getElementsByTagName('html')[0].style.height = '0px';
                document.getElementsByTagName('iframe')[0].contentWindow.document.body.style.overflow = 'hidden';
                document.getElementsByTagName('iframe')[0].style.height = ( document.getElementsByTagName('iframe')[0].contentWindow.document.body.clientHeight + 40 ) + 'px';
                document.getElementsByTagName('iframe')[0].contentWindow.document.body.onblur = function(){
                    clearInterval(af);
                    document.getElementsByTagName('iframe')[0].contentWindow.document.body.onfocus = function(){af = setInterval('autofit()',200);};
                };
            };
    }

    /**
     * 该方法在todolist之间拖动时会触发两次，一次是代表origin todolist的更新，另外一次是target todolist
     */
    this.util.sortTodoCallBack =  function(event,ui){ 
  
        var nextTodo = $(ui.item[0]).next();
        var preTodo = $(ui.item[0]).prev();
        var position = 0;
        
        if (nextTodo.length > 0 && preTodo.length > 0) {
            position = (nextTodo.attr("position") * 1.0 + preTodo.attr("position") * 1.0) / 2;
        } else if (preTodo.length > 0 ){
            position = preTodo.attr("position") * 1.0 + 100;
        } else if (nextTodo.length > 0 ){
            position = nextTodo.attr("position") * 1.0 - 100;
        }
        
        var nameAnchor = $(ui.item[0]).find('.wrapper > span > a');
        var todoId = ui.item[0].id;
        var url = nameAnchor.attr('href');
        
        console.log(position);
        
        var currentItem = $(ui.item[0]);
        
        if (ui.sender) {//如果是todolist之间的移动
            util.updateTodo(true, url, todoId, {todolistId:$(event.target).attr("todolistid"), position:position}, 
                function(){currentItem.attr("position", position)} );
        } else {
            util.updateTodo(true, url, todoId, {position:position}, function(){currentItem.attr("position", position)});
        }
    }
    
    this.util.sortTodolistCallBack =  function(event,ui){
        
        var nextTodolist = $(ui.item[0]).next();
        var preTodolist = $(ui.item[0]).prev();
        var position = 0;
        
        var nameAnchor = $(ui.item[0]).find('.operable_item > p > a');
        var id = $(ui.item[0]).find("ul :first").attr("todolistid");
        var url = nameAnchor.attr('href');
  
        if (nextTodolist.length > 0 && preTodolist.length > 0) {
            position = (nextTodolist.find("ul :first").attr("position") * 1.0 + 
                 preTodolist.find("ul :first").attr("position") * 1.0) / 2;
        } else if (preTodolist.length > 0 ){
            position = preTodolist.find("ul :first").attr("position") * 1.0 - 100;
        } else if (nextTodolist.length > 0 ){
            position = nextTodolist.find("ul :first").attr("position") * 1.0 + 100;
        }
        
        
        var currentItem = $(ui.item[0]).find("ul :first");
        
        console.log(position);
        util.updateTodolist(url, id, {position:position}, function(){currentItem.attr("position", position)} );
    }
    
    this.util.initNewComment = function(){
        var editor = new wysihtml5.Editor('content', {
            toolbar: 'wysiwyg_toolbar',
            parserRules: wysihtml5ParserRules
        });
        
        util.setAjaxForm("#commentForm");
        util.setEditTextAutoFit($('#commentForm'));
        init.initSubscribersZone();
        init.initFileUploadDropZone();
        
        $('.fake_textarea').focus(function(){
            if(BrowserDetect.browser != "Chrome")
                af = setInterval('autofit()',200);
            $(this).parents('.comment_content').addClass('extended_body');
            $(this).parent().addClass('text_entry');
            $(this).siblings().fadeIn(300);
            $(this).parent().next().fadeIn(300);
            $($(this).next().find('iframe')[0].contentWindow.document.body).focus();
            $(this).remove();
        });
        
        $("#commentForm").submit(function(){
           $(this).find('input[type=submit]').attr('disabled','true').val(buttonDisableText); 
        });
    };
    
    this.util.initOneComment = function(comment_item){
        var baseUrl = comment_item.find('input:first').val();
        var id = comment_item.find('input:eq(1)').val();
        comment_item.find('.comment_edit_a').click(function(){
            $.get(baseUrl + '/edit',{}, function(data){
                $("#comment_item_" + id + " .comment_show .comment_content").hide();
                $("#comment_item_" + id + " .comment_show").append(data);
                var editor = new wysihtml5.Editor('content_' + id, {
                    toolbar: 'wysiwyg_toolbar',
                    parserRules: wysihtml5ParserRules
                });
                util.setAjaxForm("#commentForm_" + id);
                util.setEditTextAutoFit($("#commentForm_" + id));
                init.initFileUploadDropZone("#commentForm_" + id + " .attachments");
                
                $("#commentForm_" + id).submit(function(){
                    $(this).find('input[type=submit]').attr('disabled','true').val(buttonDisableText); 
                 });
                
                $('#comment_item_' + id + ' .comment_edit_cancle').click(function() {
                    $("#comment_item_" + id + " .comment_show .comment_content").show();
                    $("#comment_item_" + id + " .comment_show .comment_content.new").remove();
                    
                    return false;
                });
                $.each($('#commentForm_' + id + ' ul.file_list li'), function() {
                    var item = $(this);
                    item.find('a.icon-remove').click(function() {
                        item.remove();
                        return false;
                    });
                });
            });
            return false;
        });
        comment_item.find('.comment_delete_a').click(function(){
            if(confirm('是否删除该评论?')){
                $.ajax({
                    url : baseUrl,
                    type : 'DELETE',
                    dataType : 'json',
                    data : {
                        _method : 'delete',
                        id : id,
                        deleted : true
                    },
                    success : function(data) {
                        if (data.result == 'success') {
                            comment_item.fadeOut(300, function() {
                                $(this).remove();
                            });
                        }
                        if (data.status == 'loginRequired') {
                            location = data.next;
                        }
                    },
                });
            }
            return false;
        });
        
        
    };

    this.init = {};
    var init = this.init;
    this.init.initProjectCalendar = function(){
        util.setCalendarLocaleToChinese();
        
        util.loadTodosWithDueDate();
        
        $('.project_calendar').datepicker({
            showOtherMonths: true,
            dateFormat: 'yy/mm/dd',
            beforeShowDay: function(date){
                var dateString = $.datepicker.formatDate( "yy/mm/dd", date );
                if(todosWithDueDate[dateString]){
                    return [true, 'has_events'];
                }
                return [true, ''];
            },
            onSelect: function(dateText, inst){
                var dateString = dateText;
                if(todosWithDueDate[dateString]){
                    var todos = todosWithDueDate[dateString];
                    
                    setTimeout(function(){util.delayedAppendTooltip(inst.currentDay,dateText,todos);},100);
                }
            }
        });
        
        $('body').click(function() {
            $('.calendar_tooltip:visible').fadeOut(100, function(){$(this).remove();});
        });
        
    };
    
    this.init.initTodos = function(standAlone){
        $('li.task_item').each(function(){
           util.initTodo($(this), standAlone); 
        });
        util.setCalendarBlur();
        util.bindSortableLists("connectedTaskLists", util.sortTodoCallBack);// TODO 改变todo的position字段
    };
    
    this.init.initTodoLists = function(standAlone){
        util.setAddTodolistButton();
        $('li.list').each(function(){
            util.initTodoList($(this), standAlone); 
        });
        util.bindSortableLists("connectedTaskGroupLists", util.sortTodolistCallBack);// TODO 改变todolist的position字段
    }

    this.init.initFileUploadDropZone = function(div){
        if (!div) {
            div = 'form .attachments';
        }
        $(div).dropableFileUpload({
            requestUrl : $(div + ' input:first').val(),
            accept: 'application/json',
            onReady : function(file) {
                var progressDiv = $('<div>').attr('class', 'progress').css({
                    'display': 'inline-block',
                    'width': '100px',
                    'margin': '4px 8px 0 4px'
                }).append($('<div>').attr('class', 'bar').css({
                        'width': '0'
                  }));
                var li = $('<li>').attr('class', 'uploading')
                        .append($('<a>').attr('class', 'icon-remove'))
                        .append($('<span>').text(file.name))
                        .append(progressDiv)
                        .append($('<input>').attr('type', 'hidden'))
                        .append($('<input>').attr('type', 'hidden'));
                $(div).find('ul:first').append(li);
                return li;
            },
            onSuccess : function(li, data) {
                if(typeof data == 'string')
                    data = JSON.parse(data);
                li.find('input:first').val(data.attachment.id);
                li.find('input:last').val(data.attachment.name);
                li.removeClass('uploading');
                li.addClass('uploaded');
                li.find('.progress').hide();
                li.find('a.icon-remove').click(function() {
                    if($('header.file_header').length > 0 && li.siblings().length == 0 ) {
                        $('header.file_header input[type=submit]').attr('disabled', true);
                    }
                    li.remove();
                    return false;
                });
                
                if($('header.file_header').length > 0) {
                    $('header.file_header input[type=submit]').attr('disabled', null);
                }
            },
            onProgress : function(li, loaded, total) {
                li.find('.progress .bar').css('width', (loaded * 100 / total) + '%');
            },
            fileInputSelector : "#file_uploader"
        });
        
        $(div).find('a:first').click(function(){
            if(window.File && window.FileReader && window.FileList && window.Blob)
                $('#file_uploader').click();
            else
                $('#compatible_form input[type=file]').click();
        });
    };
    
    this.init.initFileUploadButton = function() {
        $('#file_upload_button').click(function() {
            util.removeNothingBg($(this));
            $('section.upload').show();
            $(this).parent().addClass('hide_buttons');
            $('#compatible_form').show();
        });
        $('section.upload').hide();
        $('section.upload a.cancel').click(function() {
            $('section.upload').hide();
            $('#file_upload_button').parent().removeClass('hide_buttons');
            return false;
        });
        
        init.initFileUploadDropZone('section.upload .attachments');
        $('#upload_form').ajaxForm({
            beforeSerialize: function(jqForm, options) {
                $('#upload_form li').each(function(index) {
                    var name = 'attachmentIds[' + index + ']';
                    $(this).find('input[type=hidden]:first').attr('name', name);
                });
                $('#upload_form .subscribers_body .subscribers ul li').each(function(index) {
                    var name = 'subscribers[' + index + '].id';
                    $(this).find('input[type=checkbox]:first').attr('name', name);
                });
                return true;
            },
            success: function(data, statusText, xhr, $form) {
                if (data.result == 'success') {
                    location.reload();
                }
            },
            dataType: 'json'
        });
    };

    this.init.initSubscribersZone = function() {
        //Subscriber全选/全不选
        $('.select_or_unselect_all').click(function() {
            var checked = $(this).attr('data-behaviour') == 'select_all';
            $(this).parent().next('.subscribers').find('input[type="checkbox"]').attr('checked', checked);
            
            return false;
        });
        
        $('#set_subsribers').click(function(){
            $(this).next().fadeIn(300);
            $(this).remove();
        });
    };

    this.init.initDiscussion = function() {
        util.initNewComment();
        $('.comment_item').each(function() {
            util.initOneComment($(this));
        });
    };
    
    this.init.initNewDiscussion = function(div) {
        util.setEditTextAutoFit(div);
    }
    
    this.init.initNewDocument = function(div) {
        util.setEditTextAutoFit(div);
    }
    
    this.init.initProjectCalendar();

    jQuery('time.timeago').timeago()
    return this.init;
}