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
$(function() {
	var options = {
			success :showResponse,
		url : $('#ctx').val() + "/pages/dataManager/form/save",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#DataManagerForm').ajaxForm(options);
	
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		datePublication();
	});
});

// 完善版权信息
perfectObj = function(id) {
	var url = $('#ctx').val()+"/pages/copyright/form/saveSubmit?id=" + id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "400px"
		};
		var commonModalBodyCss = {
			"max-height": "1000px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

// 显示添加
addObj = function() {
	var url = $('#ctx').val()+"/pages/dataManager/form/edit";
	var commonModalCss = {
		"width" : "450px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height": "1000px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//查看版权交易信息
lookObj = function(id) {
	var url = $('#ctx').val() + "/pages/trade/form/index?id=" + id;
	window.location.href = url;
};

// 显示修改
modObj = function(id) {
	var url = $('#ctx').val() + "/pages/dataManager/form/edit?id=" + id;
	var commonModalCss = {
		"width" : "450px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height": "1000px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//创建二维码
createTwoDimension = function(id) {
	openConfirmModalInFrame("你确定创建二维码信息吗？", function() {
		var url = $('#ctx').val() + "/pages/dataManager/form/createTwoDimension?id=" + id;
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

// 删除
delObj = function(id) {
	openConfirmModalInFrame(Global_Prompt_Delete_Message, function() {
		var url = $('#ctx').val() + "/pages/dataManager/form/delete?id=" + id;
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

var selectOnLine = function(columName,mDataProp){
	//取得资源名称
	var name = $("#name").val();
	columName = encodeURIComponent(encodeURIComponent(columName));
	name = encodeURIComponent(encodeURIComponent(name));
	var url = $('#ctx').val()+"/pages/dataManager/form/material?name=" + name+"&columName="+columName+"&mDataProp="+mDataProp;
	var commonModalCss = {
		"width" : "800px",
		"height" : "450px"
	};
	var commonModalBodyCss = {
		"max-height": "1000px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

writeMsg = function(returndate){
	$("#"+returndate.mDataProp).val(returndate.param);
};

download = function(id){
	var url = $('#ctx').val()+"/pages/dataManager/form/download?id="+id;
	window.location=url;
};