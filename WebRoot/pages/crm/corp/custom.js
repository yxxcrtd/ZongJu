jQuery.namespace("Editorial.Crm.Corp.Temp");

/** 岗位 { **/
Editorial.Crm.Corp.Temp.positionEdit = function(id) {
	var param = {
		position_id: id
	};
	var url = new StringBuffer();
	url.add(ctx);
	url.add("/pages/crmPosition/form/edit");
	url.add("?position.id={position_id}", param);
	var commonModalCss = {
		"width" : "550px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url.toString(), commonModalCss, commonModalBodyCss);
};

Editorial.Crm.Corp.Temp.positionDelete = function(id) {
	openConfirmModalInFrame("您确定执行删除岗位操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPosition/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T001F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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





Editorial.Crm.Corp.Temp.crmPositionAddButtonOnClick = function() {
	var param = {
		"id": $("#relation_id").val()
	}
	var url = new StringBuffer();
	url.add(ctx);
	url.add("/pages/crmPosition/form/edit");
	url.add("?position.crmCorpTypeRelationship.id={id}", param);
	
	var commonModalCss = {
		"width" : "600px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url.toString(), commonModalCss, commonModalBodyCss);
};

Editorial.Crm.Corp.Temp.crmPositionAjaxSource = "$('#ctx').val() + '/pages/crmPosition/form/manager?id=' + $('#relation_id').val()";

Editorial.Crm.Corp.Temp.crmPositionServerParams = function(aoData) {
//	aoData.push({
//		"name" : "position.code",
//		"value" : $("#query_module_isbn").val()
//	});
//	aoData.push({
//		"name" : "position.name",
//		"value" : $("#query_module_title").val()
//	});
};

Editorial.Crm.Corp.Temp.crmPositionColumns = [
	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "岗位编号",
		"mDataProp" : "code"
	}, {
		"sTitle" : "岗位名称",
		"mDataProp" : "name"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.positionEdit(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.positionDelete(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	}
];

Editorial.Crm.Corp.Temp.crmPositionuUploadObj = function(){
	var url = $('#ctx').val() + "/pages/crmPosition/form/upload?id=" +$("#relation_id").val();
	var commonModalCss = {
		"width": "500px",
		"height" : "260px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/** 岗位 } **/















/** 联系地址 { **/
Editorial.Crm.Corp.Temp.editCrmCorpAddress = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpAddress/form/edit?address.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&address.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "500px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpAddress = function(id) {
	openConfirmModalInFrame("您确定执行删除联系地址信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpAddress/form/delete?address.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T002F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpAddressAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpAddress/form/edit?address.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "500px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpAddressAjaxSource = "$('#ctx').val() + '/pages/crmCorpAddress/form/manager?address.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpAddressServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpAddressColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "地址分类",
	"mDataProp" : "type"
}, {
	"sTitle" : "国家",
	"mDataProp" : "country"
}, {
	"sTitle" : "房间号",
	"mDataProp" : "roomNo"
}, {
	"sTitle" : "楼层",
	"mDataProp" : "floor"
}, {
	"sTitle" : "建筑名",
	"mDataProp" : "building"
}, {
	"sTitle" : "街道名",
	"mDataProp" : "street"
}, {
	"sTitle" : "区",
	"mDataProp" : "block"
}, {
	"sTitle" : "镇",
	"mDataProp" : "town"
}, {
	"sTitle" : "城市",
	"mDataProp" : "city"
}, {
	"sTitle" : "邮编",
	"mDataProp" : "post"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpAddress(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpAddress(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 联系地址 } **/


/** Email { **/
Editorial.Crm.Corp.Temp.editCrmCorpEmail = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpEmail/form/edit?email.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&email.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpEmail = function(id) {
	openConfirmModalInFrame("您确定执行删除Email信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpEmail/form/delete?email.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T003F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpEmailAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpEmail/form/edit?email.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpEmailAjaxSource = "$('#ctx').val() + '/pages/crmCorpEmail/form/manager?email.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpEmailServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpEmailColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "是否主邮箱",
	"mDataProp" : "defaultFlg"
}, {
	"sTitle" : "邮箱地址",
	"mDataProp" : "address"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpEmail(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpEmail(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** Email } **/


/** 销售机会 { **/
Editorial.Crm.Corp.Temp.editCrmCorpCase = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpCase/form/edit?corpCase.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&corpCase.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpCase = function(id) {
	openConfirmModalInFrame("您确定执行删除销售机会信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpCase/form/delete?corpCase.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T004F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpCaseAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpCase/form/edit?corpCase.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpCaseAjaxSource = "$('#ctx').val() + '/pages/crmCorpCase/form/manager?corpCase.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpCaseServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpCaseColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "销售机会类别",
	"mDataProp" : "type"
}, {
	"sTitle" : "销售机会分类",
	"mDataProp" : "classify"
}, {
	"sTitle" : "销售机会优先级",
	"mDataProp" : "level"
}, {
	"sTitle" : "销售机会状态",
	"mDataProp" : "status"
}, {
	"sTitle" : "销售机会方式",
	"mDataProp" : "mode"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpCase(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpCase(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 销售机会 } **/


/** 联系电话 { **/
Editorial.Crm.Corp.Temp.editCrmCorpPhone = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpPhone/form/edit?phone.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&phone.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpPhone = function(id) {
	openConfirmModalInFrame("您确定执行删除联系电话信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpPhone/form/delete?phone.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T005F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpPhoneAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpPhone/form/edit?phone.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpPhoneAjaxSource = "$('#ctx').val() + '/pages/crmCorpPhone/form/manager?phone.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpPhoneServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpPhoneColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "电话分类",
	"mDataProp" : "type"
}, {
	"sTitle" : "是否主要电话",
	"mDataProp" : "defaultFlg"
}, {
	"sTitle" : "国家",
	"mDataProp" : "country"
}, {
	"sTitle" : "号码",
	"mDataProp" : "no"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpPhone(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpPhone(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 联系电话 } **/



/** 验证标识 { **/
Editorial.Crm.Corp.Temp.editCrmCorpIdentity = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpIdentity/form/edit?identity.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&identity.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpIdentity = function(id) {
	openConfirmModalInFrame("您确定执行删除验证标识信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpIdentity/form/delete?identity.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T006F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpIdentityAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpIdentity/form/edit?identity.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpIdentityAjaxSource = "$('#ctx').val() + '/pages/crmCorpIdentity/form/manager?identity.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpIdentityServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpIdentityColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "标识分类",
	"mDataProp" : "type"
}, {
	"sTitle" : "是否主标识",
	"mDataProp" : "defaultFlg"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpIdentity(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpIdentity(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 验证标识 } **/




/** 网站 { **/
Editorial.Crm.Corp.Temp.editCrmCorpWebsite = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpWebsite/form/edit?website.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&website.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpWebsite = function(id) {
	openConfirmModalInFrame("您确定执行删除网站信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpWebsite/form/delete?website.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T007F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpWebsiteAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpWebsite/form/edit?website.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpWebsiteAjaxSource = "$('#ctx').val() + '/pages/crmCorpWebsite/form/manager?website.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpWebsiteServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpWebsiteColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "网站分类",
	"mDataProp" : "type"
}, {
	"sTitle" : "网站地址",
	"mDataProp" : "url"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpWebsite(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpWebsite(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 网站 } **/



/** 账户 { **/
Editorial.Crm.Corp.Temp.editCrmCorpAccount = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpAccount/form/edit?account.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&account.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpAccount = function(id) {
	openConfirmModalInFrame("您确定执行删除账户信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpAccount/form/delete?account.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T008F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpAccountAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpAccount/form/edit?account.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpAccountAjaxSource = "$('#ctx').val() + '/pages/crmCorpAccount/form/manager?account.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpAccountServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpAccountColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "账期",
	"mDataProp" : "term"
}, {
	"sTitle" : "账户类型",
	"mDataProp" : "type"
}, {
	"sTitle" : "重要程度",
	"mDataProp" : "level"
}, {
	"sTitle" : "默认币种",
	"mDataProp" : "currency"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpAccount(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpAccount(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 账户 } **/


/** 联系日志 { **/
Editorial.Crm.Corp.Temp.editCrmCorpContactLog = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpContactLog/form/edit?log.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&log.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpContactLog = function(id) {
	openConfirmModalInFrame("您确定执行删除联系日志信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpContactLog/form/delete?log.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T009F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpContactLogAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpContactLog/form/edit?log.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpContactLogAjaxSource = "$('#ctx').val() + '/pages/crmCorpContactLog/form/manager?log.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpContactLogServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpContactLogColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "联系日志名称",
	"mDataProp" : "name"
}, {
	"sTitle" : "联系日志描述",
	"mDataProp" : "desc"
}, {
	"sTitle" : "联系日志日期",
	"mDataProp" : "dateStr"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpContactLog(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpContactLog(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 联系日志 } **/


/** 投诉 { **/
Editorial.Crm.Corp.Temp.editCrmCorpComplain = function(id) {
	var url = $("#ctx").val() + "/pages/crmCorpComplain/form/edit?complain.crmCorpTypeRelationship.id=" + $("#relation_id").val() + "&complain.id=" + id;
	var commonModalCss = {
		"width" : "500px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.deleteCrmCorpComplain = function(id) {
	openConfirmModalInFrame("您确定执行删除投诉信息操作吗？", function() {
		var url = $("#ctx").val() + "/pages/crmCorpComplain/form/delete?complain.id=" + id;
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1", "T010F002");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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
Editorial.Crm.Corp.Temp.crmCorpComplainAddButtonOnClick = function() {
	var url = $("#ctx").val() + "/pages/crmCorpComplain/form/edit?complain.crmCorpTypeRelationship.id=" + $("#relation_id").val();
	var commonModalCss = {
		"width" : "500px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Crm.Corp.Temp.crmCorpComplainAjaxSource = "$('#ctx').val() + '/pages/crmCorpComplain/form/manager?complain.crmCorpTypeRelationship.id=' + $('#relation_id').val()";
Editorial.Crm.Corp.Temp.crmCorpComplainServerParams = function(aoData) {
	
};
Editorial.Crm.Corp.Temp.crmCorpComplainColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "投诉事项",
	"mDataProp" : "item"
}, {
	"sTitle" : "投诉时间",
	"mDataProp" : "dateStr"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-warning" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.editCrmCorpComplain(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.deleteCrmCorpComplain(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];
/** 投诉 } **/