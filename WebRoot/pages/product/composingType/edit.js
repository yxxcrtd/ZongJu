/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
BMEP.ProductType.validate = function() {
	var flag = true;

	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
BMEP.ProductType.code = function() {
	if ($("#ctypeCode").val() == "") {
		$("#ctypeCodeDiv").addClass("error");
		$("#ctypeCodeSpan").html("code不能为空！");
		return false;
	} else {
		BMEP.ProductType.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.ProductType.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/product/composingType/form/codeUnique?id="+$("#ctypeCode").val(),
		data : {
			code : $("#ctypeCode").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#ctypeCodeDiv").removeClass("error").addClass("success");
				$("#ctypeCodeSpan").html(response.msg);
				codeFlag = true;
			} else {
				$("#ctypeCodeDiv").removeClass("success").addClass("error");
				$("#ctypeCodeSpan").html(response.msg);
				codeFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/**
 * ***************************************** 验证Code结束
 * *************************************************************
 */
/**
 * ***************************************** 验证name开始
 * *************************************************************
 */
BMEP.ProductType.typeName = function() {
	if ($("#ctypeName").val() == "") {
		$("#ctypeNameDiv").addClass("error");
		$("#ctypeNameSpan").html("name不能为空！");
		return false;
	} else {
		$("#ctypeNameDiv").removeClass("error").addClass("success");
		$("#ctypeNameSpan").html("通过验证");
		return true;
	}
};

/**
 * ***************************************** 验证name结束
 * *************************************************************
 */

BMEP.ProductType.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.ProductType.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.ProductType.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		updateTree("BMEP.Product.ProductType.Tree.zTree", response.node);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	BMEP.ProductType.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:BMEP.ProductType.validate,
		success : BMEP.ProductType.showResponse,
		url :  $('#ctx').val()+'/pages/product/composingType/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#composingTypeForm').ajaxForm(options);
});