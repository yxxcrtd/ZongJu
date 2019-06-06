$(function () {
    if ($('#flag').val() == "approve") {
        $('#saveBtn').hide();
    }
    Editorial.JBPM.task.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/fexecutor/form/findAllActivityByProcessInstance?id=" + $('#id').val(), // mvc后台ajax调用接口。
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
                "sTitle": "序号",
                "mDataProp": "id"
            },
            {
                "sTitle": "节点名称",
                "mDataProp": "activityName"
            },
            {
                "mData": null,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (oObj) {
                    var sReturn = "";
                    sReturn = '<label><input type="checkbox" name="ids" value="' + oObj.aData.id + '" /><span class="lbl"></span></label>';
                    //sReturn = '<label><input type="checkbox" name="ids" value="' + oObj.aData.account.id + '" /><span class="lbl"></span></label>';
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var flag1 = '<button class="btn btn-mini btn-warning" data-toggle="tooltip" data-placement="bottom" title="分配" onclick="Editorial.JBPM.task.edit(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var end = '</div>';
                    if ($('#flag').val() == "approve") {
                        return start + flag1 + end;
                    } else {
                        return sReturn;
                    }


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
    var url = $('#ctx').val() + "/pages/fapprove/form/index?id=" + id;
    var commonModalCss = {
        "width": "840px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

}

Editorial.JBPM.task.person = function (id) {
    var url = $('#ctx').val() + "/pages/flow/form/person?id=" + id;
    var commonModalCss = {
        "width": "840px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

}

Editorial.JBPM.task.activitySubmit = function () {

    var sData = $('input', Editorial.JBPM.task.oTable1.fnGetNodes()).serialize();
    if (sData == null || sData == "") {
        openErrorAlertModalInFrame("请至少选择一条客户记录！");
        return false;
    }
    sData = sData.replace(new RegExp('&ids=', 'g'), ',');

    var url = $('#ctx').val() + '/pages/fexecutor/form/activitySubmit?id=' + $("#id").val() + '&' + sData + "&personId=" + $("#personId").val();
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            if (response.isSuccess == "true") {
                ajaxAlertSuccessMsg(response.msg, true);
            } else {
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};