Editorial.ProductType.Licence.validate = function() {
	var flag = true;
	if (!Editorial.ProductType.Licence.licenseMax()) {
		flag = false;
	}
	if (!Editorial.ProductType.Licence.licenceName()) {
		flag = false;
	}
	return flag;
};
Editorial.ProductType.Licence.licenseMax = function() {
	var regex = /^[0-9]*$/;
	var val = $("#licenseMax").val();
	if ($("#licenseMax").val() == "") {
		$("#licenseMaxDiv").addClass("error");
		$("#licenseMaxSpan").html("并发数不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#licenseMaxDiv").addClass("error");
		$("#licenseMaxSpan").html("并发数只能是正整数");
	}else{
		$("#licenseMaxDiv").removeClass("error").addClass("success");
		$("#licenseMaxSpan").html("通过验证");
		return true;
	}
};

Editorial.ProductType.Licence.licenceName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("授权名称不能为空！");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("通过验证");
		return true;
	}
};

Editorial.ProductType.Licence.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.ProductType.Licence.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.ProductType.Licence.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(3);
		refreshFrameDataTableInLayer('Editorial.ProductType.Licence.oTable1');
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.ProductType.Licence.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.ProductType.Licence.validate,
		success : Editorial.ProductType.Licence.showResponse,
		url :  $('#ctx').val()+'/pages/pLicense/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#pTypePropClassifyForm').ajaxForm(options);
});