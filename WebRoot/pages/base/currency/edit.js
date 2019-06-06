/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var digitalExpression = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
var nameValidateFlag = false;
var currencyCodeValidateFlag = false;

BMEP.Base.Currency.validate = function() {
	var flag = true;
	if (!BMEP.Base.Currency.validateCurrencyCode()) {
		flag = false;
	}
	if (!BMEP.Base.Currency.validateCurrencyName()) {
		flag = false;
	}
	return flag;
};
/**
 * ***************** 验证币种编号开始 ************************
 */
BMEP.Base.Currency.validateCurrencyCode = function() {
	if ($("#currencyCode").val() == "") {
		$("#currencyCodeDiv").addClass("error");
		$("#currencyCodeSpan").html("币种编号不能为空！");
		return false;
	}else{
		BMEP.Base.Currency.validateCurrencyCodeUnique();
		if (currencyCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

BMEP.Base.Currency.validateCurrencyCodeUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/base/currency/form/validateBCurrencyCodeUnique",
		data : {
			currencyCode : $("#currencyCode").val(),
			currencyId : $("#currencyId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#currencyCodeDiv").removeClass("error").addClass("success");
				$("#currencyCodeSpan").html("可以使用");
				currencyCodeValidateFlag = true;
			} else {
				$("#currencyCodeDiv").removeClass("success").addClass("error");
				$("#currencyCodeSpan").html("此条信息已存在");
				currencyCodeValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};

/**
 * ***************** 验证币种编号结束 ************************
 */
 
/**
 * ***************** 验证币种名称开始 ************************
 */
BMEP.Base.Currency.validateCurrencyName = function() {
	if ($("#currencyName").val() == "") {
		$("#currencyNameDiv").addClass("error");
		$("#currencyNameSpan").html("币种名称不能为空！");
		return false;
	}
	$("#currencyNameDiv").removeClass("error");
	$("#currencyNameSpan").html("");
	return true;
};
/**
 * ***************** 验证币种名称结束 ************************
 */

BMEP.Base.Currency.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Base.Currency.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.Base.Currency.showResponse = function(response, statusText) {
	BMEP.Base.Currency.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		if (response.flag != "tree") {
			refreshFrameDataTableInLayer('BMEP.Base.Currency.oTable1');
			autoCloseCommonModal(5);
		} else {
			autoCloseCommonModal(5);
			updateTree("BMEP.Base.Currency.Show.zTree", response.node);
		}
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Base.Currency.enableAllButton();
	}
};

$(function() {
	$('input:text:first').focus();
    var $inp = $('input:text');
    var length = $inp.length;
    $inp.bind('keydown', function (e) {
        var key = e.which;
        if (key == 13) {
            e.preventDefault();
            var nxtIdx = $inp.index(this) + 1; 
            if(nxtIdx == length){
           	 $("#save").focus();
            }
            $(":input:text:eq(" + nxtIdx + ")").focus();

        }

    });
	
	var options = {
		beforeSubmit : BMEP.Base.Currency.validate,
		success : BMEP.Base.Currency.showResponse,
		url : '/Editorial/pages/base/currency/form/editCurrencySubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#editCurrencyForm').ajaxForm(options);
	
});
