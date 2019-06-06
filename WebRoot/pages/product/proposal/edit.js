/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var nameUnique = false;
Editorial.Proposal.validate = function() {
	var flag = true;
	if (!Editorial.Proposal.desc()) {
		flag = false;
	}
	if (!Editorial.Proposal.namea()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证desc开始
 * *************************************************************
 */
Editorial.Proposal.desc = function() {
	if ($("#desc").val() == "") {
		$("#descDiv").addClass("error");
		$("#descSpan").html("策划描述不能为空！");
		return false;
	} else {
		$("#descDiv").removeClass("error").addClass("success");
		$("#descSpan").html("");
		return true;
	}
};

Editorial.Proposal.nameUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/product/proposal/form/nameUnique?id="+$("#id").val(),
		data : {
			name : $("#name").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#nameDiv").removeClass("error").addClass("success");
				$("#nameSpan").html(response.msg);
				nameUnique = true;
			} else {
				$("#nameDiv").removeClass("success").addClass("error");
				$("#nameSpan").html(response.msg);
				nameUnique = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/**
 * ***************************************** 验证Code结束
 * *************************************************************
 */
/**
 * ***************************************** 验证name开始
 * *************************************************************
 */
Editorial.Proposal.namea = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("策划名称不能为空！");
		return false;
	} else {
		Editorial.Proposal.nameUnique();
		if (nameUnique == true) {
			return true;
		} else {
			return false;
		}
	}
};

/**
 * ***************************************** 验证name结束
 * *************************************************************
 */

Editorial.Proposal.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Proposal.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.Proposal.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Proposal.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Proposal.enableAllButton();
	}
	Editorial.Proposal.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.Proposal.validate,
		success : Editorial.Proposal.showResponse,
		url :  $('#ctx').val()+'/pages/product/proposal/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};

	$('#proposalForm').ajaxForm(options);
});