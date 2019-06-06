/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var codeFlag = false;
BMEP.DicClass.validate = function() {
	var flag = true;
	if (!BMEP.DicClass.code()) {
		flag = false;
	}
	if (!BMEP.DicClass.typename()) {
		flag = false;
	}
	if (!BMEP.DicClass.internationCode()) {
		flag = false;
	}
	return flag;
};
/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
BMEP.DicClass.code = function() {
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
		BMEP.DicClass.codeUnique();
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.DicClass.codeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/dicClass/form/codeUnique?id="+$("#classId").val(),
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
BMEP.DicClass.typename = function() {
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
/**
 * ***************************************** 验证value开始
 * *************************************************************
 */
BMEP.DicClass.internationCode = function() {
	if ($("#internationCode").val() == "") {
		$("#internationCodeDiv").addClass("error");
		$("#internationCodeSpan").html("internationCode值不能为空！");
		return false;
	} else {
		$("#internationCodeDiv").removeClass("error").addClass("success");
		$("#internationCodeSpan").html("通过验证");
		return true;
	}
};
/**
 * ***************************************** 验证value结束
 * *************************************************************
 */


BMEP.DicClass.showResponse = function(response, statusText) {
	BMEP.DicClass.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.DicClass.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.DicClass.enableAllButton();
	}
};

$(function() {
	var url = $('#ctx').val() + "/pages/dicClass/form/editSubmit";
	var options = {
		beforeSubmit : BMEP.DicClass.validate,
		success : BMEP.DicClass.showResponse,
		url : url,
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#DicClassForm').ajaxForm(options);
});

BMEP.DicClass.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.DicClass.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};