$(function() {
	Editorial.Product.Subject.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/base/subject/form/manager?id="+$('#productId').val(), // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "name",
				"value" : $("#query_module_name").val()
			});
		},
		"fnDrawCallback" : function(oSettings) {
			for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$('td:eq(1)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [ {
			"mData" : null,
			"bSortable" : false,
			"sClass" : "center",
			"fnRender" : function(oObj) {
				var sReturn = "";
				sReturn = '<label><input type="checkbox" name="sela" value="' + oObj.aData.id + '" /><span class="lbl"></span></label><input type="hidden" name="allId" value="' + oObj.aData.id + '" />';
				return sReturn;
			}
		} ,{
			"sTitle" : "ID",
			"mDataProp" : "id"
		}, {
			"sTitle" : "编号",
			"mDataProp" : "code"
		}, {
			"sTitle" : "名称",
			"mDataProp" : "name"
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

Editorial.Product.Subject.saveRoleList = function() {
	var sData = $('input', Editorial.Product.Subject.oTable1.fnGetNodes()).serialize();
	var url = $('#ctx').val() + "/pages/productSubjectRelationship/form/batchSave?id=" + $('#productId').val();
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : url,
		"cache" : false,
		"data" : sData,
		"success" : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
		},
		"error" : function(response) {
			alert("error");
		}
	});
};