

BMEP.Base.Country = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

BMEP.Base.Country.addObj = function() {
	var url = $('#ctx').val() + "/pages/base/country/form/editCountry";
	var commonModalCss = {
		"width" : "450px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.Base.Country.editObj = function(id) {
	var url = $('#ctx').val() + "/pages/base/country/form/editCountry?eid="+id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};



BMEP.Base.Country.delObj = function(id) {
	openConfirmModalInFrame("确实要删除此数据吗?",function() {
		var url = $('#ctx').val() + "/pages/base/country/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('BMEP.Base.Country.oTable1');
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


BMEP.Base.Country.show = function (id) {
	var url="/Editorial/pages/base/country/show.jsp?id="+id;
	window.location.href = url;
};


BMEP.Base.Country.query = function() {
	refreshFrameDataTableInFrame('BMEP.Base.Country.oTable1');
};

BMEP.Base.Country.retrieveData = function(sSource, aoData, fnCallback) {
	$.ajax({
		"dataType" : 'json',
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
};

$(function() {
	
	$(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	BMEP.Base.Country.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/base/country/form/manager", // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({"name": "cnName", "value": $("#countryCnName").val()});
       		
       		aoData.push({"name": "enName", "value": $("#countryEnName").val()});
		},
		"fnServerData" : BMEP.Base.Country.retrieveData,
		"fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
		},
		"aoColumns": [ { 
			"sTitle": "ID",
    		"mDataProp": "id"
        }, {
			"sTitle": "中文国别名",
        	"mDataProp": "cnName"
		}, {
			"sTitle": "英文国别名",
			"mDataProp": "enName"
		},  {
			"sTitle": "状态",
			"mDataProp": "status"
		},{
			"sTitle": "操作",
			"mData": null,
	        "aTargets": [ -1 ],
          	//自定义列的样式
            "fnRender": function (oObj) {
                var start = '<div class="hidden-phone visible-desktop btn-group">';
               // var ok = '<button class="btn btn-mini btn-success" onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-ok bigger-120"></i></button>';
                var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="BMEP.Base.Country.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="BMEP.Base.Country.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                var flag = '<button class="btn btn-mini btn-success"  data-toggle="tooltip" data-placement="bottom" title="地域信息" onclick="BMEP.Base.Country.show(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                var end = '</div>';
               return start + edit + trash + flag + end;
               
        	}
		}
    ],

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
