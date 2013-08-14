$(function() {
    // 总统计柱状图配置
    var barChart1 = new dhtmlXChart({
        view : "bar",
        alpha : function(data) {
            return data.length / 1;
        },
        container : "chart1",
        value : "#length#",
        label : "#length#",
        color : "#45abf5",
        gradient : true,
        border : false,
        width : 25,
        tooltip : {
            template : "#length#"
        },
        xAxis : {
            title : "日期",
            template : "#description#",
            step : 5
        },
        yAxis : {
            start : 0,
            end : 40,
            step : 5,
            title : "工作时间<br/>小时"
        }
    });

    // 根据用户统计饼状图配置
    var barChart2 = new dhtmlXChart({
        view : "pie3D",
        container : "chart2",
        value : "#length#",
        label : "#description#",
        pieInnerText : "<b>#length#小时</b>",
        color : "#color#",
        radius : 110
    });

    // 根据项目统计柱状图配置
    var barChart3 = new dhtmlXChart({
        view : "pie3D",
        container : "chart3",
        value : "#length#",
        label : "#description#",
        color : "#color#",
        pieInnerText : "<b>#length#小时</b>",
        radius : 110
    });

    // 选择起始时间
    $('#start-time').datepicker({
        showButtonPanel : true,
        onSelect : function() {
            $(this).parent().find("button").trigger("click");
        }
    });
    // 选择结束时间
    $('#end-time').datepicker({
        showButtonPanel : true,
        onSelect : function() {
            $(this).parent().find("button").trigger("click");
        }
    });

    $('#ui-datepicker-div').hide();

    // 判断日期范围是否正确
    $('button').click(function() {
        if ($("#start-time").val() == "" || $("#end-time").val() == "") {
            alert("日期范围不能为空");
            return false;
        }
        if (new Date($("#start-time").val()).getTime() > new Date($("#end-time").val()).getTime()) {
            alert("输入正确日期范围");
            return false;
        }
        return true;
    });

    // 对返回的统计结果进行展示
    if ($('#chat_1').text().length > 0) {
        barChart1.parse($('#chat_1').text(), "json");
        $('#tooltip').show();
    }
    if ($('#chat_2').text().length > 0) {
        barChart2.parse($('#chat_2').text(), "json");
        $('#tooltip-by-user').show();
    }
    if ($('#chat_3').text().length > 0) {
        barChart3.parse($('#chat_3').text(), "json");
        $('#tooltip-by-project').show();
    }

    if ($('#worklog').attr('start').length > 0) {
        $('#start-time').datepicker('setDate', new Date($('#worklog').attr('start') * 1));
    }

    if ($('#worklog').attr('end').length > 0) {
        $('#end-time').datepicker('setDate', new Date($('#worklog').attr('end') * 1));
    }
    if ($('#worklog').attr('userId').length > 0) {
        $("#users").val($('#worklog').attr('userId'));
    }

    if ($('#worklog').attr('projectId').length > 0) {
        $('#projects').val($('#worklog').attr('projectId'));
    }
    

    $("select").change(function() {
        $(this).parent().find("button").trigger("click");
    });
    $("button").hide();

});
