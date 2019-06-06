jQuery.namespace('Editorial.EPrint');

Editorial.Material.validate = function() {
	var flag = true;
	if (!Editorial.PrintCosts.isNullOrPrintPrice()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintOpenFlg()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintEdition()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintPaperCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintPaperAddCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintSize()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintprintBindingSize()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintSheet()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintSampleCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintPaperTotalCount()) {
		flag = false;
	}
	if (!Editorial.PrintCosts.isNullOrPrintPaperTotalPrice()) {
		flag = false;
	}
	return flag;
};

Editorial.EPrint.retrieveData = function(sSource, aoData, fnCallback) {
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

Editorial.EPrint.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.EPrint.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};


Editorial.EPrint.showResponse = function(response, statusText) {
	if (response.isSuccess == "true") {
		if (response.insOrUpdId=="2") {
			refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
			$("#printId").val(response.print.printId);
			materialShow(response.print.printId);
			$("#materialDiv").css("display", "block");
			costShow(response.print.printId);
			$("#costDiv").css("display", "block");
		}else if(response.insOrUpdId=="1"){
			refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
			refreshFrameDataTableInFrame('Editorial.EPrint.oTable2');
			refreshFrameDataTableInFrame('Editorial.EPrint.oTable3');
		}
	} else {
		ajaxAlertErrorMsg(response.msg, true);
	}
    Editorial.EPrint.enableAllButton();
};

$(function() {
	
	 $(".on").click(function(){
			$(".on-down").slideToggle();
	});

	var printId=$("#printId").val();
	if(printId== "") {
		$("#materialDiv").hide();
		$("#costDiv").hide();
	}else{
		materialShow(printId);
		$("#materialDiv").show();
		costShow(printId);
		$("#costDiv").show();
	}
	
	var options = {
		beforeSubmit:Editorial.Material.validate,
		success : Editorial.EPrint.showResponse,
		url :  $('#ctx').val()+'/pages/product/print/form/editSubmit',
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#printForm').ajaxForm(options);
	
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

/**
 * 材料需求 start
 */
function materialShow(printId) {
	//判断是否应该显示折扣列表
	Editorial.EPrint.oTable2 = $('#table_report_2').dataTable({
	    "bFilter": false, //开关，是否启用客户端过滤器
	    "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
	    "bAutoWidth": false, //自适应宽度
	    "sPaginationType": "full_numbers", //分页样式
	    "bServerSide": true, //从服务器端取数据
	   	"sAjaxSource": $('#ctx').val()+"/pages/productMaterial/form/manager?printId="+printId, //mvc后台ajax调用接口。
	   	"fnServerParams": function(aoData) {},
	    "fnServerData": Editorial.EPrint.retrieveData,
	    "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$(oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).attr("id",  ""+(i+1)+"");
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
	    },
	    "aoColumns": [{ 
				"sTitle": "Id",
	    		"mDataProp": "id"
	        },{
				"sTitle": "材料名称",
	        	"mDataProp": "name"
			}, {
				"sTitle": "材料库存量",
				"mDataProp": "stockCount"
			}, {
				"sTitle": "材料单价",
				"mDataProp": "price"
			}, {
				"sTitle": Global_Prompt_Operating,
				"mData": null,
		        "aTargets": [ -1 ],
	          	//自定义列的样式
	            "fnRender": function (oObj) {
	                var start = '<div class="hidden-phone visible-desktop btn-group">';
	                var edit = '<button  class="btn btn-mini btn-warning" title="修改" onclick="Editorial.EPrint.modMaterialObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
	                var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.EPrint.delMaterialObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
	                var end = '</div>';
	                return start +edit + trash + end;
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
}

Editorial.EPrint.AddMaterial =function(){
	var url = $('#ctx').val()+"/pages/productMaterial/form/edit?printId="+$("#printId").val();
	var commonModalCss = {
			"width" : "1000px",
			"height" : "500px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.EPrint.modMaterialObj = function (id){
	var url = $('#ctx').val()+"/pages/productMaterial/form/edit?mid="+id;
	var commonModalCss = {
			"width" : "1000px",
			"height" : "500px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.EPrint.delMaterialObj = function(id) {
	if(id != ''){
		var url = $('#ctx').val()+"/pages/productMaterial/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.EPrint.oTable2');
				} else {
				}
			},
			"error": function(response) {
				alert("error");
			}
		});
}
};

/**
 * 印装费用 start
 */
function costShow(printId) {
	//判断是否应该显示折扣列表
	Editorial.EPrint.oTable3 = $('#table_report_3').dataTable({
	    "bFilter": false, //开关，是否启用客户端过滤器
	    "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
	    "bAutoWidth": false, //自适应宽度
	    "sPaginationType": "full_numbers", //分页样式
	    "bServerSide": true, //从服务器端取数据
	   	"sAjaxSource": $('#ctx').val()+"/pages/printCosts/form/manager?printId="+printId, //mvc后台ajax调用接口。
	   	"fnServerParams": function(aoData) {},
	    "fnServerData": Editorial.EPrint.retrieveData,
	    "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$(oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).attr("id",  ""+(i+1)+"");
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
	    },
	    "aoColumns": [{ 
				"sTitle": "Id",
	    		"mDataProp": "id"
	        },{
				"sTitle": "项目",
	        	"mDataProp": "name"
			}, {
				"sTitle": "单价",
				"mDataProp": "price"
			}, {
				"sTitle": "结算数量",
				"mDataProp": "num"
			}, {
				"sTitle": Global_Prompt_Operating,
				"mData": null,
		        "aTargets": [ -1 ],
	          	//自定义列的样式
	            "fnRender": function (oObj) {
	                var start = '<div class="hidden-phone visible-desktop btn-group">';
	                var edit = '<button  class="btn btn-mini btn-warning" title="修改" onclick="Editorial.EPrint.modCostObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
	                var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.EPrint.delCostObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
	                var end = '</div>';
	                return start +edit + trash + end;
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
	
}

Editorial.EPrint.modCostObj = function (id){
	var url = $('#ctx').val()+"/pages/printCosts/form/edit?cid="+id;
	var commonModalCss = {
			"width" : "1000px",
			"height" : "500px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.EPrint.delCostObj = function(id) {
	if(id != ''){
		var url = $('#ctx').val()+"/pages/printCosts/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.EPrint.oTable3');
				} else {
				}
			},
			"error": function(response) {
				alert("error");
			}
		});
}
};

Editorial.EPrint.AddCost =function(){
	var url = $('#ctx').val()+"/pages/printCosts/form/edit?printId="+$("#printId").val();
	var commonModalCss = {
			"width" : "500px",
			"height" : "380px"
	};
	var commonModalBodyCss = {
		"max-height" : "1400px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


//***************************************************************************************************
Editorial.PrintCosts.isNullOrPrintPrice = function() {
	if ($("#printPrice").val() == "") {
		$("#printPriceDiv").removeClass("success").addClass("error");
		$("#printPriceSpan").html("请输入定价");
		return false;
	} else {
		$("#printPriceDiv").removeClass("error").addClass("success");
		$("#printPriceSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintCount = function() {
	if ($("#printCount").val() == "") {
		$("#printCountDiv").removeClass("success").addClass("error");
		$("#printCountSpan").html("请输入印数");
		return false;
	} else {
		$("#printCountDiv").removeClass("error").addClass("success");
		$("#printCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintOpenFlg = function() {
	if ($("#printOpenFlg").val() == "") {
		$("#printOpenFlgDiv").removeClass("success").addClass("error");
		$("#printOpenFlgSpan").html("请选择开本");
		return false;
	} else {
		$("#printOpenFlgDiv").removeClass("error").addClass("success");
		$("#printOpenFlgSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintEdition = function() {
	if ($("#printEdition").val() == "") {
		$("#printEditionDiv").removeClass("success").addClass("error");
		$("#printEditionSpan").html("请输入版次");
		return false;
	} else {
		$("#printEditionDiv").removeClass("error").addClass("success");
		$("#printEditionSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintPaperCount = function() {
	if ($("#printPaperCount").val() == "") {
		$("#printPaperCountDiv").removeClass("success").addClass("error");
		$("#printPaperCountSpan").html("请输入数据");
		return false;
	} else {
		$("#printPaperCountDiv").removeClass("error").addClass("success");
		$("#printPaperCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintPaperAddCount = function() {
	if ($("#printPaperAddCount").val() == "") {
		$("#printPaperAddCountDiv").removeClass("success").addClass("error");
		$("#printPaperAddCountSpan").html("请输入数量");
		return false;
	} else {
		$("#printPaperAddCountDiv").removeClass("error").addClass("success");
		$("#printPaperAddCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintSize = function() {
	if ($("#printSize").val() == "") {
		$("#printSizeDiv").removeClass("success").addClass("error");
		$("#printSizeSpan").html("请输入尺寸");
		return false;
	} else {
		$("#printSizeDiv").removeClass("error").addClass("success");
		$("#printSizeSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintprintBindingSize = function() {
	if ($("#printprintBindingSizeId").val() == "") {
		$("#printprintBindingSizeDiv").removeClass("success").addClass("error");
		$("#printprintBindingSizeSpan").html("请选择方式");
		return false;
	} else {
		$("#printprintBindingSizeDiv").removeClass("error").addClass("success");
		$("#printprintBindingSizeSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintSheet = function() {
	if ($("#printSheet").val() == "") {
		$("#printSheetDiv").removeClass("success").addClass("error");
		$("#printSheetSpan").html("请输入印张");
		return false;
	} else {
		$("#printSheetDiv").removeClass("error").addClass("success");
		$("#printSheetSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintSampleCount = function() {
	if ($("#printSampleCount").val() == "") {
		$("#printSampleCountDiv").removeClass("success").addClass("error");
		$("#printSampleCountSpan").html("请输入数量");
		return false;
	} else {
		$("#printSampleCountDiv").removeClass("error").addClass("success");
		$("#printSampleCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintPaperTotalCount = function() {
	if ($("#printPaperTotalCount").val() == "") {
		$("#printPaperTotalCountDiv").removeClass("success").addClass("error");
		$("#printPaperTotalCountSpan").html("请输入总量");
		return false;
	} else {
		$("#printPaperTotalCountDiv").removeClass("error").addClass("success");
		$("#printPaperTotalCountSpan").html("");
		return true;
	}
};
Editorial.PrintCosts.isNullOrPrintPaperTotalPrice = function() {
	if ($("#printPaperTotalPrice").val() == "") {
		$("#printPaperTotalPriceDiv").removeClass("success").addClass("error");
		$("#printPaperTotalPriceSpan").html("请输入价格");
		return false;
	} else {
		$("#printPaperTotalPriceDiv").removeClass("error").addClass("success");
		$("#printPaperTotalPriceSpan").html("");
		return true;
	}
};

