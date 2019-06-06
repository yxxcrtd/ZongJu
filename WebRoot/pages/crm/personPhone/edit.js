Editorial.CRM.PersonInfo.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonInfo.validatePersonPhoneType()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonInfo.validatePersonPhoneDefaultFlg()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonInfo.validatePersonPhoneCountry()) {
		flag = false;
	}
	if (!Editorial.CRM.PersonInfo.validatePersonPhoneNo()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.PersonInfo.validatePersonPhoneType = function() {
	if ($("#personPhoneType").val() == "") {
		$("#typeDiv").addClass("error");
		$("#typeSpan").html("请选择人员电话类型！");
		return false;
	}
	$("#typeDiv").removeClass("error").addClass("success");
	$("#typeSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonPhoneDefaultFlg = function() {
	if ($("#personPhoneDefaultFlg").val() == "") {
		$("#defaultFlgDiv").addClass("error");
		$("#defaultFlgSpan").html("请选择该号码是否为主要电话！");
		return false;
	}
	$("#defaultFlgDiv").removeClass("error").addClass("success");
	$("#defaultFlgSpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonPhoneCountry = function() {
	if ($("#personPhoneCountry").val() == "") {
		$("#countryDiv").addClass("error");
		$("#countrySpan").html("请填写该号码所属国家！");
		return false;
	}
	$("#countryDiv").removeClass("error").addClass("success");
	$("#countrySpan").html("");
	return true;
};

Editorial.CRM.PersonInfo.validatePersonPhoneNo = function() {
	if ($("#personPhoneNo").val() == "") {
		$("#noDiv").addClass("error");
		$("#noSpan").html("电话号码不能为空！");
		return false;
	}
	$("#noDiv").removeClass("error").addClass("success");
	$("#noSpan").html("");
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
		url : $('#ctx').val() + '/pages/crmPersonPhone/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personPhoneform').ajaxForm(options);
});























