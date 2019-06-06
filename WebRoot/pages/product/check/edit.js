Editorial.Check.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Check.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

/******************************************** 验证校对程序卡 start*****************************************/
Editorial.Check.validate = function() {
	
	var flag = true;
	if(!Editorial.Check.validateCheckType()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckStartOn()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckEndOn()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckBy()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckResponsibleBy()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckEditorBy()){
		flag = false;
	}
	if(!Editorial.Check.validateCheckPrintBy()){
		flag = false;
	}
	console.log(flag);
	return flag;
};

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
/******************************************** 验证校对程序卡类型 start*****************************************/
Editorial.Check.validateCheckType = function() {
	if ($("#checkType option:selected").val().trim() == "") {
		$("#checkTypeDiv").addClass("error");
		$("#checkTypeSpan").html("该字段不能为空");
		return false;
	} else {
		$("#checkTypeDiv").removeClass("error").addClass("success");
		$("#checkTypeSpan").html("");
		return true;
	}
};

/******************************************** 验证校对程序卡类型 end*****************************************/

/******************************************** 验证校对程序卡开始时间和结束时间 start*****************************************/
Editorial.Check.validateCheckStartOn = function() {
	if ($("#checkStartOn").val().trim() == "") {
		$("#checkStartOnDiv").addClass("error");
		$("#checkStartOnSpan").html("该字段不能为空");
		return false;
	}else {
		$("#checkStartOnDiv").removeClass("error").addClass("success");
		$("#checkStartOnSpan").html("");
		return true;
	}
};
Editorial.Check.validateCheckEndOn = function() {
	if ($("#checkEndOn").val().trim() == "") {
		$("#checkEndOnDiv").addClass("error");
		$("#checkEndOnSpan").html("该字段不能为空");
		return false;
	} else if(!checkDateTime($("#checkStartOn").val(),$("#checkEndOn").val() )){
		$("#checkEndOnDiv").addClass("error");
		$("#checkEndOnSpan").html("校对程序卡结束日期要晚于开始日期");
		return false;
	}
	$("#checkEndOnDiv").removeClass("error").addClass("success");
	$("#checkEndOnSpan").html("");
	return true;
};
/******************************************** 验证校对程序卡开始时间和结束时间 end*****************************************/
/******************************************** 验证校对程序卡人 start*****************************************/
Editorial.Check.validateCheckBy = function() {
	if ($("#checkBy").val().trim() == "") {
		$("#checkByDiv").addClass("error");
		$("#checkBySpan").html("该字段不能为空");
		return false;
	}else {
		$("#checkByDiv").removeClass("error").addClass("success");
		$("#checkBySpan").html("");
		return true;
	}
};
/******************************************** 验证校对程序卡人 end*****************************************/
/******************************************** 验证校对程序卡责任人 start*****************************************/
Editorial.Check.validateCheckResponsibleBy = function() {
	if ($("#checkResponsibleBy").val().trim() == "") {
		$("#checkResponsibleByDiv").addClass("error");
		$("#checkResponsibleBySpan").html("该字段不能为空");
		return false;
	}else {
		$("#checkResponsibleByDiv").removeClass("error").addClass("success");
		$("#checkResponsibleBySpan").html("");
		return true;
	}
};
/******************************************** 验证校对程序卡责任人 end*****************************************/
/******************************************** 验证校对程序卡所属地域 start*****************************************/
Editorial.Check.validateCheckEditorBy = function() {
	if ($("#checkEditorBy").val().trim() == "") {
		$("#checkEditorByDiv").addClass("error");
		$("#checkEditorBySpan").html("该字段不能为空");
		return false;
	} else {
		$("#checkEditorByDiv").removeClass("error").addClass("success");
		$("#checkEditorBySpan").html("");
		return true;
	}
};
/******************************************** 验证校对程序卡所属地域 end *****************************************/
/******************************************** 验证校对程序卡所属地域 start*****************************************/
Editorial.Check.validateCheckPrintBy = function() {
	if ($("#checkPrintBy").val().trim() == "") {
		$("#checkPrintByDiv").addClass("error");
		$("#checkPrintBySpan").html("该字段不能为空");
		return false;
	} else {
		$("#checkPrintByDiv").removeClass("error").addClass("success");
		$("#checkPrintBySpan").html("");
		return true;
	}
};
/******************************************** 验证校对程序卡所属地域 end *****************************************/

/******************************************** 验证校对程序卡 end*****************************************/
Editorial.Check.showResponse = function(response, statusText) {
	Editorial.Check.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		//刷新当前页面
		
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Check.enableAllButton();
	}
};
$(function() {
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Check.validateCheckStartOn();
	});
	$('#invoiceDate2').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Check.validateCheckEndOn();
	});
	
	 $(".on").click(function(){
			$(".on-down").slideToggle();
	});
	 
	 var options = {
			beforeSubmit:Editorial.Check.validate,
			success : Editorial.Check.showResponse,
			url :  $('#ctx').val()+'/pages/productCheck/form/editSubmit',
			type : 'post',
			clearForm : false,
			timeout : 3000
		};
	$('#checkForm').ajaxForm(options);
});