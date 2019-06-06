Editorial.CrSubsidaryRightLanguage = function() {
	
};

Editorial.CrSubsidaryRightLanguage.dataTable = null;

Editorial.CrSubsidaryRightLanguage.query = function() {
	refreshFrameDataTableInFrame("Editorial.CrSubsidaryRightLanguage.dataTable");
};

Editorial.CrSubsidaryRightLanguage.onload = function() {
	$("#language_subsidaryRight_srlicenseId").val($("#id").val());
	
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	Editorial.CrSubsidaryRightLanguage.dataTable = $("#languageDataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/dic/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
		
			aoData.push({
				"name" : "code",
				"value" : $("#subsidaryRight_language_code").val()
			});
		
			aoData.push({
				"name" : "name",
				"value" : $("#subsidaryRight_language_name").val()
			});
			
			// 字典表 语种分类ID
			aoData.push({
				"name" : "dicClassId",
				"value" : "5519611fc4d927ae81d0324135d3f7f5"
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
			"sTitle" : "<label><input type='checkbox' onclick='Editorial.CrSubsidaryRightLanguage.selectAll(this)' style='display: none;' /><span class='lbl'></span></label>",
			"mData" : null,
			"bSortable" : false,
			"fnRender" : function(oObj) {
				return "<label><input type='checkbox' name='languageList["+ oObj.iDataRow +"].id' value='"+ oObj.aData.id +"' style='display: none;' /><span class='lbl'></span></label>";
			}
		}, {
			"sTitle" : "编码",
			"mDataProp" : "code",
			"bSortable" : false
		}, {
			"sTitle" : "名称",
			"mDataProp" : "name",
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

Editorial.CrSubsidaryRightLanguage.selectAll = function(obj) {
	$("input[name^=languageList][name$=id]").attr("checked", obj.checked);
};

Editorial.CrSubsidaryRightLanguage.selectSubmit = function() {
	var selected = $("input[name^=languageList][name$=id]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择语种！");
	} else {
		var options = {
			success : function(response) {
				if (response.isSuccess == "true") {
					refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizationLanguageDataTable");
					ajaxAlertSuccessMsg(response.msg, true);
					autoCloseCommonModal(5);
				} else {
					ajaxAlertErrorMsg(response.msg)
				}
			},
			url : $("#ctx").val() + "/pages/rightLicense/lsrRelationship/form/selectLanguageSubmit",
			type : "post",
			clearForm : false,
			timeout : 3000
		};
		$("#selectLanguageForm").ajaxSubmit(options);
		
	}
};

$(function() {
	Editorial.CrSubsidaryRightLanguage.onload();
});