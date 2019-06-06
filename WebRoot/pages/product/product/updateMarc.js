BMEP.Product.ProductInfo.updateMarc.validate = function() {
	var flag = true;
	if (!BMEP.Product.ProductInfo.updateMarc.validateIsbn()) {
		flag = false;
	}
	return flag;
};
/**
 * ***************** 验证isbn开始 *************************
 */
function trim(str){ //删除左右两端的空格
    return str.replace(/(^\s*)|(\s*$)/g, "");
}
BMEP.Product.ProductInfo.updateMarc.validateIsbn = function() {
	
	if ($("#isbn").val() == "") {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("ISBN不能为空！");
		return false;
	}else
	{
		var isbns = $("#isbn").val().split("\n");
		for(var i=0;i<isbns.length;i++)
		{
			var str = trim(isbns[i]);
			console.log(str+'========str======'+str.length);
			if(str.length > 0 && str.length!=13)
			{
				$("#isbnDiv").addClass("error");
				$("#isbnSpan").html("ISBN第"+(i+1)+"行长度不正确！");
				return false;
			}
		}
	}

//	} else if ($("#isbn").val().length == 13) {
//		$.ajax({
//			"dataType" : 'json',
//			"type" : "POST",
//			"url" : $("#ctx").val() + "/check/form/checkIsbn?isbn=" + $("#isbn").val(),
//			"cache" : false,
//			"success" : function(response) {
//				if (response.flag == "false") {
//					$("#isbnDiv").addClass("error");
//					$("#isbnSpan").html("ISBN不正确！");
//					return false;
//				}
//			},
//			"error" : function(response) {
//				alert("error");
//			}
//		});
//	} else {
//		$("#isbnDiv").addClass("error");
//		$("#isbnSpan").html("ISBN长度不正确！");
//		return false;
//	}
	$("#isbnDiv").removeClass("error");
	$("#isbnSpan").html("");
	return true;
};
/**
 * ***************** 验证isbn结束 *************************
 */

BMEP.Product.ProductInfo.updateMarc.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Product.ProductInfo.updateMarc.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};


BMEP.Product.ProductInfo.updateMarc.showResponse = function(response, statusText) {
	
	if (response.isSuccess == "true") {
		BMEP.Product.ProductInfo.updateMarc.enableAllButton();
		ajaxAlertSuccessMsg(response.msg, true);
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		$("#isbn").val("");
		$("#listIsbnNot").val(response.listIsbnNot);
		BMEP.Product.ProductInfo.updateMarc.enableAllButton();
	}
	refreshFrameDataTableInLayer('BMEP.Product.ProductInfo.oTable1');
};
$(function() {
	var options = {
		beforeSubmit : BMEP.Product.ProductInfo.updateMarc.validate,
		success : BMEP.Product.ProductInfo.updateMarc.showResponse,
		url : $('#ctx').val() + '/pages/product/form/updateMarcSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#updateMarcForm').ajaxForm(options);
	

});