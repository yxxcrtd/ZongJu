var txtFileFlag = false;
Editorial.CRM.PersonInfo.validate2 = function() {
	var flag = true;
	if (!Editorial.CRM.PersonInfo.validateUpload()) {
		flag = false;
	}
	return flag;
};

Editorial.CRM.PersonInfo.uploadShowResponse = function(response, statusText) {
	Editorial.CRM.PersonInfo.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
		//refreshCustomPropertyDataTable("cp1");
		refreshFrameDataTableInLayer('Editorial.CRM.PersonInfo.oTable1'); 
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.CRM.PersonInfo.enableAllButton();
	}
};

Editorial.CRM.PersonInfo.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.CRM.PersonInfo.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.CRM.PersonInfo.validateUpload = function() {
	if ($("#txtFile").val().trim() == "") {
		$("#txtFileDiv").addClass("error");
		$("#txtFileSpan").html("上传文件不能为空！");
		return false;
	}else{
		$("#txtFileDiv").removeClass("error");
		$("#txtFileSpan").html("");
		return true;
	}
};
Editorial.CRM.PersonInfo.validateUploadDown = function() {
	$("#txtFileSpan").html("");
	$("#txtFileDiv").removeClass("error");
};

$(function() {
	var options = {
		beforeSubmit : Editorial.CRM.PersonInfo.validate2,
		success : Editorial.CRM.PersonInfo.uploadShowResponse,
		url : $('#ctx').val() + '/pages/crm/personInfo/form/uploadSubmit',
		type : 'post',
		clearForm : false,
		timeout : 30000
	};
	$('#uploadProductTypeForm').ajaxForm(options);
});