Editorial.Product.ProductInfo.validateEdit = function () {
    var flag = true;
    if (!Editorial.Product.ProductInfo.titleName()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productISBN()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productPrice()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productPublisher()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.datePublication()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productPageNum()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productLicense()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productAuthor()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.productBinding()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.upLoadFile()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.upLoadFilePDF()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.upLoadFileXML()) {
		flag = false;
	}
	if (!Editorial.Product.ProductInfo.Proportion()) {
		flag = false;
	}
    return flag;
};

Editorial.Product.ProductInfo.titleName = function() {
	if ($("#title").val() == "") {
		$("#titleDiv").addClass("error");
		$("#titleSpan").html("书名不能为空！");
		return false;
	}else{
		$("#titleDiv").removeClass("error").addClass("success");
		$("#titleSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productISBN = function() {
	var regex = /^(?=.{13}$)\d{1,5}([-])\d{1,7}\1\d{1,6}\1(\d|X)$/; 
	var val = $("#isbn").val();
	if (val == "") {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("ISBN不能为空！");
		return false;
	}else if(!regex.test(val)) {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("请输入标准书号");	
		return false;
	}else{
		$("#isbnDiv").removeClass("error").addClass("success");
		$("#isbnSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productPrice = function() {
	var regex = /^\d+(\.\d{2})?$/;
	var val = $("#price").val();
	if ($("#price").val() == "") {
		$("#priceDiv").addClass("error");
		$("#priceSpan").html("价格不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#priceDiv").addClass("error");
		$("#priceSpan").html("请输入数字类型");	
		return false;
	} else if(val>parseInt('100000000')) {
		$("#priceDiv").addClass("error");
		$("#priceSpan").html("价格最大值不能超过100,000,000!");
		return false;
	}else{
		$("#priceDiv").removeClass("error").addClass("success");
		$("#priceSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productPublisher = function() {
	if ($("#publisher").val() == "") {
		$("#publisherDiv").addClass("error");
		$("#publisherSpan").html("出版社不能为空！");
		return false;
	}else{
		$("#publisherDiv").removeClass("error").addClass("success");
		$("#publisherSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.datePublication = function() {
	if ($("#dataPublicationStr").val() == "") {
		$("#dataPublicationStrDiv").addClass("error");
		$("#dataPublicationStrSpan").html("出版日期不能为空！");
		return false;
	}else{
		$("#dataPublicationStrDiv").removeClass("error").addClass("success");
		$("#dataPublicationStrSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productPageNum = function() {
	if($("#pageNum").val() != ""){
		var regex = /^[0-9]*$/;
		var val = $("#pageNum").val();
		if(!regex.test(val)) {
			$("#pageNumDiv").addClass("error");
			$("#pageNumSpan").html("请输入数字类型");	
			return false;
		}else{
			$("#pageNumDiv").removeClass("error").addClass("success");
			$("#pageNumSpan").html("通过验证");
			return true;
		}
	}else{
		$("#pageNumDiv").removeClass("error").addClass("success");
		$("#pageNumSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productLicense = function() {
	if ($("#productLicense").val() == "") {
		$("#productLicenseDiv").addClass("error");
		$("#productLicenseSpan").html("授权不能为空！");
		return false;
	}else{
		$("#productLicenseDiv").removeClass("error").addClass("success");
		$("#productLicenseSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productAuthor = function() {
	if ($("#author").val() == "") {
		$("#authorDiv").addClass("error");
		$("#authorSpan").html("作者不能为空！");
		return false;
	}else{
		$("#authorDiv").removeClass("error").addClass("success");
		$("#authorSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.productBinding = function() {
	if ($("#binding").val() == "") {
		$("#bindingDiv").addClass("error");
		$("#bindingSpan").html("装帧不能为空！");
		return false;
	}else{
		$("#bindingDiv").removeClass("error").addClass("success");
		$("#bindingSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.upLoadFile = function() {
	if($("#upLoadFile").val() != ""){
		var val = $("#upLoadFile").val().substring($("#upLoadFile").val().lastIndexOf(".") + 1);
		if(!(val=="png"||val=="jpg"||val=="PNG"||val=="JPG")){
			$("#upLoadFileDiv").addClass("error");
			$("#upLoadFileSpan").html("请上传jpg或png格式的图片！");
			return false;
		}else{
			$("#upLoadFileDiv").removeClass("error").addClass("success");
			$("#upLoadFileSpan").html("通过验证");
			return true;
		}
	}else{
		$("#upLoadFileDiv").removeClass("error").addClass("success");
		$("#upLoadFileSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.upLoadFilePDF = function() {
	if($("#upLoadFilePDF").val() != ""){
		var val = $("#upLoadFilePDF").val().substring($("#upLoadFilePDF").val().lastIndexOf(".") + 1);
		if(!(val=="pdf"||val=="PDF")){
			$("#upLoadFilePDFDiv").addClass("error");
			$("#upLoadFilePDFSpan").html("请上传pdf格式的文件！");
			return false;
		}else{
			$("#upLoadFilePDFDiv").removeClass("error").addClass("success");
			$("#upLoadFilePDFSpan").html("通过验证");
			return true;
		}
	}else{
		$("#upLoadFilePDFDiv").removeClass("error").addClass("success");
		$("#upLoadFilePDFSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.upLoadFileXML = function() {
	if($("#upLoadFileXML").val() != ""){
		var val = $("#upLoadFileXML").val().substring($("#upLoadFileXML").val().lastIndexOf(".") + 1);
		if(!(val=="xml"||val=="XML")){
			$("#upLoadFileXMLDiv").addClass("error");
			$("#upLoadFileXMLSpan").html("请上传xml格式的文件！");
			return false;
		}else{
			$("#upLoadFileXMLDiv").removeClass("error").addClass("success");
			$("#upLoadFileXMLSpan").html("通过验证");
			return true;
		}
	}else{
		$("#upLoadFileXMLDiv").removeClass("error").addClass("success");
		$("#upLoadFileXMLSpan").html("通过验证");
		return true;
	}
};

Editorial.Product.ProductInfo.Proportion = function() {
	if($("#proportion").val() != ""){
		var regex = /^[0-9]*$/;
		var val = $("#proportion").val();
		if(!regex.test(val)) {
			$("#proportionDiv").addClass("error");
			$("#proportionSpan").html("请输入数字类型");	
			return false;
		} else if(val>parseInt('100')) {
			$("#proportionDiv").addClass("error");
			$("#proportionSpan").html("分成比例最大值不能超过100!");
			return false;
		}else{
			$("#proportionDiv").removeClass("error").addClass("success");
			$("#proportionSpan").html("通过验证");
			return true;
		}
	}else{
		$("#proportionDiv").removeClass("error").addClass("success");
		$("#proportionSpan").html("通过验证");
		return true;
	}
};

$(function() {
	
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Product.ProductInfo.datePublication();
	});
	
    if($('#flag').val() == "product") {
        $('#saveAndGoOn').hide();
    }

    $("#baseInfoDiv").click(function() {
        $("#baseInfoContentDiv").slideToggle("fast");
    });

    $('#deadlineDatePicker').datetimepicker({
        language : 'cn',
        pickTime : false
    });

    var options = {
    	beforeSubmit : Editorial.Product.ProductInfo.validateEdit,	
        success : Editorial.Product.ProductInfo.showResponse,
        url : $('#ctx').val() + '/pages/resource/split/form/editSubmit',
        type : 'post',
        clearForm : false,
        timeout : 30000
    };
    var options1 = {
        beforeSubmit : Editorial.Product.ProductInfo.validateFlow,
        success : Editorial.Product.ProductInfo.showResponse1,
        url : $('#ctx').val() + '/pages/pflow/form/saveAndGoOn',
        type : 'post',
        clearForm : false,
        timeout : 30000
    };

    $("#save").click(function() {
        $('#insertProductForm').ajaxForm(options);
    });
    $("#saveAndGoOn").click(function() {
        $('#insertProductForm').ajaxForm(options1);
    });

});