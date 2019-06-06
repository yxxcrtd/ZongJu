Editorial.CrLicenseType = function() {
	
};

Editorial.CrLicenseType.dataTable = null;

Editorial.CrLicenseType.edit = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crLicenseType/form/edit";
	if (id != undefined) {
		url += "?crLicenseType.licenseTypeId=" + id;
	}
	var commonModalCss = {
		"width" : "400px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CrLicenseType.remove = function(id) {
	openConfirmModalInFrame("您确定删除该授权类型吗？", function() {
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/rightLicense/crLicenseType/form/delete",
			"data" : {
				"crLicenseType.licenseTypeId" : id
			},
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame("Editorial.CrLicenseType.dataTable");
				} else {
					openErrorAlertModalInFrame(response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	}, null, null);
};

Editorial.CrLicenseType.query = function() {
	refreshFrameDataTableInFrame("Editorial.CrLicenseType.dataTable");
};

Editorial.CrLicenseType.onload = function() {
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	Editorial.CrLicenseType.dataTable = $("#dataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crLicenseType/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "crLicenseType.licenseTypeName",
				"value" : $("#crLicenseType_licenseTypeName").val()
			});
		
			aoData.push({
				"name" : "crLicenseType.licenseTypeCode",
				"value" : $("#crLicenseType_licenseTypeCode").val()
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
			"mDataProp" : "licenseTypeId",
			"bSortable" : false
		}, {
			"sTitle" : "编号",
			"mDataProp" : "licenseTypeCode",
			"bSortable" : false
		}, {
			"sTitle" : "名称",
			"mDataProp" : "licenseTypeName",
			"bSortable" : false
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"bSortable" : false,
			"aTargets" : [-1],
			"fnRender" : function(oObj) {
				var start = "<div class='hidden-phone visible-desktop btn-group'>";
				
				var editBtn = "<button class='btn btn-mini btn-warning' title='修改' onclick=\"Editorial.CrLicenseType.edit('"+ oObj.aData.licenseTypeId +"')\">";
				editBtn += "<i class='icon-edit bigger-120'></i>";
				editBtn += "</button>";
				
				var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' onclick=\"Editorial.CrLicenseType.remove('"+ oObj.aData.licenseTypeId +"')\">";
				removeBtn += "<i class='icon-trash bigger-120'></i>";
				removeBtn += "</button>";
				
				var end = "</div>";
				//return start + editBtn + removeBtn + end;

				//return start + editBtn + removeBtn + end;
				return editBtn + " " + removeBtn;
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
	$("[data-rel=tooltip]").tooltip();
};

$(function() {
	Editorial.CrLicenseType.onload();
});