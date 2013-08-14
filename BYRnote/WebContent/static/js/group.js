$(function() {
    var $active_peoples = $('.active_peoples');

    /**
     * 可以拖拽成员
     */
    $('.people').not('.invitation').draggable({
        // cancel : '.people a',// 点击姓名时进入个人页面，不产生拖拽
        revert : 'invalid', // 拖拽不成功时，返回原来的位置
        containment : $('#demo-frame').length ? '#demo-frame' : 'document', // 拖拽范围
        helper : 'clone',// 拖拽时会复制一个图片，显示拖拽到的位置
        cursor : 'move',
        scrollSensitivity : 100,// 拖动时后的滚轮响应
        scrollSpeed : 100,
        start : function(event, ui) {
            // $(this).siblings().andSelf().hide();
        },
        stop : function(event, ui) {
            // $(this).siblings().andSelf().fadeOut('slow');
        }
    // delay : 1000
    });

    /**
     * 指针知道分组名称上的时候，显示删除和编辑按钮
     */
    $(".group_control").hover(function() {
        $("span:eq(1)", $(this)).removeClass("edit_group_name").show();
        $("span:eq(2)", $(this)).removeClass("delete_group_name").show();
    }, function() {
        $("span:eq(1)", $(this)).addClass("edit_group_name").hide();
        $("span:eq(2)", $(this)).addClass("delete_group_name").hide();
    });

    /**
     * 点击删除分组时的响应事件
     */
    $(".delete_group_name").click(function() {
        if ($(this).parent().next()[0].nodeName!="FORM") {
            if (confirm("小组删除后组内成员不会受影响，确定删除？")) {
            } else {
                return false;
            }
        }
        var groupId = $(this).parent().nextAll().filter(".active_peoples:first").attr("id").substr(6);
        var companyId = $(this).prev().prev().attr("companyId");
        $.ajax('/' + companyId + '/group/' + groupId, {
            type : 'POST',
            data : {
                '_method' : 'DELETE',
            },
            dataType : 'json',
            success : function(data) {
                if (data.status == 'ok') {
                    var $item = $("div.people ", $("#group_" + groupId))
                    $item.appendTo("#group_").fadeIn(function() {
                        $item.animate({
                            opacity : 'show'
                        }, 2000)
                    });
                    $("#group_" + groupId).prev().andSelf().remove();

                } else {
                    alsert('更新失败');
                }
            },
        });
        return false;
    })

    /**
     * 点击编辑分组按钮之后的响应事件
     */
    $(".edit_group_name").click(function() {
        $(this).parent().hide();
        var name = $(this).prev().text();
        $(".form.form-edit-subgroup:first").clone(true).show().insertAfter($(this).parent());
        $($(".group-name", $(this).parent().next())[0]).attr("value", name).focus();
    })

    /**
     * 点击取消按钮之后的响应
     */
    $(".btn.btn-x.cancel").click(function() {
        if ($(this).parent().next().attr("nature") == "new") {
            $(".delete_group_name", $(this).parent().prev()).trigger("click");
            $("section button.btn.new-group").show();
        } else
            $(this).parent().prev().show().end().remove();
    })

    /**
     * 点击保存按钮之后的响应
     */
    $(".btn.btn-commit.group-edit-save").click(function() {
        if ($(this).parent().next().attr("nature") == "new") {
            $(this).parent().next().attr("nature", "");
            $("section button.btn.new-group").show();
        }
        var groupId = $(this).parent().next().attr("id").substr(6);
        var companyId = $("span[companyId]", $(this).parent().prev()).attr("companyId");
        var groupName = $(this).prev()[0].value;
        $.ajax('/' + companyId + '/group/' + groupId, {
            type : 'POST',
            data : {
                '_method' : 'PUT',
                'name' : groupName
            },
            dataType : 'json',
            success : function(data) {
                if (data.status == 'ok') {
                    $("span:first", $("#group_" + groupId).prev()).text(data.department.name);
                } else {
                    alsert('更新失败');
                }
            },
        });
        $(this).parent().prev().show().end().remove();
        return false;
    })

    var drop = function(event, ui) {
        $("*", $active_peoples).show();
        deleteImage(ui.draggable, event.target);
        var info = $('a', ui.draggable).attr('href').split('/');
        var groupId = $(event.target).attr('id').substr(6);
        $.ajax('/' + info[1] + '/group/groupuser', {
            type : 'POST',
            data : {
                '_method' : 'PUT',
                'userId' : info[3],
                'companyId' : info[1],
                'groupId' : groupId.length ? groupId * 1 : null
            },
            dataType : 'json',
            success : function(data) {
                if (data.status == 'ok') {
                } else {
                    alsert('更新失败');
                }
            },
        });
    };

    /**
     * 配置被拖拽容器的属性
     */
    $active_peoples.droppable({
        accept : function(draggable) {
            if (this.id == draggable[0].parentNode.id || !$(draggable).hasClass("people"))
                return false;
            return true;
        },
        hoverClass : 'ui-state-highlight',
        activeClass : "custom-state-active",
        drop : drop
    });

    /**
     * 新建分组时候的操作
     */
    $("section button.btn.new-group").click(
            function() {
                $("section button.btn.new-group").hide();
                var url = '/' + $(this).attr("companyId") + '/group';
                $.ajax(url, {
                    type : 'POST',
                    async : false,
                    data : {
                        'companyId' : $(this).attr("companyId"),
                        'name' : "分组名称"
                    },
                    dataType : 'json',
                    success : function(data) {
                        if (data.status == 'ok') {
                            var $object = $('<div nature="new" class="active_peoples" id="group_'
                                    + data.department.id + '"></div>');
                            $object.insertBefore('.btn.new-group');
                            $(".people_content").next().find(".group_control").clone(true).insertBefore($object);
                            $(".edit_group_name", $object.prev()).trigger("click");
                            $object.droppable({
                                accept : '.people',
                                hoverClass : 'ui-state-highlight',
                                activeClass : "custom-state-active",
                                drop : drop
                            });
                        } else {
                            alsert('更新失败');
                        }
                    },
                });

            });

    function deleteImage($item, $target) {
        $item.fadeOut(function() {
            $item.appendTo($target).fadeIn(function() {
                $item.animate({
                    opacity : 'show'
                }, 2000);
            });
        });
    }

    function showInviteForm() {
        $('div.container:first').fadeOut(300, function() {
            $(this).next().fadeIn(300);
        });
    }
});
