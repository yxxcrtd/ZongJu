Editorial.SelectPerson = function() {
	
};

Editorial.SelectPerson.dataTable = null;

Editorial.SelectPerson.query = function() {
	refreshFrameDataTableInFrame("Editorial.SelectPerson.dataTable");
};

Editorial.SelectPerson.onload = function() {
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	
	Editorial.SelectPerson.dataTable = $("#selectPersonDataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/crm/personInfo/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
		
			aoData.push({
				"name" : "name",
				"value" : $("#person_name").val()
			});
			
			aoData.push({
				"name" : "code",
				"value" : $("#personType_code").val()
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
				return "<label><input type='radio' name='checkedPerson' value='"+ oObj.aData.id +"' title='"+ oObj.aData.person.name +"' style='display: none;' /><span class='lbl'></span></label>";
			}
		}, {
			"sTitle" : "人员名称",
			"mDataProp" : "person.name",
			"bSortable" : false
		}, {
			"sTitle" : "人员类型",
			"mDataProp" : "personType.name",
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

Editorial.SelectPerson.selectSubmit = function() {
	var selected = $("input[name=checkedPerson]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择联系人！");
	} else {
		$("#crOwner_personTrtr_id").val(selected.val());
		$("#crOwner_personTrtr_person_name").val(selected.attr("title"));
		autoCloseCommonModal(1);
	}
};

$(function() {
	Editorial.SelectPerson.onload();
});