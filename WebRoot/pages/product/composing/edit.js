$(function() {
	if($("#composingId").val() == "") {
		$.customProperty.destroy("cp1");
	} else {
		loadCP( $("#composingId").val() );
	}
	
	$("#baseInfoDiv").click(function() {
		$("#baseInfoContentDiv").slideToggle("fast");
	});
	
});

function loadCP(composingId) {
	var cus1 = $.customProperty.create({
		renderTo: "cp1",
		add_tab_url: $("#ctx").val() + "/pages/composing/form/addTab",
		main_data_param: {
			name: "composingId",
			value: composingId
		},
		type_data_param: {
			name: "composingType.ctypeId",
			value: $("#ctypeId").val()
		},
		classify_data_param: {
			name: "composingTypePropClassify.ctpClassifyId",
			value: ""
		},
		prop_data_param: {
			id_name: "propsId",
			value_name: "propsValue"
		},
		classify_list: {
			name: "composingTypePropClassifyList",
			field: {
				id: "ctpClassifyId",
				code: "ctpClassifyCode",
				name: "ctpClassifyName"
			}
		},
		prop_list: {
			name: "composingPropList",
			field: {
				id: "composingPropId",
				code: "composingPropCode",
				name: "composingPropName",
				value: "composingPropValue",
				display: "composingPropDisplay",
				must: "composingPropMust",
				source: "composingPropSource"
			}
		}
	});
	
}

/******************************************* 验证开始 **************************************************************/
var whFloorCodeValidateFlag = false;
var whFloorDescValidateFlag = false;
jQuery.namespace('Editorial.User');
var whFloorStatusValidateFlag = false;

Editorial.User.validate = function() {
	var flag = true;
	if (!Editorial.User.validateComposingProduct()) {
		flag = false;
	}
	return flag;
};
/******************************************* 验证WhFloorCode开始 **************************************************************/
Editorial.User.validateComposingProduct = function() {
	if ($("#composingProduct").val() == "") {
		$("#composingProductDiv").addClass("error");
		$("#composingProductSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.User.validateComposingProductUnique();
		if (whFloorCodeValidateFlag == true) {
			return true;
		} else {
			return false;
		}
	}
};

Editorial.User.validateComposingProductUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',	
		url : $('#ctx').val() + "/pages/composing/form/validateComposingProductUnique",
		data : {
			composingProduct : $("#composingProduct").val(),
			composingId : $("#composingId").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#composingProductDiv").removeClass("error").addClass("success");
				$("#composingProductSpan").html("可以使用");
				whFloorCodeValidateFlag = true;
			} else {
				$("#composingProductDiv").removeClass("success").addClass("error");
				$("#composingProductSpan").html("此条信息已存在");
				whFloorCodeValidateFlag = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************* 验证WhFloorCode结束 **************************************************************/
/******************************************* 验证结束 **************************************************************/


Editorial.User.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.User.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};


BMEP.Product.ProductTypeProp.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		//ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		$("#composingId").val(response.composing.composingId);
		loadCP(response.composing.composingId);
		//autoCloseCommonModal(5);
		//Editorial.Product.Temp.composingModObj(response.composingId);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
	BMEP.Product.ProductTypeProp.enableAllButton();
};

$(function() {
	var options = {
		beforeSubmit:Editorial.User.enableAllButton,
		success : BMEP.Product.ProductTypeProp.showResponse,
		url :  $('#ctx').val()+'/pages/composing/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#composingForm').ajaxForm(options);
	
	hider();
	$("#display").change(function(){
		hider();
	});
	function hider(){
	var at=$("#display").val();				
	if(at==1){
		$("#diveffective").show();
	}else{
		$("#diveffective").hide();
	}
}
});
