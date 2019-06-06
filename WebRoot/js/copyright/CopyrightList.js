ZongJu.Copyright = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.Copyright.validate = function() {
	var flag = true;
	if (!ZongJu.Copyright.beLong()) {
		flag = false;
	}
	if (!ZongJu.Copyright.unDer()) {
		flag = false;
	}
	return flag;
};

ZongJu.Copyright.beLong = function() {
	if ($("#belong").val() == "") {
		$("#belongDiv").addClass("error");
		$("#belongSpan").html("版权所有者不能为空！");
		return false;
	}else{
		$("#belongDiv").removeClass("error").addClass("success");
		$("#belongSpan").html("通过验证");
		return true;
	}
};

ZongJu.Copyright.unDer = function() {
	if ($("#under").val() == "") {
		$("#underDiv").addClass("error");
		$("#underSpan").html("版权归属不能为空！");
		return false;
	}else{
		$("#underDiv").removeClass("error").addClass("success");
		$("#underSpan").html("通过验证");
		return true;
	}
};

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

//保存
$(function() {
	var options = {
		beforeSubmit : ZongJu.Copyright.validate,
		success : showResponse,
		url : $('#ctx').val() + "/pages/copyright/form/save",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#CopyrightForm').ajaxForm(options);
});

// 显示修改
modObj = function(id) {
	var url = $('#ctx').val() + "/pages/copyright/form/edit?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

// 删除
delObj = function(id) {
	openConfirmModalInFrame("确认删除当前信息吗？", function() {
		var url = $('#ctx').val()+"/pages/copyright/form/del?id=" + id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame('oTable1');
				} else {
					openErrorAlertModalInFrame(response.msg);
				}
			},
			"error": function(response) {
				alert("error");
			}
		} );
	}, null, null);
};

query = function() {
	initPagingParamsInFrame('oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('oTable1');
};

retrieveData = function(sSource, aoData, fnCallback) {
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : sSource,
		"cache" : false,
		"data" : aoData,
		"success" : function(response) {
			fnCallback(response);
		},
		"error" : function(response) {
			alert("error");
		}
	});
};