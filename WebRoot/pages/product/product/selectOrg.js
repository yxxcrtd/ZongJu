var orgArray = new Array();
Editorial.Product.ProductInfo.retrieveData = function(sSource, aoData, fnCallback) {
    $.ajax({
        "dataType" : 'json',
        "type" : "POST",
        "url" : sSource,
        "cache" : false,
        "data" : aoData,
        "success" : function(response) {
            fnCallback(response);
        },
        "error" : function(response) {
            alert(response);
            alert("error%%%");
        }
    });
};
Editorial.Product.ProductInfo.cloaseLayerAndGoOn = function(){
    if(orgArray.length>0){
        autoCloseCommonModal(1);
        updateFormInFrame('Editorial.Product.ProductInfo.updateAssigneeHidden', JSON.stringify(orgArray));

    } else {
        ajaxAlertErrorMsg("请选择任务执行者！", true);

    }


//	updateFormInLayer('Editorial.Product.ProductInfo.updateAssignee', id);

};

Editorial.Product.ProductInfo.selectOrg = function (assignee) {
    var url = $('#ctx').val() + "/pages/fassignee/form/index?assignee="+assignee;
    var commonModalCss = {
        "width": "900px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.ProductInfo.updateAssignee = function (jsonObj, context) {
    orgArray.push(JSON.parse(jsonObj));
}

$(function() {
    $(".on").click(function(){
        $(".on-down").slideToggle();
    });

    Editorial.Product.ProductInfo.oTable1 = $('#table_report').dataTable({
        "bPaginate": false,
        "bFilter" : false, // 开关，是否启用客户端过滤器
        "bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth" : false, // 自适应宽度
        "sPaginationType" : "full_numbers", // 分页样式
        "bServerSide" : true, // 从服务器端取数据
        "sAjaxSource" : $('#ctx').val() + "/pages/pflow/form/findNextTask?id=" + $('#id').val(), // mvc后台ajax调用接口。
        "fnServerParams" : function(aoData) {

        },
        "fnServerData" : Editorial.Product.ProductInfo.retrieveData,
        "fnDrawCallback" : function(oSettings) {
            for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns" : [ {
            "sTitle" : "序号",
            "mDataProp" : "id"
        }, {
            "sTitle" : "任务名称",
            "mDataProp" : "activityName"
        },{
            "sTitle" : "操作",
            "mData" : null,
            "aTargets" : [ -1 ],
            // 自定义列的样式
            "fnRender" : function(oObj) {
                var start = '<div class="hidden-phone visible-desktop btn-group">';
                var edit = '<button class="btn btn-mini btn-warning" title="选择岗位" onclick="Editorial.Product.ProductInfo.selectOrg(\'' + oObj.aData.assigneeCode + '\')"><i class="icon-edit bigger-120"></i></button>';
                var end = '</div>';
                return start + edit  + end;
            }
        } ],

        // 多语言配置
        "oLanguage" : {
            "sProcessing" : "正在加载中......",
            "sLengthMenu" : "每页显示 _MENU_ 条记录",
            "sZeroRecords" : "对不起，查询不到相关数据！",
            "sEmptyTable" : "表中无数据存在！",
            "sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
            "sSearch" : "搜索",
            "oPaginate" : {
                "sFirst" : "首页",
                "sPrevious" : "上一页",
                "sNext" : "下一页",
                "sLast" : "末页"
            }
        }
    });
    $('[data-rel=tooltip]').tooltip();
});