/* ***************************************** 验证开始
 * *************************************************************
 */
var orderFlag = false;
BMEP.PTypePropClassify.validate = function() {
	var flag = true;
	if (!BMEP.PTypePropClassify.order()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
BMEP.PTypePropClassify.order = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	} else {
		BMEP.PTypePropClassify.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.PTypePropClassify.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/pTypePropClassify/form/orderUnique?id="+$("#classifyId").val()+"&tid="+$("#tid").val(),
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


BMEP.PTypePropClassify.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.PTypePropClassify.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.PTypePropClassify.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.PTypePropClassify.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.PTypePropClassify.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit:BMEP.PTypePropClassify.validate,
		success : BMEP.PTypePropClassify.showResponse,
		url :  $('#ctx').val()+'/pages/pTypePropClassify/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000,
	};
	$('#pTypePropClassifyForm').ajaxForm(options);
});