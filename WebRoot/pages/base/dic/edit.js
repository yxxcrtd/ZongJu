BMEP.Dic.validate = function() {
	var flag = true;
	if (!BMEP.Dic.code()) {
		flag = false;
	}
	if (!BMEP.Dic.order()) {
		flag = false;
	}
	return flag;
};

BMEP.Dic.code = function(id) {
	var id0 = id;
	if(id == undefined){
		 id0 = "";
	}
	if ($("#code").val() == "") {
		$("#codeDiv").addClass("error");
		$("#codeSpan").html("code不能为空！");
		return false;
	} else {
		BMEP.Dic.codeUnique(id0);
		if (codeFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.Dic.codeUnique = function(id) {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/dic/form/codeUnique?id="+$("#id").val()+"&classId="+$("#classId").val(),
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
 * order check
 */
BMEP.Dic.order = function(id) {
	var id0 = id;
	if(id == undefined){
		 id0 = "";
	}
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	} else {
		BMEP.Dic.orderUnique(id0);
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.Dic.orderUnique = function(id) {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/dic/form/orderUnique?id="+$("#id").val()+"&classId="+$("#classId").val(),
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

BMEP.Dic.showResponse = function(response, statusText) {
	BMEP.Dic.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Dic.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Dic.enableAllButton();
	}
};

$(function() {
	var options = {
		beforeSubmit : BMEP.Dic.validate,
		success : BMEP.Dic.showResponse,
		url : $('#ctx').val() + "/pages/dic/form/editSubmit",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#DicForm').ajaxForm(options);
});

BMEP.Dic.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Dic.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};