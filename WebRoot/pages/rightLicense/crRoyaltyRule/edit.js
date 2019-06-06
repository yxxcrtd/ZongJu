Editorial.CrRoyaltyRule = function() {

};

Editorial.CrRoyaltyRule.validate_flag = true;

Editorial.CrRoyaltyRule.validate = function() {
	Editorial.CrRoyaltyRule.validate_flag = true;
	Editorial.CrRoyaltyRule.validate_royaltyRuleName();
	Editorial.CrRoyaltyRule.validate_royaltyRuleCode();
	return Editorial.CrRoyaltyRule.validate_flag;
};

Editorial.CrRoyaltyRule.validate_royaltyRuleName = function() {
	var _id = "#crRoyaltyRule_royaltyRuleName";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "规则名称不能为空！", _id);
		Editorial.CrRoyaltyRule.validate_flag = false;
	}
};

Editorial.CrRoyaltyRule.validate_royaltyRuleCode = function() {
	var _id = "#crRoyaltyRule_royaltyRuleCode";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "规则编号不能为空！", _id);
		Editorial.CrRoyaltyRule.validate_flag = false;
	}
};

Editorial.CrRoyaltyRule.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrRoyaltyRule.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrRoyaltyRule.onload = function() {
	var options = {
		beforeSubmit : Editorial.CrRoyaltyRule.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer("Editorial.CrRoyaltyRule.dataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrRoyaltyRule.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crRoyaltyRule/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crRoyaltyRuleForm").ajaxForm(options);
	
};

$(function() {
	Editorial.CrRoyaltyRule.onload();
});