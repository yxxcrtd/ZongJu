/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateAreaCode()) {
		flag = false;
	}
	if (!Editorial.User.validateAreaDesc()) {
		flag = false;
	}
	/*if (!Editorial.User.validateAreaStatus()) {
		flag = false;
	}*/
	if (!Editorial.User.validateActivityLevel()) {
		flag = false;
	}
	if (!Editorial.User.validateIvAreaType()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateAreaCode = function() {
	if ($("#areaCode").val() == "") {
		$("#areaCodeDiv").addClass("error");
		$("#areaCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateAreaCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateAreaCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivregional/form/validateAreaCodeUnique",
		data : {
			areaCode : $("#areaCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#areaCodeDiv").removeClass("error").addClass("success");
				$("#areaCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#areaCodeDiv").removeClass("success").addClass("error");
				$("#areaCodeSpan").html("此条信息已存在");
				whFloorCodeValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证WhFloorCode结束 **************************************************************/
/******************************************* 验证whFloorDesc开始 **************************************************************/
Editorial.User.validateAreaDesc = function() {
	if ($("#areaDesc").val() == "") {
		$("#areaDescDiv").addClass("error");
		$("#areaDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateAreaDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateAreaDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivregional/form/validateAreaDescUnique",
		data : {
			areaDesc : $("#areaDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#areaDescDiv").removeClass("error").addClass("success");
				$("#areaDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#areaDescDiv").removeClass("success").addClass("error");
				$("#areaDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
/******************************************* 验证whFloorStatus开始 **************************************************************/
/*Editorial.User.validateAreaStatus = function() {
	if ($("#areaStatus").val() == "") {
		$("#areaStatusDiv").addClass("error");
		$("#areaStatusSpan").html("该字段不能为空");
		return false;
	}
	$("#areaStatusDiv").removeClass("error");
	$("#areaStatusSpan").html("");
	return true;
};*/
Editorial.User.validateActivityLevel = function() {
	if ($("#activityLevel").val() == "") {
		$("#activityLevelDiv").addClass("error");
		$("#activityLevelSpan").html("该字段不能为空");
		return false;
	}
	$("#activityLevelDiv").removeClass("error");
	$("#activityLevelSpan").html("");
	return true;
};
/******************************************* 验证whFloorStatus结束 **************************************************************/
Editorial.User.validateIvAreaType = function() {
	if ($("#ivAreaType").val() == "") {
		$("#ivAreaTypeDiv").addClass("error");
		$("#ivAreaTypeSpan").html("该字段不能为空");
		return false;
	}
	$("#ivAreaTypeDiv").removeClass("error");
	$("#ivAreaTypeSpan").html("");
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
		url :  $('#ctx').val()+'/pages/stock/ivregional/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});
