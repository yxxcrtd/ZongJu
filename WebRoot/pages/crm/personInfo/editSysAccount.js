/**
 * ***************** 验证开始 ************************
 */
Editorial.CRM.PersonInfo.SysAccount.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonInfo.SysAccount.validateName()) {
		flag = false;
	}else if(!Editorial.CRM.PersonInfo.SysAccount.validatePass())
	{
		flag = false;
	}
	
	return flag;
};
/**
 * ***************** 验证name开始 ************************
 */
Editorial.CRM.PersonInfo.SysAccount.validateName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("名称不能为空！");
		return false;
	}
	$("#nameDiv").removeClass("error");
	$("#nameSpan").html("");
	return true;
};

/**
 * ***************** 验证name结束 ************************
 */

/**
 * ***************** 验证pass开始 ************************
 */
Editorial.CRM.PersonInfo.SysAccount.validatePass = function() {
	if ($("#pass").val() == "") {
		$("#passDiv").addClass("error");
		$("#passSpan").html("密码不能为空！");
		return false;
	}
	$("#passDiv").removeClass("error");
	$("#passSpan").html("");
	return true;
};

/**
 * ***************** 验证pass结束 ************************
 */


/**
 * ***************** 提交开始 *************************
 */
Editorial.CRM.PersonInfo.SysAccount.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
};
$(function() {

	var options = {
		beforeSubmit : Editorial.CRM.PersonInfo.SysAccount.validate,
		success : Editorial.CRM.PersonInfo.SysAccount.showResponse,
		url : $('#ctx').val() + '/pages/crm/personInfo/form/editSysAccountSubmit',
		type : 'POST',
		clearForm : false,
		timeout : 3000
	};

	$('#editSysAccontForm').ajaxForm(options);
});
/**
 * ***************** 提交结束 *************************
 */
