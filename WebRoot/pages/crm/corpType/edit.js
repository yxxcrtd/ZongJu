/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
Editorial.CRM.CorpType.validate = function() {
	var flag = true;
	if (!Editorial.CRM.CorpType.code()) {
		flag = false;
	}
	if (!Editorial.CRM.CorpType.typeName()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.CorpType.code = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
		Editorial.CRM.CorpType.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.CRM.CorpType.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/crm/corpType/form/checkCodeExists?id="+$("#typeId").val(),
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
Editorial.CRM.CorpType.typeName = function() {
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

Editorial.CRM.CorpType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.CorpType.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.CorpType.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		refreshFrameDataTableInLayer('Editorial.CRM.CorpType.oTable1');
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.CRM.CorpType.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.CRM.CorpType.validate,
		success : Editorial.CRM.CorpType.showResponse,
		url :  $('#ctx').val()+'/pages/crm/corpType/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#corpTypeForm').ajaxForm(options);
});