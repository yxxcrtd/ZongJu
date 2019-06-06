ZongJu.PublishTrade = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.PublishTrade.validate = function() {
	var flag = true;
	if (!ZongJu.PublishTrade.downPayment()) {
		flag = false;
	}
	return flag;
};

ZongJu.PublishTrade.downPayment = function() {
	var regex = /^\d+(\.\d{2})?$/;
	var val = $("#downPayment").val();
	if ($("#downPayment").val() == "") {
		$("#downPaymentDiv").addClass("error");
		$("#downPaymentSpan").html("价格不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#downPaymentDiv").addClass("error");
		$("#downPaymentSpan").html("请输入数字类型");	
		return false;
	} else if(val>parseInt('100000000')) {
		$("#downPaymentDiv").addClass("error");
		$("#downPaymentSpan").html("价格最大值不能超过100,000,000!");
		return false;
	}else{
		$("#downPaymentDiv").removeClass("error").addClass("success");
		$("#downPaymentSpan").html("通过验证");
		return true;
	}
};

ZongJu.PublishTrade.showResponse = function(response, statusText) {
	ZongJu.PublishTrade.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		ZongJu.PublishTrade.enableAllButton();
	}
};

ZongJu.PublishTrade.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

//保存信息
$(function() {
	
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		ZongJu.PublishTrade.publishTrade();
	});
	
	var options = {
			beforeSubmit : ZongJu.PublishTrade.validate,
			success : ZongJu.PublishTrade.showResponse,
			url : $('#ctx').val() + '/pages/trade/form/save',
			type : 'post',
			clearForm : false,
			timeout : 3000
		};
		$('#PublishTradeForm').ajaxForm(options);
});