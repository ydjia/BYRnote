$(document).ready(function() {
    // 将相应的条目加到对应的日期中
    $('.activity').add('.attachment').add('.todo').each(function() {
        if ($(this).attr('date').length > 0) {
            var date = new Date($(this).attr('date') * 1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            $('#date_' + date.getTime()).append($(this));
        }
    });
    // 控制css
    // TODO:提取出css文件
    $('.event-info').css("margin-left", 220);
    $('.right-content-title-hr-main').css("width", 220);
    $('.right-content').css("width", 1120);
    $('.calendar-div').css("width", 150);
    $('.right-content-title').css("margin-left", "5%");
    $('.right-content-title').text($("#title").text());
});