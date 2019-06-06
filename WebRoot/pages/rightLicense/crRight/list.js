Editorial.CrRight = function() {
	
};

Editorial.CrRight.dataTable = null;

Editorial.CrRight.edit = function(id) {
	var url = $("#ctx").val() + "/pages/rightLicense/crRight/form/edit";
	if (id != undefined) {
		url += "?crRight.rlicenseId=" + id;
	}
	window.location.href = url;
};

Editorial.CrRight.remove = function(id) {
	openConfirmModalInFrame("您确定删除该权利授权吗？", function() {
		$.ajax({
			"dataType" : "json",
			"type" : "POST",
			"url" : $("#ctx").val() + "/pages/rightLicense/crRight/form/delete",
			"data" : {
				"crRight.rlicenseId" : id
			},
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					openSuccessAlertModalInFrame(response.msg);
					refreshFrameDataTableInFrame("Editorial.CrRight.dataTable");
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

Editorial.CrRight.query = function() {
	refreshFrameDataTableInFrame("Editorial.CrRight.dataTable");
};

Editorial.CrRight.onload = function() {
	
	//开始时间
	$('#invoiceDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.CrRight.startOn();
	});
	//结束时间
	$('#invoiceDate2').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.CrRight.stopOn();
	});
	
	$("#on").click(function() {
		$("#on_down").slideToggle();
	});
	Editorial.CrRight.dataTable = $("#dataTable").dataTable({
		"bFilter" : false,
		"bProcessing" : true,
		"bAutoWidth" : false,
		"sPaginationType" : "full_numbers",
		"bServerSide" : true,
		"sAjaxSource" : $("#ctx").val() + "/pages/rightLicense/crRight/form/manager?now=" + new Date().getTime(),
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "crRight.rlicenseName",
				"value" : $("#crRight_rlicenseName").val()
			});
			aoData.push({
				"name" : "crRight.startOnStr",
				"value" : $("#crRight_startOnStr").val()
			});
			aoData.push({
				"name" : "crRight.stopOnStr",
				"value" : $("#crRight_stopOnStr").val()
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
			"mDataProp" : "rlicenseId",
			"bSortable" : false
		}, {
			"sTitle" : "授权名称",
			"mDataProp" : "rlicenseName",
			"bSortable" : false
		}, {
			"sTitle" : "权利状态",
			"mDataProp" : "status",
			"bSortable" : false
		}, {
			"sTitle" : "授权类型",
			"mDataProp" : "licenseType.licenseTypeName",
			"bSortable" : false
		}, {
			"sTitle" : "版税报告周期",
			"mDataProp" : "rlperiod",
			"bSortable" : false
		}, {
			"sTitle" : "付款条款",
			"mDataProp" : "paymentTrem",
			"bSortable" : false
		}, {
			"sTitle" : "开始日期",
			"mDataProp" : "rlicenseStarton",
			"bSortable" : false,
        	"fnRender" : function(oObj) {
        		var javascriptDate = new Date(oObj.aData.rlicenseStarton).toLocaleDateString();
        		return "<div class= date>" + javascriptDate + "<div>";
        	}
		}, {
			"sTitle" : "结束日期",
			"mDataProp" : "rlicenseEndon",
			"bSortable" : false,
        	"fnRender" : function(oObj) {
        		var javascriptDate = new Date(oObj.aData.rlicenseEndon).toLocaleDateString();
        		return "<div class= date>" + javascriptDate + "<div>";
        	}
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"bSortable" : false,
			"aTargets" : [-1],
			"fnRender" : function(oObj) {
				var start = "<div class='hidden-phone visible-desktop btn-group'>";
				
				var editBtn = "<button class='btn btn-mini btn-warning' title='修改' onclick=\"Editorial.CrRight.edit('"+ oObj.aData.rlicenseId +"')\">";
				editBtn += "<i class='icon-edit bigger-120'></i>";
				editBtn += "</button>";
				
				var removeBtn = "<button class='btn btn-mini btn-danger' title='删除' onclick=\"Editorial.CrRight.remove('"+ oObj.aData.rlicenseId +"')\">";
				removeBtn += "<i class='icon-trash bigger-120'></i>";
				removeBtn += "</button>";
				
				var end = "</div>";
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
	Editorial.CrRight.onload();
});