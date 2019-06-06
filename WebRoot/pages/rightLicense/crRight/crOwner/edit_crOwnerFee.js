Editorial.CrOwnerFee = function() {

};

Editorial.CrOwnerFee.validate_flag = true;

Editorial.CrOwnerFee.validate = function() {
	Editorial.CrOwnerFee.validate_flag = true;
	Editorial.CrOwnerFee.validate_expenseType();
	Editorial.CrOwnerFee.validate_currency();
	Editorial.CrOwnerFee.validate_fixfeeVal();
	return Editorial.CrOwnerFee.validate_flag;
};

Editorial.CrOwnerFee.validate_expenseType = function() {
	var _id = "#crOwnerFee_expenseType";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "请选择类型！", _id);
		Editorial.CrOwnerFee.validate_flag = false;
	}
};

Editorial.CrOwnerFee.validate_currency = function() {
	var _id = "#crOwnerFee_currency_currencyId";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "请选择币种！", _id);
		Editorial.CrOwnerFee.validate_flag = false;
	}
};

Editorial.CrOwnerFee.validate_fixfeeVal = function() {
	var _id = "#crOwnerFee_fixfeeVal";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "费用不能为空！", _id);
		Editorial.CrOwnerFee.validate_flag = false;
	}
};

Editorial.CrOwnerFee.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrOwnerFee.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrOwnerFee.onload = function() {
	$("#crOwnerFee_rlOwner_rlownerId").val($("#crOwner_rlownerId").val());
	
	var options = {
		beforeSubmit : Editorial.CrOwnerFee.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInFrame("Editorial.CrOwner.prepaidAndExpensesDataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrOwnerFee.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crOwnerFee/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crOwnerFeeForm").ajaxForm(options);
	
};

$(function() {
	Editorial.CrOwnerFee.onload();
});