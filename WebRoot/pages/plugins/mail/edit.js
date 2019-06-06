var validateDate = /(([0-9]{3}[1-9]|[0-9]{2}[1-9][0-9]{1}|[0-9]{1}[1-9][0-9]{2}|[1-9][0-9]{3})-(((0[13578]|1[02])-(0[1-9]|[12][0-9]|3[01]))|((0[469]|11)-(0[1-9]|[12][0-9]|30))|(02-(0[1-9]|[1][0-9]|2[0-8]))))|((([0-9]{2})(0[48]|[2468][048]|[13579][26])|((0[48]|[2468][048]|[3579][26])00))-02-29)/;
Editorial.Plugins.Mail.validate = function() {
	var flag = true;

	if(!Editorial.Plugins.Mail.validateToUser()){
		flag = false;
	}
	return flag;
};
Editorial.Plugins.Mail.validateToUser = function() {
	if ($("#toUser").val() == "") {
		$("#toUserDiv").addClass("error");
		$("#toUserSpan").html("收件人不能为空！");
		return false;
	}
	$("#toUserDiv").removeClass("error");
	$("#toUserSpan").html("");
	return true;
};


Editorial.Plugins.Mail.showResponse = function(response, statusText) {
	Editorial.Plugins.Mail.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		//refreshFrameDataTableInLayer('Editorial.Plugins.Mail.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Plugins.Mail.enableAllButton();
	}
};


$(function() {
	UE.getEditor("position");

	var options = {
		beforeSubmit : Editorial.Plugins.Mail.validate,
		success : Editorial.Plugins.Mail.showResponse,
		url : $('#ctx').val() + '/pages/plugins/mail/form/mailSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#mailForm').ajaxForm(options);
});


Editorial.Plugins.Mail.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Plugins.Mail.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};