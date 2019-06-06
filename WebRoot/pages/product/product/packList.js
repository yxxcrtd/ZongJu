Editorial.Product.ProductInfo.Parent = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Product.ProductInfo.Parent.saveAndClose = function () {
    var id = $("input[name='ids']:checked").val();
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": $('#ctx').val() + "/pages/productPackage/form/savePack?productId=" + id+"&packId="+$('#productId').val(),
        "cache": false,
        "success": function (response) {
            ajaxAlertSuccessMsg(response.msg, true);
            refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
            autoCloseCommonModal(5);
        },
        "error": function (response) {
            alert(response);
            alert("error%%%");
        }
    });
}
Editorial.Product.ProductInfo.Parent.retrieveData = function (sSource, aoData, fnCallback) {
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

    Editorial.Product.ProductInfo.Parent.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/product/form/manager?flag=product", // mvc后台ajax调用接口。
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
        "fnServerData": Editorial.Product.ProductInfo.Parent.retrieveData,
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
                    var sReturn = "";
                    sReturn = '<label><input type="radio" name="ids" value="' + oObj.aData.id + '" /><span class="lbl"></span></label>';
                    return sReturn;


                }
            }, {
                "sTitle": "序号",
                "mDataProp": "id"
            }, {
                "sTitle" : "类型",
                "mDataProp" : "productType.name"
            }, {
                "sTitle" : "书名",
                "mDataProp" : "title"
            }, {

                "sTitle" : "译名",
                "mDataProp" : "translation"
            }, {
                "sTitle" : "所属分社",
                "mDataProp" : "pubName"
            }, {

                "sTitle" : "所属责编",
                "mDataProp" : "editorName"
            }, {

                "sTitle" : "语种",
                "mDataProp" : "language"
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