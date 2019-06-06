Editorial.Attach.validate = function() {
	var flag = true;
	return flag;
};

Editorial.Attach.showResponse = function(response, statusText) {
	Editorial.Attach.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Attach.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.Attach.validate,
		success : Editorial.Attach.showResponse,
		url : $('#ctx').val() + "/pages/productAttach/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#attachForm').ajaxForm(options);
});

Editorial.Attach.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Attach.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};