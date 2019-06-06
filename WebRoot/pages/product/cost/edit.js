Editorial.Cost.validate = function() {
	var flag = true;
	if(!Editorial.Cost.validateValue()){
		flag = false;
	}

	if(!Editorial.Cost.validateName()){
		flag = false;
	}

	if(!Editorial.Cost.validateClassify()){
		flag = false;
	}

	return flag;
};

function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}
Editorial.Cost.validateValue = function(){
	if ($("#value").val().trim() == "") {
		$("#valueDiv").addClass("error");
		$("#valueSpan").html("该字段不能为空");
		return false;
	} else if(!validateDecial($("#value").val().trim())) {
			$("#valueDiv").addClass("error");
			$("#valueSpan").html("请输入数值类型(最多含两位小数)");
			return false;
	}
	$("#valueDiv").removeClass("error").addClass("success");
	$("#valueSpan").html("");
	return true;
	
};

Editorial.Cost.validateName = function(){
	if ($("#name").val().trim() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("该字段不能为空");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("");
		return true;
	}
};

Editorial.Cost.validateClassify = function(){
	if ($("#classify option:selected").val().trim() == "") {
		$("#classifyDiv").addClass("error");
		$("#classifySpan").html("该字段不能为空");
		return false;
	} else {
		$("#classifyDiv").removeClass("error").addClass("success");
		$("#classifySpan").html("");
		return true;
	}
};

Editorial.Cost.showResponse = function(response, statusText) {
	Editorial.Cost.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Cost.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : Editorial.Cost.validate,
		success : Editorial.Cost.showResponse,
		url : $('#ctx').val() + "/pages/productCost/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#costForm').ajaxForm(options);
});

Editorial.Cost.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Cost.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};