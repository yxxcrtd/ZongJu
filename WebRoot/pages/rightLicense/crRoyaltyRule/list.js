Editorial.CrRoyaltyRule = function() {
	
};

Editorial.CrRoyaltyRule.dataTable = null;

Editorial.CrRoyaltyRule.edit = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crRoyaltyRule/form/edit";
	if (id != undefined) {
		url += "?crRoyaltyRule.royaltyRuleId=" + id;
	}
	var commonModalCss = {
		"width" : "800px",
		"height" : "450px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CrRoyaltyRule.remove = function(id) {
	openConfirmModalInFrame("您确定删除该版税规则库吗？", function() {
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/rightLicense/crRoyaltyRule/form/delete",
			"data" : {
				"crRoyaltyRule.royaltyRuleId" : id
			},
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame("Editorial.CrRoyaltyRule.dataTable");
				} else {
					openErrorAlertModalInFrame(response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	}, null, null);
};

Editorial.CrRoyaltyRule.query = function() {
	refreshFrameDataTableInFrame("Editorial.CrRoyaltyRule.dataTable");
};

Editorial.CrRoyaltyRule.onload = function() {
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	Editorial.CrRoyaltyRule.dataTable = $("#dataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crRoyaltyRule/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
			
			// 版税类型
			aoData.push({
				"name" : "crRoyaltyRule.royaltyType",
				"value" : $("#crRoyaltyRule_royaltyType").val()
			});
		
			// 市场
			aoData.push({
				"name" : "crRoyaltyRule.market",
				"value" : $("#crRoyaltyRule_market").val()
			});
			
			// 价格类型
			aoData.push({
				"name" : "crRoyaltyRule.priceType",
				"value" : $("#crRoyaltyRule_priceType").val()
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
			"mDataProp" : "royaltyRuleId",
			"bSortable" : false
		}, {
			"sTitle" : "规则编号",
			"mDataProp" : "royaltyRuleCode",
			"bSortable" : false
		}, {
			"sTitle" : "规则名称",
			"mDataProp" : "royaltyRuleName",
			"bSortable" : false
		}, {
			"sTitle" : "版税类型",
			"mDataProp" : "royaltyType",
			"bSortable" : false
		}, {
			"sTitle" : "市场",
			"mDataProp" : "market",
			"bSortable" : false
		}, {
			"sTitle" : "价格类型",
			"mDataProp" : "priceType",
			"bSortable" : false
		}, {
			"sTitle" : "税务信息",
			"mDataProp" : "taxDescription",
			"bSortable" : false
		}, {
			"sTitle" : "版税计算比率",
			"mDataProp" : "royaltyDiscount",
			"bSortable" : false
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"bSortable" : false,
			"aTargets" : [-1],
			"fnRender" : function(oObj) {
				var start = "<div class='hidden-phone visible-desktop btn-group'>";
				
				var editBtn = "<button class='btn btn-mini btn-warning' type='button' title='修改' onclick=\"Editorial.CrRoyaltyRule.edit('"+ oObj.aData.royaltyRuleId +"')\">";
				editBtn += "<i class='icon-edit bigger-120'></i>";
				editBtn += "</button>";
				
				var removeBtn = "<button class='btn btn-mini btn-danger' type='button' title='删除' onclick=\"Editorial.CrRoyaltyRule.remove('"+ oObj.aData.royaltyRuleId +"')\">";
				removeBtn += "<i class='icon-trash bigger-120'></i>";
				removeBtn += "</button>";
				
				var end = "</div>";
				return editBtn + " " + removeBtn;
			}
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

$(function() {
	Editorial.CrRoyaltyRule.onload();
});