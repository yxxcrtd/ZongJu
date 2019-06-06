jQuery.namespace('BMEP.DicClass');

BMEP.DicClass = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

BMEP.DicClass.addObj = function() {
	var url = $('#ctx').val() + "/pages/dicClass/form/edit";
	var commonModalCss = {
			"width" : "550px",
			"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.DicClass.modObj = function(id) {
	var url = $('#ctx').val() + "/pages/dicClass/form/edit?id="+id;
	var commonModalCss = {
		"width" : "550px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.DicClass.delObj = function(id) {
	openConfirmModalInFrame("您确定删数据字典分类吗？",function(){
		var url = $('#ctx').val() + "/pages/dicClass/form/delete?id="+id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame('BMEP.DicClass.oTable1');
				} else {
					openErrorAlertModalInFrame(response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	},null,null);
};
BMEP.DicClass.dic = function(id){
	var url = $('#ctx').val()+"/pages/dic/form/list?dicClassId="+id;
	window.location.href = url;
};
BMEP.DicClass.query = function() {
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('BMEP.DicClass.oTable1');
};

BMEP.DicClass.retrieveData = function(sSource, aoData, fnCallback) {
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

    $(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	BMEP.DicClass.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/dicClass/form/manager", // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "code", "value" : $("#query_dicClass_code").val()
			});
			aoData.push({
				"name" : "name", "value" : $("#query_dicClass_name").val()
			});
			aoData.push({
				"name" : "internationCode", "value" : $("#query_dicClass_internationCode").val()
			});
		},
		"fnServerData" : BMEP.DicClass.retrieveData,
		"fnDrawCallback": function(oSettings){
			for(var i=0,iLen=oSettings.aiDisplay.length;i<iLen;i++)
			{
				$('td:eq(0)',oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i+oSettings._iDisplayStart+1);
			}
		},
		"aoColumns" : [ {
			"sTitle" : "序号",
			"mDataProp" : "id"
		}, {
			"sTitle" : "数据字典分类",
			"mDataProp" : "code"
		}, {
			"sTitle" : "数据字典名称",
			"mDataProp" : "name"
		}, {
			"sTitle" : "国际化参数值",
			"mDataProp" : "internationCode"
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"aTargets" : [ -1 ],
			// 自定义列的样式
			"fnRender" : function(oObj) {
				var start = '<div class="hidden-phone visible-desktop btn-group">';
				var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="BMEP.DicClass.modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
				var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="BMEP.DicClass.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
				var contract = '<button class="btn btn-mini btn-success"  data-toggle="tooltip" data-placement="bottom" title="数据字典" onclick="BMEP.DicClass.dic(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
				var end = '</div>';
				return start + edit + trash + contract + end;
			}
		} ],
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
