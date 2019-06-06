Editorial.CRM.PersonInfo.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonInfo.validateNameType()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonInfo.validatePersonName()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.PersonInfo.validateNameType = function() {
	if ($("#personNameType").val() == "") {
		$("#typeDiv").addClass("error");
		$("#typeSpan").html("人员名称类型不能为空！");
		return false;
	}
	$("#typeDiv").removeClass("error").addClass("success");
	$("#typeSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonName = function() {
	if ($("#personNameName").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("人员名称不能为空！");
		return false;
	}
	$("#nameDiv").removeClass("error").addClass("success");
	$("#nameSpan").html("");
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
		url : $('#ctx').val() + '/pages/crmPersonName/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personNameform').ajaxForm(options);
});























