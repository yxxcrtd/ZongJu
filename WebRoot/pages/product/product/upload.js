BMEP.Product.ProductInfo.uploadShowResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Product.ProductInfo.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Product.ProductInfo.enableAllButton();
	}
};




$(function() {
	var options = {
		success : BMEP.Product.ProductInfo.uploadShowResponse,
		url : $('#ctx').val() + '/pages/product/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#uploadProductForm').ajaxForm(options);
});