jQuery.namespace( 'BMEP.ProductTypeProp' );
var orderFlag = false;
BMEP.ProductTypeProp.validate = function() {
	var flag = true;
	if (!BMEP.ProductTypeProp.order()) {
		flag = false;
	}
	return flag;
};

/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
BMEP.ProductTypeProp.order = function() {
	if ($("#ctypePropOrder").val() == "") {
		$("#ctypePropOrderDiv").addClass("error");
		$("#ctypePropOrderSpan").html("ctypePropOrder不能为空！");
		return false;
	} else {
		BMEP.ProductTypeProp.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.ProductTypeProp.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/composingTypeProp/form/orderUnique?id="+$("#ctypePropId").val()+"&tid="+$("#tid").val(),
		data : {
			order : $("#ctypePropOrder").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#ctypePropOrderDiv").removeClass("error").addClass("success");
				$("#ctypePropOrderSpan").html(response.msg);
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

BMEP.ProductTypeProp.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.ProductTypeProp.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.ProductTypeProp.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.ProductTypeProp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	BMEP.ProductTypeProp.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:BMEP.ProductTypeProp.disableAllButton,
		success : BMEP.ProductTypeProp.showResponse,
		url :  $('#ctx').val()+'/pages/composingTypeProp/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#composingTypePropForm').ajaxForm(options);
});