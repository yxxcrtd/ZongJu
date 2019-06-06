/**
 * ***************** 验证开始 ************************
 */

var nameValidateFlag = false;
var codeValidateFlag = false;
Editorial.CRM.PersonInfo.validate = function() {
	var flag = true;
//	var personType = $("#personType").val();
	
	if (!Editorial.CRM.PersonInfo.validateCorp()) {
		flag = false;
	}
	if($("#relation_id").val() == "") {
		
		if (!Editorial.CRM.PersonInfo.validatePersonCodeUnique()) {
			flag = false;
		}
	}
//	
	if(flag == true){
		if (!Editorial.CRM.PersonInfo.validateName()) {
			flag = false;
		}
	}
	
//	if (!Editorial.CRM.PersonInfo.validatePosition()) {
//		flag = false;
//	}
	return flag;
};
/**
 * ***************** 验证name开始 ************************
 */
Editorial.CRM.PersonInfo.validateName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("联系人名称不能为空！");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("通过验证");
		return true;
	}
};

/**
 * ***************** 验证name结束 ************************
 */
/**
 * ***************** 验证code开始 *************************
 */

//Editorial.CRM.PersonInfo.validatePersonCode = function() {
//	if ($("#code").val() == "") {
//		$("#codeDiv").addClass("error");
//		$("#codeSpan").html("人员编号不能为空！");
//		return false;
//	}else{
//		Editorial.CRM.PersonInfo.validatePersonCodeUnique();
//		if (codeValidateFlag == true) {
//			return true;
//		} else {
//			return false;
//		}
//	}
//};

Editorial.CRM.PersonInfo.validatePersonCodeUnique = function() {
	var flag = true;
	if($("#code").val().trim() == "") {
		
		$("#codeDiv").removeClass("success").addClass("error");
		$("#codeSpan").html("编码不能为空！");
		
		flag = false;
		
		
	}else {
		var personCodeExists = false;
		for ( var i in availablePersons) {
			if ($("#code").val() == availablePersons[i].code) {
				//alert($("#code").val());
				personCodeExists = true;
				break;
			}
		}
		if(personCodeExists) {
//			alert($("#code").val());
//			Editorial.CRM.PersonInfo.queryExistPerson();
			
		}else {
		//var personType = $("#personType").val();
		var url = $('#ctx').val() + "/pages/crm/personInfo/form/validatePersonCodeUnique?obj.code=" + $("#code").val();
		$.ajax({
			"type" : "POST",
			"dataType": 'json',	
			"url" : url,
			"cache": false,
			async : false,
			"success" : function(response) {
				if (response.personCodeIsAvailable) {
					flag = true;
					$("#codeDiv").removeClass("error").addClass("success");
					$("#codeSpan").html("可以使用");
				} else {
					flag = false;
					$("#codeDiv").removeClass("success").addClass("error");
					$("#codeSpan").html("编号为" + $("#code").val() + "的人员已存在！");
				}
			},
			error : function(response) {
				alert("error");
			}
		});
		}
	}
	return flag;
};

Editorial.CRM.PersonInfo.queryExistPerson = function() {
		var url = $('#ctx').val() + "/pages/crm/personInfo/form/queryExistPerson?code="+$("#code").val();
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			async : false,
			"url" : url,
			"cache" : false,
			"success" : function(data) {
				
					$("#name").val(data.name);
					$("#address").val(data.address);
					$("#email").val(data.email);
					$("#postCode").val(data.postCode);
					$("#telePhone").val(data.telephone);
					$("#phone").val(data.phone);
					$("#fax").val(data.fax);
					$("#code").val(data.code);
					$("#personId").val(data.id);
				},	
			"error" : function(data) {
				alert("error");
			}
		});
		
}; 


Editorial.CRM.PersonInfo.validateCorp = function() {
	if ($("#corpName").val() == "") {
		$("#corpDiv").addClass("error");
		$("#corpSpan").html("公司不能为空！");
		return false;
	} 
		$("#corpDiv").removeClass("error").addClass("success");
		$("#corpSpan").html("通过验证");
		return true;
	
};
//
//Editorial.CRM.PersonInfo.validatePosition = function() {
//	if ($("#position").val() == null || $("#position").val() == "") {
//		$("#positionDiv").addClass("error");
//		$("#positionSpan").html("职位不能为空！");
//		return false;
//	}else {
//		$("#positionDiv").removeClass("error").addClass("success");
//		$("#positionSpan").html("通过验证");
//		return true;
//	}
//};
/**
 * ***************** 验证code结束 *************************
 */


/***
 *  *****************部门 tree **************************
 */


function onCheck(e, treeId, treeNode) {
	$("#corpId").val(treeNode.id);
	$("#corpName").val(treeNode.name);
	
	
	return;
	var zTree = $.fn.zTree.getZTreeObj("treeManage"),
	nodes = zTree.getCheckedNodes(true),
	v = "";
	for (var i=0, l=nodes.length; i<l; i++) {
		v += nodes[i].name + ",";
	}
	if (v.length > 0 ) v = v.substring(0, v.length-1);
	var cityObj = $("#citySel");
	cityObj.attr("value", v);
}

function showMenu() {
	var setting = {
			check : {
				enable : true,
				chkStyle : "radio",
				radioType : "all"
			},
			async : {
				enable : true,
				url : $('#ctx').val() + "/pages/crmCorp/form/getChildNodes",
				autoParam : [ "id", "id" ],
				//dataFilter : BMEP.Client.ClientInfo.Tree.filter,
				otherParam : {
					"corpType.code" : "org"
				}
			},
			callback : {
				//onClick : onClick,
				onCheck: onCheck
			}
		};
		
		var root = [ {
			id : "root",
			nocheck : true,
			name : "法律社",
			isRoot : "true",
			isParent : true,
			icon : $('#ctx').val() + "/img/configration1.gif",
			open : true
		} ];

		$.fn.zTree.init($("#treeManage"), setting, root);
		
		
		
		
	
	
	var companyObj = $("#corpName");
	var cityOffset = $("#corpName").position();
	$("#menuContent").css({
		left : cityOffset.left + "px",
		top : cityOffset.top + companyObj.outerHeight() + "px"
	}).slideDown("fast");

	$("body").bind("mousedown", onBodyDown);
}
function hideMenu() {
	$("#menuContent").fadeOut("fast");
	$("body").unbind("mousedown", onBodyDown);
}
function onBodyDown(event) {
	if (!(event.target.id == "menuBtn" || event.target.id == "corpName"
			|| event.target.id == "menuContent" || $(event.target).parents(
			"#menuContent").length > 0)) {
		hideMenu();
	}
}
 
/***
 *  *****************部门 tree **************************
 */


/***
 *  *****************岗位信息自定义 开始 **************************
 */
Editorial.CRM.PersonInfo.crmPositionAjaxSource = "$('#ctx').val() + '/pages/crmPersonPositionRelationship/form/manager?id=' + $('#relation_id').val()";


Editorial.CRM.PersonInfo.positionDelete = function(id) {
	openConfirmModalInFrame("您确定执行删除岗位操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPersonPositionRelationship/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
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


Editorial.CRM.PersonInfo.crmPositionSelectButtonOnClick = function() {
	//var url = $('#ctx').val() + '/pages/crmPosition/form/manager?id=' + $('#corpId').val();
	var url = $('#ctx').val() + "/pages/crmPersonPositionRelationship/form/PositionSelect?personId="+$("#personId").val()+"&personTypeCode="+$('#personType').val()+"&corpId="+$('#corpId').val();
	var commonModalCss = {
			"width" : "1000px",
			"height" : "500px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


Editorial.CRM.PersonInfo.crmPositionColumns = [
	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "岗位编号",
		"mDataProp" : "position.code"
	}, {
		"sTitle" : "岗位名称",
		"mDataProp" : "position.name"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			//var edit = '<button class="btn btn-mini btn-info" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.positionEdit(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.CRM.PersonInfo.positionDelete(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + trash + end;
		}
	}                                               	
                                                    
];

/***
 *  *****************岗位信息自定义 结束 **************************
 */

/***
 *  *****************人员名称自定义 开始 **************************
 */

Editorial.CRM.PersonInfo.crmPersonNameAjaxSource = "$('#ctx').val() + '/pages/crmPersonName/form/manager?name.crmPersonTypeRelationship.id=' + $('#relation_id').val()";

Editorial.CRM.PersonInfo.crmPersonNameAddButtonOnClick = function() {
	var url = $('#ctx').val() + "/pages/crmPersonName/form/edit?name.crmPersonTypeRelationship.id=" + $('#relation_id').val();
	var commonModalCss = {
			"width" : "600px",
			"height" : "400px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.crmPersonNameColumns = [
	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "人员名称类型",
		"mDataProp" : "type"
	}, {
		"sTitle" : "人员名称",
		"mDataProp" : "name"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.CRM.PersonInfo.editPersonName(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.CRM.PersonInfo.deletePersonName(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	}                    
];

Editorial.CRM.PersonInfo.editPersonName = function(id) {
	var url = $('#ctx').val() + "/pages/crmPersonName/form/edit?name.id="+id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.deletePersonName = function(id) {
	openConfirmModalInFrame("您确定执行删除该人员名称操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPersonName/form/delete?name.id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
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

/***
 *  *****************人员名称自定义 结束 **************************
 */

/***
 *  *****************人员Email自定义 开始 **************************
 */

Editorial.CRM.PersonInfo.crmPersonEmailAjaxSource = "$('#ctx').val() + '/pages/crmPersonEmail/form/manager?email.crmPersonTypeRelationship.id=' + $('#relation_id').val()";

Editorial.CRM.PersonInfo.crmPersonEmailAddButtonOnClick = function() {
	var url = $('#ctx').val() + "/pages/crmPersonEmail/form/edit?email.crmPersonTypeRelationship.id=" + $('#relation_id').val();
	var commonModalCss = {
			"width" : "550px",
			"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.crmPersonEmailColumns = [
	{
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
			var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.CRM.PersonInfo.editPersonEmail(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.CRM.PersonInfo.deletePersonEmail(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	}                                                  
];

Editorial.CRM.PersonInfo.editPersonEmail = function(id) {
	var url = $('#ctx').val() + "/pages/crmPersonEmail/form/edit?email.id="+id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.deletePersonEmail = function(id) {
	openConfirmModalInFrame("您确定执行删除该人员Email操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPersonEmail/form/delete?email.id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
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


/***
 *  *****************人员Email自定义 结束 **************************
 */


/***
 *  *****************人员电话自定义 开始 **************************
 */

Editorial.CRM.PersonInfo.crmPersonPhoneAjaxSource = "$('#ctx').val() + '/pages/crmPersonPhone/form/manager?phone.crmPersonTypeRelationship.id=' + $('#relation_id').val()";

Editorial.CRM.PersonInfo.crmPersonPhoneAddButtonOnClick = function() {
	var url = $('#ctx').val() + "/pages/crmPersonPhone/form/edit?phone.crmPersonTypeRelationship.id=" + $('#relation_id').val();
	var commonModalCss = {
			"width" : "550px",
			"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


Editorial.CRM.PersonInfo.crmPersonPhoneColumns = [
	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "是否主要电话",
		"mDataProp" : "defaultFlg"
	}, {
		"sTitle" : "电话分类",
		"mDataProp" : "type"
	}, {
		"sTitle" : "号码所属国家",
		"mDataProp" : "country"
	}, {
		"sTitle" : "电话号码",
		"mDataProp" : "no"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.CRM.PersonInfo.editPersonPhone(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.CRM.PersonInfo.deletePersonPhone(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	} 
];

Editorial.CRM.PersonInfo.editPersonPhone = function(id) {
	var url = $('#ctx').val() + "/pages/crmPersonPhone/form/edit?phone.id="+id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.deletePersonPhone = function(id) {
	openConfirmModalInFrame("您确定执行删除该人员电话操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPersonPhone/form/delete?phone.id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
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

/***
 *  *****************人员电话自定义 结束 **************************
 */

/***
 *  *****************人员标识自定义 开始 **************************
 */

Editorial.CRM.PersonInfo.crmPersonIdentityAjaxSource ="$('#ctx').val() + '/pages/crmPersonIdentity/form/manager?identity.crmPersonTypeRelationship.id=' + $('#relation_id').val()";

Editorial.CRM.PersonInfo.crmPersonIdentityAddButtonOnClick = function() {
	var url = $('#ctx').val() + "/pages/crmPersonIdentity/form/edit?identity.crmPersonTypeRelationship.id=" + $('#relation_id').val();
	var commonModalCss = {
			"width" : "550px",
			"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.crmPersonIdentityColumns = [
 	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "是否主标识",
		"mDataProp" : "defaultFlg"
	}, {
		"sTitle" : "标识分类",
		"mDataProp" : "type"
	}, {
		"sTitle" : "标识值",
		"mDataProp" : "value"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.CRM.PersonInfo.editPersonIdentity(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.CRM.PersonInfo.deletePersonIdentity(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	} 

];

Editorial.CRM.PersonInfo.editPersonIdentity = function(id) {
	var url = $('#ctx').val() + "/pages/crmPersonIdentity/form/edit?identity.id="+id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.deletePersonIdentity = function(id) {
	openConfirmModalInFrame("您确定执行删除该人员标识操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPersonIdentity/form/delete?identity.id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
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


/***
 *  *****************人员标识自定义 结束 **************************
 */



/**
 * ***************** 提交开始 *************************
 */
Editorial.CRM.PersonInfo.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		openSuccessAlertModalInFrame(response.msg);
		var id = response.relation.id;
		var url = $('#ctx').val() + "/pages/crm/personInfo/form/edit/" + $("#personType").val() + "?id=" + id;
		window.location.href = url;
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CRM.PersonInfo.enableAllButton();
	}
};

Editorial.CRM.PersonInfo.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.PersonInfo.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.PersonInfo.lcoalCP = function(relation_id) {
	var cus1 = $.customProperty.create({
		renderTo: "cp1",
		add_tab_url: $("#ctx").val() + "/pages/crm/personInfo/form/addTab",
		main_data_param: {
			name: "relation.id",
			value: relation_id
		},
		type_data_param: {
			name: "personType.code",
			value: $("#personType").val()
		},
		classify_data_param: {
			name: "peTpClassify.id",
			value: ""
		},
		prop_data_param: {
			id_name: "propsId",
			value_name: "propsValue"
		},
		classify_list: {
			name: "peTpClassifieList",
			field: {
				id: "id",
				code: "code",
				name: "name"
			}
		},
		prop_list: {
			name: "personPropList",
			field: {
				id: "id",
				code: "code",
				name: "name",
				value: "val",
				display: "display",
				must: "must",
				source: "source"
			}
		}
	});
};

$(function() {

	
	if($("#personType").val() != "employee") {
		$("#corpDiv").empty();
	}
	
	$("#baseInfoDiv").click(function() {
		$("#baseInfoContentDiv").slideToggle();
	});
	
	if ($("#id").val().trim() == "") {
		$.customProperty.destroy("cp1");
		if(availablePersons != null && availablePersons.length > 0) {
			for(var i in availablePersons) {
				var item = availablePersons[i];
				item["label"] = item.code + " " + item.name;
			}
			$("#code").autocomplete({
				source: availablePersons,
				autoFocus: true,
				delay: 0,
				minLength: 0,
				select: function(event, ui) {
					$("#personId").val(ui.item.id);
					$("#code").val(ui.item.code);
					$("#address").val(ui.item.address);
					$("#email").val(ui.item.email);
					$("#name").val(ui.item.name);
					$("#telePhone").val(ui.item.telePhone);
					$("#phone").val(ui.item.phone);
					$("#fax").val(ui.item.fax);
					$("#postCode").val(ui.item.postCode);
					
					return false;
				}
			});
			
			
			
		}
		
	} else {
		//Editorial.CRM.PersonInfo.queryExistPerson;
		$("#code").attr("disabled", "disabled");
		var ralation_id = $("#id").val();
		Editorial.CRM.PersonInfo.lcoalCP(ralation_id);
	}
	//$.fn.zTree.init($("#treeDemo"), setting, root);
	
	


	var options = {
	 beforeSubmit : Editorial.CRM.PersonInfo.validate,
		success : Editorial.CRM.PersonInfo.showResponse,
		url : $('#ctx').val() + '/pages/crm/personInfo/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personInfoEditForm').ajaxForm(options);
});
/**
 * ***************** 提交结束 *************************
 */
