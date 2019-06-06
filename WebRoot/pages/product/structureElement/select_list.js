Editorial.CRM.CorpType = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

Editorial.CRM.CorpType.selectStructure = function() {
	var checked = $("input[name=ids]:checked");
	if(checked.length > 0) {
		var id = checked.val();
		updateFormInFrame("Editorial.Product.Structure.selectStructureSubmit", id);
		
		
	} else {
		ajaxAlertErrorMsg("请选择素材！", true);
	}
	
}

Editorial.CRM.CorpType.query = function() {
	refreshFrameDataTableInFrame("Editorial.CRM.CorpType.oTable1");
}

Editorial.CRM.CorpType.retrieveData = function(sSource, aoData, fnCallback) {
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
	$(".on").click(function() {
		$(".on-down").slideToggle();
	});
	
	Editorial.CRM.CorpType.oTable1 = $("#select_element_report").dataTable({
						"bFilter" : false, // 开关，是否启用客户端过滤器
						"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
						"bAutoWidth" : false, // 自适应宽度
						"sPaginationType" : "full_numbers", // 分页样式
						"bServerSide" : true, // 从服务器端取数据
						"sAjaxSource" : $("#ctx").val() + "/pages/structureElement/form/manager", // mvc后台ajax调用接口。
						"fnServerParams" : function(aoData) {
							aoData.push({
								"name": "elementType.id",
								"value": $("#query_select_elementType_id").val()
							});
							
							aoData.push({
								"name": "element.keyword",
								"value": $("#query_select_element_keyword").val()
							});
							
						},
						"fnServerData" : Editorial.CRM.CorpType.retrieveData,
						"fnDrawCallback" : function(oSettings) {
							for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
								$(
										'td:eq(1)',
										oSettings.aoData[oSettings.aiDisplay[i]].nTr)
										.html(i + oSettings._iDisplayStart + 1);
							}
						},
						"aoColumns" : [
								{
									"sTitle" : "选择",
									"mData" : null,
									"bSortable" : false,
									"sClass" : "center",
									"fnRender" : function(oObj) {
										var sReturn = "";
										sReturn = '<label><input type="radio" name="ids" style="display:none;" value="'
												+ oObj.aData.id
												+ '" /><span class="lbl"></span></label>';
										return sReturn;
									}
								},{
									"sTitle" : "序号",
									"mDataProp" : "id"
								},{
									"sTitle" : "内容",
									"mData" : null,
									"bSortable" : false,
									"sClass" : "left",
									"fnRender" : function(oObj) {
										var url_uuu = $("#ctx").val() + "/pages/productStructure/form/xmlView";
										url_uuu += "?action=" + oObj.aData.path;
										
										var title = oObj.aData.name;
										var sReturn = "<a href='"+ url_uuu +"' class='achide' target='_blank' title='"+ title +"'>"+ title +"</a>";
										return sReturn;
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
	
	$("#main_data_btn").click(function() {
		$("#main_data_div").slideToggle("fast");
	});
	
	ctx = $("#ctx").val();
	corpType_id = $("#corpType_id").val();
	corpType_code = $("#corpType_code").val();
	corpType_name = $("#corpType_name").val();
	 
	var setting = {
		view: {
			selectedMulti: false,
			expandSpeed: 0
		},
		async : {
			enable : true,
			url: $("#ctx").val() + "/pages/productStructure/form/getChildNodes",
			autoParam: ["id=parentProductStructureRelation.id"],
			dataFilter: Editorial.Product.Structure.filter,
			otherParam: {
				"product.id": $("#product_id").val()
			}
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		callback : {
			onRightClick : Editorial.Product.Structure.OnRightClick
		}
	};
	
	var root = [ {
		id : "root",
		name : $("#product_title").val(),
		isRoot : "true",
		isParent : true,
		icon : $('#ctx').val() + "/img/configration1.gif",
		open : true
	} ];

	$.fn.zTree.init($("#treeManage"), setting, root);
	Editorial.Product.Structure.zTree = $.fn.zTree.getZTreeObj("treeManage");
	Editorial.Product.Structure.rMenu = $("#rMenu");
	Editorial.Product.Structure.shadow = $("#shadow");
	
	var options = {
		//beforeSubmit: Editorial.Product.Structure.validate,
		beforeSubmit: function() {
			var flag = true;
			
			if(!Editorial.Product.Structure.validate_name()) {
				flag = false;
			}
			
			return flag;
		},
		//success : Editorial.Product.Structure.editTreeNodeSubmitSuccess,
		success: function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				
				var selectNode = Editorial.Product.Structure.getSelectedNode();
				Editorial.Product.Structure.zTree.expandNode(selectNode, true, false, false);
				if(response.action == "add") {
					var ttt = Editorial.Product.Structure.zTree;
					ttt.addNodes(selectNode, response.node);
					var nnn = ttt.getNodeByParam("id", response.node.id, selectNode);
					ttt.selectNode(nnn, false);//添加完毕，新节点被选中
					
					//updateTreeInFrame("Editorial.Product.Structure.zTree", response.node);
					Editorial.Product.Structure.update();
				}
				
				if(response.action == "update") {
					selectNode.name = response.node.name;
					Editorial.Product.Structure.zTree.updateNode(selectNode);

					Editorial.Product.Structure.update();
				}
			} else {
				openErrorAlertModalInFrame(response.msg);
			}
			
			
			
		},
		url : ctx + "/pages/productStructure/form/editTreeNodeSubmit",
		type: "post",
		clearForm : false,
		timeout : 10000
	};

	$("#structureForm").ajaxForm(options);
});