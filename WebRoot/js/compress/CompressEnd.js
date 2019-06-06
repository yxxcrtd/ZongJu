ZongJu.Compress = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.Compress.showValidate = function() {
	var flag = true;
	if (!ZongJu.Compress.BoxName()) {
		flag = false;
	}
	if (!ZongJu.Compress.Remark()) {
		flag = false;
	}
	if (!ZongJu.Compress.Price()) {
		flag = false;
	}
	return flag;
};

ZongJu.Compress.BoxName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("包名不能为空！");
		return false;
	}else{
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("通过验证");
		return true;
	}
};

ZongJu.Compress.Remark = function() {
	if ($("#remark").val() == "") {
		$("#remarkDiv").addClass("error");
		$("#remarkSpan").html("简介不能为空！");
		return false;
	}else{
		$("#remarkDiv").removeClass("error").addClass("success");
		$("#remarkSpan").html("通过验证");
		return true;
	}
};

ZongJu.Compress.Price = function() {
	if ($("#price").val() == "") {
		$("#pricekDiv").addClass("error");
		$("#pricekSpan").html("价格不能为空！");
		return false;
	}else{
		$("#priceDiv").removeClass("error").addClass("success");
		$("#priceSpan").html("通过验证");
		return true;
	}
};

showResponse = function(response, statusText) {
	disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		enableAllButton();
	}
};

disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

//保存信息
$(function() {
	var options = {	
		beforeSubmit : ZongJu.Compress.showValidate,
		success : showResponse,
		url : $('#ctx').val() + '/pages/record/form/save',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#CompressForm').ajaxForm(options);
});