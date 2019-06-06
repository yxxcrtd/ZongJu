/**
 * Created by huangchenxi on 14-5-29.
 */

Editorial.Flow.taskRepo.Tree = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};
Editorial.Flow.taskRepo.Tree.saveAndClose = function() {
	ajaxAlertSuccessMsg("成功", true);
	autoCloseCommonModal(5)
	var id = $("input[name='ids']:checked").val();
    var orgData = {
        'id':$('#assignee').val(),
        'org':id
    }

//	updateFormInLayer('Editorial.Product.ProductInfo.updateAssignee', id);
    updateFormInFrame('Editorial.Product.ProductInfo.updateAssignee', JSON.stringify(orgData));

};

Editorial.Flow.taskRepo.Tree.OnRightClick = function(event, treeId, treeNode) {
    console.log("document.body.scrollTop:" + document.body.scrollTop);
    console.log("event.clientX:" + event.clientX);
    console.log("event.clientY:" + event.clientY);
	Editorial.Flow.taskRepo.Tree.zTree.selectNode(treeNode);
	Editorial.Flow.taskRepo.Tree.showRMenu(treeNode, event.clientX,
			document.body.scrollTop + event.clientY);
};

Editorial.Flow.taskRepo.Tree.filter = function(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for (var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
};

Editorial.Flow.taskRepo.Tree.showRShadow = function(width, height, x, y) {
	Editorial.Flow.taskRepo.Tree.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
};

// 隐藏右键菜单
Editorial.Flow.taskRepo.Tree.hideRMenu = function() {
	if (Editorial.Flow.taskRepo.Tree.rMenu)
		Editorial.Flow.taskRepo.Tree.rMenu.css({
			"visibility" : "hidden"
		});
	if (Editorial.Flow.taskRepo.Tree.shadow)
		Editorial.Flow.taskRepo.Tree.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", Editorial.Flow.taskRepo.Tree.onBodyMouseDown);
};

Editorial.Flow.taskRepo.Tree.onBodyMouseDown = function(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		Editorial.Flow.taskRepo.Tree.rMenu.css({
			"visibility" : "hidden"
		});
		Editorial.Flow.taskRepo.Tree.shadow.css({
			"visibility" : "hidden"
		});
	}
};

Editorial.Flow.taskRepo.Tree.showRMenu = function(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if (node.level == 0) {
		// 根节点
		$("#add1").show();
		$("#edit").hide();
		$("#delete").hide();
		$("#classify").hide();
		$("#property").hide();
		$("#upload").hide();
	} else if (node.isParent) {
		// 菜单非叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").hide();
		$("#classify").show();
		$("#property").show();
		$("#upload").show();
	} else {
		// 菜点叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();
		$("#classify").show();
		$("#property").show();
		$("#upload").show();
	}

	Editorial.Flow.taskRepo.Tree.showRShadow(Editorial.Flow.taskRepo.Tree.rMenu
			.width(), Editorial.Flow.taskRepo.Tree.rMenu.height(), x, y);
	Editorial.Flow.taskRepo.Tree.rMenu.css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});

	$("body").bind("mousedown", Editorial.Flow.taskRepo.Tree.onBodyMouseDown);
};

Editorial.Flow.taskRepo.Tree.hideTree = function() {
	$('#treeDemo').toggleClass("hide");
};

Editorial.Flow.taskRepo.Tree.showList = function() {
	Editorial.Flow.taskRepo.Tree.hideRMenu();

	if (Editorial.Flow.taskRepo.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = Editorial.Flow.taskRepo.Tree.zTree.getSelectedNodes()[0];
		console.log("-----------------------------");
		console.log(Editorial.Flow.taskRepo.Tree.zTree.getSelectedNodes());
		console.log("+++++++++++++++++++++++++++++");
		console.log(selectNode);
		console.log("=============================");
		console.log(selectNode.id);
		console.log("==============================");
		Editorial.Flow.taskRepo.Tree.showPropertyContent();

		Editorial.Flow.taskRepo.Tree.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};
Editorial.Flow.taskRepo.Tree.query = function(typeId) {
	$("#id").val(typeId);
	initPagingParamsInFrame('Editorial.Flow.taskRepo.Tree.oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.Flow.taskRepo.Tree.oTable1');
};
Editorial.Flow.taskRepo.Tree.createDataTable = function(typeId) {
	$("#id").val(typeId);
	console.log("11111111111111111111111");
	console.log(typeId);
	console.log("11111111111111111111111");

	if (Editorial.Flow.taskRepo.Tree.oTable1 != null) {
		Editorial.Flow.taskRepo.Tree.query(typeId);
	} else {
		Editorial.Flow.taskRepo.Tree.oTable1 = $('#table_classify')
				.dataTable(
						{
							"bFilter" : false, // 开关，是否启用客户端过滤器
							"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
							"bAutoWidth" : false, // 自适应宽度
							"sPaginationType" : "full_numbers", // 分页样式
							"bServerSide" : true, // 从服务器端取数据
							"sAjaxSource" : $('#ctx').val()
									+ "/pages/crmPosition/form/manager", // mvc后台ajax调用接口。
							"fnServerParams" : function(aoData) {
								aoData.push({
									"name" : "id",
									"value" : $("#id").val()
								});
							},
							"fnServerData" : Editorial.Flow.taskRepo.Tree.retrieveData,
							"fnDrawCallback" : function(oSettings) {
								for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
									$(
											'td:eq(1)',
											oSettings.aoData[oSettings.aiDisplay[i]].nTr)
											.html(
													i
															+ oSettings._iDisplayStart
															+ 1);
								}
							},
							"aoColumns" : [
									{
										"mData" : null,
										"bSortable" : false,
										"sClass" : "center",
										"fnRender" : function(oObj) {
											console.log(oObj.aData);
											console.log(oObj.aData.id);
											var sReturn = "";
											sReturn = '<label><input type="radio" name="ids" value="'
													+ oObj.aData.id
													+ '" /><span class="lbl"></span></label>';
											return sReturn;

										}
									}, {
										"sTitle" : "序号",
										"mDataProp" : "id"
									}, {
										"sTitle" : "名称",
										"mDataProp" : "name"
									}, {
										"sTitle" : "编码",
										"mDataProp" : "code"
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
	}
	$('[data-rel=tooltip]').tooltip();
};
Editorial.Flow.taskRepo.Tree.retrieveData = function(sSource, aoData,
		fnCallback) {
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

Editorial.Flow.taskRepo.Tree.showPropertyContent = function() {
	// $('#classifyContent').addClass("hide");
	$('#classifyContent').removeClass("hide");
};

var setting = {
	async : {
		enable : true,
		url : $('#ctx').val()
				+ "/pages/crmCorp/form/getChildNodes?corpType.code=org",
		autoParam : [ "id" ],
		dataFilter : Editorial.Flow.taskRepo.Tree.filter
	},
	edit : {
		enable : true,
		showRemoveBtn : false,
		showRenameBtn : false
	},
	callback : {
		onRightClick : function(event, treeId, treeNode) {
			Editorial.Flow.taskRepo.Tree.zTree.selectNode(treeNode);
			var b=getTreeRightMenuPosition(event,treeId);
			Editorial.Flow.taskRepo.Tree.showRMenu(treeNode,b.x,b.y);
		}
	}
};

var root = [ {
	id : "root",
	name : "组织机构",
	isRoot : "true",
	isParent : true,
	icon : $('#ctx').val() + "/img/configration1.gif",
	open : true
} ];

$(document).ready(function() {

    rebindingTreeOnClickInLayer();

	$.fn.zTree.init($("#treeDemo"), setting, root);
	Editorial.Flow.taskRepo.Tree.zTree = $.fn.zTree.getZTreeObj("treeDemo");
	Editorial.Flow.taskRepo.Tree.rMenu = $("#rMenu");
	Editorial.Flow.taskRepo.Tree.shadow = $("#shadow");
});
