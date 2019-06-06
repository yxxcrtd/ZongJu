Editorial.CopyRight.validate = function() {
	var flag = true;
	return flag;
};

Editorial.CopyRight.showResponse = function(response, statusText) {
	Editorial.CopyRight.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CopyRight.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CopyRight.validate,
		success : Editorial.CopyRight.showResponse,
		url : $('#ctx').val() + "/pages/pcopyRight/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#copyRightForm').ajaxForm(options);
});

Editorial.CopyRight.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CopyRight.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};