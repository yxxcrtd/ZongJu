// 获取返回信息
msgsuccess = function(msg) {
	alert(msg.msg);
	//判断信息是否成功，成功返回首页
	if(msg.isSuccess){
		window.location=$('#ctx').val();	
	}
};

// 角色状态字段隐藏
change = function() {
	var role = $("input[name='obj.role']:checked").val().trim();
	if (role == 1) {
		$(".hiddentr").show();
	} else {
		$(".hiddentr").hide();
	}
};

// 保存信息
$(function() {
	// 页面加载的时候让会员不显示分成比例
	$(".hiddentr").hide();

	var options = {
		success : msgsuccess,
		url : $('#ctx').val() + "/register/save",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#UserForm').ajaxForm(options);
});
