/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateShelfCode()) {
		flag = false;
	}
	if (!Editorial.User.validateShelfDesc()) {
		flag = false;
	}
	if (!Editorial.User.validateShelfLoad()) {
		flag = false;
	}
	if (!Editorial.User.validateShelfCapacity()) {
		flag = false;
	}
	if (!Editorial.User.validateShelfType()) {
		flag = false;
	}
	if (!Editorial.User.validateShelfUsage()) {
		flag = false;
	}
	
	if (!Editorial.User.validateWhRoomId()) {
		flag = false;
	}
	
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateShelfCode = function() {
	if ($("#shelfCode").val() == "") {
		$("#shelfCodeDiv").addClass("error");
		$("#shelfCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateShelfCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateShelfCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivshelf/form/validateShelfCodeUnique",
		data : {
			shelfCode : $("#shelfCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#shelfCodeDiv").removeClass("error").addClass("success");
				$("#shelfCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#shelfCodeDiv").removeClass("success").addClass("error");
				$("#shelfCodeSpan").html("此条信息已存在");
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
Editorial.User.validateShelfDesc = function() {
	if ($("#shelfDesc").val() == "") {
		$("#shelfDescDiv").addClass("error");
		$("#shelfDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateShelfDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateShelfDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivshelf/form/validateShelfDescUnique",
		data : {
			shelfDesc : $("#shelfDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#shelfDescDiv").removeClass("error").addClass("success");
				$("#shelfDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#shelfDescDiv").removeClass("success").addClass("error");
				$("#shelfDescSpan").html("此条信息已存在");
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
//-------------------------------------------------------------
Editorial.User.validateShelfLoad = function() {
	if ($("#shelfLoad").val() == "") {
		$("#shelfLoadDiv").addClass("error");
		$("#shelfLoadSpan").html("该字段不能为空");
		return false;
	} else if(!validateDecial($("#shelfLoad").val().trim())){
		$("#shelfLoadDiv").addClass("error");
		$("#shelfLoadSpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#shelfLoadDiv").removeClass("error");
	$("#shelfLoadSpan").html("");
	return true;
};
Editorial.User.validateShelfCapacity = function() {
	if ($("#shelfCapacity").val() == "") {
		$("#shelfCapacityDiv").addClass("error");
		$("#shelfCapacitySpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#shelfCapacity").val().trim())){
		$("#shelfCapacityDiv").addClass("error");
		$("#shelfCapacitySpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#shelfCapacityDiv").removeClass("error");
	$("#shelfCapacitySpan").html("");
	return true;
};
Editorial.User.validateShelfType = function() {
	if ($("#shelfType").val() == "") {
		$("#shelfTypeDiv").addClass("error");
		$("#shelfTypeSpan").html("该字段不能为空");
		return false;
	}
	$("#shelfTypeDiv").removeClass("error");
	$("#shelfTypeSpan").html("");
	return true;
};
Editorial.User.validateShelfUsage = function() {
	if ($("#shelfUsage").val() == "") {
		$("#shelfUsageDiv").addClass("error");
		$("#shelfUsageSpan").html("该字段不能为空");
		return false;
	}
	$("#shelfUsageDiv").removeClass("error");
	$("#shelfUsageSpan").html("");
	return true;
};

Editorial.User.validateWhRoomId = function() {
	if ($("#ivWarehouseRoomId").val() == "") {
		$("#ivWarehouseRoomIdDiv").addClass("error");
		$("#ivWarehouseRoomIdSpan").html("该字段不能为空");
		return false;
	}
	$("#ivWarehouseRoomIdDiv").removeClass("error");
	$("#ivWarehouseRoomIdSpan").html("");
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
		url :  $('#ctx').val()+'/pages/stock/ivshelf/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});