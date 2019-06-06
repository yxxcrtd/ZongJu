function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}
function validateInt(int){
	if(/^\d{1,11}$/gi.test(int)){
		return true;
	} 
	return false;
}
/******************************************** 验证价格折扣 start*****************************************/
/******************************************** 验证价格折扣数量 start*****************************************/
Editorial.PriceDiscount.validatePriceDiscountCount = function() {
	if ($("#priceDiscountCount").val().trim() == "") {
		$("#priceDiscountCountDiv").addClass("error");
		$("#priceDiscountCountSpan").html("该字段不能为空");
		return false;
	}else if(!validateInt($("#priceDiscountCount").val().trim())) {
		$("#priceDiscountCountDiv").addClass("error");
		$("#priceDiscountCountSpan").html("请输入数值类型");
		return false;
	}
	$("#priceDiscountCountDiv").removeClass("error").addClass("success");
	$("#priceDiscountCountSpan").html("");
	return true;
};
/******************************************** 验证价格折扣数量 end*****************************************/
/******************************************** 验证价格折扣值 start*****************************************/
Editorial.PriceDiscount.validatePriceDiscountValue = function() {
	if ($("#priceDiscountValue").val().trim() == "") {
		$("#priceDiscountValueDiv").addClass("error");
		$("#priceDiscountValueSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#priceDiscountValue").val().trim())) {
		$("#priceDiscountValueDiv").addClass("error");
		$("#priceDiscountValueSpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#priceDiscountValueDiv").removeClass("error").addClass("success");
	$("#priceDiscountValueSpan").html("");
	return true;
};
/******************************************** 验证价格折扣值 end*****************************************/
/******************************************** 验证价格折扣分类 start*****************************************/
Editorial.PriceDiscount.validatePriceDiscountType = function(){
	if ($("#priceDiscountType option:selected").val() == "") {
		$("#priceDiscountTypeDiv").addClass("error");
		$("#priceDiscountTypeSpan").html("该字段不能为空 ");
		return false;
	} else {
		Editorial.PriceDiscount.validatePriceTypeUnique();
		if(discountTypeValidateFlag==true){
			return true;
		} else {
			return false;
		}
	}
};
Editorial.PriceDiscount.validatePriceTypeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/productPriceDiscount/form/typeUnique",
		data : {
			id:$("#id").val(),
			priceId: $("#priceId").val(),
			priceDiscountType : $("#priceDiscountType option:selected").val().trim()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#priceDiscountTypeDiv").removeClass("error").addClass("success");
				$("#priceDiscountTypeSpan").html("通过验证");
				discountTypeValidateFlag = true;
			} else {
				$("#priceDiscountTypeDiv").removeClass("success").addClass("error");
				$("#priceDiscountTypeSpan").html("请此产品价格的折扣分类一致");
				discountTypeValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************** 验证价格折扣分类 end*****************************************/


/******************************************** 验证价格折扣 end*****************************************/
/******************************************** 添加价格折扣 start*****************************************/
Editorial.PriceDiscount.validate = function(){
	var flag = true;
	if(!Editorial.PriceDiscount.validatePriceDiscountCount()){
		flag = false;
	}
	
	if(!Editorial.PriceDiscount.validatePriceDiscountValue()){
		flag = false;
	}

	if(!flag){
		return false;
	}
	
};
/******************************************** 添加价格折扣 end*****************************************/
Editorial.PriceDiscount.showResponse = function(response, statusText){
	Editorial.PriceDiscount.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInFrame('Editorial.PriceDiscount.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.PriceDiscount.enableAllButton();
	}
};

Editorial.PriceDiscount.disableAllButton = function() {
	$("#saveDiscount").attr('disabled', "true");
	$("#resetDiscount").attr('disabled', "true");
};

Editorial.PriceDiscount.enableAllButton = function() {
	$("#saveDiscount").attr('disabled', "false");
	$("#resetDiscount").attr('disabled', "false");
};

$(function() {
	var options = {
			beforeSubmit:Editorial.PriceDiscount.validate,
			success : Editorial.PriceDiscount.showResponse,
			url :  $('#ctx').val()+'/pages/productPriceDiscount/form/editSubmit',
			type : 'post',
			clearForm : false,
			timeout : 3000
		};

	$('#discountForm').ajaxForm(options);
});