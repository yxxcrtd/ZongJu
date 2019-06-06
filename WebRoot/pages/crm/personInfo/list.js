jQuery.namespace( 'Editorial.CRM.PersonInfo' );

Editorial.CRM.PersonInfo = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

//Editorial.CRM.PersonInfo.account= function(id) {
//	var url = $('#ctx').val() + "/pages/person/personInfo/form/editSysAccount?id="+id;
//	var commonModalCss = {
//			"width" : "450px",
//			"height" : "290px"
//		};
//	var commonModalBodyCss = {
//		"max-height" : "800px"
//	};
//	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
//};
//
//Editorial.CRM.PersonInfo.setClientAccount= function(id) {
//	var url = $('#ctx').val() + "/pages/person/personInfo/form/setAccount?id="+id+"&code=customer";
//	var commonModalCss = {
//			"width" : "800px",
//			"height" : "490px"
//		};
//	var commonModalBodyCss = {
//		"max-height" : "800px"
//	};
//	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
//};
//
//Editorial.CRM.PersonInfo.setTransportAccount= function(id) {
//	var url = $('#ctx').val() + "/pages/person/personInfo/form/setAccount?id="+id+"&code=supplier";
//	var commonModalCss = {
//			"width" : "800px",
//			"height" : "490px"
//		};
//	var commonModalBodyCss = {
//		"max-height" : "800px"
//	};
//	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
//};
//
//Editorial.CRM.PersonInfo.getAccount= function(id) {
//	var url = $('#ctx').val() + "/pages/person/personInfo/form/getAccount?id="+id;
//	window.location.href = url;
//};


Editorial.CRM.PersonInfo.addObj = function() {
	var personType = $("#personType").val();
	//var url = $('#ctx').val() + "/pages/crm/personInfo/form/edit/"+$("#code").val()+"?clientId="+$("#clientId").val();
	var url = $('#ctx').val() + "/pages/crm/personInfo/form/edit/"+personType;
	window.location.href = url;
};

Editorial.CRM.PersonInfo.editObj = function(id) {
	var url = $('#ctx').val() + "/pages/crm/personInfo/form/edit/"+$("#code").val()+"?id=" + id;
	
	window.location.href = url;
	
	
};
Editorial.CRM.PersonInfo.delObj = function(id) {
    //alert(id);
	openConfirmModalInFrame("确定要注销此数据吗?", function() {
		var url = $('#ctx').val() + "/pages/crm/personInfo/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.CRM.PersonInfo.oTable1');
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	}, null, null);
};


Editorial.CRM.PersonInfo.modObj = function(id) {
	
	var url = $('#ctx').val() + "/pages/person/corp/form/list/customer?id="+id;
	window.location.href = url;
};

Editorial.CRM.PersonInfo.modObj1 = function(id) {
	var url = $('#ctx').val() + "/pages/person/corp/form/list/supplier?id="+id;
	window.location.href = url;
};

Editorial.CRM.PersonInfo.editAccount = function(id) {
    var url = $('#ctx').val() + "/pages/crm/personInfo/form/editSysAccount?id=" + id;
    var commonModalCss = {
        "width" : "800px",
        "height" : "490px"
    };
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.PersonInfo.query = function() {
	refreshFrameDataTableInFrame('Editorial.CRM.PersonInfo.oTable1');
};

Editorial.CRM.PersonInfo.retrieveData = function(sSource, aoData, fnCallback) {

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
			alert(response);
			alert(response.responseText);

		}
	});
};

Editorial.CRM.PersonInfo.uploadObj = function() {

		var url = $('#ctx').val() + "/pages/crm/personInfo/form/upload?personTypeId="+$("#personTypeId").val() ;
		var commonModalCss = {
			"width": "500px",
			"height" : "260px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
	
};

$(function() {
	
	$(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	Editorial.CRM.PersonInfo.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
//		"sAjaxSource" : $('#ctx').val() + "/pages/crm/personInfo/form/manager?code="+$("#code").val(), // mvc后台ajax调用接口。
		"sAjaxSource" : $('#ctx').val() + "/pages/crm/personInfo/form/manager?code="+$("#code").val(), // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "name",
				"value" : $("#query_module_name").val()
			}
//			,{
//				"name" : "clientId",
//				"value" : $("#clientId").val()
//			}
			);
		},
		"fnServerData" : Editorial.CRM.PersonInfo.retrieveData,
		"fnDrawCallback" : function(oSettings) {
			for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [ {
			"sTitle" : "ID",
			"mDataProp" : "id"
		}, {
			"sTitle" : "联系人名称",
			"mDataProp" : "person.name"
		}, {
			"sTitle" : "座机",
			"mDataProp" : "person.telephone"
		}, {
			"sTitle" : "手机",
			"mDataProp" : "person.phone"
		}, {
			"sTitle" : "联系地址",
			"mDataProp" : "person.address"
		}, {
			"sTitle" : "邮编",
			"mDataProp" : "person.postCode"
		},{
			"sTitle" : "电子邮箱",
			"mDataProp" : "person.email"
		},{
			"sTitle" : "传真",
			"mDataProp" : "person.fax"
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"aTargets" : [ -1 ],
			"fnRender" : function(oObj) {
				var start = '<div class="hidden-phone visible-desktop btn-group">';
				// var ok = '<button class="btn btn-mini btn-success"
				// onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-ok
				// bigger-120"></i></button>';
				var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.CRM.PersonInfo.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
				var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.CRM.PersonInfo.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                var account = "";
                console.log($("#code").val());
                if ("employee" == $("#code").val()) {
                    account = '<button class="btn btn-mini btn-success" title="账户信息" onclick="Editorial.CRM.PersonInfo.editAccount(\'' + oObj.aData.id + '\')"><i class="icon-user bigger-120"></i></button>';
                }

			//	var flag = '<button class="btn btn-mini btn-warning" title="客户" onclick="Editorial.CRM.PersonInfo.modObj(\'' + oObj.aData.id + '\')"><i class="icon-flag bigger-120"></i></button>';
			//	var flag1 = '<button class="btn btn-mini btn-success" title="供应商" onclick="Editorial.CRM.PersonInfo.modObj1(\'' + oObj.aData.id + '\')"><i class="icon-th-large bigger-120"></i></button>';
//				var account = '<button class="btn btn-mini btn-success" title="账户信息" onclick="Editorial.CRM.PersonInfo.account(\'' + oObj.aData.id + '\')"><i class="icon-th-large bigger-120"></i></button>';
//				var setClientAccount = '<button class="btn btn-mini btn-success" title="关联用户账户信息" onclick="Editorial.CRM.PersonInfo.setClientAccount(\'' + oObj.aData.id + '\')"><i class="icon-th-large bigger-120"></i></button>';
//				var setTransportAccount = '<button class="btn btn-mini btn-success" title="关联供应商账户信息" onclick="Editorial.CRM.PersonInfo.setTransportAccount(\'' + oObj.aData.id + '\')"><i class="icon-th-large bigger-120"></i></button>';
//				var getAccount = '<button class="btn btn-mini btn-success" title="查询用户账户信息" onclick="Editorial.CRM.PersonInfo.getAccount(\'' + oObj.aData.id + '\')"><i class="icon-th-large bigger-120"></i></button>';
				var end = '</div>';
				return start + edit + trash + account + end;
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
