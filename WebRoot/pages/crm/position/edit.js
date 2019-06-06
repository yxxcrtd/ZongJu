

/*************************************************************************************/


Editorial.Material.validate = function() {
	var flag = true;
	return flag;
};

Editorial.Material.showResponse = function(response, statusText) {
	
	Editorial.Material.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshCustomPropertyDataTable("cp1", "T001F002");
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Material.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.Material.validate,
		success : Editorial.Material.showResponse,
		url : $('#ctx').val() + "/pages/crmPosition/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$("#crmPositionForm").ajaxForm(options);
});

Editorial.Material.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Material.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};