Editorial.CrOwnerPayee = function() {

};

Editorial.CrOwnerPayee.validate_flag = true;

Editorial.CrOwnerPayee.validate = function() {
	Editorial.CrOwnerPayee.validate_flag = true;
	Editorial.CrOwnerPayee.validate_crOwnerPayee_person_name();
	Editorial.CrOwnerPayee.validate_crOwnerPayee_currency();
	Editorial.CrOwnerPayee.validate_feePayeePercent();
	Editorial.CrOwnerPayee.validate_status();
	return Editorial.CrOwnerPayee.validate_flag;
};

Editorial.CrOwnerPayee.validate_crOwnerPayee_person_name = function() {
	var _id = "#crOwnerPayee_personTypeRelationship_person_name";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "请选择收款人！", _id);
		Editorial.CrOwnerPayee.validate_flag = false;
	}
};

Editorial.CrOwnerPayee.validate_crOwnerPayee_currency = function() {
	var _id = "#crOwnerPayee_currency_currencyId";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "请选择币种！", _id);
		Editorial.CrOwnerPayee.validate_flag = false;
	}
};

Editorial.CrOwnerPayee.validate_feePayeePercent = function() {
	var _id = "#crOwnerPayee_feePayeePercent";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "收款比率不能为空！", _id);
		Editorial.CrOwnerPayee.validate_flag = false;
	}
};

Editorial.CrOwnerPayee.validate_status = function() {
	var _id = "#crOwnerPayee_status";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "请选择状态！", _id);
		Editorial.CrOwnerPayee.validate_flag = false;
	}
};

Editorial.CrOwnerPayee.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrOwnerPayee.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrOwnerPayee.selectOwnerPayeePerson = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/crOwnerPayee/form/selectOwnerPayeePerson";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CrOwnerPayee.onload = function() {
	$("#crOwnerPayee_rlOwner_rlownerId").val($("#crOwner_rlownerId").val());
	
	var options = {
		beforeSubmit : Editorial.CrOwnerPayee.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInFrame("Editorial.CrOwner.beneficiaryDataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrOwnerPayee.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crOwnerPayee/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crOwnerPayeeForm").ajaxForm(options);
	
};

$(function() {
	Editorial.CrOwnerPayee.onload();
});