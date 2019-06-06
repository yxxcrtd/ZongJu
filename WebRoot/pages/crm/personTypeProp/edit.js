var orderFlag = false;
Editorial.CRM.PersonTypeProp.validate = function() {
	var flag = true;
	if (!Editorial.CRM.PersonTypeProp.order()) {
		flag = false;
	}
	return flag;
};

/**  
 * ***************************************** 验证Code开始
 * *************************************************************
 */
Editorial.CRM.PersonTypeProp.order = function() {
	if ($("#order").val() == "") {
		$("#orderDiv").addClass("error");
		$("#orderSpan").html("order不能为空！");
		return false;
	} else {
		Editorial.CRM.PersonTypeProp.orderUnique();
		if (orderFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.CRM.PersonTypeProp.orderUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType" : 'json',
		url : $('#ctx').val() + "/pages/crm/personTypeProp/form/orderUnique?id="+$("#id").val()+"&tid="+$("#tid").val(),
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

Editorial.CRM.PersonTypeProp.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.PersonTypeProp.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

Editorial.CRM.PersonTypeProp.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.CRM.PersonTypeProp.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	Editorial.CRM.PersonTypeProp.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.CRM.PersonTypeProp.disableAllButton,
		success : Editorial.CRM.PersonTypeProp.showResponse,
		url :  $('#ctx').val()+'/pages/crm/personTypeProp/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#personTypePropForm').ajaxForm(options);
	
	hider();
	$("#display").change(function(){
		hider();
	});
	function hider() {
		var at = $("#display").find("option:selected").text();
		if (at == "下拉框") {
			$("#diveffective").show();
		} else {
			$("#diveffective").hide();
		}
}
});