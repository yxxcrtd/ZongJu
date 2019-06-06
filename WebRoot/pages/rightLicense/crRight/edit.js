Editorial.CrRight = function() {

};

Editorial.CrRight.authorizedAreaDataTable = null; // 授权地域DataTable
Editorial.CrRight.authorizationLanguageDataTable = null; // 授权语种DataTable
Editorial.CrRight.signedProductsDataTable = null; // 签约产品DataTable
Editorial.CrRight.signingContributorDataTable = null; // 签约贡献者DataTable
Editorial.CrRight.subsidiaryRightsDataTable = null; // 附属版权DataTable

Editorial.CrRight.validate_flag = true;

Editorial.CrRight.validate = function() {
	Editorial.CrRight.validate_flag = true;
	
	// 授权类型
	Editorial.CrRight.validate_paymentTrem();
	Editorial.CrRight.validate_licenseType();
	Editorial.CrRight.validate_rcexclusive();
	Editorial.CrRight.validate_rlicenseName();
	Editorial.CrRight.validate_rlperiod();
	Editorial.CrRight.validate_status();
	
	Editorial.CrRight.validate_rlicenseStarton();
	Editorial.CrRight.validate_rlicenseEndon();
	Editorial.CrRight.validate_start();
	
	return Editorial.CrRight.validate_flag;
};

Editorial.CrRight.validate_licenseType = function() {
	var _id = "#licenseType_id";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权类型不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_paymentTrem = function() {
	var _id = "#crRight_paymentTrem";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "付款条款不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_rcexclusive = function() {
	var _id = "#crRight_rcexclusive";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "权利是否独享不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_rlicenseName = function() {
	var _id = "#crRight_rlicenseName";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "权利授权名称不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_rlperiod = function() {
	var _id = "#crRight_rlperiod";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "结算公告周期不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_status = function() {
	var _id = "#crRight_status";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "权利合同状态不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_rlicenseStarton = function() {
	var _id = "#crRight_rlicenseStarton";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权开始时间不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_rlicenseEndon = function() {
	var _id = "#crRight_rlicenseEndon";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权结束时间不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.validate_start = function() {
	var _id = "#crRight_start";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权开始方式不能为空！", _id);
		Editorial.CrRight.validate_flag = false;
	}
};

Editorial.CrRight.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrRight.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

/**
 * 初始化授权地域表格
 */
Editorial.CrRight.initAuthorizedAreaDataTable = function() {
	if(Editorial.CrRight.authorizedAreaDataTable == null) {
		Editorial.CrRight.authorizedAreaDataTable = $("#authorizedAreaDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crcRelationship/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "right.rlicenseId",
					"value" : $("#crRight_rlicenseId").val()
				});
				
				aoData.push({
					"name" : "country.enName",
					"value" : $("#country_enName").val()
				});
				
				aoData.push({
					"name" : "country.cnName",
					"value" : $("#country_cnName").val()
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
				"sTitle" : "<label><input type='checkbox' onclick='Editorial.CrRight.selectAllCountry(this)' style='display: none;' /><span class='lbl'></span></label>",
				"mData" : null,
				"bSortable" : false,
				"fnRender" : function(oObj) {
					return "<label><input type='checkbox' name='crccList["+ oObj.iDataRow +"].id' value='"+ oObj.aData.id +"' style='display: none;' /><span class='lbl'></span></label>";
				}
			}, {
				"sTitle" : "编码",
				"mDataProp" : "country.enName",
				"bSortable" : false
			}, {
				"sTitle" : "名称",
				"mDataProp" : "country.cnName",
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
	} else {
		refreshFrameDataTableInFrame("Editorial.CrRight.authorizedAreaDataTable");
	}
};

Editorial.CrRight.selectAllCountry = function(obj) {
	$("input[name^=crccList][name$=id]").attr("checked", obj.checked);
};

Editorial.CrRight.removeCountry = function() {
	var selected = $("input[name^=crccList][name$=id]:checked");
	if (selected.length == 0) {
		openErrorAlertModalInFrame("请选择授权地域！");
	} else {
		openConfirmModalInFrame("确认删除授权地域信息吗？", function() {
			var postData = {};
			for (var i = 0; i < selected.length; i++) {
				postData["crccList["+ i +"].id"] = selected[i].value;
			}
			$.ajax({
				"dataType" : "json",
				"type" : "POST",
				"url" : $("#ctx").val() + "/pages/rightLicense/crcRelationship/form/delete",
				"cache" : false,
				"data" : postData,
				"success" : function(response) {
					if (response.isSuccess == "true") {
						refreshFrameDataTableInFrame("Editorial.CrRight.authorizedAreaDataTable");
						openSuccessAlertModalInFrame(response.msg);
					} else {
						openErrorAlertModalInFrame(response.msg);
					}
				}
			});
		}, null, null);
	}
};

Editorial.CrRight.queryCountry = function() {
	refreshFrameDataTableInFrame("Editorial.CrRight.authorizedAreaDataTable");
};

/**
 * 选择地域
 */Editorial.CrRight.selectCountry = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/crcRelationship/form/selectCountry";
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
 * 初始化授权语种表格
 */
Editorial.CrRight.initAuthorizationLanguageDataTable = function() {
	if(Editorial.CrRight.authorizationLanguageDataTable == null) {
		Editorial.CrRight.authorizationLanguageDataTable = $("#authorizationLanguageDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/lrcRelationship/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "right.rlicenseId",
					"value" : $("#crRight_rlicenseId").val()
				});
				
				aoData.push({
					"name" : "language.code",
					"value" : $("#language_code").val()
				});
				
				aoData.push({
					"name" : "language.name",
					"value" : $("#language_name").val()
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
				"sTitle" : "<label><input type='checkbox' onclick='Editorial.CrRight.selectAllLanguage(this)' style='display: none;' /><span class='lbl'></span></label>",
				"mData" : null,
				"bSortable" : false,
				"fnRender" : function(oObj) {
					return "<label><input type='checkbox' name='crLrcList["+ oObj.iDataRow +"].id' value='"+ oObj.aData.id +"' style='display: none;' /><span class='lbl'></span></label>";
				}
			}, {
				"sTitle" : "编码",
				"mDataProp" : "language.code",
				"bSortable" : false
			}, {
				"sTitle" : "名称",
				"mDataProp" : "language.name",
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
	} else {
		refreshFrameDataTableInFrame("Editorial.CrRight.authorizationLanguageDataTable");
	}
};

Editorial.CrRight.selectAllLanguage = function(obj) {
	$("input[name^=crLrcList][name$=id]").attr("checked", obj.checked);
};

Editorial.CrRight.removeLanguage = function() {
	var selected = $("input[name^=crLrcList][name$=id]:checked");
	if (selected.length == 0) {
		openErrorAlertModalInFrame("请选择授权语种！");
	} else {
		openConfirmModalInFrame("确认删除授权语种信息吗？", function() {
			var postData = {};
			for (var i = 0; i < selected.length; i++) {
				postData["crLrcList["+ i +"].id"] = selected[i].value;
			}
			$.ajax({
				"dataType" : "json",
				"type" : "POST",
				"url" : $("#ctx").val() + "/pages/rightLicense/lrcRelationship/form/delete",
				"cache" : false,
				"data" : postData,
				"success" : function(response) {
					if (response.isSuccess == "true") {
						refreshFrameDataTableInFrame("Editorial.CrRight.authorizationLanguageDataTable");
						openSuccessAlertModalInFrame(response.msg);
					} else {
						openErrorAlertModalInFrame(response.msg);
					}
				}
			});
		}, null, null);
	}
};

Editorial.CrRight.queryLanguage = function() {
	refreshFrameDataTableInFrame("Editorial.CrRight.authorizationLanguageDataTable");
};

/**
 * 选择语种
 */
Editorial.CrRight.selectLanguage = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/lrcRelationship/form/selectLanguage";
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
 * 初始化签约产品表格
 */
Editorial.CrRight.initSignedProductsDataTable = function() {
	if(Editorial.CrRight.signedProductsDataTable == null) {
		Editorial.CrRight.signedProductsDataTable = $("#signedProductsDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crProduct/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "right.rlicenseId",
					"value" : $("#crRight_rlicenseId").val()
				});
				
				aoData.push({
					"name" : "product.code",
					"value" : $("#crProduct_code").val()
				});
				
				aoData.push({
					"name" : "product.title",
					"value" : $("#crProduct_title").val()
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
				"mDataProp" : "rlpId",
				"bSortable" : false
			}, {
				"sTitle" : "产品编号",
				"mDataProp" : "product.isbn",
				"bSortable" : false
			}, {
				"sTitle" : "产品标题",
				"mDataProp" : "product.title",
				"bSortable" : false
			}, {
				"sTitle" : "逾期销售",
				"mDataProp" : "sellOutPeriod",
				"bSortable" : false
			}, {
				"sTitle" : "逾期退货",
				"mDataProp" : "returnMonth",
				"bSortable" : false
			}, {
				"sTitle" : "过期时间",
				"mDataProp" : "expiredDate",
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
					
					var editBtn = "<button class='btn btn-mini btn-warning' title='修改' type='button' onclick=\"Editorial.CrRight.editSignedProduct('"+ oObj.aData.rlpId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' type='button' onclick=\"Editorial.CrRight.Productremove('"+ oObj.aData.rlpId +"')\">";
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
		refreshFrameDataTableInFrame("Editorial.CrRight.signedProductsDataTable");
	}
};

/**
 * 新建签约产品
 */
Editorial.CrRight.editSignedProduct = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crProduct/form/edit";
	if (id != undefined) {
		url += "?crProduct.rlpId=" + id;
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

Editorial.CrRight.Productremove = function(id) {
	openConfirmModalInFrame("您确定执行删除该产品信息操作吗？", function() {
		var url = $('#ctx').val() + "/pages/rightLicense/crProduct/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.CrRight.signedProductsDataTable');
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	}, null, null);
};

/**
 * 初始化签约贡献者表格
 */
Editorial.CrRight.initSigningContributorDataTable = function() {
	if(Editorial.CrRight.signingContributorDataTable == null) {
		Editorial.CrRight.signingContributorDataTable = $("#signingContributorDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crOwner/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					name : "right.rlicenseId",
					value: $("#crRight_rlicenseId").val()
				});
				
				aoData.push({
					"name" : "name",
					"value" : $("#owner_person_name").val()
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
				"mDataProp" : "rlownerId",
				"bSortable" : false
			}, {
				"sTitle" : "姓名",
				"mDataProp" : "personTrcr.person.name",
				"bSortable" : false
			}, {
				"sTitle" : "角色",
				"mDataProp" : "personTrcr.personType.name",
				"bSortable" : false
			}, {
				"sTitle" : "版税比率",
				"mDataProp" : "ownerPercent",
				"bSortable" : false
			}, {
				"sTitle" : "上期版税结算日",
				"mDataProp" : "lastedDate",
				"bSortable" : false
			}, {
				"sTitle" : "免费复本量",
				"mDataProp" : "owerCopy",
				"bSortable" : false
			}, {
				"sTitle" : "购买折扣",
				"mDataProp" : "owerDiscount",
				"bSortable" : false
			}, {
				"sTitle" : "付款条款",
				"mDataProp" : "paymentTrem",
				"bSortable" : false
			}, {
				"sTitle" : "操作",
				"mData" : null,
				"bSortable" : false,
				"aTargets" : [-1],
				"fnRender" : function(oObj) {
					var start = "<div class='hidden-phone visible-desktop btn-group'>";
					
					var editBtn = "<button class='btn btn-mini btn-warning' type='button' title='修改' onclick=\"Editorial.CrRight.editSigningContributor('"+ oObj.aData.rlownerId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' type='button' title='删除' onclick=\"Editorial.CrOwner.remove('"+ oObj.aData.rlownerId +"')\">";
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
		refreshFrameDataTableInFrame("Editorial.CrRight.signingContributorDataTable");
	}
};

/**
 * 新建签约贡献者
 */
Editorial.CrRight.editSigningContributor = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwner/form/edit";
	url += "?right.rlicenseId=" + $("#crRight_rlicenseId").val();
	if (id != undefined) {
		url += "&crOwner.rlownerId=" + id;
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
 * 初始化附属版权表格
 */
Editorial.CrRight.initSubsidiaryRightsDataTable = function() {
	if(Editorial.CrRight.subsidiaryRightsDataTable == null) {
		Editorial.CrRight.subsidiaryRightsDataTable = $("#subsidiaryRightsDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/subsidaryRight/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					name : "right.rlicenseId",
					value : $("#crRight_rlicenseId").val()
				});
				
				aoData.push({
					"name" : "code", "value" : $("#query_subsidaryRight_code").val()
				});
				aoData.push({
					"name" : "name", "value" : $("#query_subsidaryRight_name").val()
				});
				aoData.push({
					"name" : "internationCode", "value" : $("#query_subsidaryRight_internationCode").val()
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
			"aoColumns" : [ {
				"sTitle" : "序号",
				"mDataProp" : "srlicenseId",
	    		"bSortable": false
			}, {
				"sTitle" : "附属权利产品",
	            "mData" : null,
	    		"bSortable": false,
	            // 自定义列的样式
	            "fnRender" : function(oObj) {
	                var title = "";
	                if(oObj.aData.product != null) {
	                    title = oObj.aData.product.title;
	                }
	                if(oObj.aData.personTypeRelationship != null) {
	                    title = title + '->' + oObj.aData.personTypeRelationship.person.name;
	                }
	                if(oObj.aData.structureType != null) {
	                    title = title + '->' + oObj.aData.structureType.name;
	                }
	                if(oObj.aData.structure != null) {
	                    title = title + '->' + oObj.aData.structure.name;
	                }
	                return title;
	            }
			}, {
				"sTitle" : "权利级别",
				"mDataProp" : "level",
	    		"bSortable": false
			}, {
				"sTitle" : "权利类型",
				"mDataProp" : "licenseType.licenseTypeName",
	    		"bSortable": false
			}, {
	            "sTitle" : "状态",
	            "mDataProp" : "status",
	            "bSortable": false
	        }, {
				"sTitle" : "操作",
				"mData" : null,
	    		"bSortable": false,
				"aTargets" : [ -1 ],
				// 自定义列的样式
				"fnRender" : function(oObj) {
					var start = '<div class="hidden-phone visible-desktop btn-group">';
					var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.CrRight.editSubsidiaryRights(\'' + oObj.aData.srlicenseId + '\')"><i class="icon-edit bigger-120"></i></button>';
					var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.SubsidaryRight.delObj(\'' + oObj.aData.srlicenseId + '\')"><i class="icon-trash bigger-120"></i></button>';
					var end = '</div>';
					return start + edit + trash + end;
				}
			} ],
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
		refreshFrameDataTableInFrame("Editorial.CrRight.subsidiaryRightsDataTable");
	}
};

/**
 * 新建附属版权
 */
Editorial.CrRight.editSubsidiaryRights = function(id) {
	var url = $('#ctx').val() + "/pages/rightLicense/subsidaryRight/form/edit";
	if (id != undefined) {
		url += "?eid=" + id;
	}
	var commonModalCss = {
		"width" : "1200px",
		"height" : "650px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CrRight.onload = function() {
	var options = {
		beforeSubmit : Editorial.CrRight.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				openSuccessAlertModalInFrame(response.msg);
				
				if ($("#crRight_rlicenseId").val() == "") {
					setTimeout(function() {
						var urlto = $("#ctx").val() + "/pages/rightLicense/crRight/form/edit";
						urlto += "?crRight.rlicenseId=" + response.crRight.rlicenseId;
						window.location.href = urlto;
					}, 3000);
				}
				
			} else {
				openErrorAlertModalInFrame(response.msg);
			}
			Editorial.CrRight.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crRight/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crRightForm").ajaxForm(options);
	
	$("#crRight_rlicenseStarton_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    	Editorial.CrRight.validate_rlicenseStarton();
    });
	
	$("#crRight_rlicenseEndon_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    	Editorial.CrRight.validate_rlicenseEndon();
    });
	
	$("#crRight_manuscriptDelivery_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
	$("#crRight_lastedDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
	$("#crRight_firstCloseDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
};

$(function() {
	Editorial.CrRight.onload();
});