/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validatePProductInfo()) {
		flag = false;
	}
	if (!Editorial.User.validateIvStoringPack()) {
		flag = false;
	}
	if (!Editorial.User.validateIvStoringLoose()) {
		flag = false;
	}
	if (!Editorial.User.validateIvLocation()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
function validateInt(int){
	if(/^\d{1,11}$/gi.test(int)){
		return true;
	} 
	return false;
}
Editorial.User.validatePProductInfo = function() {
	if ($("#PProductInfo").val() == "") {
		$("#PProductInfoDiv").addClass("error");
		$("#PProductInfoSpan").html("该字段不能为空");
		return false;
	}
	$("#PProductInfoDiv").removeClass("error");
	$("#PProductInfoSpan").html("");
	return true;
};

/******************************************* 验证WhFloorCode结束 **************************************************************/
/******************************************* 验证whFloorDesc开始 **************************************************************/
Editorial.User.validateIvStoringPack = function() {
	if ($("#ivStoringPack").val() == "") {
		$("#ivStoringPackDiv").addClass("error");
		$("#ivStoringPackSpan").html("该字段不能为空");
		return false;
	} else if(!validateInt($("#ivStoringPack").val().trim())){
		$("#ivStoringPackDiv").addClass("error");
		$("#ivStoringPackSpan").html("请输入数值类型");
		return false;
	}
	$("#ivStoringPackDiv").removeClass("error");
	$("#ivStoringPackSpan").html("");
	return true;
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
/******************************************* 验证whFloorStatus开始 **************************************************************/
Editorial.User.validateIvStoringLoose = function() {
	if ($("#ivStoringLoose").val() == "") {
		$("#ivStoringLooseDiv").addClass("error");
		$("#ivStoringLooseSpan").html("该字段不能为空");
		return false;
	} else if(!validateInt($("#ivStoringLoose").val().trim())){
		$("#ivStoringLooseDiv").addClass("error");
		$("#ivStoringLooseSpan").html("请输入数值类型");
		return false;
	}
	$("#ivStoringLooseDiv").removeClass("error");
	$("#ivStoringLooseSpan").html("");
	return true;
};
/******************************************* 验证whFloorStatus结束 **************************************************************/
Editorial.User.validateIvLocation = function() {
	if ($("#ivLocation").val() == "") {
		$("#ivLocationDiv").addClass("error");
		$("#ivLocationSpan").html("该字段不能为空");
		return false;
	}
	$("#ivLocationDiv").removeClass("error");
	$("#ivLocationSpan").html("");
	return true;
};

/******************************************* 验证结束 **************************************************************/

Editorial.User.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.User.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

//*************************************************
Editorial.User.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.User.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.User.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.User.validate,
		success : Editorial.User.showResponse,
		url :  $('#ctx').val()+'/pages/stock/ivstoring/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});