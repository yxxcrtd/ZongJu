/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateWhFloorCode()) {
		flag = false;
	}
	if (!Editorial.User.validateWhFloorDesc()) {
		flag = false;
	}
	if (!Editorial.User.validateWhFloorByWhId()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateWhFloorCode = function() {
	if ($("#whFloorCode").val() == "") {
		$("#whFloorCodeDiv").addClass("error");
		$("#whFloorCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateWhFloorCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateWhFloorCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivwarehousefloor/form/validateWhFloorCodeUnique",
		data : {
			whFloorCode : $("#whFloorCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#whFloorCodeDiv").removeClass("error").addClass("success");
				$("#whFloorCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#whFloorCodeDiv").removeClass("success").addClass("error");
				$("#whFloorCodeSpan").html("此条信息已存在");
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
Editorial.User.validateWhFloorDesc = function() {
	if ($("#whFloorDesc").val() == "") {
		$("#whFloorDescDiv").addClass("error");
		$("#whFloorDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateWhFloorDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateWhFloorDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivwarehousefloor/form/validateWhFloorDescUnique",
		data : {
			whFloorDesc : $("#whFloorDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#whFloorDescDiv").removeClass("error").addClass("success");
				$("#whFloorDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#whFloorDescDiv").removeClass("success").addClass("error");
				$("#whFloorDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
Editorial.User.validateWhFloorByWhId = function() {
	if ($("#WhFloorByWhId").val() == "") {
		$("#WhFloorByWhIdDiv").addClass("error");
		$("#WhFloorByWhIdSpan").html("该字段不能为空");
		return false;
	}
	$("#WhFloorByWhIdDiv").removeClass("error");
	$("#WhFloorByWhIdSpan").html("");
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
		url :  $('#ctx').val()+'/pages/stock/ivwarehousefloor/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});