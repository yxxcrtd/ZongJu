var txtFileFlag = false;
Editorial.Flow.taskRepo.validate = function() {
	var flag = true;
	if (!Editorial.Flow.taskRepo.validateUpload()) {
		flag = false;
	}
	return flag;
};

Editorial.Flow.taskRepo.uploadShowResponse = function(response, statusText) {
	Editorial.Flow.taskRepo.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
        refreshFrameDataTableInFrame('Editorial.Flow.taskRepo.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Flow.taskRepo.enableAllButton();
	}
};

Editorial.Flow.taskRepo.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Flow.taskRepo.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.Flow.taskRepo.validateUpload = function() {
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
Editorial.Flow.taskRepo.validateUploadDown = function() {
	$("#txtFileSpan").html("");
	$("#txtFileDiv").removeClass("error");
};

$(function() {
	var options = {
		beforeSubmit : Editorial.Flow.taskRepo.validate,
		success : Editorial.Flow.taskRepo.uploadShowResponse,
		url : $('#ctx').val() + '/pages/ftask/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#uploadProductTypeForm').ajaxForm(options);
});