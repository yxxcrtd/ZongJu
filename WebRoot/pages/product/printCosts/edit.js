Editorial.PrintCosts.validate = function() {
	var flag = true;
	if (!Editorial.PrintCosts.isNullOrName()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrice()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrNum()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrUnit()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrTotal()) {
		flag = false;
	}
	return flag;
};

Editorial.PrintCosts.showResponse = function(response, statusText) {
	Editorial.PrintCosts.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
        refreshFrameDataTableInFrame('Editorial.EPrint.oTable3');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.PrintCosts.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.PrintCosts.validate,
		success : Editorial.PrintCosts.showResponse,
		url : $('#ctx').val() + "/pages/printCosts/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#printCostsForm').ajaxForm(options);
});

Editorial.PrintCosts.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.PrintCosts.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.PrintCosts.isNullOrName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").removeClass("success").addClass("error");
		$("#nameSpan").html("请选择项目");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrice = function() {
	if ($("#price").val() == "") {
		$("#priceDiv").removeClass("success").addClass("error");
		$("#priceSpan").html("请输入单价");
		return false;
	} else {
		$("#priceDiv").removeClass("error").addClass("success");
		$("#priceSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrNum = function() {
	if ($("#num").val() == "") {
		$("#numDiv").removeClass("success").addClass("error");
		$("#numSpan").html("请输入数量");
		return false;
	} else {
		$("#numDiv").removeClass("error").addClass("success");
		$("#numSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrUnit = function() {
	if ($("#unit").val() == "") {
		$("#unitDiv").removeClass("success").addClass("error");
		$("#unitSpan").html("请输入单位");
		return false;
	} else {
		$("#unitDiv").removeClass("error").addClass("success");
		$("#unitSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrTotal = function() {
	if ($("#total").val() == "") {
		$("#totalDiv").removeClass("success").addClass("error");
		$("#totalSpan").html("请输入总价");
		return false;
	} else {
		$("#totalDiv").removeClass("error").addClass("success");
		$("#totalSpan").html("");
		return true;
	}
};
