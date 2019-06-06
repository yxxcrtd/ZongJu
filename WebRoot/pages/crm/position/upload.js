var txtFileFlag = false;
BMEP.Client.ClientInfo.Tree.validate2 = function() {
	var flag = true;
	if (!BMEP.Client.ClientInfo.Tree.validateUpload()) {
		flag = false;
	}
	return flag;
};

BMEP.Client.ClientInfo.Tree.uploadShowResponse = function(response, statusText) {
	BMEP.Client.ClientInfo.Tree.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		refreshCustomPropertyDataTable("cp1");
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Client.ClientInfo.Tree.enableAllButton();
	}
};

BMEP.Client.ClientInfo.Tree.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Client.ClientInfo.Tree.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

BMEP.Client.ClientInfo.Tree.validateUpload = function() {
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
BMEP.Client.ClientInfo.Tree.validateUploadDown = function() {
	$("#txtFileSpan").html("");
	$("#txtFileDiv").removeClass("error");
};

$(function() {
	var options = {
		beforeSubmit : BMEP.Client.ClientInfo.Tree.validate2,
		success : BMEP.Client.ClientInfo.Tree.uploadShowResponse,
		url : $('#ctx').val() + '/pages/crmPosition/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#uploadProductTypeForm').ajaxForm(options);
});