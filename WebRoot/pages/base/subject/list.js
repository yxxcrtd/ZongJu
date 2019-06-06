

BMEP.Base.Subject = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

BMEP.Base.Subject.addObj = function() {
	var url = $('#ctx').val() + "/pages/base/subject/form/edit";
	var commonModalCss = {
		"width" : "450px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.Base.Subject.editObj = function(id) {
	var url = $('#ctx').val() + "/pages/base/subject/form/edit?eid="+id;
	var commonModalCss = {
		"width" : "450px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.Base.Subject.modObj = function(id) {
	var iDisplayLength = BMEP.Base.Subject.oTable1.iDisplayLength;
	var iDisplayStart = BMEP.Base.Subject.oTable1.iDisplayStart;
	alert("iDisplayLength:" + iDisplayLength);
	alert("iDisplayStart:" + iDisplayStart);
	var url = $('#ctx').val() + "/pages/base/subject/form/edit?eid=" + id;
	var commonModalCss = {
		"width" : "900px",
		"margin" : "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.Base.Subject.delObj = function(id) {
	// alert(id);
	openConfirmModalInFrame("确实要删除此数据吗?",function() {
		var url = $('#ctx').val() + "/pages/base/subject/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('BMEP.Base.Subject.oTable1');
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	},null,null);
};


BMEP.Base.Subject.show = function (id) {
	var url= $('#ctx').val() +"/pages/base/subject/show.jsp?id="+id;
	window.location.href = url;
};


BMEP.Base.Subject.query = function() {
	refreshFrameDataTableInFrame('BMEP.Base.Subject.oTable1');
};

BMEP.Base.Subject.retrieveData = function(sSource, aoData, fnCallback) {
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : sSource,
		"cache" : false,
		"data" : aoData,
		"success" : function(response) {
		//	alert(JSON.stringify(response));
			// alert(JSON.stringify(response.aaData));
			fnCallback(response);
		},
		"error" : function(response) {
			alert("error");
			alert(response);
			alert(response.responseText);
		}
	});
};

$(function() {

    $(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	BMEP.Base.Subject.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/base/subject/form/manager", // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "name",
				"value" : $("#subjectName").val()
			},{
				"name" : "code",
				"value" : $("#subjectCode").val()
			});
		},
		"fnServerData" : BMEP.Base.Subject.retrieveData,
		"fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
		},
		"aoColumns" : [ {
			"sTitle" : "ID",
			"mDataProp" : "id"
		}, {
			"sTitle" : "名称",
			"mDataProp" : "name"
		}, {
			"sTitle" : "编号",
			"mDataProp" : "code"
		},  {
			"sTitle" : "操作",
			"mData" : null,
			"aTargets" : [ -1 ],
			"fnRender" : function(oObj) {
				var start = '<div class="hidden-phone visible-desktop btn-group">';
				// var ok = '<button class="btn btn-mini btn-success"
				var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="BMEP.Base.Subject.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
				var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="BMEP.Base.Subject.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
				var flag = '<button class="btn btn-mini btn-success"  data-toggle="tooltip" data-placement="bottom" title="分类法信息" onclick="BMEP.Base.Subject.show(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
				var end = '</div>';
				return start + edit + trash +flag + end;
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
