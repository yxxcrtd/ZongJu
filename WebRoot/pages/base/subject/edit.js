/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var digitalExpression = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
var nameValidateFlag = false;
var orderFlag = true;
BMEP.Base.Subject.validate = function() {
	var flag = true;
	if (!BMEP.Base.Subject.validateName()) {
		flag = false;
	}
	if (!BMEP.Base.Subject.validateCode()) {
		flag = false;
	}
	if(!BMEP.Base.Subject.validateOrder()){
		flag = false;
	}
	return flag;
};
/**
 * ***************** 验证Name开始 ************************
 */
BMEP.Base.Subject.validateName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("名称不能为空！");
		return false;
	}
	$("#nameDiv").removeClass("error");
	$("#nameSpan").html("");
	return true;
};

/**
 * ***************** 验证Name结束 ************************
 */
/**
 * ***************** 验证code开始 *************************
 */
BMEP.Base.Subject.validateCode = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("编号不能为空！");
		return false;
	}
	$("#codeDiv").removeClass("error");
	$("#codeSpan").html("");
	return true;
};

BMEP.Base.Subject.validateOrder = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("序号不能为空！");
		return false;
	}else {
		BMEP.Base.Subject.orderUnique();
		return orderFlag;
	}
};
/**
 * ***************** 验证Link结束 *************************
 */

BMEP.Base.Subject.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/base/subject/form/orderUnique",
		data : {
			id : $("#id").val(),
			order : $("#order").val(),
			fatherId : $("#fatherId").val()
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

/**
 * ***************** 验证结束 *************************
 */
BMEP.Base.Subject.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Base.Subject.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.Base.Subject.showResponse = function(response, statusText) {
	BMEP.Base.Subject.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		if (response.flag != "tree") {
			refreshFrameDataTableInLayer('BMEP.Base.Subject.oTable1');
			autoCloseCommonModal(5);
		} else {
			//alert(response.node);
			autoCloseCommonModal(5);
			updateTree("BMEP.Base.Subject.Show.zTree", response.node);
		}
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Base.Subject.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : BMEP.Base.Subject.validate,
		success : BMEP.Base.Subject.showResponse,
		url :  $('#ctx').val() +'/pages/base/subject/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#addForm').ajaxForm(options);
	
});
