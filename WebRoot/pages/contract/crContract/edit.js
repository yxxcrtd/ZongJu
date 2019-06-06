Editorial.Contract.validate = function() {
	var flag = true;
	if (!Editorial.Contract.validateContractName()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractType()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractDate()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractSource()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractReason()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractExpired()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractDays()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractLicenseDuration()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractLicenseStartOn()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractLicenseEndOn()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractLicenseOption()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractAuthorCount()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractProxyCount()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractBailAmount()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractMaxAmount()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractMinAmount()) {
		flag = false;
	}
	if (!Editorial.Contract.validateContractProxyAmount()) {
		flag = false;
	}
	return flag;
};


/******************************************* 验证合同开始 **************************************************************/
/******************************************* 验证contractName开始 **************************************************************/
Editorial.Contract.validateContractName = function() {
	if ($("#contractName").val().trim() == "") {
		$("#contractNameDiv").addClass("error");
		$("#contractNameSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractNameDiv").removeClass("error").addClass("success");
		$("#contractNameSpan").html("");
		return true;
	}
};
/******************************************* 验证contractName结束 **************************************************************/

/******************************************* 验证contractType开始 **************************************************************/
Editorial.Contract.validateContractType = function() {
	if ($("#contractType option:selected").val().trim() == "") {
		$("#contractTypeDiv").addClass("error");
		$("#contractTypeSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractTypeDiv").removeClass("error").addClass("success");
		$("#contractTypeSpan").html("");
		return true;
	}
};
/******************************************* 验证contractType结束 **************************************************************/

/******************************************* 验证contractDate开始 **************************************************************/
Editorial.Contract.validateContractDate = function() {
	if ($("#contractDate").val().trim() == "") {
		$("#contractDateDiv").addClass("error");
		$("#contractDateSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractDateDiv").removeClass("error").addClass("success");
		$("#contractDateSpan").html("");
		return true;
	}
};
/******************************************* 验证contractDate结束 **************************************************************/

/******************************************* 验证contractSource开始 **************************************************************/
Editorial.Contract.validateContractSource = function() {
	if ($("#contractSource").val().trim() == "") {
		$("#contractSourceDiv").addClass("error");
		$("#contractSourceSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractSourceDiv").removeClass("error").addClass("success");
		$("#contractSourceSpan").html("");
		return true;
	}
};
/******************************************* 验证contractSource结束 **************************************************************/

/******************************************* 验证contractReason开始 **************************************************************/
Editorial.Contract.validateContractReason = function() {
	if ($("#contractReason").val().trim() == "") {
		$("#contractReasonDiv").addClass("error");
		$("#contractReasonSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractReasonDiv").removeClass("error").addClass("success");
		$("#contractReasonSpan").html("");
		return true;
	}
};
/******************************************* 验证contractReason结束 **************************************************************/

/******************************************* 验证contractExpired开始 **************************************************************/
Editorial.Contract.validateContractExpired = function() {
	if ($("#contractExpired").val().trim() == "") {
		$("#contractExpiredDiv").addClass("error");
		$("#contractExpiredSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractExpiredDiv").removeClass("error").addClass("success");
		$("#contractExpiredSpan").html("");
		return true;
	}
};
/******************************************* 验证contractExpired结束 **************************************************************/

/******************************************* 验证contractDays开始 **************************************************************/
Editorial.Contract.validateContractDays = function() {
	if ($("#contractDays").val().trim() == "") {
		$("#contractDaysDiv").addClass("error");
		$("#contractDaysSpan").html("该字段不能为空");
		return false;
	}else if(!validateInt($("#contractDays").val().trim())){
		$("#contractDaysDiv").addClass("error");
		$("#contractDaysSpan").html("请填入数值类型");
		return false;
	}
	$("#contractDaysDiv").removeClass("error").addClass("success");
	$("#contractDaysSpan").html("");
	return true;
};
/******************************************* 验证contractDays结束 **************************************************************/

/******************************************* 验证contractLicenseDuration开始 **************************************************************/
Editorial.Contract.validateContractLicenseDuration = function() {
	if ($("#contractLicenseDuration").val().trim() == "") {
		$("#contractLicenseDurationDiv").addClass("error");
		$("#contractLicenseDurationSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractLicenseDurationDiv").removeClass("error").addClass("success");
		$("#contractLicenseDurationSpan").html("");
		return true;
	}
};
/******************************************* 验证contractLicenseDuration结束 **************************************************************/

/******************************************* 验证contractLicenseStartOn开始 **************************************************************/
Editorial.Contract.validateContractLicenseStartOn = function() {
	if ($("#contractLicenseStartOn").val().trim() == "") {
		$("#contractLicenseStartOnDiv").addClass("error");
		$("#contractLicenseStartOnSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractLicenseStartOnDiv").removeClass("error").addClass("success");
		$("#contractLicenseStartOnSpan").html("");
		return true;
	}
};
/******************************************* 验证contractLicenseStartOn结束 **************************************************************/

/******************************************* 验证contractLicenseEndOn开始 **************************************************************/
Editorial.Contract.validateContractLicenseEndOn = function() {
	if ($("#contractLicenseEndOn").val().trim() == "") {
		$("#contractLicenseEndOnDiv").addClass("error");
		$("#contractLicenseEndOnSpan").html("该字段不能为空");
		return false;
	}else  if(!checkDateTime($("#contractLicenseStartOn").val(),$("#contractLicenseEndOn").val() )){
		$("#contractLicenseEndOnDiv").addClass("error");
		$("#contractLicenseEndOnSpan").html("价格结束日期要晚于开始日期");
		return false;
	}
	$("#contractLicenseEndOnDiv").removeClass("error").addClass("success");
	$("#contractLicenseEndOnSpan").html("");
	return true;
};
/******************************************* 验证contractLicenseEndOn结束 **************************************************************/

/******************************************* 验证contractLicenseOption开始 **************************************************************/
Editorial.Contract.validateContractLicenseOption= function() {
	if ($("#contractLicenseOption").val().trim() == "") {
		$("#contractLicenseOptionDiv").addClass("error");
		$("#contractLicenseOptionSpan").html("该字段不能为空");
		return false;
	}else {
		$("#contractLicenseOptionDiv").removeClass("error").addClass("success");
		$("#contractLicenseOptionSpan").html("");
		return true;
	}
};
/******************************************* 验证contractLicenseOption结束 **************************************************************/

/******************************************* 验证contractAuthorCount开始 **************************************************************/
Editorial.Contract.validateContractAuthorCount = function() {
	if ($("#contractAuthorCount").val().trim() == "") {
		$("#contractAuthorCountDiv").addClass("error");
		$("#contractAuthorCountSpan").html("该字段不能为空");
		return false;
	}else  if(!validateInt($("#contractAuthorCount").val().trim())){
		$("#contractAuthorCountDiv").removeClass("error").addClass("success");
		$("#contractAuthorCountSpan").html("请填入数值类型");
		return true;
	}
	
	$("#contractAuthorCountDiv").removeClass("error").addClass("success");
	$("#contractAuthorCountSpan").html("");
	return true;
};
/******************************************* 验证contractAuthorCount结束 **************************************************************/

/******************************************* 验证contractProxyCount开始 **************************************************************/
Editorial.Contract.validateContractProxyCount = function() {
	if ($("#contractProxyCount").val().trim() == "") {
		$("#contractProxyCountDiv").addClass("error");
		$("#contractProxyCountSpan").html("该字段不能为空");
		return false;
	}else if(!validateInt($("#contractProxyCount").val().trim())){
		$("#contractProxyCountDiv").addClass("error");
		$("#contractProxyCountSpan").html("请填入数值类型");
		return false;
	}
		$("#contractProxyCountDiv").removeClass("error").addClass("success");
		$("#contractProxyCountSpan").html("");
		return true;
	
};
/******************************************* 验证contractProxyCount结束 **************************************************************/

/******************************************* 验证contractBailAmount开始 **************************************************************/
Editorial.Contract.validateContractBailAmount = function() {
	if ($("#contractBailAmount").val().trim() == "") {
		$("#contractBailAmountDiv").addClass("error");
		$("#contractBailAmountSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#contractBailAmount").val().trim())){
		$("#contractBailAmountDiv").addClass("error");
		$("#contractBailAmountSpan").html("请填入数值类型(最多包含两位小数)");
		return false;
	}
		$("#contractBailAmountDiv").removeClass("error").addClass("success");
		$("#contractBailAmountSpan").html("");
		return true;
};
/******************************************* 验证contractBailAmount结束 **************************************************************/

/******************************************* 验证contractMaxAmount开始 **************************************************************/
Editorial.Contract.validateContractMaxAmount = function() {
	if ($("#contractMaxAmount").val().trim() == "") {
		$("#contractMaxAmountDiv").addClass("error");
		$("#contractMaxAmountSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#contractMaxAmount").val().trim())){
		$("#contractBailAmountDiv").addClass("error");
		$("#contractBailAmountSpan").html("请填入数值类型(最多包含两位小数)");
		return false;
	}
		$("#contractMaxAmountDiv").removeClass("error").addClass("success");
		$("#contractMaxAmountSpan").html("");
		return true;
	
};
/******************************************* 验证contractMaxAmount结束 **************************************************************/

/******************************************* 验证contractMinAmount开始 **************************************************************/
Editorial.Contract.validateContractMinAmount = function() {
	if ($("#contractMinAmount").val().trim() == "") {
		$("#contractMinAmountDiv").addClass("error");
		$("#contractMinAmountSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#contractMinAmount").val().trim())){
		$("#contractMinAmountDiv").addClass("error");
		$("#contractMinAmountSpan").html("请填入数值类型(最多包含两位小数)");
		return false;
	} 
		$("#contractMinAmountDiv").removeClass("error").addClass("success");
		$("#contractMinAmountSpan").html("");
		return true;
	
};
/******************************************* 验证contractMinAmount结束 **************************************************************/

/******************************************* 验证contractProxyAmount开始 **************************************************************/
Editorial.Contract.validateContractProxyAmount = function() {
	if ($("#contractProxyAmount").val().trim() == "") {
		$("#contractProxyAmountDiv").addClass("error");
		$("#contractProxyAmountSpan").html("该字段不能为空");
		return false;
	}else if(!validateDecial($("#contractProxyAmount").val().trim())){
		$("#contractProxyAmountDiv").addClass("error");
		$("#contractProxyAmountSpan").html("请填入数值类型(最多包含两位小数)");
		return false;
	} 
		$("#contractProxyAmountDiv").removeClass("error").addClass("success");
		$("#contractProxyAmountSpan").html("");
		return true;
	
};
/******************************************* 验证contractProxyAmount结束 **************************************************************/

/******************************************* 验证合同结束 **************************************************************/
function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}
function validateInt(int){
	if(/^\d{1,11}$/gi.test(int)){
		return true;
	} 
	return false;
}
function splitDate(date){
	if(date.indexOf(' ') != -1){
		return date.substring(0, date.indexOf(' '));
	} else {
		return date;
	}
}
/** 比较开始日期比结束日期 若晚则返回false, 反之亦然*/
function checkDateTime(beginValue,endValue){
    var flag=false;
    if(beginValue!=null && beginValue!="" && endValue!=null && endValue!=""){
        var dateS=(splitDate(beginValue)).split('-');//日期是用'-'分隔
        var dateE=(splitDate(endValue)).split('-');
        var beginDate=new Date(dateS[0],dateS[1],dateS[2]).getTime();//如果日期格式不是年月日,需要把new Date的参数调整
        var endDate=new Date(dateE[0],dateE[1],dateE[2]).getTime();
        if(beginDate>endDate){
           flag = false;
        } else {
          flag = true;
        }
    }
    return flag;
}

Editorial.Contract.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Contract.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.Contract.showResponse = function(response, statusText){
	Editorial.Contract.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Contract.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Contract.enableAllButton();
	}
};