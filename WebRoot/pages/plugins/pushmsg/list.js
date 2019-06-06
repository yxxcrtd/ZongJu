Editorial.User = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
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