//获取返回信息
msgsuccess = function(msg) {
	alert(msg.msg);
	//判断信息是否成功，成功返回首页
	if(msg.isSuccess){
		window.location.href = "" == $('#ctx').val() ? "/" : $('#ctx').val();
	}
};

// 保存信息
$(function() {
	var options = {		
		success : msgsuccess,
		url : $('#ctx').val() + "/loginCheck",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#UserForm').ajaxForm(options);
});