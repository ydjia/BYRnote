(function($){
    $(document).ready(function() {
        var init = new ProjectInit();
        init.initTodoLists(true);
        init.initTodos();
        init.initDiscussion();
    });
})(jQuery);