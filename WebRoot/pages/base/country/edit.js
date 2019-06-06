/**
 * ***************************************** 验证开始
 * *************************************************************
 */
var digitalExpression = /^(([0-9]+[\.]?[0-9]+)|[1-9])$/;
var nameValidateFlag = false;

BMEP.Base.Country.validate = function() {
	var flag = true;
	if (!BMEP.Base.Country.validateCnName()) {
		flag = false;
	}
	if (!BMEP.Base.Country.validateEnName()) {
		flag = false;
	}
	return flag;
};
/**
 * ***************** 验证CnName开始 ************************
 */
BMEP.Base.Country.validateCnName = function() {
	if ($("#cnName").val() == "") {
		$("#cnNameDiv").addClass("error");
		$("#cnNameSpan").html("国别中文名不能为空！");
		return false;
	}
	$("#cnNameDiv").removeClass("error");
	$("#cnNameSpan").html("");
	return true;
};

/**
 * ***************** 验证CnName结束 ************************
 */
/**
 * ***************** 验证EnName开始 *************************
 */
BMEP.Base.Country.validateEnName = function() {
	if ($("#enName").val() == "") {
		$("#enNameDiv").addClass("error");
		$("#enNameSpan").html("国别英文名不能为空！");
		return false;
	}
	$("#enNameDiv").removeClass("error");
	$("#enNameSpan").html("");
	return true;
};
/**
 * ***************** 验证EnName结束 *************************
 */
/**
 * ***************** 验证结束 *************************
 */
BMEP.Base.Country.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Base.Country.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};

BMEP.Base.Country.showResponse = function(response, statusText) {
	BMEP.Base.Country.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		if (response.flag != "tree") {
			refreshFrameDataTableInLayer('BMEP.Base.Country.oTable1');
			autoCloseCommonModal(5);
		} else {
			autoCloseCommonModal(5);
			updateTree("BMEP.Base.Country.Show.zTree", response.node);
		}
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		BMEP.Base.Country.enableAllButton();
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
		beforeSubmit : BMEP.Base.Country.validate,
		success : BMEP.Base.Country.showResponse,
		url : '/Editorial/pages/base/country/form/editCountrySubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#editCountryForm').ajaxForm(options);
	
});
