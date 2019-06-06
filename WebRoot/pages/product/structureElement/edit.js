

/*************************************************************************************/


Editorial.Material.validate = function() {
	var flag = true;
	if($("#element_name").val().trim() == "") {
		$("#element_name_div").removeClass("success").addClass("error");
		$("#element_name_span").html("素材内容不能为空！");
		flag = false;
	} else {
		$("#element_name_div").removeClass("error").addClass("success");
		$("#element_name_span").html("");
	}
	return flag;
};

Editorial.Material.showResponse = function(response, statusText) {
	Editorial.Material.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		initPagingParamsInLayer("Editorial.Product.Structure.oTable1");
		refreshFrameDataTableInLayer("Editorial.Product.Structure.oTable1");
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
		url : $('#ctx').val() + "/pages/structureElement/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$("#addElementForm").ajaxForm(options);
});

Editorial.Material.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Material.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};