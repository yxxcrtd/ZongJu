Editorial.Contract = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Contract.addObj = function() {
	var url = $('#ctx').val()+"/pages/crContract/form/edits";
	var commonModalCss = {
		"width": "1000px",
		"height" : "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Contract.modObj = function(id) {
	var url = $('#ctx').val()+"/pages/crContract/form/edits?id="+id;
	var commonModalCss = {
		"width": "1000px",
		"height" : "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Contract.delObj = function(id) {
	openConfirmModalInFrame(Global_Prompt_Delete_Message, function() {
		var url = $('#ctx').val()+"/pages/crContract/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame('Editorial.Contract.oTable1');
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

Editorial.Contract.query = function() {
	initPagingParamsInFrame('Editorial.Contract.oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.Contract.oTable1');
};

Editorial.Contract.retrieveData = function(sSource, aoData, fnCallback) {
       $.ajax({
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
       });
};