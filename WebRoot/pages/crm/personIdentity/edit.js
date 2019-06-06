Editorial.CRM.PersonInfo.validate = function() {
	var flag = true;
	if(!Editorial.CRM.PersonInfo.validatePersonIdentityType()) {
		flag = false;
	}
	if(!Editorial.CRM.PersonInfo.validatePersonIdentityDefaultFlg()) {
		flag = false;
	}
	if(!Editorial.CRM.PersonInfo.validatePersonIdentityValue()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.PersonInfo.validatePersonIdentityType = function() {
	if ($("#personIdentityType").val() == "") {
		$("#typeDiv").addClass("error");
		$("#typeSpan").html("请选择人员标识类型！");
		return false;
	}
	$("#typeDiv").removeClass("error").addClass("success");
	$("#typeSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonIdentityDefaultFlg = function() {
	if ($("#personIdentityDefaultFlg").val() == "") {
		$("#defaultFlgDiv").addClass("error");
		$("#defaultFlgSpan").html("请选择该标识是否为主标识！");
		return false;
	}
	$("#defaultFlgDiv").removeClass("error").addClass("success");
	$("#defaultFlgSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonIdentityValue = function() {
	if ($("#personIdentityValue").val() == "") {
		$("#valueDiv").addClass("error");
		$("#valueSpan").html("标识值不能为空！");
		return false;
	}
	$("#valueDiv").removeClass("error").addClass("success");
	$("#valueSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshCustomPropertyDataTable("cp1");
		autoCloseCommonModal(5);
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

$(function() {

	var options = {
	 beforeSubmit : Editorial.CRM.PersonInfo.validate,
		success : Editorial.CRM.PersonInfo.showResponse,
		url : $('#ctx').val() + '/pages/crmPersonIdentity/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personIdentityform').ajaxForm(options);
});























