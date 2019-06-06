$(function () {
    Editorial.JBPM.task.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/BPM/form/taskWriteManager", // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({
                "name": "shortName",
                "value": $("#query_module_shortName").val()
            });
        },
        // "fnServerData" : Editorial.JBPM.task.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "sTitle": "流程id",
                "mDataProp": "id"
            },
            {
                "sTitle": "流程名称",
                "mDataProp": "name"
            },
            {
                "sTitle": "版本号",
                "mDataProp": "version"
            },
            {
                "sTitle": "操作",
                "mData": null,
                "aTargets": [ -1 ],
                // 自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    // var person = '<button class="btn btn-mini btn-warning"
                    // data-toggle="tooltip" data-placement="bottom" title="删除流程"
                    // onclick="Editorial.JBPM.task.delete(\'' + oObj.aData.id +
                    // '\')"><i class="icon-user bigger-120"></i></button>';
                    var flag1 = '<button class="btn btn-mini btn-info" data-toggle="tooltip" data-placement="bottom" title="分配流程" onclick="Editorial.JBPM.task.edit(\'' + oObj.aData.id + '\')"><i class="icon-th-list bigger-120"></i></button>';
                    var end = '</div>';
                    return start + flag1 + end;
                }
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

Editorial.JBPM.task.edit = function (id) {

    var url = $('#ctx').val() + "/pages/BPMExecutor/form/activity?id=" + id + "&personId=" + $('#id').val() + "&flag=" + $('#flag').val();
    var commonModalCss = {
        "width": "900px",
        "margin": "100px 0 0 -450px"
    };
    var commonModalBodyCss = {
        "max-height": "600px"
    };
    if ($('#flag').val() == "approve") {
        window.location.href = url;
    } else {
        openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
    }

};