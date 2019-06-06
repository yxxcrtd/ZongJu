//验证
validate = function() {
	var flag = true;
	
	if(!name()) {
		flag = false;
	}
	
	if(!isbn()) {
		flag = false;
	}
	
	if(!bookPrice()) {
		flag = false;
	}
	
	if(!e_bookPrice()) {
		flag = false;
	}
	
	if(!author()) {
		flag = false;
	}
	
	if(!publisher()) {
		flag = false;
	}
	
	if(!belong()) {
		flag = false;
	}
	
	if(!txtFile()) {
		flag = false;
	}
	
	return flag;
};

//=========================验证表达式start=============
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
//=========================验证表达式stop=============

//页面关闭刷新
showResponse = function(response, statusText) {
	disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		enableAllButton();
	}
};

disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

//===================表单信息验证start======================================
name = function() { 
	if ($("#name").val().trim() == "") {
		$("#nameDiv").addClass("error");
		$("#nameSpan").html("书名不能为空！");
		return false;
	} else {
		$("#nameDiv").removeClass("error").addClass("success");
		$("#nameSpan").html("");
		return true;
	}
};

isbn = function() { 
	if ($("#isbn").val().trim() == "") {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("isbn不能为空！");
		return false;
	}else if(!validateInt($("#isbn").val().trim())) {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("请输入数值类型");
		return false;
	}
	$("#isbnDiv").removeClass("error").addClass("success");
	$("#isbnSpan").html("");
    return true;
};

bookPrice = function() {
		if ($("#bookPrice").val().trim() == "") {
			$("#bookPriceDiv").addClass("error");
			$("#bookPriceSpan").html("纸书价格不能为空");
			return false;
		}else if(!validateDecial($("#bookPrice").val().trim())) {
			$("#bookPriceDiv").addClass("error");
			$("#bookPriceSpan").html("请输入数值类型(最多含两位小数)");
			return false;
		}
		$("#bookPriceDiv").removeClass("error").addClass("success");
		$("#bookPriceSpan").html("");
	    return true;
};

e_bookPrice = function() {
	if ($("#e_bookPrice").val().trim() == "") {
		$("#e_bookPriceDiv").addClass("error");
		$("#e_bookPriceSpan").html("电子书价格不能为空");
		return false;
	}else if(!validateDecial($("#e_bookPrice").val().trim())) {
		$("#e_bookPriceDiv").addClass("error");
		$("#e_bookPriceSpan").html("请输入数值类型(最多含两位小数)");
		return false;
	}
	$("#e_bookPriceDiv").removeClass("error").addClass("success");
	$("#e_bookPriceSpan").html("");
    return true;
};

author = function() { 
	if ($("#author").val().trim() == "") {
		$("#authorDiv").addClass("error");
		$("#authorSpan").html("作者不能为空！");
		return false;
	} else {
		$("#authorDiv").removeClass("error").addClass("success");
		$("#authorSpan").html("");
		return true;
	}
};

publisher = function() { 
	if ($("#publisher").val().trim() == "") {
		$("#publisherDiv").addClass("error");
		$("#publisherSpan").html("出版社不能为空！");
		return false;
	} else {
		$("#publisherDiv").removeClass("error").addClass("success");
		$("#publisherSpan").html("");
		return true;
	}
};

belong = function() { 
	if ($("#belong").val().trim() == "") {
		$("#belongDiv").addClass("error");
		$("#belongSpan").html("版权所有者不能为空！");
		return false;
	} else {
		$("#belongDiv").removeClass("error").addClass("success");
		$("#belongSpan").html("");
		return true;
	}
};

txtFile = function() { 
	if ($("#txtFile").val().trim() == "") {
		$("#txtFileDiv").addClass("error");
		$("#txtFileSpan").html("封面图片不能为空！");
		return false;
	} else {
		$("#txtFileDiv").removeClass("error").addClass("success");
		$("#txtFileSpan").html("");
		return true;
	}
};
//===================表单信息验证stop======================================

//日期格式和添加修改信息
$(function() {
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		datePublication();
	});
	
	$(".on").click(function(){
		$(".on-down").slideToggle();
    }); 
	
	var options = {
			success : showResponse,
			url : $('#ctx').val() + '/pages/material/form/editSubmit',
			type : 'post',
			clearForm : false,
			timeout : 3000
		};
		$('#MaterialForm').ajaxForm(options);
});