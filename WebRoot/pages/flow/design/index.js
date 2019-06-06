var tableArray = new Array();

// DataTable 数据源
var dataTableArray = new Array();
// DataTable Html代码
var dataTableHtmlArray = new Array();
// 全部task
var taskMap = new Map();

$(function () {

    $(".on").click(function () {
        $(".on-down").slideToggle();
    });

    // 修改流程使用，暂时还没用到
    var flowNodeCount = $("#flowNodeCount").val();
    if (flowNodeCount == "") {
        flowNodeCount = 0;
    }
    console.log("flowNodeCount:" + flowNodeCount);
    for (var k = 0; k < parseInt(flowNodeCount); k++) {
        dataTableArray[k] = {
            "aaData": [],
            "iTotalDisplayRecords": 0,
            "iTotalRecords": 0
        };

        var html = Editorial.JBPM.Design.createDataTableHtml(k);

        dataTableHtmlArray[k] = html;

        $("#content").append(dataTableHtmlArray[k]);

        Editorial.JBPM.Design.createDataTable(k);
    }
    ;

});

Editorial.JBPM.Design.accordionToggle = function (id, obj) {
    var openClassName = "icon-folder-open";
    var closeClassName = "icon-folder-close";
    var imark = $(obj).find("i");
    var disp = $("#" + id).css("display"); // 当前accordion显示状态
    if (disp == "none") {
        imark.removeClass(closeClassName).addClass(openClassName);
    } else {
        imark.removeClass(openClassName).addClass(closeClassName);
    }
    $("#" + id).slideToggle("fast");
};

Editorial.JBPM.Design.createDataTableHtml = function (k, taskData) {
    var html = "";
    html = html + '<div class="table-header on" onclick="Editorial.JBPM.Design.accordionToggle(\'task_' + k + '\', this);">';
    html = html + '<i class="icon-folder-open"></i>&nbsp;&nbsp;' + taskData.name;
    html = html + '</div>';
    html = html + '<div id="task_' + k + '" class="on-down">';


    html = html + '<form class="form-horizontal">';
    html = html + '<div class="row-fluid">';
    html = html + '<div class="row-fluid">';
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">流程名称：</label>';
    html = html + '<div class="controls">';
    html = html + '<input type="text" id="query_module_shortName" value="' + taskData.name + '" class="span10" disabled />';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">页面访问路径：</label>';
    html = html + '<div class="controls">';
    html = html + '<input type="text" id="query_module_shortName" value="' + taskData.url + '" class="span10" disabled />';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">是否需要人为参与：</label>';
    html = html + '<div class="controls">';
    html = html + '<select id="taskAssigneeFlag" name="taskAssigneeFlag" class="span10" disabled >';
    html = html + '<option value="">--请选择--</option>';
    html = html + '<option value="1"';
    if ("1" == taskData.taskAssigneeFlag) {
        html = html + " selected ";
    }
    html = html + '>是</option>';
    html = html + '<option value="2"';
    if ("2" == taskData.taskAssigneeFlag) {
        html = html + " selected ";
    }
    html = html + '>否</option>';
    html = html + '</select>';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">分配人：</label>';
    html = html + '<div class="controls">';
    html = html + '<input type="text" id="query_module_shortName" value="' + taskData.assignee + '" class="span10" disabled />';
    html = html + '</div>';
    html = html + '</div>';
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">是否是开始任务：</label>';
    html = html + '<div class="controls">';
    html = html + '<select id="taskStartFlag" name="taskStartFlag" class="span10" disabled >';
    html = html + '<option value="">--请选择--</option>';
    html = html + '<option value="1"';
    if ("1" == taskData.startFlag) {
        html = html + " selected ";
    }
    html = html + '>是</option>';
    html = html + '<option value="2"';
    if ("2" == taskData.startFlag) {
        html = html + " selected ";
    }
    html = html + '>否</option>';
    html = html + '</select>';
    html = html + '</div>';
    html = html + '</div>';
    /*
     html = html + '<div class="control-group span3">';
     html = html + '<label class="control-label" for="form-field-1">是否是结束任务：</label>';
     html = html + '<div class="controls">';
     html = html + '<select id="taskEndFlag" name="taskEndFlag" class="span10" disabled >';
     html = html + '<option value="">--请选择--</option>';
     html = html + '<option value="1"';
     if ("1" == taskData.endFlag) {
     html = html + " selected ";
     }
     html = html + '>是</option>';
     html = html + '<option value="2"';
     if ("2" == taskData.endFlag) {
     html = html + " selected ";
     }
     html = html + '>否</option>';
     html = html + '</select>';
     html = html + '</div>';
     html = html + '</div>';
     */
    html = html + '<div class="control-group span3">';
    html = html + '<label class="control-label" for="form-field-1">自定义属性编号：</label>';
    html = html + '<div class="controls">';
    html = html + '<input type="text" id="query_module_shortName" value="' + taskData.field + '" class="span10" disabled />';
    html = html + '<input type="hidden" id="taskDisplayFieldHidden_' + k + '" value="' + taskData.display + '" />';
    html = html + '</div>';
    html = html + '</div>';
    if ("text" == taskData.display) {
        html = html + '<div class="control-group span3">';
        html = html + '<div class="ace-thumbnails">';
        html = html + '<span class="btn btn-small btn-primary"><i class=icon-plus-sign bigger-125></i>';
        html = html + '<input type="button" class="btn btn-small btn-primary" id="taskAddConditionButton_"' + k;
        html = html + '" onclick="Editorial.JBPM.Design.addCondition(' + k + ');" value="添加条件"/>';
        html = html + '</span>';
        html = html + '</div>';
        html = html + '</div>';
    }
    html = html + '</div>';
    html = html + '</form>';


    html = html + '<table id="table_report' + k + '" class="table table-striped table-bordered table-hover">';
    html = html + '<thead>';
    if ("select" == taskData.display) {
        html = html + '<tr>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '</tr>';
    }
    if ("text" == taskData.display) {
        html = html + '<tr>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '</tr>';
    }
    html = html + '</thead>';
    html = html + '<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;">';
    html = html + '</tbody>';
    html = html + '<tfoot>';
    if ("select" == taskData.display) {
        html = html + '<tr>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '</tr>';
    }
    if ("text" == taskData.display) {
        html = html + '<tr>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '<th width="15%" align="center"></th>';
        html = html + '</tr>';
    }
    html = html + '</tfoot>';
    html = html + '</table>';
    html = html + '</div>';
    html = html + '</div>';
    return html;
};

Editorial.JBPM.Design.addCondition = function (k) {
    console.log("addCondition k:" + k);
    var rowIndex = dataTableArray[k].aaData.length;
    console.log("addCondition rowIndex:" + rowIndex);
    var nextTaskData = {
        id: rowIndex,
        conditionSymbol: "",
        conditionValue: "",
        nextTransitionName: ""
    };
    dataTableArray[k].aaData.push(nextTaskData);
    tableArray[k].fnStandingRedraw();
    //refreshFrameDataTableInFrame("tableArray[k]");
};

Editorial.JBPM.Design.changeCondition = function (k, row, value) {
    console.log("changeCondition k:" + k);
    console.log("changeCondition row:" + row);
    console.log("changeCondition value:" + value);
    dataTableArray[k].aaData.forEach(function (nextTaskData, index) {
        console.log("nextTaskData:" + JSON.stringify(nextTaskData));
        if (row == index) {
            nextTaskData.conditionSymbol = value;
        }
    });
    console.log("dataTableArray[k]:" + JSON.stringify(dataTableArray[k]));
    tableArray[k].fnStandingRedraw();
};

Editorial.JBPM.Design.createDataTable = function (k, display) {
    var columns = "";
    if ("select" == display) {
        columns = Editorial.JBPM.Design.selectColumns;
    }
    if ("text" == display) {
        columns = Editorial.JBPM.Design.textColumns;
    }

    tableArray[k] = $('#table_report' + k).dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": k,
        // "/pages/BPM/form/findTaskByUserName", // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {

        },
        "aaData": dataTableArray[k],
        "fnServerData": Editorial.JBPM.Design.retrieveCacheData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": eval(columns),

        // 多语言配置
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "对不起，查询不到相关数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        }

    });
};

Editorial.JBPM.Design.selectColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "后置条件",
        "mDataProp": "nextTransitionName"
    },
    {
        "sTitle": "后置流程名称",
        "mData": null,
        "fnRender": function (oObj) {
            var select = '<select id="nextTask_select" name="nextTask_select" class="span10">';
            console.log("taskMap:" + JSON.stringify(taskMap));
            console.log("taskMap.keys():" + JSON.stringify(taskMap.keys()));
            for (var i = 0; i < taskMap.keys().length; i++) {
                console.log("taskMap.keys()[i]:" + taskMap.keys()[i]);
                //console.log("taskMap.get(key):" + taskMap.get(taskMap.keys()[i]));
                select = select + '<option value="' + taskMap.keys()[i] + '">' + taskMap.keys()[i] + '</option>';
            }
            select = select + '<option value="end">结束</option>';
            select = select + '</select>';
            var hiddenId = '<input type="hidden" id="transitionId_hidden" name="transitionId_hidden" value="' + oObj.aData.id + '"/>';
            var hiddenName = '<input type="hidden" id="transitionName_hidden" name="transitionName_hidden" value="' + oObj.aData.nextTransitionName + '"/>';
            return select + hiddenId + hiddenName;
        }
    }
];

Editorial.JBPM.Design.textColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "符号",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var select = "";
            if ("otherwise" == oObj.aData.conditionSymbol) {
                select = '<select id="conditionSymbol_select" name="conditionSymbol_select" class="span10" readOnly>';
                select = select + '<option value="otherwise" selected>otherwise</option>';
                select = select + '</select>';
            } else {
                console.log("fnRender oObj:" + JSON.stringify(oObj));
                select = '<select id="conditionSymbol_select" name="conditionSymbol_select" class="span10" onblur="Editorial.JBPM.Design.changeCondition(\'' + oObj.oSettings.sAjaxSource + '\', \'' + oObj.aData.id + '\', this.value)">';
                if ("1" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="1" selected>=</option>';
                } else {
                    select = select + '<option value="1">=</option>';
                }
                if ("2" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="2" selected>!=</option>';
                } else {
                    select = select + '<option value="2">!=</option>';
                }
                if ("3" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="3" selected><</option>';
                } else {
                    select = select + '<option value="3"><</option>';
                }
                if ("4" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="4" selected>></option>';
                } else {
                    select = select + '<option value="4">></option>';
                }
                if ("5" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="5" selected><=</option>';
                } else {
                    select = select + '<option value="5"><=</option>';
                }
                if ("6" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="6" selected>>=</option>';
                } else {
                    select = select + '<option value="6">>=</option>';
                }
                if ("7" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="7" selected><<</option>';
                } else {
                    select = select + '<option value="7"><<</option>';
                }
                if ("8" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="8" selected><=<</option>';
                } else {
                    select = select + '<option value="8"><=<</option>';
                }
                if ("9" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="9" selected><<=</option>';
                } else {
                    select = select + '<option value="9"><<=</option>';
                }
                if ("10" == oObj.aData.conditionSymbol) {
                    select = select + '<option value="10" selected><=<=</option>';
                } else {
                    select = select + '<option value="10"><=<=</option>';
                }
                select = select + '</select>';
            }
            return select;
        }
    },
    {
        "sTitle": "值",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            console.log("oObj.aData.conditionSymbol:" + oObj.aData.conditionSymbol);
            var text = "";
            if ("" == oObj.aData.conditionSymbol || "1" == oObj.aData.conditionSymbol || "2" == oObj.aData.conditionSymbol || "3" == oObj.aData.conditionSymbol || "4" == oObj.aData.conditionSymbol || "5" == oObj.aData.conditionSymbol || "6" == oObj.aData.conditionSymbol) {
                text = '<input type="text" id="conditionValue_text" name="conditionValue_text" value="" class="span6"/>';
            }
            if ("7" == oObj.aData.conditionSymbol || "8" == oObj.aData.conditionSymbol || "9" == oObj.aData.conditionSymbol || "10" == oObj.aData.conditionSymbol) {
                text = text + '<input type="text" id="conditionValue_text" name="conditionValue_text" value="" class="span3"/>';
                text = text + '-';
                text = text + '<input type="text" id="conditionValue_text" name="conditionValue_text" value="" class="span3"/>';
            }
            if ("otherwise" == oObj.aData.conditionSymbol) {
                text = '<input type="text" id="conditionValue_text" name="conditionValue_text" value="otherwise" class="span6" readOnly/>';
            }
            return text;
        }
    },
    {
        "sTitle": "后置流程名称",
        "mData": null,
        "fnRender": function (oObj) {
            var select = '<select id="nextTask_select" name="nextTask_select" class="span10">';
            console.log("taskMap:" + JSON.stringify(taskMap));
            console.log("taskMap.keys():" + JSON.stringify(taskMap.keys()));
            for (var i = 0; i < taskMap.keys().length; i++) {
                console.log("taskMap.keys()[i]:" + taskMap.keys()[i]);
                //console.log("taskMap.get(key):" + taskMap.get(taskMap.keys()[i]));
                select = select + '<option value="' + taskMap.keys()[i] + '">' + taskMap.keys()[i] + '</option>';
            }
            select = select + '<option value="end">结束</option>';
            select = select + '</select>';
            //var hiddenId = '<input type="hidden" id="transitionId_hidden" name="transitionId_hidden" value="' + oObj.aData.id + '"/>';
            //var hiddenName = '<input type="hidden" id="transitionName_hidden" name="transitionName_hidden" value="' + oObj.aData.nextTransitionName + '"/>';
            return select;
        }
    }
];

Editorial.JBPM.Design.retrieveCacheData = function (sSource, aoData, fnCallback) {
    //console.log("sSource:" + sSource);
    //console.log("aoData JSON:" + JSON.stringify(aoData));
    fnCallback(dataTableArray[sSource]);
};

Editorial.JBPM.Design.selectField = function () {
    var url = $('#ctx').val() + "/pages/fdesign/form/dicIndex";
    var commonModalCss = {
        "width": "850px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.JBPM.Design.updateField = function (jsonObj, context) {
    console.log(jsonObj);
    console.log(jsonObj.code);
    console.log(jsonObj.display);
    console.log(context);
    //alert(":" + window.frames["iframe_main"].document);
    //alert(":" + window.frames["iframe_main"].document.body.innerHTML);
    //alert(":" + $(context).html());
    //alert("taskName:" + $(context).contents().find("#taskName").val());
    $(context).contents().find("#taskField").val(jsonObj.code);
    console.log("jsonObj.dicMap:" + JSON.stringify(jsonObj.dicMap));
    $(context).contents().find("#taskFieldHidden").val(JSON.stringify(jsonObj.dicMap));
    $(context).contents().find("#taskDisplayFieldHidden").val(jsonObj.display);
};

Editorial.JBPM.Design.clearForm = function () {
    $("#taskName").val("");
    $("#taskUrl").val("");
    $("#taskAssigneeFlag").val("");
    $("#taskAssignee").val("");
    $("#taskStartFlag").val("");
    //$("#taskEndFlag").val("");
    $("#taskField").val("");
    $("#taskFieldHidden").val("");
    $("#taskDisplayFieldHidden").val("");
};

Editorial.JBPM.Design.addObj = function () {

    var index;
    if (dataTableArray.length != 0) {
        index = dataTableArray.length;
    } else {
        index = 0;
    }
    console.log("index:" + index);

    // 将新添加的Node信息加入dataTableArray中
    var temp = {
        "aaData": [],
        "iTotalDisplayRecords": 0,
        "iTotalRecords": 0
    };

    // 将表单的数据加入到Node中
    var taskData = {
        name: $("#taskName").val(),
        url: $("#taskUrl").val(),
        taskAssigneeFlag: $("#taskAssigneeFlag").val(),
        assignee: $("#taskAssignee").val(),
        startFlag: $("#taskStartFlag").val(),
        //endFlag : $("#taskEndFlag").val(),
        field: $("#taskField").val(),
        display: $("#taskDisplayFieldHidden").val()
    };

    // 将新添加的Task加入到taskMap中
    taskMap.put($("#taskName").val(), taskData);

    var taskFieldHidden = $("#taskFieldHidden").val();
    var taskDisplayFieldHidden = $("#taskDisplayFieldHidden").val();
    console.log("taskFieldHidden:" + taskFieldHidden);
    console.log("taskDisplayFieldHidden:" + taskDisplayFieldHidden);

    // 下拉框
    if ("select" == taskDisplayFieldHidden) {
        var nextObj = JSON.parse(taskFieldHidden);
        for (transition in nextObj) {
            console.log("transition:" + transition);
            console.log("nextObj.transition:" + nextObj[transition]);
            var nextTaskData = {
                id: transition,
                nextTransitionName: nextObj[transition]
            };
            temp.aaData.push(nextTaskData);
        }
        dataTableArray.push(temp);
    }

    // 文本框
    if ("text" == taskDisplayFieldHidden) {
        var nextTaskData = {
            id: "otherwise",
            conditionSymbol: "otherwise",
            conditionValue: "otherwise",
            nextTransitionName: ""
        };
        temp.aaData.push(nextTaskData);
        dataTableArray.push(temp);
    }

    // 创建DataTable Html代码
    var html = Editorial.JBPM.Design.createDataTableHtml(index, taskData);
    dataTableHtmlArray.push(html);

    console.log("dataTableArray:" + JSON.stringify(dataTableArray));
    //console.log("tableArray:" + JSON.stringify(tableArray));

    $("#content").empty();
    // 重新刷新content中的html代码
    for (var i = 0; i < dataTableHtmlArray.length; i++) {
        var html = dataTableHtmlArray[i];
        var display = "";
        var textValue = 'id="taskDisplayFieldHidden_' + i + '" value="text"';
        var selectValue = 'id="taskDisplayFieldHidden_' + i + '" value="select"';
        if (html.indexOf(textValue) > 0) {
            display = "text";
        }
        if (html.indexOf(selectValue) > 0) {
            display = "select";
        }
        $("#content").append(dataTableHtmlArray[i]);
        // 循环渲染所有DataTable的JS代码
        Editorial.JBPM.Design.createDataTable(i, display);
    }


    Editorial.JBPM.Design.clearForm();

    //tableArray[index-1].fnStandingRedraw();
    //refreshFrameDataTableInFrame("tableArray[index-1]");
};

Editorial.JBPM.Design.deploy = function () {

    var jbpmTaskList = new Array();
    for (var i = 0; i < taskMap.keys().length; i++) {
        console.log("taskMap.keys()[i]:" + taskMap.keys()[i]);
        console.log("taskMap.get(key):" + taskMap.get(taskMap.keys()[i]));
        var jbpmTask = taskMap.get(taskMap.keys()[i]);

        var nextTransitionIdArray = [];
        var nextTransitionNameArray = [];

        var conditionSymbolSelectArray = [];
        var conditionValueTextArray = [];
        var conditionExprArray = [];

        // 后置任务
        var nextTaskSelect = $('select[id^="nextTask_select"]', tableArray[i].fnGetNodes()).serialize();
        console.log("nextTaskSelect:" + nextTaskSelect);
        nextTaskSelect = nextTaskSelect.replace(new RegExp('nextTask_select=', 'g'), '');
        var nextTaskArray = decodeURIComponent(nextTaskSelect, true).split('&');
        console.log("nextTaskArray:" + nextTaskArray);

        if ("select" == jbpmTask.display) {
            var transitionIdHidden = $('input[id^="transitionId_hidden"]', tableArray[i].fnGetNodes()).serialize();
            var transitionNameHidden = $('input[id^="transitionName_hidden"]', tableArray[i].fnGetNodes()).serialize();
            console.log("transitionIdHidden:" + transitionIdHidden);
            console.log("transitionNameHidden:" + transitionNameHidden);
            transitionIdHidden = transitionIdHidden.replace(new RegExp('transitionId_hidden=', 'g'), '');
            nextTransitionIdArray = transitionIdHidden.split('&');
            transitionNameHidden = transitionNameHidden.replace(new RegExp('transitionName_hidden=', 'g'), '');
            nextTransitionNameArray = decodeURIComponent(transitionNameHidden, true).split('&');
            console.log("nextTransitionIdArray:" + nextTransitionIdArray);
            console.log("nextTransitionNameArray:" + nextTransitionNameArray);
        }
        if ("text" == jbpmTask.display) {
            var conditionSymbolSelect = $('select[id^="conditionSymbol_select"]', tableArray[i].fnGetNodes()).serialize();
            var conditionValueText = $('input[id^="conditionValue_text"]', tableArray[i].fnGetNodes()).serialize();
            console.log("conditionSymbolSelect:" + conditionSymbolSelect);
            console.log("conditionValueText:" + conditionValueText);
            conditionSymbolSelect = conditionSymbolSelect.replace(new RegExp('conditionSymbol_select=', 'g'), '');
            conditionSymbolSelectArray = conditionSymbolSelect.split('&');
            conditionValueText = conditionValueText.replace(new RegExp('conditionValue_text=', 'g'), '');
            conditionValueTextArray = decodeURIComponent(conditionValueText, true).split('&');
            console.log("conditionSymbolSelectArray:" + conditionSymbolSelectArray);
            console.log("conditionValueTextArray:" + conditionValueTextArray);

            var count = 0;
            conditionSymbolSelectArray.forEach(function (conditionSymbol, index) {
                var conditionOper = "";
                console.log("conditionSymbol:" + conditionSymbol);
                if ("otherwise" == conditionSymbol) {
                    conditionOper = 'otherwise';
                }
                if ("1" == conditionSymbol) {
                    conditionOper = 'variable = ' + conditionValueTextArray[index + count];
                }
                if ("2" == conditionSymbol) {
                    conditionOper = 'variable != ' + conditionValueTextArray[index + count];
                }
                if ("3" == conditionSymbol) {
                    conditionOper = 'variable < ' + conditionValueTextArray[index + count];
                }
                if ("4" == conditionSymbol) {
                    conditionOper = 'variable > ' + conditionValueTextArray[index + count];
                }
                if ("5" == conditionSymbol) {
                    conditionOper = 'variable <= ' + conditionValueTextArray[index + count];
                }
                if ("6" == conditionSymbol) {
                    conditionOper = 'variable >= ' + conditionValueTextArray[index + count];
                }
                if ("7" == conditionSymbol) {
                    conditionOper = conditionValueTextArray[index + count] + ' < variable < ' + conditionValueTextArray[index + count + 1];
                    count = count + 1;
                }
                if ("8" == conditionSymbol) {
                    conditionOper = conditionValueTextArray[index + count] + ' <= variable < ' + conditionValueTextArray[index + count + 1];
                    count = count + 1;
                }
                if ("9" == conditionSymbol) {
                    conditionOper = conditionValueTextArray[index + count] + ' < variable <= ' + conditionValueTextArray[index + count + 1];
                    count = count + 1;
                }
                if ("10" == conditionSymbol) {
                    conditionOper = conditionValueTextArray[index + count] + ' <= variable <= ' + conditionValueTextArray[index + count + 1];
                    count = count + 1;
                }
                conditionExprArray.push(conditionOper);
            });
        }
        console.log("conditionExprArray:" + conditionExprArray);

        jbpmTask.transitionList = new Array();
        for (var j = 0; j < nextTaskArray.length; j++) {
            var transition = null;
            if ("select" == jbpmTask.display) {
                transition = {
                    id: nextTransitionIdArray[j],
                    name: nextTransitionNameArray[j],
                    expr: "",
                    nextTaskName: nextTaskArray[j]
                };
            }
            if ("text" == jbpmTask.display) {
                transition = {
                    id: nextTransitionIdArray[j],
                    name: "",
                    expr: conditionExprArray[j],
                    nextTaskName: nextTaskArray[j]
                };
            }
            console.log("transition:" + JSON.stringify(transition));
            jbpmTask.transitionList.push(transition);
        }
        console.log("jbpmTask:" + JSON.stringify(jbpmTask));
        jbpmTaskList.push(jbpmTask);
    }
    console.log(JSON.stringify({
        "taskList": jbpmTaskList
    }));

    $.ajax({
        "dataType": 'json',
        "contentType": "application/json",
        "type": "POST",
        "url": $('#ctx').val() + "/pages/fdesign/form/deploy",
        "cache": false,
        "data": JSON.stringify({
            "taskList": jbpmTaskList,
            "productType": $('#productType').val()
        }),
        "success": function (response) {
            if (response.isSuccess == "true") {
                openSuccessAlertModalInFrame(response.msg);
                //var url = $('#ctx').val() + "/pages/saleInvoiceRequest/form/showSaleInvoiceRequestIndex";
                //window.location.href = url;
            } else {
                openErrorAlertModalInFrame(response.msg);
            }
        },
        "error": function (response) {
            alert("error");
            alert(response);
            alert(response.responseText);
        }
    });
};

Editorial.JBPM.Design.selectTaskAssigneeFlag = function (value) {
    if (value != "") {
        if (value == "1") {
            $("#taskAssignee").removeAttr('disabled');
        } else {
            $("#taskAssignee").val("");
            $("#taskAssignee").attr('disabled', "true");
        }
    }
};