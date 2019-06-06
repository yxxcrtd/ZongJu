Editorial.SubsidaryRight.authorizedAreaDataTable = null; // 附属版权授权地域表格

/**
 * 初始化授权地域表格
 */
Editorial.SubsidaryRight.initAuthorizedAreaDataTable = function() {
	if (Editorial.SubsidaryRight.authorizedAreaDataTable == null) {
		Editorial.SubsidaryRight.authorizedAreaDataTable = $("#authorizedAreaDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/csrRelationship/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "subsidaryRight.srlicenseId",
					"value" : $("#id").val()
				});

				aoData.push({
					"name" : "country.enName",
					"value" : $("#country_enName").val()
				});

				aoData.push({
					"name" : "country.cnName",
					"value" : $("#country_cnName").val()
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
				"sTitle" : "<label><input type='checkbox' onclick='Editorial.SubsidaryRight.selectAllCountry(this)' style='display: none;' /><span class='lbl'></span></label>",
				"mData" : null,
				"bSortable" : false,
				"fnRender" : function(oObj) {
					return "<label><input type='checkbox' name='crCsrList[" + oObj.iDataRow + "].id' value='" + oObj.aData.id + "' style='display: none;' /><span class='lbl'></span></label>";
				}
			}, {
				"sTitle" : "编码",
				"mDataProp" : "country.enName",
				"bSortable" : false
			}, {
				"sTitle" : "名称",
				"mDataProp" : "country.cnName",
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
		refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizedAreaDataTable");
	}
};

Editorial.SubsidaryRight.selectAllCountry = function(obj) {
	$("input[name^=crCsrList][name$=id]").attr("checked", obj.checked);
};

Editorial.SubsidaryRight.removeCountry = function() {
	var selected = $("input[name^=crCsrList][name$=id]:checked");
	if (selected.length == 0) {
		ajaxAlertErrorMsg("请选择附属权利授权地域信息！");
	} else {
		var postData = {};
		for (var i = 0; i < selected.length; i++) {
			postData["crCsrList[" + i + "].id"] = selected[i].value;
		}
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/rightLicense/csrRelationship/form/delete",
			"cache" : false,
			"data" : postData,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizedAreaDataTable");
					ajaxAlertSuccessMsg(response.msg);
				} else {
					ajaxAlertErrorMsg(response.msg);
				}
			}
		});
	}
};

Editorial.SubsidaryRight.queryCountry = function() {
	refreshFrameDataTableInFrame("Editorial.SubsidaryRight.authorizedAreaDataTable");
};

/**
 * 选择地域
 */
Editorial.SubsidaryRight.selectCountry = function() {
	var url = $("#ctx").val() + "/pages/rightLicense/csrRelationship/form/selectCountry";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};