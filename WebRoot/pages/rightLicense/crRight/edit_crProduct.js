Editorial.CrProduct = function() {

};

Editorial.CrProduct.validate_flag = true;

Editorial.CrProduct.validate = function() {
	Editorial.CrProduct.validate_flag = true;
	Editorial.CrProduct.validate_firstSaleDate();
	Editorial.CrProduct.validate_lastEndDate();
	return Editorial.CrProduct.validate_flag;
};

Editorial.CrProduct.validate_firstSaleDate = function() {
	var _id = "#crProduct_firstSaleDate";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "销售开始日期不能为空！", _id);
		Editorial.CrProduct.validate_flag = false;
	}
};

Editorial.CrProduct.validate_lastEndDate = function() {
	var _id = "#crProduct_lastEndDate";
	var _obj = $(_id);
	_obj.val(_obj.val().trim());
	if (_obj.val()) {
		showValidateMsg(true, "可以使用", _id);
	} else {
		showValidateMsg(false, "最后一期版税报告日期不能为空！", _id);
		Editorial.CrProduct.validate_flag = false;
	}
};

Editorial.CrProduct.disableAllButton = function() {
	$("#save").attr("disabled", true);
	$("#reset").attr("disabled", true);
};

Editorial.CrProduct.enableAllButton = function() {
	$("#save").removeAttr("disabled");
	$("#reset").removeAttr("disabled");
};

Editorial.CrProduct.selectProduct = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/crProduct/form/selectProduct";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CrProduct.onload = function() {
	var crRight_rlicenseId = invokeFrameElements("#crRight_rlicenseId").val(); // 授权ID
	$("#crProduct_right_rlicenseId").val(crRight_rlicenseId);
	
	var options = {
		beforeSubmit : Editorial.CrProduct.validate,
		success : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer("Editorial.CrRight.signedProductsDataTable");
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
			Editorial.CrProduct.enableAllButton();
		},
		url : $("#ctx").val() + "/pages/rightLicense/crProduct/form/editSubmit",
		type : "post",
		clearForm : false,
		timeout : 3000
	};
	$("#crProductForm").ajaxForm(options);
	
	$("#crProduct_firstSaleDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    	Editorial.CrProduct.validate_firstSaleDate();
    });
	
	$("#crProduct_lastEndDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    	Editorial.CrProduct.validate_lastEndDate();
    });
	
	$("#crProduct_coprightEndDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
	$("#crProduct_expiredDate_Date_Control").datetimepicker({
        language: "cn",
        pickTime: false
    }).on("changeDate", function (event) {
    });
	
};

$(function() {
	Editorial.CrProduct.onload();
});