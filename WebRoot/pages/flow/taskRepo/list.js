Editorial.Flow.taskRepo = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Flow.taskRepo.addObj = function () {
    var url = $('#ctx').val() + "/pages/ftask/form/addIndex?productType="+$('#productType').val();
    var commonModalCss = {
        "width": "900px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

}

Editorial.Flow.taskRepo.uploadObj = function () {
    var url = $('#ctx').val() + "/pages/ftask/form/upload?productType=" + $('#productType').val();
    var commonModalCss = {
        "width": "900px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
}

Editorial.Flow.taskRepo.saveObj = function () {
    ajaxAlertSuccessMsg("成功", true);
    autoCloseCommonModal(5);
//    var id = $("input[name='ids']:checked").val();

    var sData = $('input', Editorial.Flow.taskRepo.oTable1.fnGetNodes()).serialize();
    if (sData == null || sData == "") {
        openErrorAlertModalInFrame("请至少选择一条客户记录！");
        return false;
    }
    sData = sData.replace(new RegExp('&ids=', 'g'), ',');
    if($('#flag').val()=='1'){
//        alert('1');
        updateFormInLayer('Editorial.Flow.processDesign.addObj',sData);
    }else{
//        alert('2'+$('#flag').val());
        updateFormInLayer('Editorial.Flow.processRepo.addObj', sData);
    }
}
Editorial.Flow.taskRepo.retrieveData = function (sSource, aoData, fnCallback) {
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
Editorial.Flow.taskRepo.checkedAll = function(){
    if ($("#checkedAll").attr("checked")=="checked") { // 全选
        $("input[name='ids']").attr("checked", true);
    } else { // 取消全选
        $("input[name='ids']").removeAttr("checked");
    }

}
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
    Editorial.Flow.taskRepo.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/ftask/form/manager?productType="+$('#productType').val(), // mvc后台ajax调用接口。
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
        "fnServerData": Editorial.Flow.taskRepo.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(1)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "sTitle": '<label><input type="checkbox" name="checked" value="1" id="checkedAll" onclick="Editorial.Flow.taskRepo.checkedAll()"/><span class="lbl"></span></label>',
                "mData": null,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (oObj) {
                    console.log(oObj.aData);
                    console.log(oObj.aData.id);
                    var sReturn = "";
                    sReturn = '<label><input type="checkbox" name="ids" value="' + oObj.aData.id + '" /><span class="lbl"></span></label>';
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

                "sTitle": "页面",
                "mDataProp": "url"
            },
            {
                "sTitle": "执行者",
                "mDataProp": "assignee"
            },
            {

                "sTitle": "任务类别",
                "mDataProp": function(source,type){
                    if(source.taskAssigneeFlag == '1'){
                        return "普通任务"
                    } else if(source.taskAssigneeFlag == '2') {
                        return "自动判定任务"
                    } else if(source.taskAssigneeFlag == '3') {
                        return "并发任务起始"
                    } else if(source.taskAssigneeFlag == '4') {
                        return "并发任务汇总"
                    } else {
                        return ""
                    }
                }
            },
            {

                "sTitle": "判断属性",
                "mDataProp": "field"
            },
            {

                "sTitle": "显示方式",
                "mDataProp": "display"
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