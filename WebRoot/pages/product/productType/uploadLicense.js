/**
 * Created by huangchenxi on 14-6-27.
 */
var txtFileFlag = false;
Editorial.Product.ProductType.validate = function() {
    var flag = true;
    if (!Editorial.Product.ProductType.validateUpload()) {
        flag = false;
    }
    return flag;
};

Editorial.Product.ProductType.uploadShowResponse = function(response, statusText) {
    Editorial.Product.ProductType.disableAllButton();
    if (response.isSuccess == "true") {
        ajaxAlertSuccessMsg(response.msg, true);
        refreshFrameDataTableInLayer('Editorial.ProductType.Licence.oTable1');
        autoCloseCommonModal(5);
    } else {
        ajaxAlertErrorMsg(response.msg, true);
        Editorial.Product.ProductType.enableAllButton();
    }
};

Editorial.Product.ProductType.disableAllButton = function() {
    $("#save").attr('disabled', "true");
    $("#reset").attr('disabled', "true");
};

Editorial.Product.ProductType.enableAllButton = function() {
    $("#save").removeAttr('disabled');
    $("#reset").removeAttr('disabled');
};

Editorial.Product.ProductType.validateUpload = function() {
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
Editorial.Product.ProductType.validateUploadDown = function() {
    $("#txtFileSpan").html("");
    $("#txtFileDiv").removeClass("error");
};

$(function() {
    var options = {
        beforeSubmit : Editorial.Product.ProductType.validate,
        success : Editorial.Product.ProductType.uploadShowResponse,
        url : $('#ctx').val() + '/pages/pLicense/form/uploadSubmit',
        type : 'post',
        clearForm : false,
        timeout : 30000
    };
    $('#uploadProductTypeForm').ajaxForm(options);
});