var orderFlag = false;
Editorial.CRM.CorpTypeProp.validate = function() {
	var flag = true;
//	if (!Editorial.CRM.CorpTypeProp.order()) {
//		flag = false;
//	}
//	if (!Editorial.CRM.CorpTypeProp.classify()) {
//		flag = false;
//	}
	return flag;
};
//

/*
 * *****************************************
 * 验证类型属性分类开始*********************************************
 */
Editorial.CRM.CorpTypeProp.classify = function() {
	if ($("#typePropClassify").val().trim() == "") {
		$("#typePropClassifyDiv").addClass("error");
		$("#typePropClassifySpan").html("公司类型属性分类不能为空！");
		return false;
	} else {
		$("#typePropClassifyDiv").removeClass("error").addClass("success");
		$("#typePropClassifySpan").html("");
		return true;
	}
};
/*
 * *****************************************
 * 验证类型属性分类结束*********************************************
 */

/**
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.CorpTypeProp.order = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	} else {
		Editorial.CRM.CorpTypeProp.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.CRM.CorpTypeProp.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/product/structureTypeProp/form/orderUnique?id="
				+ $("#id").val() + "&tid=" + $("#tid").val(),
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

Editorial.CRM.CorpTypeProp.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.CorpTypeProp.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.CorpTypeProp.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.CRM.CorpTypeProp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.CRM.CorpTypeProp.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CRM.CorpTypeProp.validate,
		success : Editorial.CRM.CorpTypeProp.showResponse,
		url : $('#ctx').val() + '/pages/product/structureTypeProp/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$("#structureTypePropForm").ajaxForm(options);

	hider();
	$("#display").change(function() {
		hider();
	});
	function hider() {
		var at = $("#display").find("option:selected").text();
		if (at == "下拉框" || at == "按钮" || at == "列表") {
			$("#diveffective").show();
		} else {
			$("#diveffective").hide();
		}
	}
});