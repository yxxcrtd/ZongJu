Editorial.SubsidaryRight.crFormulaDataTable = null;

/**
 * 新建计算公式
 */
Editorial.SubsidaryRight.editCrFormulaDataTable = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crFormula/form/edit";
	url += "?type=2";
	if (id != undefined) {
		url += "&crFormula.formulaId=" + id;
	}
	var commonModalCss = {
		"width" : "500px",
		"height" : "260px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

/**
 * 初始化计算公式表格
 */
Editorial.SubsidaryRight.initCrFormulaDataTable = function() {
	if (Editorial.SubsidaryRight.crFormulaDataTable == null) {
		Editorial.SubsidaryRight.crFormulaDataTable = $("#crFormulaDataTable").dataTable({
			"bFilter" : false,
			"bProcessing" : true,
			"bAutoWidth" : false,
			"sPaginationType" : "full_numbers",
			"bServerSide" : true,
			"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crFormula/form/manager?now=" + new Date().getTime(),
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "crFormula.subsidaryRight.srlicenseId",
					"value" : $("#id").val()
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
				"mDataProp" : "formulaId",
				"bSortable" : false
			}, {
				"sTitle" : "分割值",
				"mDataProp" : "breakPoint",
				"bSortable" : false
			}, {
				"sTitle" : "比率",
				"mDataProp" : "rateValue",
				"bSortable" : false
			}, {
				"sTitle" : "公式类型",
				"mDataProp" : "formulaType",
				"bSortable" : false
			}, {
				"sTitle" : "操作",
				"mData" : null,
				"bSortable" : false,
				"aTargets" : [-1],
				"fnRender" : function(oObj) {
					var start = "<div class='hidden-phone visible-desktop btn-group'>";
					
					var editBtn = "<button class='btn btn-mini btn-warning' title='修改' type='button' onclick=\"Editorial.SubsidaryRight.editCrFormulaDataTable('"+ oObj.aData.formulaId +"')\">";
					editBtn += "<i class='icon-edit bigger-120'></i>";
					editBtn += "</button>";
					
					var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' type='button' onclick=\"Editorial.CrFormula.remove('"+ oObj.aData.formulaId +"')\">";
					removeBtn += "<i class='icon-trash bigger-120'></i>";
					removeBtn += "</button>";
					
					var end = "</div>";
					return start + editBtn + removeBtn + end;
				}
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
		refreshFrameDataTableInFrame("Editorial.SubsidaryRight.crFormulaDataTable");
	}
	
};