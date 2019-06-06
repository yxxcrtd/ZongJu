/**
 * Created by huangchenxi on 14-5-23.
 */
Editorial.Flow.taskRepo.selectTaskAssigneeFlag = function (value) {
    if (value != "") {
        if (value == "3" || value == "4") {
//            $("#taskAssignee").removeAttr('disabled');
//        } else {
//            $("#taskAssignee").val("");
//            $("#taskAssignee").attr('disabled', "true");
            $('#taskField').val("");
            $('#taskDisplayFieldHidden').val("");
            $('#taskFieldDiv').hide();
            $('#taskUrlDiv').hide();
        } else if (value == "2"){
            $('#taskUrlDiv').hide();

        } else {
            $('#taskUrlDiv').show();
            $('#taskFieldDiv').show();
        }
    }
};

Editorial.Flow.taskRepo.selectField = function () {
    var url = $('#ctx').val() + "/pages/ftask/form/dicIndex";
    var commonModalCss = {
        "width": "850px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Flow.taskRepo.selectOrg = function () {
    var url = $('#ctx').val() + "/pages/fassignee/form/index";
    var commonModalCss = {
        "width": "900px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Flow.taskRepo.updateAssignee = function (jsonObj, context) {
	 $.ajax({
	        "dataType": 'json',
	        "type": "POST",
	        "url": $('#ctx').val() + "/pages/fassignee/form/getPosition",
	        "cache": false,
	        "data": {
	        	"id":jsonObj
	        },
	        "success": function (response) {
	        	console.log(response);
	        	if(response.isSuccess){
	        		$(context).contents().find("#taskAssigneeName").val(response.position.name);
		        	$(context).contents().find("#taskAssigneeId").val(response.position.id);
	        	}
	        	

	        },
	        "error": function (response) {
	            alert(response);
	            alert("error%%%");
	        }
	    });
};
Editorial.Flow.taskRepo.updateField = function (jsonObj, context) {
    console.log(jsonObj);
    console.log(jsonObj.code);
    console.log(jsonObj.display);
    console.log(context);
    $(context).contents().find("#taskField").val(jsonObj.code);
    console.log("jsonObj.dicMap:" + JSON.stringify(jsonObj.dicMap));
    $(context).contents().find("#taskFieldHidden").val(JSON.stringify(jsonObj.dicMap));
    $(context).contents().find("#taskDisplayFieldHidden").val(jsonObj.display);
};


Editorial.Flow.taskRepo.showResponse = function(response, statusText) {
    if (response.isSuccess == "true") {
        ajaxAlertSuccessMsg(response.msg, true);
        refreshFrameDataTableInFrame('Editorial.Flow.taskRepo.oTable1');
        autoCloseCommonModal(5);
    } else {
        ajaxAlertErrorMsg(response.msg, true);
        Editorial.PrintCosts.enableAllButton();
    }
};

$(function() {
    var options = {
        success : Editorial.Flow.taskRepo.showResponse,
        url : $('#ctx').val() + "/pages/ftask/form/editSubmit?productType="+$('#productType').val(),
        type : 'post',
        clearForm : false,
        timeout : 3000
    };
    $('#task_form').ajaxForm(options);
});