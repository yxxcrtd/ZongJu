/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateWhRoomCode()) {
		flag = false;
	}
	if (!Editorial.User.validateWhRoomDesc()) {
		flag = false;
	}
	if (!Editorial.User.validateWhFloorByWhId()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateWhRoomCode = function() {
	if ($("#whRoomCode").val() == "") {
		$("#whRoomCodeDiv").addClass("error");
		$("#whRoomCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateWhRoomCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateWhRoomCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivwarehouseroom/form/validateWhRoomCodeUnique",
		data : {
			whRoomCode : $("#whRoomCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#whRoomCodeDiv").removeClass("error").addClass("success");
				$("#whRoomCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#whRoomCodeDiv").removeClass("success").addClass("error");
				$("#whRoomCodeSpan").html("此条信息已存在");
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
Editorial.User.validateWhRoomDesc = function() {
	if ($("#whRoomDesc").val() == "") {
		$("#whRoomDescDiv").addClass("error");
		$("#whRoomDescSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateWhRoomDescUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateWhRoomDescUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivwarehouseroom/form/validateWhRoomDescUnique",
		data : {
			whRoomDesc : $("#whRoomDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#whRoomDescDiv").removeClass("error").addClass("success");
				$("#whRoomDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#whRoomDescDiv").removeClass("success").addClass("error");
				$("#whRoomDescSpan").html("此条信息已存在");
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
		url :  $('#ctx').val()+'/pages/stock/ivwarehouseroom/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});