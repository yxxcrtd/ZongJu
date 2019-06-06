BMEP.Product.ProductInfo.validate = function() {
	var flag = true;
	return flag;
};

BMEP.Product.ProductInfo.CreateCode = function() {
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : $("#ctx").val() + "/pages/product/form/createCode",
		"cache" : false,
		"success" : function(response) {
			if (response.isSuccess == "true") {
				$("#isbn").val(response.createCode);
				$("#codeType").val("Manual");
			}
		},
		"error" : function(response) {
			alert("error%%%%%");
		}
	});

};

BMEP.Product.ProductInfo.getMsgFromCode = function() {
	if ($("#isbn").val() != "") {
		$.ajax({
			type : "POST",
			async : false,
			"dataType" : 'json',
			url : $('#ctx').val() + "/pages/product/form/getMsgFromCode",
			data : {
				code : $("#isbn").val()
			},
			success : function(response) {
				if (response.isSuccess == "true") {
					$("#insertProductForm").fill(response.product);
					$("#productInfoId").val(response.product.id);
					$("#binding").val(response.product.binding);
					$("#language").val(response.product.language);
					$("#keyword").val(response.product.keyword);
					$("#remark").val(response.product.remark);
					for ( var i = 0; i < response.subjectList.length; i++) {
						$("#subjectListShow").append("<span onclick=\"BMEP.Product.ProductInfo.delSubject(this)\" style=\"border: 1px solid #BDC0C5; margin: 3px; cursor: pointer\" title=\"删除\" id=" + response.subjectList[i].id + "> +" + response.subjectList[i].name + "-" + response.subjectList[i].code + " <input type=\"hidden\" name=\"subjectIds\" value=" + response.subjectList[i].id + " /></span>");
					}
				}
			},
			error : function(response) {
				alert("error");
			}
		});
	}
};

/**
 * ***************** 验证isbn开始 *************************
 */
BMEP.Product.ProductInfo.validateIsbn = function() {
	if ($("#isbn").val() == "") {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("ISBN不能为空！");
		return false;
	} else if ($("#isbn").val().length == 13) {
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : $("#ctx").val() + "/check/form/checkIsbn?isbn=" + $("#isbn").val(),
			"cache" : false,
			"success" : function(response) {
				if (response.flag == "false") {
					$("#isbnDiv").addClass("error");
					$("#isbnSpan").html("ISBN不正确！");
					return false;
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	} else {
		$("#isbnDiv").addClass("error");
		$("#isbnSpan").html("ISBN长度不正确！");
		return false;
	}
	$("#isbnDiv").removeClass("error");
	$("#isbnSpan").html("");
	return true;
};
/**
 * ***************** 验证isbn结束 *************************
 */

BMEP.Product.ProductInfo.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Product.ProductInfo.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.Product.ProductInfo.delSubject = function(obj) {
	$(obj).remove();
};

BMEP.Product.ProductInfo.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Product.ProductInfo.oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Product.ProductInfo.enableAllButton();
	}
};
BMEP.Product.ProductInfo.showResponse1 = function(response, statusText) {
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('BMEP.Product.Product.oTable1');
		$('#insertProductForm')[0].reset();
		// autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Product.ProductInfo.enableAllButton();
	}
};

$(function() {
	// $("#save").click(function() {
	var options = {
		beforeSubmit : BMEP.Product.ProductInfo.validate,
		success : BMEP.Product.ProductInfo.showResponse,
		url : $('#ctx').val() + '/pages/product/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	var options1 = {
		beforeSubmit : BMEP.Product.ProductInfo.validate,
		success : BMEP.Product.ProductInfo.showResponse1,
		url : $('#ctx').val() + '/pages/product/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};

	$("#save").click(function() {
		$('#insertProductForm').ajaxForm(options);
	});
	$("#saveAndGoOn").click(function() {
		$('#insertProductForm').ajaxForm(options1);
	});

	// });
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : $("#ctx").val() + "/pages/product/form/showSubject",
		"cache" : false,
		"success" : function(response) {
			var ids = "";
			$('#subject').autocomplete(response.subjectList, {
				max : 12, // 列表里的条目数
				minChars : 1, // 自动完成激活之前填入的最小字符
				width : 222, // 提示的宽度，溢出隐藏
				scrollHeight : 300, // 提示的高度，溢出显示滚动条
				matchContains : true, // 包含匹配，就是data参数里的数据，是否只要包含文本框里的数据就显示
				multiple : true,
				mustMatch : true,
				autoFill : true,
				formatItem : function(row, i, max) {
					return row.code + ':' + row.name;
				},
				formatMatch : function(row) {
					return row.code + row.name;
				},
				formatResult : function(row) {
					return row.code;
				},
				reasultSearch : function(row, v)// 本场数据自定义查询语法 注意这是我自己新加的事件
				{
					// 自定义在code或spell中匹配
					if (row.code.indexOf(v) == 0 || row.name.indexOf(v) == 0) {
						return row;
					} else
						return false;
				}

			}).result(function(event, row, formatted) {
				ids += row.id + ",";
				$("#subIds").attr("value", ids);
			});

		},
		"error" : function(response) {
			alert("error");
		}
	});

	$('#pubYearPicker').datetimepicker({
		language : 'cn',
		pickTime : false
	});

	if ($(".input-append") != undefined) {
		var time = $(".input-append");
		for ( var i = 0; i < time.length; i++) {
			$('#' + time[i].id + '').datetimepicker({
				language : 'cn',
				pickTime : false
			});
		}
	}

	hider();
	function hider() {
		if ($('#id').val() == null || $('#id').val() == '') {
			$("#diveffective").hide();
		}
		;
		var at = $("#subject").val();
		if (at == null || at == '') {
			$("#diveffective").hide();
		} else {
			$("#diveffective").show();
		}
	}

});