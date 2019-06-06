ZongJu.PublishTrade = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.PublishTrade.validateUpload = function() {
	var flag = true;
	if (!ZongJu.PublishTrade.UploadDown()) {
		flag = false;
	}
	return flag;
};

ZongJu.PublishTrade.UploadDown = function() {
	var val = $("#txtFile").val().substring($("#txtFile").val().lastIndexOf(".") + 1);
	if ($("#txtFile").val() == "") {
		$("#txtFileDiv").addClass("error");
		$("#txtFileSpan").html("上传文件不能为空！");
		return false;
	}else if(!(val=="xls"||val=="xlsx"||val=="XLS"||val=="XLSX")){
		$("#txtFileDiv").addClass("error");
		$("#txtFileSpan").html("请上传xls或xlsx格式的文件！");
		return false;
	}else{
		$("#txtFileDiv").removeClass("error").addClass("success");
		$("#txtFileSpan").html("通过验证");
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

$(function() {
	var options = {
		beforeSubmit : ZongJu.PublishTrade.validateUpload,
		success : ZongJu.PublishTrade.showResponse,
		url : $('#ctx').val() + '/pages/trade/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#PublishTradeForm').ajaxForm(options);
});