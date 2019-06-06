Editorial.JBPM.task.Executor = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.JBPM.task.Executor.query = function () {
    // 重新刷新页面Table
    refreshFrameDataTableInFrame('Editorial.JBPM.task.Executor.oTable1');
};

Editorial.JBPM.task.Executor.retrieveData = function (sSource, aoData, fnCallback) {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": sSource,
        "cache": false,
        "data": aoData,
        "success": function (response) {
            fnCallback(response);
        },
        "error": function (response) {
        }
    });
};

$(function () {

    Editorial.JBPM.task.Executor.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/BPMExecutor/form/processManager?id=" + $('#id').val(), // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({
                    "name": "name",
                    "value": $("#query_module_name").val()
                }
            );
            aoData.push({
                "name": "personId",
                "value": $("#personId").val()
            });

        },
        "fnServerData": Editorial.JBPM.task.Executor.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "sTitle": "序号",
                "mDataProp": "id"
            },
            {
                "sTitle": "名称",
                "mDataProp": "activity.activityName"
            },
            {
                "sTitle": "所属流程",
                "mDataProp": "activity.pdName"
            },
            {
                "sTitle": "流程版本",
                "mDataProp": "activity.pdVersion"
            }
        ],
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

    $('[data-rel=tooltip]').tooltip();
});
/** ********提交选中信息********************* */



