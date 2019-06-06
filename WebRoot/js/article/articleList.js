editObj = function(id) {
	var url = $('#ctx').val() + "/article/edit?id="+id;
	window.location=url;
};

addObj = function(id) {
	var url = $('#ctx').val() + "/article/edit";
	window.location=url;
};
//添加章
addChapter = function(bookname,bookid) {
	$("#bookName").text(bookname);
	$("#bookid").val(bookid);
	showDiv();
};

showDiv = function(){
	$("#chapterDiv").show();
};

hiddenDiv = function(){
	$("#chapterDiv").hide();
};

closeDiv = function(){
	hiddenDiv();
	$("#chapterCoder").val("");
	$("#chapterNumber").val("");
	$("#chapterName").val("");
};


saveChapter = function(){
	var url = $('#ctx').val() + "/article/savechapter";
	var options = {
		url : url,
		type : 'post',
		clearForm : false,
		timeout : 3000,
		success : function(data) {
			if(data.isSuccess=="1"){
				alert(data.msg);
			}else{
				closeDiv();
				var divText="";
				//修改章显示列表
				$.each(data.chapterList,function(index,d){ 
					divText += "<a href='#' onclick=editChapter('"+d.id+"')><span id="+d.id+">"+d.number+"</span></a>&nbsp";
				});
				$("#chapter"+data.chapter.bookid).html(divText);
			}
//			console.log(data.chapterList);
		},
		error : function(data) {
			alert("error");
		}
	};
	$('#ChapterForm').ajaxForm(options);
	$('#ChapterForm').submit();
};

editChapter = function(chapterid){
	var url = $('#ctx').val() + "/article/chapteredit?chapterid="+chapterid;
	window.location=url;
};

deleteArticle = function(articleid){
	var url = $('#ctx').val() + "/article/del?articleid="+articleid;
	window.location=url;
};

finishArticle = function(articleid){
	var url = $('#ctx').val() + "/article/finishArticle?articleid="+articleid;
	window.location=url;
};
