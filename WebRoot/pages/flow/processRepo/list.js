/**
 * Created by huangchenxi on 14-5-27.
 */
Editorial.Flow.processRepo.list = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Flow.processRepo.list.addObj = function () {
    var url = $('#ctx').val() + "/pages/fprocess/form/index";
    var commonModalCss = {
        "width": "1000px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

};
Editorial.Flow.processRepo.list.saveObj = function () {
    ajaxAlertSuccessMsg("成功", true);
    autoCloseCommonModal(5);
    var id = $("input[name='ids']:checked").val();
    updateFormInLayer('Editorial.Flow.processDesign.addProcessDiv', id);
};
Editorial.Flow.processRepo.list.retrieveData = function (sSource, aoData, fnCallback) {
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
            alert(response);
            alert("error%%%");
        }
    });
};

$(function () {
    $(".on").click(function () {
        $(".on-down").slideToggle();
    });
    if ($("#flag").val() == "product") {
        $("#appTitle").hide();
        $("#appAddButton").hide();

    } else if ($("#flag").val() == "app") {
        $("#productTitle").hide();
        $("#productAddButton").hide();
    }
    ;
    Editorial.Flow.processRepo.list.oTable1 = $('#process_table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/fprocess/form/manager", // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({
                "name": "queryIsbn",
                "value": $("#query_module_isbn").val()
            });
            aoData.push({
                "name": "title",
                "value": $("#query_module_title").val()
            });
        },
        "fnServerData": Editorial.Flow.processRepo.list.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(1)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "mData": null,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (oObj) {
                    console.log(oObj.aData);
                    console.log(oObj.aData.id);
                    var sReturn = "";
                    sReturn = '<label><input type="radio" name="ids" value="' + oObj.aData.id + '" /><span class="lbl"></span></label>';
                    return sReturn;


                }
            },
            {
                "sTitle": "序号",
                "mDataProp": "id"
            },
            {
                "sTitle": "任务名称",
                "mDataProp": "name"
            },
            {
                "sTitle": "创建时间",
                "mDataProp": "createOn",
                "sType" : 'date',
                "fnRender" : function(oObj) {
                    var javascriptDate = new Date(oObj.aData.createOn).toLocaleDateString();
                    return "<div class= date>" + javascriptDate + "<div>";
                }
            },
            {
                "sTitle": "所属类别",
                "mDataProp": "type"
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