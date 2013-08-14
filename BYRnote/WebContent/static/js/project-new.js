(function($) {
   
    function initAjaxForm() {
        $("#newProjectForm").ajaxForm({
            beforeSerialize: function(jqForm, options) {               
                $("input[email][value!='']").each(function(index) {
                    $(this).attr("name", "users[" + index + "].email");
                }); 
                $(".admins ul li").each(function(index){
                	var name = "admins[" + index + "].id";
                	$(this).find('input[type=checkbox]:first').attr('name', name);
                });
                return true;
            },
            success: function(data, statusText, xhr, $form) {
            	if (data.status == 'loginRequired'){
                	location = data.next;
                }
                if (data.result == 'success') {
                    window.location.href='/' + data.companyId + '/projects/' + data.projectId;
                }
            },
            dataType: 'json'
        });
    }
    
    function autoComplete(item) {
        var div = item.parent();
        item.autocomplete({
            minLength: 1,
            source: oboard_user_emails,
            focus: function( event, ui ) {
                item.val( ui.item.value );
                item.attr("title", ui.item.name);
                return false;
            },
            select: function( event, ui ) {
                item.val( ui.item.value );
                item.attr("title", ui.item.name);
                return false;
            }
        }).data( "ui-autocomplete" )._renderItem = function( ul, item ) {
            ul.css("position", "absolute");
            ul.css("top", "13px");
            ul.appendTo(div);
            return $( "<li>" )
            .append( "<a><name>" + item.name + "</name> (" + item.value + ")</a>" )
            .appendTo( ul );
        };
    }
    
    function initInputAndButton() {
        $("a[delete-email]").each(function() {
            $(this).click(function() {
                $(this).parent().unbind().remove();
            });
        });
        
        $("input[email]").each(function() {
            autoComplete($(this));
        }); 
        
        $("#add-email").click(function() {
            
            $('<div class="email-input">'
                + '<input email type="email" placeholder="邮箱"/>'
                + '<a class="invite_cancel" title="移除" delete-email></a>'
                + '</div>').insertBefore($(this).parent());
            
            $('.email-input :last a[delete-email]').each(function() {
                $(this).click(function() {
                    $(this).parent().unbind().remove();
                });
            });
            
            $('.email-input :last input[email]').each(function() {
                autoComplete($(this));
            });
        });
        
        $('.project-remove').click(function() {
            if(confirm('确定删除该项目？ 请慎重！！！')){
                var url = $(this).attr('href');
                $.ajax({
                    url:  url,
                    type : 'post',
                    dataType: 'json',
                    data: {
                        _method: 'put',
                        deleted:true
                    },
                    success : function() {
                        window.location.href = url.substring(0, url.indexOf("projects"));
                    }
                 });
            }
            return false;
        });
        
        $('a.member_delete').click(function() {
            var that = $(this);
            if(confirm('确定移除该项目成员？')){
                var url = $(this).attr('href');
                $.ajax({
                    url:  url,
                    type : 'post',
                    dataType: 'json',
                    data: {
                        _method: 'delete'
                    },
                    success : function() {
                        that.parent().parent().unbind().remove();
                    }
                 });
            }
            return false;
        });
        
        $("#invite").click(function() {
            var email_not_empty = false;
            $("input[email]").each(function(index) {
                if ($(this).val()) {
                    email_not_empty = true;
                }
                $(this).attr("name", "emailAddresses[" + index + "].email");
            });
            if (!email_not_empty) {
                $("input[email] :first").focus();
                $("input[email] :first").fadeOut(300);
                $("input[email] :first").fadeIn(300);
            }
            return email_not_empty;
        });
        
        $('.select_or_unselect_all').click(function() {
            var checked = $(this).attr('data-behaviour') == 'select_all';
            $(this).parent().next('ul').find('input[type="checkbox"]').attr('checked', checked);
            return false;
        });
    }
    
    function init() {
        initAjaxForm();
        initInputAndButton();
    }

    $(document).ready(function() {
        init();
    });
})(jQuery);