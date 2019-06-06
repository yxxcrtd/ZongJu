Editorial.Material.validate = function() {
	var flag = true;
	if (!Editorial.PrintCosts.isNullOrName()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrice()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrGrams()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrType()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrSpec()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrNum()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPaperType()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrStockCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrStockId()) {
		flag = false;
	}
	return flag;
};

Editorial.Material.showResponse = function(response, statusText) {
	Editorial.Material.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
        refreshFrameDataTableInFrame('Editorial.EPrint.oTable2');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Material.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.Material.validate,
		success : Editorial.Material.showResponse,
		url : $('#ctx').val() + "/pages/productMaterial/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#materialForm').ajaxForm(options);
});

Editorial.Material.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Material.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};
//*****************************************
Editorial.PrintCosts.isNullOrName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").removeClass("success").addClass("error");
		$("#nameSpan").html("请输入名称");
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
Editorial.PrintCosts.isNullOrGrams = function() {
	if ($("#grams").val() == "") {
		$("#gramsDiv").removeClass("success").addClass("error");
		$("#gramsSpan").html("请输入克重");
		return false;
	} else {
		$("#gramsDiv").removeClass("error").addClass("success");
		$("#gramsSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrType = function() {
	if ($("#type").val() == "") {
		$("#typeDiv").removeClass("success").addClass("error");
		$("#typeSpan").html("请选择类型");
		return false;
	} else {
		$("#typeDiv").removeClass("error").addClass("success");
		$("#typeSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrSpec = function() {
	if ($("#spec").val() == "") {
		$("#specDiv").removeClass("success").addClass("error");
		$("#specSpan").html("请选择规格");
		return false;
	} else {
		$("#specDiv").removeClass("error").addClass("success");
		$("#specSpan").html("");
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
Editorial.PrintCosts.isNullOrPaperType = function() {
	if ($("#paperType").val() == "") {
		$("#paperTypeDiv").removeClass("success").addClass("error");
		$("#paperTypeSpan").html("请选择类型");
		return false;
	} else {
		$("#paperTypeDiv").removeClass("error").addClass("success");
		$("#paperTypeSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrStockCount = function() {
	if ($("#stockCount").val() == "") {
		$("#stockCountDiv").removeClass("success").addClass("error");
		$("#stockCountSpan").html("请输入库存");
		return false;
	} else {
		$("#stockCountDiv").removeClass("error").addClass("success");
		$("#stockCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrStockId = function() {
	if ($("#stockId").val() == "") {
		$("#stockIdDiv").removeClass("success").addClass("error");
		$("#stockIdSpan").html("请输入库存");
		return false;
	} else {
		$("#stockIdDiv").removeClass("error").addClass("success");
		$("#stockIdSpan").html("");
		return true;
	}
};