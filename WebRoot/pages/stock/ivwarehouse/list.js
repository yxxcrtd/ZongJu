Editorial.User = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.User.addObj = function() {
	var url = $('#ctx').val()+"/pages/stock/ivwarehouse/form/edits";
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.User.modObj = function(id,fs) {
	var url = $('#ctx').val()+"/pages/stock/ivwarehouse/form/edits?id="+id+"&fs="+fs;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.User.delObj = function(id) {
	openConfirmModalInFrame(Global_Prompt_Delete_Message, function() {
		var url = $('#ctx').val()+"/pages/stock/ivwarehouse/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame('Editorial.User.oTable1');
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

Editorial.User.query = function() {
	initPagingParamsInFrame('Editorial.User.oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.User.oTable1');
};

Editorial.User.retrieveData = function(sSource, aoData, fnCallback) {
       $.ajax( {
           "dataType": 'json',
           "type": "POST",
           "url": sSource,
           "cache": false,
           "data": aoData,
           "success": function(response) {
        	   fnCallback(response);
           },
           "error": function(response) {
        	   alert("error");
           }
       } );
};