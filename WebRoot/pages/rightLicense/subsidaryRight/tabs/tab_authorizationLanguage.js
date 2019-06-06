Editorial.SubsidaryRight.authorizationLanguageDataTable = null;
/**
 * 初始化授权语种表格
 */
Editorial.SubsidaryRight.initAuthorizationLanguageDataTable = function() {
	if(Editorial.SubsidaryRight.authorizationLanguageDataTable == null) {
		Editorial.SubsidaryRight.authorizationLanguageDataTable = $("#authorizationLanguageDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/lsrRelationship/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "subsidaryRight.srlicenseId",
					"value" : $("#id").val()
				});
				
				aoData.push({
					"name" : "language.code",
					"value" : $("#language_code").val()
				});
				
				aoData.push({
					"name" : "language.name",
					"value" : $("#language_name").val()
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
				"sTitle" : "<label><input type='checkbox' onclick='Editorial.SubsidaryRight.selectAllLanguage(this)' style='display: none;' /><span class='lbl'></span></label>",
				"mData" : null,
				"bSortable" : false,
				"fnRender" : function(oObj) {
					return "<label><input type='checkbox' name='crLsrList["+ oObj.iDataRow +"].id' value='"+ oObj.aData.id +"' style='display: none;' /><span class='lbl'></span></label>";
				}
			}, {
				"sTitle" : "编码",
				"mDataProp" : "language.code",
				"bSortable" : false
			}, {
				"sTitle" : "名称",
				"mDataProp" : "language.name",
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
	} else {
		refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizationLanguageDataTable");
	}
};

Editorial.SubsidaryRight.selectAllLanguage = function(obj) {
	$("input[name^=crLsrList][name$=id]").attr("checked", obj.checked);
};

Editorial.SubsidaryRight.removeLanguage = function() {
	var selected = $("input[name^=crLsrList][name$=id]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择授权语种！");
	} else {
		var postData = {};
		for (var i = 0; i < selected.length; i++) {
			postData["crLsrList["+ i +"].id"] = selected[i].value;
		}
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/rightLicense/lsrRelationship/form/delete",
			"cache" : false,
			"data" : postData,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizationLanguageDataTable");
					ajaxAlertSuccessMsg(response.msg);
				} else {
					ajaxAlertErrorMsg(response.msg);
				}
			}
		});

	}
};

Editorial.SubsidaryRight.queryLanguage = function() {
	refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizationLanguageDataTable");
};

/**
 * 选择语种
 */
Editorial.SubsidaryRight.selectLanguage = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/lsrRelationship/form/selectLanguage";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};