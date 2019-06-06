/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
Editorial.knowledgeHierarchy.validate = function() {
//	Editorial.knowledgeHierarchy.disableAllButton();
	var flag = true;
	if (!Editorial.knowledgeHierarchy.code()) {
		flag = false;
	}
	if (!Editorial.knowledgeHierarchy.typeName()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.knowledgeHierarchy.code = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
        Editorial.knowledgeHierarchy.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.knowledgeHierarchy.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/knowledgeHierarchy/form/codeUnique",
		data : {
			code : $("#code").val(),
            id: $("#id").val()
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
Editorial.knowledgeHierarchy.typeName = function() {
	if ($("#name").val() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("name不能为空！");
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

Editorial.knowledgeHierarchy.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.knowledgeHierarchy.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.knowledgeHierarchy.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		updateTree("Editorial.knowledgeHierarchy.Tree.zTree", response.node);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
    Editorial.knowledgeHierarchy.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.knowledgeHierarchy.validate,
		success : Editorial.knowledgeHierarchy.showResponse,
		url :  $('#ctx').val()+'/pages/knowledgeHierarchy/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#productTypeForm').ajaxForm(options);
});