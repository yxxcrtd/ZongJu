jQuery.namespace('Editorial.JBPM.ProcessDefine');

Editorial.JBPM.ProcessDefine = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.JBPM.ProcessDefine.addObj = function () {
    var url = $('#ctx').val() + "/pages/fdesign/form/index?productType=" + $('#productType').val();
    window.location.href = url;

};
Editorial.JBPM.ProcessDefine.addTask = function () {
    var url = $('#ctx').val() + "/pages/ftask/form/index?productType=" + $('#productType').val();
    var commonModalCss = {
        "width" : "1200px",
        "height" : "600px"
    };
    var commonModalBodyCss = {
        "max-height" : "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

};
Editorial.JBPM.ProcessDefine.addSubProcess = function () {
    var url = $('#ctx').val() + "/pages/fprocess/form/listIndex?productType=" + $('#productType').val();
    var commonModalCss = {
        "width" : "1000px",
        "height" : "600px"
    };
    var commonModalBodyCss = {
        "max-height" : "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

};
Editorial.JBPM.ProcessDefine.addProcess = function () {
    var url = $('#ctx').val() + "/pages/fprocessDesign/form/index?productType=" + $('#productType').val();
    var commonModalCss = {
        "width" : "1000px",
        "height" : "600px"
    };
    var commonModalBodyCss = {
        "max-height" : "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

};
Editorial.JBPM.ProcessDefine.editObj = function (id) {
    var url = $('#ctx').val() + "/pages/fprop/form/index?id=" + id + "&type=" + $('#productType').val();
    window.location.href = url;

};
Editorial.JBPM.ProcessDefine.deploy = function () {
    var url = $('#ctx').val() + "/pages/fdeploy/form/deploy?code=" + $('#productType').val();
    var commonModalCss = {
        "width" : "900px",
        "height" : "600px"
    };
    var commonModalBodyCss = {
        "max-height" : "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


Editorial.JBPM.ProcessDefine.query = function () {
    refreshFrameDataTableInFrame('Editorial.JBPM.ProcessDefine.oTable1');
};

Editorial.JBPM.ProcessDefine.retrieveData = function (sSource, aoData, fnCallback) {

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
            alert("error");
            alert(response);
            alert(response.responseText);

        }
    });
};

$(function () {

    $(".on").click(function () {
        $(".on-down").slideToggle();
    });

    Editorial.JBPM.ProcessDefine.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/fshow/form/processDefineManager?productType=" + $('#productType').val(), // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({
                "name": "name",
                "value": $("#query_module_name").val()
            });
        },
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "fnServerData": Editorial.JBPM.ProcessDefine.retrieveData,
        "aoColumns": [
            {
                "sTitle": "ID",
                "mDataProp": "id"
            },
            {
                "sTitle": "名称",
                "mDataProp": "name"
            },
            {
                "sTitle": "版本",
                "mDataProp": "version"
            },
            {
                "sTitle": "操作",
                "mData": null, "aTargets": [ -1 ],
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-success" onclick="Editorial.JBPM.ProcessDefine.editObj(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + end;
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
