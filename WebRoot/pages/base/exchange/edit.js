

BMEP.Base.Exchange.showResponse = function(response, statusText) {
	BMEP.Base.Exchange.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Base.Exchange.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Base.Exchange.enableAllButton();
	}
};

$(function() {
	var url = $('#ctx').val() + "/pages/base/exchange/form/editExchangeSubmit";
	var options = {
		beforeSubmit : BMEP.Base.Exchange.validate,
		success : BMEP.Base.Exchange.showResponse,
		url : url,
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#ExchangeForm').ajaxForm(options);
});

BMEP.Base.Exchange.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Base.Exchange.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};