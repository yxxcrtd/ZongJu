/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateWarehouseCode()) {
		flag = false;
	}
	if (!Editorial.User.validateWarehouseDesc()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateWarehouseCode = function() {
	if ($("#warehouseCode").val() == "") {
		$("#warehouseCodeDiv").addClass("error");
		$("#warehouseCodeSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateWarehouseCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateWarehouseCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivwarehouse/form/validatewarehouseCodeUnique",
		data : {
			warehouseCode : $("#warehouseCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#warehouseCodeDiv").removeClass("error").addClass("success");
				$("#warehouseCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#warehouseCodeDiv").removeClass("success").addClass("error");
				$("#warehouseCodeSpan").html("此条信息已存在");
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
Editorial.User.validateWarehouseDesc = function() {
	if ($("#warehouseDesc").val() == "") {
		$("#warehouseDescDiv").addClass("error");
		$("#warehouseDescSpan").html("该字段不能为空");
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
		url : $('#ctx').val() + "/pages/stock/ivwarehouse/form/validatewarehouseDescUnique",
		data : {
			warehouseDesc : $("#warehouseDesc").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#warehouseDescDiv").removeClass("error").addClass("success");
				$("#warehouseDescSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#warehouseDescDiv").removeClass("success").addClass("error");
				$("#warehouseDescSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
Editorial.User.validateIvSite = function() {
	if ($("#ivSite").val() == "") {
		$("#ivSiteDiv").addClass("error");
		$("#ivSiteSpan").html("该字段不能为空");
		return false;
	}
	$("#ivSiteDiv").removeClass("error");
	$("#ivSiteSpan").html("");
	return true;
};

Editorial.User.validateWarehouseLoad = function() {
	if ($("#warehouseLoad").val() == "") {
		$("#warehouseLoadDiv").addClass("error");
		$("#warehouseLoadSpan").html("该字段不能为空");
		return false;
	}
	$("#warehouseLoadDiv").removeClass("error");
	$("#warehouseLoadSpan").html("");
	return true;
};
Editorial.User.validateWarehouseCapacity= function() {
	if ($("#warehouseCapacity").val() == "") {
		$("#warehouseCapacityDiv").addClass("error");
		$("#warehouseCapacitySpan").html("该字段不能为空");
		return false;
	}
	$("#warehouseCapacityDiv").removeClass("error");
	$("#warehouseCapacitySpan").html("");
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
		url :  $('#ctx').val()+'/pages/stock/ivwarehouse/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});