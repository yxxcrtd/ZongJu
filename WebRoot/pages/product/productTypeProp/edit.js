var orderFlag = false;
BMEP.Product.ProductTypeProp.validate = function() {
	var flag = true;
	if (!BMEP.Product.ProductTypeProp.order()) {
		flag = false;
	}
	return flag;
};

/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
BMEP.Product.ProductTypeProp.order = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	} else {
		BMEP.Product.ProductTypeProp.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.Product.ProductTypeProp.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/productTypeProp/form/orderUnique?id="+$("#id").val()+"&tid="+$("#tid").val(),
		data : {
			order : $("#order").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#orderDiv").removeClass("error").addClass("success");
				$("#orderSpan").html(response.msg);
				orderFlag = true;
			} else {
				$("#orderDiv").removeClass("success").addClass("error");
				$("#orderSpan").html(response.msg);
				orderFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};


BMEP.Product.ProductTypeProp.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Product.ProductTypeProp.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.Product.ProductTypeProp.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Product.ProductTypeProp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	BMEP.Product.ProductTypeProp.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:BMEP.Product.ProductTypeProp.disableAllButton,
		success : BMEP.Product.ProductTypeProp.showResponse,
		url :  $('#ctx').val()+'/pages/productTypeProp/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#productTypePropForm').ajaxForm(options);
	
	hider();
	$("#display").change(function(){
		hider();
	});
	function hider(){
	var at=$("#display").val();				
	if(at==1){
		$("#diveffective").show();
	}else{
		$("#diveffective").hide();
	}
}
});