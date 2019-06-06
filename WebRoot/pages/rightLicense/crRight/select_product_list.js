Editorial.CrProduct.productDataTable = null;

Editorial.CrProduct.productQuery = function() {
	refreshFrameDataTableInFrame("Editorial.CrProduct.productDataTable");
};

Editorial.CrProduct.productOnload = function() {
	Editorial.CrProduct.productDataTable = $("#productDataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crProduct/form/productManager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
		
			aoData.push({
				"name" : "product.isbn",
				"value" : $("#product_isbn").val()
			});
		
			aoData.push({
				"name" : "product.title",
				"value" : $("#product_title").val()
			});
			
		},
		"fnServerData" : function(sSource, aoData, fnCallback) {
			$.ajax({
				"dataType" : "json",
				"type" : "POST",
				"url" : sSource,
				"cache" : false,
				"data" : aoData,
				"success" : function(response) {
					fnCallback(response);
				},
				"error" : function(response) {
					alert("error");
				}
			});
		},
		"fnDrawCallback" : function(oSettings) {
			for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$("td:eq(0)", oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [{
			"sTitle" : "序号",
			"mDataProp" : "id",
			"bSortable" : false
		}, {
			"sTitle" : "选择",
			"mData" : null,
			"bSortable" : false,
			"fnRender" : function(oObj) {
				return "<label><input type='radio' name='checkedProduct' value='"+ oObj.aData.id +"' title='"+ oObj.aData.title +"' style='display: none;' /><span class='lbl'></span></label>";
			}
		}, {
			"sTitle" : "产品编号",
			"mDataProp" : "isbn",
			"bSortable" : false
		}, {
			"sTitle" : "产品标题",
			"mDataProp" : "title",
			"bSortable" : false
		}, {
			"sTitle" : "所属单位",
			"mDataProp" : "pubName",
			"bSortable" : false
		}, {
			"sTitle" : "类型",
			"mDataProp" : "productType.name",
			"bSortable" : false
		}, {
			"sTitle" : "语种",
			"mDataProp" : "language",
			"bSortable" : false
		}],
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
	$("[data-rel=tooltip]").tooltip();
};

Editorial.CrProduct.productSelectSubmit = function() {
	var selected = $("input[name=checkedProduct]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择产品！");
	} else {
		$("#cr_product_id").val(selected.val());
		$("#cr_product_title").val(selected.attr("title"));
		autoCloseCommonModal(1);
	}
};

$(function() {
	Editorial.CrProduct.productOnload();
});