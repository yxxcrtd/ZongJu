Editorial.PriceDiscount.retrieveData = function(sSource, aoData, fnCallback) {
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

Editorial.Price.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Price.enableAllButton = function() {
	$("#save").attr('disabled', "false");
	$("#reset").attr('disabled', "false");
};
var isSingleLevel = false; //价格分类是否是单一价格
var priceTypeHasChanged = false;
/******************************************** 验证价格 start*****************************************/
Editorial.Price.validate = function() {
	var flag = true;
	if(!Editorial.Price.validatePriceType()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceName()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceValue()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceStartOn()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceEndOn()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceOrderCategory()){
		flag = false;
	}
	
	if(!Editorial.Price.validatePriceDefaultFlg()){
		flag = false;
	}
	
	if(!Editorial.Price.validateRegionId()){
		flag = false;
	}
	if(!flag){
		return false;
	}
	
	Editorial.PriceDiscount.validatePriceType();
	if(!priceTypeHasChanged){
		return false;
	}
	
	$("#saveDiv").removeClass("error");
	$("#saveSpan").html("");
	
	var sss = {
		"priceType": $("#priceType option:selected").val(),
		"priceName": $("#priceName").val(),
		"priceValue": parseFloat($("#priceValue").val()),
		"priceOrderCategory": $("#priceOrderCategory").val(),
		"priceDefaultFlg":$("#priceDefaultFlg").val()
	};
	
	$.ajax({
		"dataType" : 'json',
		"contentType" : "application/json",
		"type" : "POST",
		"url" : $('#ctx').val() + "/pages/productPrice/form/editSubmit",
		"cache" : false,
		"data" : JSON.stringify({
			"priceStartOn": $("#priceStartOn").val(),
			"priceEndOn": $("#priceEndOn").val(),
			"productPrice": sss,
			"productId":$("#productId").val(),
			"regionId": $("#regionId option:selected").val(),
			"id":$("#id").val(),
            "licenseId":$('#licenseId').val()

        }),
		"success" : Editorial.Price.showResponse,
		"error" : function(response) {
			alert("error");
			alert(response);
			alert(response.responseText);
		}
	});
};

function validateDecial(decial){
	if(/^\d{1,10}(.\d{1,2})?$/gi.test(decial)){
		return true;
	} 
	return false;
}
function validateInt(int){
	if(/^\d{1,11}$/gi.test(int)){
		return true;
	} 
	return false;
}
function splitDate(date){
	if(date.indexOf(' ') != -1){
		return date.substring(0, date.indexOf(' '));
	} else {
		return date;
	}
}
/** 比较开始日期比结束日期 若晚则返回false, 反之亦然*/
function checkDateTime(beginValue,endValue){
    var flag=false;
    if(beginValue!=null && beginValue!="" && endValue!=null && endValue!=""){
        var dateS=(splitDate(beginValue)).split('-');//日期是用'-'分隔
        var dateE=(splitDate(endValue)).split('-');
        var beginDate=new Date(dateS[0],dateS[1],dateS[2]).getTime();//如果日期格式不是年月日,需要把new Date的参数调整
        var endDate=new Date(dateE[0],dateE[1],dateE[2]).getTime();
        if(beginDate>endDate){
           flag = false;
        } else {
          flag = true;
        }
    }
    return flag;
}
/******************************************** 验证价格类型 start*****************************************/
Editorial.Price.validatePriceType = function() {
	if ($("#priceType option:selected").val().trim() == "") {
		$("#priceTypeDiv").addClass("error");
		$("#priceTypeSpan").html("该字段不能为空");
		return false;
	} else {
		$("#priceTypeDiv").removeClass("error").addClass("success");
		$("#priceTypeSpan").html("");
		Editorial.Price.isOrNotSingleLevel();
		return true;
	}
};

/******************************************** 验证价格类型 end*****************************************/
/******************************************** 验证价格名称 start*****************************************/
var priceNameValidateFlag  = false;
Editorial.Price.validatePriceName = function() {
	if ($("#priceName").val().trim() == "") {
		$("#priceNameDiv").addClass("error");
		$("#priceNameSpan").html("该字段不能为空");
		return false;
	} else {
		Editorial.Price.validatePriceNameUnique();
		if(priceNameValidateFlag == true){
			return true;
		} else {
			return false;
		}
	}
};

Editorial.Price.validatePriceNameUnique = function() {
	$.ajax({
		type : "POST",
		async : false,
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/productPrice/form/nameUnique",
		data : {
			id:$("#id").val(),
			priceName: $("#priceName").val()
		},
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#priceNameDiv").removeClass("error").addClass("success");
				$("#priceNameSpan").html("通过验证");
				priceNameValidateFlag = true;
			} else {
				$("#priceNameDiv").removeClass("success").addClass("error");
				$("#priceNameSpan").html("该价格名称已存在");
				priceNameValidateFlag  = false;
			}
		},
		error : function(response) {
			alert("error");
		}
	});
};
/******************************************** 验证价格名称 end*****************************************/
/******************************************** 验证价格值 start*****************************************/
Editorial.Price.validatePriceValue = function() {
	if(isSingleLevel){
		if ($("#priceValue").val().trim() == "") {
			$("#priceValueDiv").addClass("error");
			$("#priceValueSpan").html("该字段不能为空");
			return false;
		}else if(!validateDecial($("#priceValue").val().trim())) {
			$("#priceValueDiv").addClass("error");
			$("#priceValueSpan").html("请输入数值类型(最多含两位小数)");
			return false;
		}
		$("#priceValueDiv").removeClass("error").addClass("success");
		$("#priceValueSpan").html("");
	}
	return true;
};
/******************************************** 验证价格值 end*****************************************/
/******************************************** 验证价格开始时间和结束时间 start*****************************************/
Editorial.Price.validatePriceStartOn = function() {
	if ($("#priceStartOn").val().trim() == "") {
		$("#priceStartOnDiv").addClass("error");
		$("#priceStartOnSpan").html("该字段不能为空");
		return false;
	}else {
		$("#priceStartOnDiv").removeClass("error").addClass("success");
		$("#priceStartOnSpan").html("");
		return true;
	}
};
Editorial.Price.validatePriceEndOn = function() {
	if ($("#priceEndOn").val().trim() == "") {
		$("#priceEndOnDiv").addClass("error");
		$("#priceEndOnSpan").html("该字段不能为空");
		return false;
	} else if(!checkDateTime($("#priceStartOn").val(),$("#priceEndOn").val() )){
		$("#priceEndOnDiv").addClass("error");
		$("#priceEndOnSpan").html("价格结束日期要晚于开始日期");
		return false;
	}
	$("#priceEndOnDiv").removeClass("error").addClass("success");
	$("#priceEndOnSpan").html("");
	return true;
};
/******************************************** 验证价格开始时间和结束时间 end*****************************************/
/******************************************** 验证价格订单分类 start*****************************************/
Editorial.Price.validatePriceOrderCategory = function() {
	if ($("#priceOrderCategory").val().trim() == "") {
		$("#priceOrderCategoryDiv").addClass("error");
		$("#priceOrderCategorySpan").html("该字段不能为空");
		return false;
	}else {
		$("#priceOrderCategoryDiv").removeClass("error").addClass("success");
		$("#priceOrderCategorySpan").html("");
		return true;
	}
};
/******************************************** 验证价格订单分类 end*****************************************/
/******************************************** 验证价格默认标识 start*****************************************/
Editorial.Price.validatePriceDefaultFlg = function() {
	if ($("#priceDefaultFlg").val().trim() == "") {
		$("#priceDefaultFlgDiv").addClass("error");
		$("#priceDefaultFlgSpan").html("该字段不能为空");
		return false;
	}else {
		$("#priceDefaultFlgDiv").removeClass("error").addClass("success");
		$("#priceDefaultFlgSpan").html("");
		return true;
	}
};
/******************************************** 验证价格默认标识 end*****************************************/
/******************************************** 验证价格所属地域 start*****************************************/
Editorial.Price.validateRegionId = function() {
	if ($("#regionId").val().trim() == "") {
		$("#regionIdDiv").addClass("error");
		$("#regionIdSpan").html("该字段不能为空");
		return false;
	} else {
		$("#regionIdDiv").removeClass("error").addClass("success");
		$("#regionIdSpan").html("");
		return true;
	}
};
/******************************************** 验证价格所属地域 end *****************************************/
/******************************************** 验证价格 end*****************************************/
Editorial.Price.isOrNotSingleLevel = function(){
	if($("#priceType option:selected").text().trim() == "单一价格"){
		isSingleLevel = true;
	} else{
		isSingleLevel = false;
	}
	
	if (isSingleLevel == true) {
		$("#priceValue").removeAttr("disabled");
		$("#showPriceDiscount").css("display", "none");
		//若是单一价格。则折扣无记录
	} else {//否则可添加折扣记录，并将价格值为disable
		$("#priceValue").attr("disabled", "true");
		$("#priceValue").val('');
		$("#showPriceDiscount").css("display", "block");
	}
};
Editorial.Price.showResponse = function(response, statusText) {
	Editorial.Price.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
		//刷新当前页面
		
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Price.enableAllButton();
	}
};
/******************************************** 修改价格折扣 start*****************************************/
Editorial.PriceDiscount.modObj = function (id, rowId){
	if($("#id").val().trim() == "" || $("#priceType").val().trim() == ""){
		$("#saveDiv").addClass("error");
		$("#saveSpan").html("请先保存产品价格");
		return false;
	} else {
		$("#saveDiv").removeClass("error").addClass("success");
		$("#saveSpan").val("");
	}
	//若产品类型有所改变，则提示先保存
	Editorial.PriceDiscount.validatePriceType();
	if(!priceTypeHasChanged){
		return false;
	}
	var url = $('#ctx').val()+"/pages/productPriceDiscount/form/edit?id=" + id+"&priceId="+$("#id").val().trim()+"&priceDiscountType="+$("#priceType option:selected").val().trim();
	var commonModalCss = {
			"width" : "400px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
var priceTypeHasChanged = true;
Editorial.PriceDiscount.validatePriceType = function() {
	var sss = {
			"priceType": $("#priceType option:selected").val(),
			"priceName": $("#priceName").val(),
			"priceValue": parseFloat($("#priceValue").val()),
			"priceOrderCategory": $("#priceOrderCategory").val(),
			"priceDefaultFlg":$("#priceDefaultFlg").val()
		};
	
	$.ajax({
		type : "POST",
		async : false,
		"contentType" : "application/json",
		"dataType": 'json',
		url : $('#ctx').val() + "/pages/productPrice/form/getProductType",
		data : JSON.stringify({
			"priceStartOn": $("#priceStartOn").val(),
			"priceEndOn": $("#priceEndOn").val(),
			"productPrice": sss,
			"productId":$("#productId").val(),
			"regionId": $("#regionId option:selected").val(),
			"id":$("#id").val()
		}),
		success : function(response) {
			if (response.isSuccess == "true") {
				$("#saveDiv").removeClass("error");
				$("#saveSpan").html("");
				priceTypeHasChanged =  true;
			} else {
				$("#saveDiv").removeClass("success").addClass("error");
				if(response.msg == "0" ){
					$("#saveSpan").html("请保存产品价格");
					priceTypeHasChanged =  false;
				} else if(response.msg == "1"){
					$("#saveSpan").html("此产品价格有其他价格类型记录，请将其全部删除");
					priceTypeHasChanged =  false;
				} else {
					priceTypeHasChanged =  true;
				}
				
			}
		},
		error : function(response) {
			alert("error");
			return false;
		}
	});
};
/******************************************** 修改价格折扣 end*****************************************/
/******************************************** 添加价格折扣 start*****************************************/
Editorial.PriceDiscount.AddDiscount =function(){
	if($("#id").val().trim() == "" || $("#priceType").val().trim() == ""){
		$("#saveDiv").addClass("error");
		$("#saveSpan").html("请先保存产品价格");
		return false;
	} 
	//请先保存更改的产品类型

	//若产品价格信息有所改变，则提示先保存
	Editorial.PriceDiscount.validatePriceType();

	if(!priceTypeHasChanged){
		return false;
	}
	var url = $('#ctx').val()+"/pages/productPriceDiscount/form/edit?priceId="+$("#id").val().trim()+"&priceDiscountType="+$("#priceType option:selected").val().trim();
	var commonModalCss = {
			"width" : "400px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
/******************************************** 添加价格折扣 end*****************************************/
/******************************************** 删除价格折扣 start*****************************************/
Editorial.PriceDiscount.delObj = function(id, rowId) {
	
		if(id != ''){
			//openConfirmModalInFrame(Global_Prompt_Delete_Message, function() {
			var url = $('#ctx').val()+"/pages/productPriceDiscount/form/delete?id="+id;
			$.ajax( {
				"dataType": 'json',
				"type": "POST",
				"url": url,
				"cache": false,
				"success": function(response) {
					if (response.isSuccess == "true") {
						//openSuccessAlertModalInFrame(response.msg);
						refreshFrameDataTableInFrame('Editorial.PriceDiscount.oTable1');
					} else {
						//openErrorAlertModalInFrame(response.msg);
					}
				},
				"error": function(response) {
					alert("error");
				}
			});
		//}, null, null);
		
	}
	
};
/******************************************** 删除价格折扣 end*****************************************/
/******************************************** 删除全部折扣 start *************************************/
Editorial.PriceDiscount.delAllDiscount = function () {
	if($("#id").val().trim() != ""){
		var url = $('#ctx').val()+"/pages/productPrice/form/delAllDiscount?id="+$("#id").val().trim();
		$.ajax({
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					//openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame('Editorial.PriceDiscount.oTable1');
				} else {
					//openErrorAlertModalInFrame(response.msg);
				}
			},
			"error": function(response) {
				alert("error");
			}
		});
	}
};
/******************************************** 删除全部折扣 end *************************************/
$(function() {
	//判断是否应该显示折扣列表
	Editorial.Price.isOrNotSingleLevel();
	
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Price.validatePriceStartOn();
	});
	$('#invoiceDate2').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Price.validatePriceEndOn();
	});
	
	Editorial.PriceDiscount.oTable1 = $('#table_report_2').dataTable({
	    "bFilter": false, //开关，是否启用客户端过滤器
	    "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
	    "bAutoWidth": false, //自适应宽度
	    "sPaginationType": "full_numbers", //分页样式
	    "bServerSide": true, //从服务器端取数据
	   	"sAjaxSource": $('#ctx').val()+"/pages/productPriceDiscount/form/manager?now=" + new Date().getTime()+"&priceId="+$('#id').val(), //mvc后台ajax调用接口。
	   	"fnServerParams": function(aoData) {},
	    "fnServerData": Editorial.PriceDiscount.retrieveData,
	    "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$(oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).attr("id",  ""+(i+1)+"");
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
	    },
	    "aoColumns": [{ 
				"sTitle": "Id",
	    		"mDataProp": "priceDiscountId"
	        },{
				"sTitle": "价格折扣数量",
	        	"mDataProp": "priceDiscountCount"
			}, {
				"sTitle": "价格折扣值",
				"mDataProp": "priceDiscountValue"
			}, {
				"sTitle": "价格折扣类型",
				"mDataProp": "priceDiscountType"
			}, {
				"sTitle": Global_Prompt_Operating,
				"mData": null,
		        "aTargets": [ -1 ],
	          	//自定义列的样式
	            "fnRender": function (oObj) {
	            	var rowId = parseInt(oObj.iDataRow)+1;
	            	var discountId = "<div class='discountId' style='display:none;'> "+oObj.aData.priceDiscountId+"</div>";
	                var start = '<div class="hidden-phone visible-desktop btn-group">';
	                var edit = '<button  class="btn btn-mini btn-warning" title="修改价格折扣" onclick="Editorial.PriceDiscount.modObj(\'' + oObj.aData.priceDiscountId + '\',\'' + (rowId) + '\')"><i class="icon-edit bigger-120"></i></button>';
	                var trash = '<button class="btn btn-mini btn-danger" title="删除价格折扣" onclick="Editorial.PriceDiscount.delObj(\'' + oObj.aData.priceDiscountId + '\',\'' + (rowId) + '\')"><i class="icon-trash bigger-120"></i></button>';
	                var end = '</div>';
	                return discountId + start +edit + trash + end;
	        	}
			}
	    ],
	 // 多语言配置
		"oLanguage" : {
			"sProcessing" : "正在加载中......",
			"sLengthMenu" : "每页显示 _MENU_ 条记录",
			"sZeroRecords" : "对不起，查询不到相关数据！",
			"sEmptyTable" : "表中无数据存在！",
			"sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
			"sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
			"sSearch" : "搜索",
			"oPaginate" : {
				"sFirst" : "首页",
				"sPrevious" : "上一页",
				"sNext" : "下一页",
				"sLast" : "末页"
			}
		}
	});							
	
	 $(".on").click(function(){
			$(".on-down").slideToggle();
	});
});