ZongJu.Compress = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.Compress = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.Compress.validate = function() {
	var flag = true;
	if (!ZongJu.Compress.BoxName()) {
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
		beforeSubmit : ZongJu.Compress.validate,
		success : showResponse,
		url : $('#ctx').val() + '/pages/compresszip/form/save',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#CompressForm').ajaxForm(options);
});