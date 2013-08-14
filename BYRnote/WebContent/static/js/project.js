(function($){
    $(document).ready(function() {
        var init = new ProjectInit();
        init.initTodos();
        init.initTodoLists();
        init.initFileUploadButton();
        init.initSubscribersZone();
    });
})(jQuery);
