/* ***************************************** 验证开始
 * *************************************************************
 */
var orderFlag = false;
Editorial.CRM.CorpTypePropClassify.validate = function() {
	var flag = true;
//	if (!Editorial.CRM.CorpTypePropClassify.order()) {
//		flag = false;
//	}
//	if (!Editorial.CRM.CorpTypePropClassify.code()) {
//		flag = false;
//	}
//	if (!Editorial.CRM.CorpTypePropClassify.name()) {
//		flag = false;
//	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.CorpTypePropClassify.code = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
		$("#codeDiv").removeClass("error").addClass("success");
		$("#codeSpan").html("通过验证");	}
		return true;
};
/**
 * ***************************************** 验证Code结束
 * *************************************************************
 */
///**
// * ***************************************** 验证name开始
// * *************************************************************
// */
//Editorial.CRM.CorpTypePropClassify.name = function() {
//	if ($("#name").val() == "") {
//		$("#nameDiv").addClass("error");
//		$("#nameSpan").html("name不能为空！");
//		return false;
//	} else {
//		$("#nameDiv").removeClass("error").addClass("success");
//		$("#nameSpan").html("通过验证");
//		return true;
//	}
//};
///**
// * ***************************************** 验证name结束
// * *************************************************************
// */
/**
 * ***************************************** 验证order开始
 * *************************************************************
 */
Editorial.CRM.CorpTypePropClassify.order = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	}
//	else {
//		$("#orderDiv").removeClass("error").addClass("success");
//		$("#orderSpan").html("通过验证");	}
//		return true;
	else {
		Editorial.CRM.CorpTypePropClassify.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};
/**
 * ***************************************** 验证order结束
 * *************************************************************
 */

Editorial.CRM.CorpTypePropClassify.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/product/structureTypePropClassify/form/orderUnique?id="+$("#classifyId").val()+"&tid="+$("#tid").val(),
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


Editorial.CRM.CorpTypePropClassify.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.CorpTypePropClassify.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.CorpTypePropClassify.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.CRM.CorpTypePropClassify.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CRM.CorpTypePropClassify.enableAllButton();
	}
}

$(function() {
	var options = {
		beforeSubmit:Editorial.CRM.CorpTypePropClassify.validate,
		success : Editorial.CRM.CorpTypePropClassify.showResponse,
		url :  $('#ctx').val()+'/pages/product/structureTypePropClassify/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000,
	};
	$('#structureTypePropClassifyForm').ajaxForm(options);
});