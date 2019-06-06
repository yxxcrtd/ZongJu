var txtFileFlag = false;
Editorial.CRM.CorpType.validate = function() {
	var flag = true;
	if (!Editorial.CRM.CorpType.validateUpload()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.CorpType.uploadShowResponse = function(response, statusText) {
	Editorial.CRM.CorpType.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CRM.CorpType.enableAllButton();
	}
};

Editorial.CRM.CorpType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.CorpType.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.CRM.CorpType.validateUpload = function() {
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
Editorial.CRM.CorpType.validateUploadDown = function() {
	$("#txtFileSpan").html("");
	$("#txtFileDiv").removeClass("error");
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CRM.CorpType.validate,
		success : Editorial.CRM.CorpType.uploadShowResponse,
		url : $('#ctx').val() + '/pages/crm/corpType/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#uploadProductTypeForm').ajaxForm(options);
});