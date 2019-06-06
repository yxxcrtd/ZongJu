/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateName()) {
		flag = false;
	}
	if (!Editorial.User.validateAppKey()) {
		flag = false;
	}
	if (!Editorial.User.validateAppSercet()) {
		flag = false;
	}
	if (!Editorial.User.validateRedirectUri()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("该字段不能为空");
		return false;
	}
	$("#nameDiv").removeClass("error");
	$("#nameSpan").html("");
	return true;
};
Editorial.User.validateAppKey = function() {
	if ($("#app_key").val() == "") {
		$("#app_keyDiv").addClass("error");
		$("#app_keySpan").html("该字段不能为空");
		return false;
	}
	$("#app_keyDiv").removeClass("error");
	$("#app_keySpan").html("");
	return true;
};
Editorial.User.validateAppSercet = function() {
	if ($("#app_secret").val() == "") {
		$("#app_secretDiv").addClass("error");
		$("#app_secretSpan").html("该字段不能为空");
		return false;
	}
	$("#app_secretDiv").removeClass("error");
	$("#app_secretSpan").html("");
	return true;
};
Editorial.User.validateRedirectUri = function() {
	if ($("#redirectUri").val() == "") {
		$("#redirectUriDiv").addClass("error");
		$("#redirectUriSpan").html("该字段不能为空");
		return false;
	}
	$("#redirectUriDiv").removeClass("error");
	$("#redirectUriSpan").html("");
	return true;
};


/******************************************* 验证结束 **************************************************************/

Editorial.User.save = function() {
	if (!Editorial.User.validate()) {
		return;
	}
	Editorial.User.disableAllButton();
	var url=$('#ctx').val() + "/pages/plugins/opentencent/form/editSubmit";
	$.ajax( {
		"dataType": 'json',
		"type": "POST",
		"url": url,
		"cache": false,
		"data": {
			"id": $('#id').val(),
			"obj.name": $('#name').val(),
			"obj.app_key": $('#app_key').val(),
			"obj.app_secret": $('#app_secret').val(),
			"obj.redirectUri": $('#redirectUri').val(),
			"obj.authorizeCode": $('#authorizeCode').val(),
			"obj.accessToken": $('#accessToken').val(),
			"obj.expiresIn": $('#expiresIn').val(),
			"obj.refreshToken": $('#refreshToken').val(),
			"obj.openid": $('#openid').val(),
			"obj.openkey": $('#openkey').val()
		},
		"success": function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer('Editorial.User.oTable1');
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
				Editorial.User.enableAllButton();
			}
		},
		"error": function(response) {
			alert("error");
		}
	} );
};

Editorial.User.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.User.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};