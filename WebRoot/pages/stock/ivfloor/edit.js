/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateShFloorCode()) {
		flag = false;
	}
	if (!Editorial.User.validateShFloorDesc()) {
		flag = false;
	}
	if (!Editorial.User.validateShFloorLoad()) {
		flag = false;
	}
	if (!Editorial.User.validateShFloorCapacity()) {
		flag = false;
	}
	
	if (!Editorial.User.validateIvShelfId()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateShFloorCode = function() {
	if ($("#shFloorCode").val() == "") {
		$("#shFloorCodeDiv").addClass("error");
		$("#shFloorCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateShFloorCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateShFloorCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivfloor/form/validateShFloorCodeUnique",
		data : {
			shFloorCode : $("#shFloorCode").val(),
			shFloorId : $("#shFloorId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#shFloorCodeDiv").removeClass("error").addClass("success");
				$("#shFloorCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#shFloorCodeDiv").removeClass("success").addClass("error");
				$("#shFloorCodeSpan").html("此条信息已存在");
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
Editorial.User.validateShFloorDesc = function() {
	if ($("#shFloorDesc").val() == "") {
		$("#shFloorDescDiv").addClass("error");
		$("#shFloorDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateShFloorDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateShFloorDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivfloor/form/validateShFloorDescUnique",
		data : {
			shFloorDesc : $("#shFloorDesc").val(),
			shFloorId : $("#shFloorId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#shFloorDescDiv").removeClass("error").addClass("success");
				$("#shFloorDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#shFloorDescDiv").removeClass("success").addClass("error");
				$("#shFloorDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}

Editorial.User.validateShFloorLoad = function() {
	if ($("#shFloorLoad").val() == "") {
		$("#shFloorLoadDiv").addClass("error");
		$("#shFloorLoadSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#shFloorLoad").val().trim())){
		$("#shFloorLoadDiv").addClass("error");
		$("#shFloorLoadSpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#shFloorLoadDiv").removeClass("error");
	$("#shFloorLoadSpan").html("");
	return true;
};
Editorial.User.validateShFloorCapacity = function() {
	if ($("#shFloorCapacity").val() == "") {
		$("#shFloorCapacityDiv").addClass("error");
		$("#shFloorCapacitySpan").html("该字段不能为空");
		return false;
	} else if(!validateDecial($("#shFloorCapacity").val().trim())){
		$("#shFloorCapacityDiv").addClass("error");
		$("#shFloorCapacitySpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#shFloorCapacityDiv").removeClass("error");
	$("#shFloorCapacitySpan").html("");
	return true;
};

Editorial.User.validateIvShelfId = function() {
	if ($("#ivShelfId").val() == "") {
		$("#ivShelfIdDiv").addClass("error");
		$("#ivShelfIdSpan").html("该字段不能为空");
		return false;
	}
	$("#ivShelfIdDiv").removeClass("error");
	$("#ivShelfIdSpan").html("");
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
//******************************
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
		url :  $('#ctx').val()+'/pages/stock/ivfloor/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});