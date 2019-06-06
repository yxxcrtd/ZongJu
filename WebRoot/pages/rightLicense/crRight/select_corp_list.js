Editorial.SelectCorp = function() {
	
};

Editorial.SelectCorp.dataTable = null;

Editorial.SelectCorp.query = function() {
	refreshFrameDataTableInFrame("Editorial.SelectCorp.dataTable");
};

Editorial.SelectCorp.onload = function() {
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	
	Editorial.SelectCorp.dataTable = $("#selectCorpDataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/crmCorp/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
		
			aoData.push({
				"name" : "corp.shortName",
				"value" : $("#corp_shortName").val()
			});
			
			aoData.push({
				"name" : "corpType.id",
				"value" : $("#corpType_id").val()
			});
		
		},
		"fnServerData" : function(sSource, aoData, fnCallback) {
			$.ajax({
				"dataType" : "json",
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
		},
		"fnDrawCallback" : function(oSettings) {
			for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$("td:eq(0)", oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [{
			"sTitle" : "序号",
			"mDataProp" : "id",
			"bSortable" : false
		}, {
			"sTitle" : "选择",
			"mData" : null,
			"bSortable" : false,
			"fnRender" : function(oObj) {
				return "<label><input type='radio' name='checkedCorp' value='"+ oObj.aData.id +"' title='"+ oObj.aData.corp.shortName +"' style='display: none;' /><span class='lbl'></span></label>";
			}
		}, {
			"sTitle" : "公司名称",
			"mDataProp" : "corp.shortName",
			"bSortable" : false
		}, {
			"sTitle" : "公司类型",
			"mDataProp" : "corpType.name",
			"bSortable" : false
		}],
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
	$("[data-rel=tooltip]").tooltip();
};

Editorial.SelectCorp.selectSubmit = function() {
	var selected = $("input[name=checkedCorp]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择代理公司！");
	} else {
		$("#crOwner_corpTypeRelationship_id").val(selected.val());
		$("#crOwner_corpTypeRelationship_corp_shortName").val(selected.attr("title"));
		autoCloseCommonModal(1);
	}
};

$(function() {
	Editorial.SelectCorp.onload();
});