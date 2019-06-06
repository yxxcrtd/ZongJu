/**
 * ***************************************** 验证开始
 */
Editorial.ProposalAdvice.validate = function() {
	var flag = true;
	if (!Editorial.ProposalAdvice.desc()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证desc开始
 */
Editorial.ProposalAdvice.desc = function() {
	if ($("#desc").val().trim() == "") {
		$("#descDiv").addClass("error");
		$("#descSpan").html("策划描述不能为空！");
		return false;
	} else {
		$("#descDiv").removeClass("error").addClass("success");
		$("#descSpan").html("");
		return true;
	}
};

/**
 * ***************************************** 验证desc结束
 */

Editorial.ProposalAdvice.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.ProposalAdvice.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.ProposalAdvice.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		//refreshFrameDataTableInLayer('Editorial.ProposalAdvice.oTable1');window.frames.iframe_main.Editorial.ProposalAdvice 
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.ProposalAdvice.enableAllButton();
	}
	Editorial.ProposalAdvice.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.ProposalAdvice.validate,
		success : Editorial.ProposalAdvice.showResponse,
		url :  $('#ctx').val()+'/pages/product/proposalAdvice/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};

	$('#proposalAdviceForm').ajaxForm(options);
});