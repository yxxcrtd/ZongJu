Editorial.CRM.PersonInfo.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonInfo.validatePersonEmailDefaultFlg()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonInfo.validatePersonEmailAddress()) {
		flag = false;
	}
	return flag;
};


Editorial.CRM.PersonInfo.validatePersonEmailDefaultFlg = function() {
	if ($("#personEmailDefaultFlg").val() == "") {
		$("#defaultFlgDiv").addClass("error");
		$("#defaultFlgSpan").html("请选择该邮箱是否为主邮箱！");
		return false;
	}
	$("#defaultFlgDiv").removeClass("error").addClass("success");
	$("#defaultFlgSpan").html("");
	return true;
};


Editorial.CRM.PersonInfo.validatePersonEmailAddress = function() {
	if ($("#personEmailAddress").val() == "") {
		$("#addressDiv").addClass("error");
		$("#addressSpan").html("邮箱地址不能为空！");
		return false;
	}
	$("#addressDiv").removeClass("error").addClass("success");
	$("#addressSpan").html("");
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
		url : $('#ctx').val() + '/pages/crmPersonEmail/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personEmailform').ajaxForm(options);
});























