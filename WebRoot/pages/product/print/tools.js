function ifnull(value) {
	if (value == null) {
		return "";
	}
	return value;
}

function showValidateMsg(isSuccess, msg, id) {
	if (isSuccess) {
		$(id + "_div").removeClass("error").addClass("success");
	} else {
		$(id + "_div").removeClass("success").addClass("error");
	}
	$(id + "_span").html(msg);
}