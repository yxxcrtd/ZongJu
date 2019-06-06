/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateSiteCode()) {
		flag = false;
	}
	if (!Editorial.User.validateSiteDescription()) {
		flag = false;
	}
	if (!Editorial.User.validateBRegionid()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateSiteCode = function() {
	if ($("#siteCode").val() == "") {
		$("#siteCodeDiv").addClass("error");
		$("#siteCodeSpan").html("该字段不能为空 ");
		return false;
	} else {
		Editorial.User.validateSiteCodeUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateSiteCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/stock/ivsite/form/validateSiteCodeUnique",
		data : {
			siteCode : $("#siteCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#siteCodeDiv").removeClass("error").addClass("success");
				$("#siteCodeSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#siteCodeDiv").removeClass("success").addClass("error");
				$("#siteCodeSpan").html("此条信息已存在");
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
Editorial.User.validateSiteDescription = function() {
	if ($("#siteDescription").val() == "") {
		$("#siteDescriptionDiv").addClass("error");
		$("#siteDescriptionSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateSiteDescriptionUnique();
		if (whFloorDescValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateSiteDescriptionUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/stock/ivsite/form/validateSiteDescriptionUnique",
		data : {
			siteDescription : $("#siteDescription").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#siteDescriptionDiv").removeClass("error").addClass("success");
				$("#siteDescriptionSpan").html("可以使用");
				whFloorDescValidateFlag = true;
			} else {
				$("#siteDescriptionDiv").removeClass("success").addClass("error");
				$("#siteDescriptionSpan").html("此条信息已存在");
				whFloorDescValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证whFloorDesc结束 **************************************************************/
Editorial.User.validateBRegionid = function() {
	if ($("#bRegionid").val() == "") {
		$("#bRegionidDiv").addClass("error");
		$("#bRegionidSpan").html("该字段不能为空");
		return false;
	}
	$("#bRegionidDiv").removeClass("error");
	$("#bRegionidSpan").html("");
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
//*************************************
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
		url :  $('#ctx').val()+'/pages/stock/ivsite/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#form').ajaxForm(options);
});