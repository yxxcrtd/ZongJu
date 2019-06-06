/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateLocationCode()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationDesc()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationLoad()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationCapacity()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationPack()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationLoose()) {
		flag = false;
	}
	if (!Editorial.User.validateIvFloor()) {
		flag = false;
	}
	if (!Editorial.User.validateLocationLoose()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateLocationCode = function() {
	if ($("#locationCode").val() == "") {
		$("#locationCodeDiv").addClass("error");
		$("#locationCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateLocationCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateLocationCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivlocation/form/validateLocationCodeUnique",
		data : {
			locationCode : $("#locationCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#locationCodeDiv").removeClass("error").addClass("success");
				$("#locationCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#locationCodeDiv").removeClass("success").addClass("error");
				$("#locationCodeSpan").html("此条信息已存在");
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
Editorial.User.validateLocationDesc = function() {
	if ($("#locationDesc").val() == "") {
		$("#locationDescDiv").addClass("error");
		$("#locationDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateLocationDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateLocationDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivlocation/form/validateLocationDescUnique",
		data : {
			locationDesc : $("#locationDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#locationDescDiv").removeClass("error").addClass("success");
				$("#locationDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#locationDescDiv").removeClass("success").addClass("error");
				$("#locationDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
Editorial.User.validateLocationLoad = function() {
	if ($("#locationLoad").val() == "") {
		$("#locationLoadDiv").addClass("error");
		$("#locationLoadSpan").html("该字段不能为空");
		return false;
	} else if(!validateDecial($("#locationLoad").val().trim())){
		$("#locationLoadDiv").addClass("error");
		$("#locationLoadSpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#locationLoadDiv").removeClass("error");
	$("#locationLoadSpan").html("");
	return true;
};

function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}
function validateInt(int){
	if(/^\d{1,11}$/gi.test(int)){
		return true;
	} 
	return false;
}
Editorial.User.validateLocationCapacity = function() {
	if ($("#locationCapacity").val() == "") {
		$("#locationCapacityDiv").addClass("error");
		$("#locationCapacitySpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#locationCapacity").val().trim())){
		$("#locationCapacityDiv").addClass("error");
		$("#locationCapacitySpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#locationCapacityDiv").removeClass("error");
	$("#locationCapacitySpan").html("");
	return true;
};
Editorial.User.validateLocationPack = function() {
	if ($("#locationPack").val() == "") {
		$("#locationPackDiv").addClass("error");
		$("#locationPackSpan").html("该字段不能为空");
		return false;
	} else if(!validateInt($("#locationPack").val().trim())){
		$("#locationPackDiv").addClass("error");
		$("#locationPackSpan").html("请输入数值类型");
		return false;
	}
	$("#locationPackDiv").removeClass("error");
	$("#locationPackSpan").html("");
	return true;
};
Editorial.User.validateLocationLoose = function() {
	if ($("#locationLoose").val() == "") {
		$("#locationLooseDiv").addClass("error");
		$("#locationLooseSpan").html("该字段不能为空");
		return false;
	}else if(!validateInt($("#locationLoose").val().trim())){
		$("#locationLooseDiv").addClass("error");
		$("#locationLooseSpan").html("请输入数值类型");
		return false;
	}
	$("#locationLooseDiv").removeClass("error");
	$("#locationLooseSpan").html("");
	return true;
};
Editorial.User.validateLocationStatus = function() {
	if ($("#locationStatus").val() == "") {
		$("#locationStatusDiv").addClass("error");
		$("#locationStatusSpan").html("该字段不能为空");
		return false;
	}
	$("#locationStatusDiv").removeClass("error");
	$("#locationStatusSpan").html("");
	return true;
};
Editorial.User.validateIvFloor = function() {
	if ($("#ivFloor").val() == "") {
		$("#ivFloorDiv").addClass("error");
		$("#ivFloorSpan").html("该字段不能为空");
		return false;
	}
	$("#ivFloorDiv").removeClass("error");
	$("#ivFloorSpan").html("");
	return true;
};
Editorial.User.validateIvRegional = function() {
	if ($("#ivRegional").val() == "") {
		$("#ivRegionalDiv").addClass("error");
		$("#ivRegionalSpan").html("该字段不能为空");
		return false;
	}
	$("#ivRegionalDiv").removeClass("error");
	$("#ivRegionalSpan").html("");
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
		url :  $('#ctx').val()+'/pages/stock/ivlocation/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});