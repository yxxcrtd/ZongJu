createPDF = function(){
	var url = $('#ctx').val() + "/article/create";
	var id = $("#id").val();
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : url,
		"cache" : false,
		"data" : "id="+id,
		"success" : function(response) {
			alert("success");
		},
		"error" : function(response) {
			alert("error");
		}
	});
};


returnList = function(){
	var url = $('#ctx').val() + "/article/manager";
	window.location=url;
};


saveEdit = function() {
	var url = $('#ctx').val() + "/article/save";
	$("#ArticleForm").attr("action",url);
	$("#ArticleForm").submit();
};
