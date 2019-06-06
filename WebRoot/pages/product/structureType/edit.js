/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
Editorial.CRM.CorpType.validate = function() {
	var flag = true;
	if (!Editorial.CRM.CorpType.code()) {
		flag = false;
	}
	if (!Editorial.CRM.CorpType.typeName()) {
		flag = false;
	}
	return flag;
};
/**
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.CorpType.code = function() {
	if ($("#structureType_code").val() == "") {
		$("#structureType_code_div").addClass("error");
		$("#structureType_code_span").html("code不能为空！");
		return false;
	} else {
		Editorial.CRM.CorpType.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.CRM.CorpType.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url: $('#ctx').val() + "/pages/product/structureType/form/checkCodeExists",
		data: {
			"structureType.id": $("#structureType_id").val(),
			"structureType.code": $("#structureType_code").val()
		},
		success: function(response) {
			if (response.isSuccess == "true") {
				$("#structureType_code_div").removeClass("error").addClass("success");
				$("#structureType_code_span").html(response.msg);
				codeFlag = true;
			} else {
				$("#structureType_code_div").removeClass("success").addClass("error");
				$("#structureType_code_span").html(response.msg);
				codeFlag = false;
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
Editorial.CRM.CorpType.typeName = function() {
	if ($("#structureType_name").val() == "") {
		$("#structureType_name_div").addClass("error");
		$("#structureType_name_span").html("name不能为空！");
		return false;
	} else {
		$("#structureType_div").removeClass("error").addClass("success");
		$("#structureType_name_span").html("通过验证");
		return true;
	}
};

/**
 * ***************************************** 验证name结束
 * *************************************************************
 */

Editorial.CRM.CorpType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.CorpType.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.CorpType.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		refreshFrameDataTableInLayer('Editorial.CRM.CorpType.oTable1');
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.CRM.CorpType.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CRM.CorpType.validate,
		success : Editorial.CRM.CorpType.showResponse,
		url : $('#ctx').val() + '/pages/product/structureType/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#corpTypeForm').ajaxForm(options);
});