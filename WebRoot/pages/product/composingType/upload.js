BMEP.Product.ProductInfo.uploadShowResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Product.ProductInfo.enableAllButton();
	}
};




$(function() {
	var options = {
		success : BMEP.Product.ProductInfo.uploadShowResponse,
		url : $('#ctx').val() + '/pages/product/composingType/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#uploadProductForm').ajaxForm(options);
});