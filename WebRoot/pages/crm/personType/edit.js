/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
Editorial.CRM.PersonType.validate = function() {
//	Editorial.PersonType.disableAllButton();
	var flag = true;
	if (!Editorial.CRM.PersonType.code()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonType.typeName()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.PersonType.code = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
		Editorial.CRM.PersonType.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.CRM.PersonType.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/crm/personType/form/codeUnique?id="+$("#typeId").val(),
		data : {
			code : $("#code").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#codeDiv").removeClass("error").addClass("success");
				$("#codeSpan").html(response.msg);
				codeFlag = true;
			} else {
				$("#codeDiv").removeClass("success").addClass("error");
				$("#codeSpan").html(response.msg);
				codeFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/**
 * ***************************************** 验证Code结束
 * *************************************************************
 */
/**
 * ***************************************** 验证name开始
 * *************************************************************
 */
Editorial.CRM.PersonType.typeName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("name不能为空！");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("通过验证");
		return true;
	}
};

/**
 * ***************************************** 验证name结束
 * *************************************************************
 */

Editorial.CRM.PersonType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.PersonType.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.PersonType.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		refreshFrameDataTableInLayer('Editorial.CRM.PersonType.oTable1');
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.CRM.PersonType.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.CRM.PersonType.validate,
		success : Editorial.CRM.PersonType.showResponse,
		url :  $('#ctx').val()+'/pages/crm/personType/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#crmPersonTypeForm').ajaxForm(options);
});