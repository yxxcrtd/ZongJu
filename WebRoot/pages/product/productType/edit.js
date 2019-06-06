var codeFlag = false;
BMEP.ProductType.validate = function() {
	var flag = true;
	if (!BMEP.ProductType.code()) {
		flag = false;
	}
	if (!BMEP.ProductType.typeName()) {
		flag = false;
	}
	return flag;
};
BMEP.ProductType.code = function() {
	var regex = /^[0-9a-zA-Z]+$/;
	var val = $("#code").val();
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("分类编码不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("分类编码不能包含汉字");
	}else{
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
		url : $('#ctx').val() + "/pages/productType/form/codeUnique?id="+$("#typeId").val(),
		data : {
			code : $("#code").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#codeDiv").removeClass("error").addClass("success");
				$("#codeSpan").html(response.msg);
				codeFlag = true;
			} else {
				$("#codeDiv").removeClass("success").addClass("error");
				$("#codeSpan").html(response.msg);
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
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("分类名称不能为空！");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("通过验证");
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
		autoCloseCommonModal(3);
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
		url :  $('#ctx').val()+'/pages/productType/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#productTypeForm').ajaxForm(options);
});