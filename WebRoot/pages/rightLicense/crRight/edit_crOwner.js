Editorial.CrOwner = function() {

};

Editorial.CrOwner.royaltyCalculationRulesDataTable = null; // 版税计算规则DataTable
Editorial.CrOwner.prepaidAndExpensesDataTable = null; // 预付及费用DataTable
Editorial.CrOwner.beneficiaryDataTable = null; // 收款人DataTable

Editorial.CrOwner.validate_flag = true;

Editorial.CrOwner.validate = function() {
	Editorial.CrOwner.validate_flag = true;
    Editorial.CrOwner.validate_product();
    Editorial.CrOwner.validate_owner();
	Editorial.CrOwner.validate_ownerPercent();
	Editorial.CrOwner.validate_paymentTrem();
	Editorial.CrOwner.validate_owerCopy();
	return Editorial.CrOwner.validate_flag;
};

Editorial.CrOwner.validate_product = function() {
    var _id = "#crOwner_rlProduct_rlpId";
    var _obj = $(_id);
    _obj.val(_obj.val().trim());
    if (_obj.val()) {
        showValidateMsg(true, "可以使用", _id);
    } else {
        showValidateMsg(false, "产品不能为空！", _id);
        Editorial.CrOwner.validate_flag = false;
    }
};

Editorial.CrOwner.validate_owner = function() {
    var _id = "#crOwner_personTrcr_id";
    var _obj = $(_id);
    _obj.val(_obj.val().trim());
    if (_obj.val()) {
        showValidateMsg(true, "可以使用", _id);
    } else {
        showValidateMsg(false, "贡献者不能为空！", _id);
        Editorial.CrOwner.validate_flag = false;
    }
};

Editorial.CrOwner.validate_owerCopy = function() {
	var _id = "#crOwner_owerCopy";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "作者副本量不能为空！", _id);
		Editorial.CrOwner.validate_flag = false;
	}
};

Editorial.CrOwner.validate_paymentTrem = function() {
	var _id = "#crOwner_paymentTrem";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "付款条款不能为空！", _id);
		Editorial.CrOwner.validate_flag = false;
	}
};

Editorial.CrOwner.validate_ownerPercent = function() {
	var _id = "#crOwner_ownerPercent";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "版税分成比率不能为空！", _id);
		Editorial.CrOwner.validate_flag = false;
	}
};

Editorial.CrOwner.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrOwner.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrOwner.crProductSelectChange = function(obj) {
	$("#crOwner_personTrcr_id").empty();
	$("#crOwner_personTrcr_id").append("<option value=''>--选择--</option>");
	if (obj.value) {
		var product_id = $("option:selected", obj).attr("title");
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/productPersonRelationship/form/list",
			"cache" : false,
			"data" : {
				productId : product_id
			},
			"success" : function(response) {
				for (var i = 0; i < response.length; i++) {
					$("#crOwner_personTrcr_id").append("<option value='"+ response[i].personTypeRelationship.id +"'>"+ response[i].personTypeRelationship.person.name +"</option>");
				}
			}
		});
	}
};

/**
 * 选择代理公司
 */
Editorial.CrOwner.selectCorp = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwner/form/selectCorp";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 选择联系人
 */
Editorial.CrOwner.selectPerson = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwner/form/selectPerson";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 新建预付及费用
 */
Editorial.CrOwner.editPrepaidAndExpenses = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwnerFee/form/edit";
	if (id != undefined) {
		url += "?crOwnerFee.fixfeeId=" + id;
	}
	var commonModalCss = {
		"width" : "400px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 初始化预付及费用表格
 */
Editorial.CrOwner.initPrepaidAndExpensesDataTable = function() {
	if(Editorial.CrOwner.prepaidAndExpensesDataTable == null) {
		Editorial.CrOwner.prepaidAndExpensesDataTable = $("#prepaidAndExpensesDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crOwnerFee/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					name : "crOwner.rlownerId",
					value : $("#crOwner_rlownerId").val()
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
				"mDataProp" : "fixfeeId",
				"bSortable" : false
			}, {
				"sTitle" : "类型",
				"mDataProp" : "expenseType",
				"bSortable" : false
			}, {
				"sTitle" : "币种",
				"mDataProp" : "currency.currencyName",
				"bSortable" : false
			}, {
				"sTitle" : "费用",
				"mDataProp" : "fixfeeVal",
				"bSortable" : false
			}, {
				"sTitle" : "操作",
				"mData" : null,
				"bSortable" : false,
				"aTargets" : [-1],
				"fnRender" : function(oObj) {
					var start = "<div class='hidden-phone visible-desktop btn-group'>";
					
					var editBtn = "<button class='btn btn-mini btn-warning' title='修改' type='button' onclick=\"Editorial.CrOwner.editPrepaidAndExpenses('"+ oObj.aData.fixfeeId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' type='button' onclick=\"Editorial.CrOwnerFee.remove('"+ oObj.aData.fixfeeId +"')\">";
					removeBtn += "<i class='icon-trash bigger-120'></i>";
					removeBtn += "</button>";
					
					var end = "</div>";
					return start + editBtn + removeBtn + end;
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
	} else {
		refreshFrameDataTableInFrame("Editorial.CrOwner.prepaidAndExpensesDataTable");
	}
};



/**
 * 新建收款人
 */
Editorial.CrOwner.editBeneficiary = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwnerPayee/form/edit";
	if (id != undefined) {
		url += "?crOwnerPayee.feePayeeId=" + id;
	}
	var commonModalCss = {
		"width" : "400px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 初始化收款人表格
 */
Editorial.CrOwner.initBeneficiaryDataTable = function() {
	if(Editorial.CrOwner.beneficiaryDataTable == null) {
		Editorial.CrOwner.beneficiaryDataTable = $("#beneficiaryDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crOwnerPayee/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					name : "crOwner.rlownerId",
					value : $("#crOwner_rlownerId").val()
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
				"mDataProp" : "feePayeeId",
				"bSortable" : false
			}, {
				"sTitle" : "收款比率",
				"mDataProp" : "feePayeePercent",
				"bSortable" : false
			}, {
				"sTitle" : "币种",
				"mDataProp" : "currency.currencyName",
				"bSortable" : false
			}, {
				"sTitle" : "人名",
				"mDataProp" : "personTypeRelationship.person.name",
				"bSortable" : false
			}, {
				"sTitle" : "状态",
				"mDataProp" : "status",
				"bSortable" : false
			}, {
				"sTitle" : "操作",
				"mData" : null,
				"bSortable" : false,
				"aTargets" : [-1],
				"fnRender" : function(oObj) {
					var start = "<div class='hidden-phone visible-desktop btn-group'>";
					
					var editBtn = "<button class='btn btn-mini btn-warning' title='修改' type='button' onclick=\"Editorial.CrOwner.editBeneficiary('"+ oObj.aData.feePayeeId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' type='button' onclick=\"Editorial.CrOwnerPayee.remove('"+ oObj.aData.feePayeeId +"')\">";
					removeBtn += "<i class='icon-trash bigger-120'></i>";
					removeBtn += "</button>";
					
					var end = "</div>";
					return start + editBtn + removeBtn + end;
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
	} else {
		refreshFrameDataTableInFrame("Editorial.CrOwner.beneficiaryDataTable");
	}
};

/**
 * 新建版税计算规则
 */
Editorial.CrOwner.editRoyaltyCalculationRules = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwnerRoyalty/form/edit";
	if (id != undefined) {
		url += "?crOwnerRoyalty.rloRoyaltyId=" + id;
	}
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 初始化版税计算规则表格
 */
Editorial.CrOwner.initRoyaltyCalculationRulesDataTable = function() {
	if(Editorial.CrOwner.royaltyCalculationRulesDataTable == null) {
		Editorial.CrOwner.royaltyCalculationRulesDataTable = $("#royaltyCalculationRulesDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crOwnerRoyalty/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					name : "crOwner.rlownerId",
					value : $("#crOwner_rlownerId").val()
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
				"mDataProp" : "rloRoyaltyId",
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
				"mDataProp" : "initRate",
				"bSortable" : false
			}, {
				"sTitle" : "操作",
				"mData" : null,
				"bSortable" : false,
				"aTargets" : [-1],
				"fnRender" : function(oObj) {
					var start = "<div class='hidden-phone visible-desktop btn-group'>";
					
					var editBtn = "<button class='btn btn-mini btn-warning' title='修改' type='button' onclick=\"Editorial.CrOwner.editRoyaltyCalculationRules('"+ oObj.aData.rloRoyaltyId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' type='button' onclick=\"Editorial.CrOwnerRoyalty.remove('"+ oObj.aData.rloRoyaltyId +"')\">";
					removeBtn += "<i class='icon-trash bigger-120'></i>";
					removeBtn += "</button>";
					
					var end = "</div>";
					return start + editBtn + removeBtn + end;
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
	} else {
		refreshFrameDataTableInFrame("Editorial.CrOwner.royaltyCalculationRulesDataTable");
	}
};

Editorial.CrOwner.onload = function() {
	Editorial.CrOwner.initRoyaltyCalculationRulesDataTable();
	var options = {
		beforeSubmit : Editorial.CrOwner.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer("Editorial.CrRight.signingContributorDataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrOwner.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crOwner/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crOwnerForm").ajaxForm(options);
	
	$("#crOwner_lastedDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
};

$(function() {
	Editorial.CrOwner.onload();
});