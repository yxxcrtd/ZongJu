Editorial.SubsidaryRight.validate = function() {
    var flag = true;
    if (!Editorial.SubsidaryRight.validateLevel()) {
        flag = false;
    }
    if (!Editorial.SubsidaryRight.validateLicenseType()) {
        flag = false;
    }
    if (!Editorial.SubsidaryRight.validateRoyaltyRule()) {
        flag = false;
    }
    if (!Editorial.SubsidaryRight.validateAdjustRule()) {
        flag = false;
    }
    if (!Editorial.SubsidaryRight.validateStatus()) {
        flag = false;
    }
    return flag;
};

Editorial.SubsidaryRight.changeLevel = function() {
    // TODO 需要添加不同Level的验证
    var text = $("#level").find("option:selected").text();
    clearMessage();
    if (text == "授权级别") {

    } else if (text == "产品级别") {
        Editorial.SubsidaryRight.clearProduct();
        Editorial.SubsidaryRight.validateProduct();
        Editorial.SubsidaryRight.validateAuthor();
    } else if (text == "素材类型级别") {
        Editorial.SubsidaryRight.clearStructureType();
        Editorial.SubsidaryRight.clearProduct();
        Editorial.SubsidaryRight.validateProduct();
        Editorial.SubsidaryRight.validateAuthor();
        Editorial.SubsidaryRight.validateStructureType();
    } else if (text == "素材级别") {
        Editorial.SubsidaryRight.clearStructure();
        Editorial.SubsidaryRight.validateProduct();
        Editorial.SubsidaryRight.validateAuthor();
        Editorial.SubsidaryRight.validateStructureType();
        Editorial.SubsidaryRight.validateStructure();
    } else {
        Editorial.SubsidaryRight.validateLevel();
    }
};

Editorial.SubsidaryRight.validateLevel = function(){
    if ($("#level").val().trim() == "") {
        $("#levelDiv").addClass("error");
        $("#levelSpan").html("该附属权利级别不能为空");
        return false;
    }
    $("#levelDiv").removeClass("error").addClass("success");
    $("#levelSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateLicenseType = function(){
    if ($("#licenseType").val().trim() == "") {
        $("#licenseTypeDiv").addClass("error");
        $("#licenseTypeSpan").html("该授权类型不能为空");
        return false;
    }
    $("#licenseTypeDiv").removeClass("error").addClass("success");
    $("#licenseTypeSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateRoyaltyRule = function(){
    if ($("#royaltyRule").val().trim() == "") {
        $("#royaltyRuleDiv").addClass("error");
        $("#royaltyRuleSpan").html("该版税规则不能为空");
        return false;
    }
    $("#royaltyRuleDiv").removeClass("error").addClass("success");
    $("#royaltyRuleSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateAdjustRule = function(){
    if ($("#adjustRule").val().trim() == "") {
        $("#adjustRuleDiv").addClass("error");
        $("#adjustRuleSpan").html("该调整规则不能为空");
        return false;
    }
    $("#adjustRuleDiv").removeClass("error").addClass("success");
    $("#adjustRuleSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateStatus = function(){
    if ($("#status").val().trim() == "") {
        $("#statusDiv").addClass("error");
        $("#statusSpan").html("该附属权利状态不能为空");
        return false;
    }
    $("#statusDiv").removeClass("error").addClass("success");
    $("#statusSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateProduct = function(){
    if ($("#product").val().trim() == "") {
        $("#productDiv").addClass("error");
        $("#productSpan").html("该签约产品不能为空");
        return false;
    }
    $("#productDiv").removeClass("error").addClass("success");
    $("#productSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateStructureType = function(){
    if ($("#structureType").val() == null || $("#structureType").val().trim() == "") {
        $("#structureTypeDiv").addClass("error");
        $("#structureTypeSpan").html("该素材类型不能为空");
        return false;
    }
    $("#structureTypeDiv").removeClass("error").addClass("success");
    $("#structureTypeSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateStructure = function(){
    if ($("#structureName").val().trim() == "") {
        $("#structureNameDiv").addClass("error");
        $("#structureNameSpan").html("该素材不能为空");
        return false;
    }
    $("#structureNameDiv").removeClass("error").addClass("success");
    $("#structureNameSpan").html("");
    return true;
};

Editorial.SubsidaryRight.validateAuthor = function(){
    if ($("#personTypeRelationship").val() == null || $("#personTypeRelationship").val().trim() == "") {
        $("#personTypeRelationshipDiv").addClass("error");
        $("#personTypeRelationshipSpan").html("该签约贡献者不能为空");
        return false;
    }
    $("#personTypeRelationshipDiv").removeClass("error").addClass("success");
    $("#personTypeRelationshipSpan").html("");
    return true;
};

Editorial.SubsidaryRight.clearProduct = function() {
    $("#product").val("");
    $("#personTypeRelationship").empty();
    $("#structureType").empty();
    $("#structure").val("");
    $("#structureName").val("");
};

Editorial.SubsidaryRight.clearProductDetail = function() {
    $("#personTypeRelationship").empty();
    $("#structureType").empty();
    $("#structure").val("");
    $("#structureName").val("");
};

Editorial.SubsidaryRight.clearStructureType = function() {
    $("#structureType").empty();
    $("#structure").val("");
    $("#structureName").val("");
};

Editorial.SubsidaryRight.clearStructure = function() {
    $("#structure").val("");
    $("#structureName").val("");
};

Editorial.SubsidaryRight.selectStructure = function() {
    var url = $('#ctx').val() + "/pages/rightLicense/subsidaryRight/form/selectStructure?id=" + $('#structureType').val();
    var commonModalCss = {
        "width": "1200px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.SubsidaryRight.changeProduct = function() {
    Editorial.SubsidaryRight.clearProductDetail();
    Editorial.SubsidaryRight.validateProduct();
    $.ajax({
        type : "POST",
        async : false,
        "dataType" : 'json',
        url : $('#ctx').val() + "/pages/rightLicense/subsidaryRight/form/filterAuthorAndStructureType",
        data : {
            "obj.product.id" : $("#product").val()
        },
        success : function(response) {
            if (response.isSuccess == "true") {
                // 显示当前产品下的所有贡献者列表
                $("#personTypeRelationship").append("<option value=''>--选择--</option>");
                for ( var i = 0; i < response.productPersonRelationshipList.length; i++) {
                    $("#personTypeRelationship").append("<option value='" + response.productPersonRelationshipList[i].personTypeRelationship.id + "'>" + response.productPersonRelationshipList[i].personTypeRelationship.person.name + "</option>");
                }
                // 显示当前产品下的所有素材类型列表
                $("#structureType").append("<option value=''>--选择--</option>");
                for ( var i = 0; i < response.productStructureRelationshipDistinctTypeList.length; i++) {
                    $("#structureType").append("<option value='" + response.productStructureRelationshipDistinctTypeList[i].structure.structureType.id + "'>" + response.productStructureRelationshipDistinctTypeList[i].structure.structureType.name + "</option>");
                }
            }
        },
        error : function(response) {
            alert("error");
        }
    });
};

Editorial.SubsidaryRight.showResponse = function(response, statusText) {
	Editorial.SubsidaryRight.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer("Editorial.CrRight.subsidiaryRightsDataTable");
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.SubsidaryRight.enableAllButton();
	}
};

$(function() {
	var crRight_rlicenseId = invokeFrameElements("#crRight_rlicenseId").val();
	$("#subsidaryRight_right_rlicenseId").val(crRight_rlicenseId);
	
	var url = $('#ctx').val() + "/pages/rightLicense/subsidaryRight/form/editSubmit";
	var options = {
		beforeSubmit : Editorial.SubsidaryRight.validate,
		success : Editorial.SubsidaryRight.showResponse,
		url : url,
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#DicClassForm').ajaxForm(options);
	Editorial.SubsidaryRight.initAuthorizedAreaDataTable();
});

Editorial.SubsidaryRight.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.SubsidaryRight.enableAllButton = function() {
    $("#save").removeAttr('disabled');
    $("#reset").removeAttr('disabled');
};

Editorial.SubsidaryRight.selectStructureSubmit = function(jsonObj) {
    $("#structure").val(jsonObj.id);
    $("#structureName").val(jsonObj.name);
    Editorial.SubsidaryRight.validateStructure();
};