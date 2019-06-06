

BMEP.Product.ProductInfo.Upload = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
	this.oTable2 = null;
};
BMEP.Product.ProductInfo.Upload.upload = function(id) {
	var url = $('#ctx').val() + "/pages/product/form/upload";
	var commonModalCss = {
		"width" : "900px",
		"margin" : "0 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};



BMEP.Product.ProductInfo.Upload.retrieveData = function(sSource, aoData, fnCallback) {
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
			alert("error");
		}
	});
};

$(function() {
	BMEP.Product.ProductInfo.Upload.oTable1 = $('#table_report1').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/product/form/manager", // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			
		},
		"fnServerData" : BMEP.Product.ProductInfo.Upload.retrieveData,
		"fnDrawCallback" : function(oSettings) {
			for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [ {
			"sTitle" : "序号",
			"mDataProp" : "id"
		}, {
			"sTitle" : "ISBN",
			"mDataProp" : "isbn"
		}, {
			"sTitle" : "译名",
			"mDataProp" : "translation"
		}, {
			"sTitle" : "题名",
			"mDataProp" : "title"
		}, {
			"sTitle" : "副标题",
			"mDataProp" : "subTitle"
		}, {

			"sTitle" : "出版年",
			"mDataProp" : "pubYear"
		}, {
			"sTitle" : "所属分社",
			"mDataProp" : "pubName"
		}, {
			"sTitle" : "价格",
			"mDataProp" : "price"
		}, {
			"sTitle" : "页数",
			"mDataProp" : "pageNum"
		}, {
			"sTitle" : "版别",
			"mDataProp" : "edition"
		}, {

			"sTitle" : "装帧",
			"mDataProp" : "binding"
		}, {

			"sTitle" : "语种",
			"mDataProp" : "language"
		}, {

			"sTitle" : "备注",
			"mDataProp" : "remark"
		}, {

			"sTitle" : "关键字",
			"mDataProp" : "keyword"
		}
		],

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
	
	BMEP.Product.ProductInfo.Upload.oTable2 = $('#table_report2').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/product/form/manager", // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			
		},
		"fnServerData" : BMEP.Product.ProductInfo.Upload.retrieveData,
		"fnDrawCallback" : function(oSettings) {
			for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [ {
			"sTitle" : "序号",
			"mDataProp" : "id"
		}, {
			"sTitle" : "ISBN",
			"mDataProp" : "isbn"
		}, {
			"sTitle" : "译名",
			"mDataProp" : "translation"
		}, {
			"sTitle" : "题名",
			"mDataProp" : "title"
		}, {
			"sTitle" : "副标题",
			"mDataProp" : "subTitle"
		}, {

			"sTitle" : "出版年",
			"mDataProp" : "pubYear"
		}, {
			"sTitle" : "所属分社",
			"mDataProp" : "pubName"
		}, {
			"sTitle" : "价格",
			"mDataProp" : "price"
		}, {
			"sTitle" : "页数",
			"mDataProp" : "pageNum"
		}, {
			"sTitle" : "版别",
			"mDataProp" : "edition"
		}, {

			"sTitle" : "装帧",
			"mDataProp" : "binding"
		}, {

			"sTitle" : "语种",
			"mDataProp" : "language"
		}, {

			"sTitle" : "备注",
			"mDataProp" : "remark"
		}, {

			"sTitle" : "关键字",
			"mDataProp" : "keyword"
		}
		],

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