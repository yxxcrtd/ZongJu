ZongJu.Watermark = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.Watermark.validate = function() {
	var flag = true;
	if (!ZongJu.Watermark.content()) {
		flag = false;
	}
	if (!ZongJu.Watermark.font()) {
		flag = false;
	}
	return flag;
};

ZongJu.Watermark.content = function() {
	if ($("#content").val() == "") {
		$("#contentDiv").addClass("error");
		$("#contentSpan").html("内容不能为空！");
		return false;
	}else{
		$("#contentDiv").removeClass("error").addClass("success");
		$("#contentSpan").html("通过验证");
		return true;
	}
};

ZongJu.Watermark.font = function() {
	var regex = /^[0-9]*$/;
	var val = $("#font").val();
	if ($("#font").val() == "") {
		$("#fontDiv").addClass("error");
		$("#fontSpan").html("字体大小不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#fontDiv").addClass("error");
		$("#fontSpan").html("请输入数字类型");	
	} else if(val>parseInt('80')||val<parseInt('30')) {
		$("#fontDiv").addClass("error");
		$("#fontSpan").html("字体大小在30-80之间!");
	}else{
		$("#fontDiv").removeClass("error").addClass("success");
		$("#fontSpan").html("通过验证");
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



//Edit保存
$(function() {
	var options = {
		beforeSubmit:ZongJu.Watermark.validate,	
		success : showResponse,
		url : $('#ctx').val() + "/pages/watermark/form/editftl",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#WatermarkFormEdit').ajaxForm(options);
});






// Add保存
$(function() {
	var options = {
		beforeSubmit:ZongJu.Watermark.validate,		
		success : showResponse,
		url : $('#ctx').val() + "/pages/watermark/form/addftl",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#WatermarkForm').ajaxForm(options);
});

// 显示修改
modObj = function(id) {
	var url = $('#ctx').val() + "/pages/watermark/form/edit?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


//增加
addObj = function(id) {
	$(".hiddentr").hide();
	var url = $('#ctx').val() + "/pages/watermark/form/add";
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


//删除信息
delObj = function(id) {
	openConfirmModalInFrame("您确定删除该水印信息吗？",function(){
		var url = $('#ctx').val()+"/pages/watermark/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('oTable1');
					autoCloseCommonModal(50);
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error": function(response) {
				alert("error");
			}
		} );
	},null,null);
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