/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateAreaTypeCode()) {
		flag = false;
	}
	if (!Editorial.User.validateAreaTypeDesc()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateAreaTypeCode = function() {
	if ($("#areaTypeCode").val() == "") {
		$("#areaTypeCodeDiv").addClass("error");
		$("#areaTypeCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateAreaTypeCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateAreaTypeCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivareatype/form/validateAreaTypeCodeUnique",
		data : {
			areaTypeCode : $("#areaTypeCode").val(),
			areaTypeId : $("#areaTypeId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#areaTypeCodeDiv").removeClass("error").addClass("success");
				$("#areaTypeCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#areaTypeCodeDiv").removeClass("success").addClass("error");
				$("#areaTypeCodeSpan").html("此条信息已存在");
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
Editorial.User.validateAreaTypeDesc = function() {
	if ($("#areaTypeDesc").val() == "") {
		$("#areaTypeDescDiv").addClass("error");
		$("#areaTypeDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateAreaTypeDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateAreaTypeDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivareatype/form/validateAreaTypeDescUnique",
		data : {
			areaTypeDesc : $("#areaTypeDesc").val(),
			areaTypeId : $("#areaTypeId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#areaTypeDescDiv").removeClass("error").addClass("success");
				$("#areaTypeDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#areaTypeDescDiv").removeClass("success").addClass("error");
				$("#areaTypeDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
/******************************************* 验证结束 **************************************************************/



Editorial.User.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.User.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

//*********************
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
		url :  $('#ctx').val()+'/pages/stock/ivareatype/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});