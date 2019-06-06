Editorial.CrFormula = function() {

};

Editorial.CrFormula.validate_flag = true;

Editorial.CrFormula.validate = function() {
	Editorial.CrFormula.validate_flag = true;
	Editorial.CrFormula.validate_breakPoint();
	Editorial.CrFormula.validate_rateValue();
	return Editorial.CrFormula.validate_flag;
};

Editorial.CrFormula.validate_breakPoint = function() {
	var _id = "#crFormula_breakPoint";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "分割值不能为空！", _id);
		Editorial.CrFormula.validate_flag = false;
	}
};

Editorial.CrFormula.validate_rateValue = function() {
	var _id = "#crFormula_rateValue";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "比率不能为空！", _id);
		Editorial.CrFormula.validate_flag = false;
	}
};

Editorial.CrFormula.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrFormula.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrFormula.onload = function() {
	var type = $("#crFormula_type").val();
	if (type == "1") {
		$("#crFormula_rlOwnerRoyalty_rloRoyaltyId").val($("#crOwnerRoyalty_rloRoyaltyId").val());
	}
	
	if (type == "2") {
		$("#crFormula_subsidaryRight_srlicenseId").val($("#id").val());
	}
	
	var options = {
		beforeSubmit : Editorial.CrFormula.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				if (type == "1") {
					refreshFrameDataTableInFrame("Editorial.CrOwnerRoyalty.crFormulaDataTable");
				}
				
				if (type == "2") {
					refreshFrameDataTableInFrame("Editorial.SubsidaryRight.crFormulaDataTable");
				}
				
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrFormula.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crFormula/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crFormulaForm").ajaxForm(options);
	
};

$(function() {
	Editorial.CrFormula.onload();
});