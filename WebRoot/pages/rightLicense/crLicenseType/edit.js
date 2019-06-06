Editorial.CrLicenseType = function() {

};

Editorial.CrLicenseType.validate_flag = true;

Editorial.CrLicenseType.validate = function() {
	Editorial.CrLicenseType.validate_flag = true;
	Editorial.CrLicenseType.validate_licenseTypeName();
	Editorial.CrLicenseType.validate_licenseTypeCode();
	return Editorial.CrLicenseType.validate_flag;
};

Editorial.CrLicenseType.validate_licenseTypeName = function() {
	var _id = "#crLicenseType_licenseTypeName";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权类型名称不能为空！", _id);
		Editorial.CrLicenseType.validate_flag = false;
	}
};

Editorial.CrLicenseType.validate_licenseTypeCode = function() {
	var _id = "#crLicenseType_licenseTypeCode";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "授权类型编号不能为空！", _id);
		Editorial.CrLicenseType.validate_flag = false;
	}
};

Editorial.CrLicenseType.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrLicenseType.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrLicenseType.onload = function() {
	var options = {
		beforeSubmit : Editorial.CrLicenseType.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer("Editorial.CrLicenseType.dataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrLicenseType.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crLicenseType/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crLicenseTypeForm").ajaxForm(options);
	
};

$(function() {
	Editorial.CrLicenseType.onload();
});