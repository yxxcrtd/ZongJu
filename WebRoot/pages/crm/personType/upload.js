var txtFileFlag = false;
Editorial.CRM.PersonType.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonType.validateUpload()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.PersonType.uploadShowResponse = function(response, statusText) {
	Editorial.CRM.PersonType.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CRM.PersonType.enableAllButton();
	}
};

Editorial.CRM.PersonType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.PersonType.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.CRM.PersonType.validateUpload = function() {
	if ($("#txtFile").val().trim() == "") {
		$("#txtFileDiv").addClass("error");
		$("#txtFileSpan").html("上传文件不能为空！");
		return false;
	}else{
		$("#txtFileDiv").removeClass("error");
		$("#txtFileSpan").html("");
		return true;
	}
};
Editorial.CRM.PersonType.validateUploadDown = function() {
	$("#txtFileSpan").html("");
	$("#txtFileDiv").removeClass("error");
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CRM.PersonType.validate,
		success : Editorial.CRM.PersonType.uploadShowResponse,
		url : $('#ctx').val() + '/pages/crm/personType/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#uploadPersonTypeForm').ajaxForm(options);
});