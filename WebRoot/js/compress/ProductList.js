//全选或反选
$(function(){
    $("button[name='checkAll']").click(function(){
    	$("input[type='checkbox']").each(function(){
    		if(this.checked){
        		this.checked = false;
        	}else{
        		this.checked = true;
        	}
    	});
    	var checked = $("input[type='checkbox']").attr("checked");
		$("input[id='ids']").attr("checked",checked);
    });
});
chbox = function(){
var sign = false;
var inputs = document.getElementsByTagName('input');
for(var i=0;i<inputs.length;i++){
		var obj = inputs[i];
		if(obj.type=='checkbox'){
			if(obj.checked==true){
			   sign = true;
			   return true;
		    }
	    } 
}
if(sign == false){
	alert("请选择素材!");
}
};

//删除信息
addObj = function() {
	var compressId =  $("#compressId").val();
	if(chbox()){
		var params = "?compressId="+compressId;
		var checkeds = $("input[name=ids]:checked");
		for (var i = 0; i < checkeds.length; i++) {
			params += "&" + checkeds[i].name + "=" + checkeds[i].value;
		}
		openConfirmModalInFrame("您确定执行将这些文件添加到产品包中吗？", function() {
			var url = $('#ctx').val() + "/pages/compress/form/save" + params;
			$.ajax({
				"dataType" : 'json',
				"type" : "POST",
				"url" : url,
				"cache" : false,
				"success" : function(response) {
					if (response.isSuccess == "true") {
						window.parent.alertMsg('successModal', 'successMsg', response.msg);
						window.location=$('#ctx').val()+"/pages/compresszip/form/index";
						//refreshFrameDataTableInFrame('oTable1');
					} else {
						window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
					}
				},
				"error" : function(response) {
					alert("error");
				}
			});
		}, null, null);
	}
};

retrieveData = function(sSource, aoData, fnCallback) {
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : sSource,
		"cache" : false,
		"data" : aoData,
		"success" : function(response) {
			fnCallback(response);
		},
		"error" : function(response) {
			alert("error");
		}
	});
};

$(function() {
	oTable1 = $("#table_report").dataTable({
						"bFilter" : false, // 开关，是否启用客户端过滤器
						"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
						"bAutoWidth" : false, // 自适应宽度
						"sPaginationType" : "full_numbers", // 分页样式
						"bServerSide" : true, // 从服务器端取数据
						"sAjaxSource" : $("#ctx").val() + "/pages/compress/form/manager", // mvc后台ajax调用接口。
						"fnServerParams": function(aoData) {
			           		aoData.push({"name": "title", "value": $("#query_title").val()});
			           	},
						"fnServerData" : retrieveData,
						"fnDrawCallback" : function(oSettings) {
							for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
								$(
										'td:eq(1)',
										oSettings.aoData[oSettings.aiDisplay[i]].nTr)
										.html(i + oSettings._iDisplayStart + 1);
							}
						},
						"aoColumns" : [
								{
									"sTitle" : "选择",
									"mData" : null,
									"bSortable" : false,
									"sClass" : "center",
									"fnRender" : function(oObj) {
										var sReturn = "";
										sReturn = '<label><input type="checkbox" id="ids" name="ids" style="display:none;" value="'
												+ oObj.aData.id
												+ '" /><span class="lbl"></span></label>';
										return sReturn;
									}
								},{
									"sTitle" : "序号",
									"mDataProp" : "id"
								},{
									"sTitle" : "产品名",
									"mDataProp" : "title"
								},{
									"sTitle" : "pdf路径",
									"mDataProp" : "bookPDFOriginName"
								}],
								
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

	$('[data-rel=tooltip]').tooltip();
	
});