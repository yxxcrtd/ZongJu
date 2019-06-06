jQuery.namespace("Editorial.Product.Structure");
jQuery.namespace("Editorial.Crm.Corp");

Editorial.Product.Structure = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
}

Editorial.Product.Structure.OnRightClick = function(event, treeId, treeNode) {
	var st = document.documentElement.scrollTop || document.body.scrollTop;
	Editorial.Product.Structure.zTree.selectNode(treeNode);
	Editorial.Product.Structure.showRMenu(treeNode, event.clientX, st + event.clientY);
}

Editorial.Product.Structure.getSelectedNode = function() {
	return Editorial.Product.Structure.zTree.getSelectedNodes()[0];
}

Editorial.Product.Structure.scrollPageTop = function() {
	$(".modal-body:first").animate({scrollTop: 0}, "normal");
}

Editorial.Product.Structure.selectExist = function() {
	Editorial.Product.Structure.clearValidate();
	Editorial.Product.Structure.hideRMenu();
	Editorial.Product.Structure.hideContent();
	$("#elementsTableContent").addClass("hide");
	
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	
	var url = $("#ctx").val() + "/pages/structureElement/form/selectElement";
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
}

Editorial.Product.Structure.selectStructureSubmit = function(id) {
	//var selectNode = Editorial.Product.Structure.getSelectedNode();
	var selectNode = window.frames[0].Editorial.Product.Structure.zTree.getSelectedNodes()[0];
	
	$.ajax({
		"dataType": "json",
		"type": "POST",
		"url": $("#ctx").val() + "/pages/structureElement/form/selectElementSubmit",
		data: {
			"structure.id": selectNode.id,
			"element.id": id,
			"product.id": $("#product_id").val()
		},
		"cache": false,
		"success": function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				autoCloseCommonModal(5);
				
				$("#queryStructureId").val(selectNode.id);
				Editorial.Product.Structure.initDataTable();
				$("#elementsTableContent").removeClass("hide");
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
		},
		"error": function(response) {
			alert("error");
		}
	});
	
	
}

Editorial.Product.Structure.add = function() {
	Editorial.Product.Structure.clearValidate();
	Editorial.Product.Structure.hideRMenu();
	Editorial.Product.Structure.showContent();
	$("#elementsTableContent").addClass("hide");
	
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	
	$("#productStructureRelation_id").val("");
	$("#parentProductStructureRelation_id").val(selectNode.id);
	$("#structure_name").val("");
	
	Editorial.Product.Structure.scrollPageTop();
}

Editorial.Product.Structure.update = function() {
	Editorial.Product.Structure.clearValidate();
	Editorial.Product.Structure.hideRMenu();
	Editorial.Product.Structure.showContent();
	$("#elementsTableContent").addClass("hide");
	
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	var parentNode = selectNode.getParentNode();
	
	$("#productStructureRelation_id").val(selectNode.id);
	$("#parentProductStructureRelation_id").val(parentNode.id);
	$("#structure_name").val(selectNode.name);
	
	$(".modal-body:first").animate({scrollTop: 0}, "normal");
}

Editorial.Product.Structure.remove = function() {
	Editorial.Product.Structure.hideRMenu();
	Editorial.Product.Structure.hideContent();
	$("#elementsTableContent").addClass("hide");
	
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	var url = $("#ctx").val() + "/pages/productStructure/form/delete?productStructureRelation.id=" + selectNode.id;
	$.ajax({
		"dataType": "json",
		"type": "POST",
		"url": url,
		"cache": false,
		"success": function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				Editorial.Product.Structure.zTree.removeNode(selectNode);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
		},
		"error": function(response) {
			alert("error");
		}
	});
	
}


Editorial.Product.Structure.clearValidate = function() {
	$("#structure_code_div").removeClass("success").removeClass("error");
	$("#structure_code_span").html("");
	
	$("#structure_name_div").removeClass("success").removeClass("error");
	$("#structure_name_span").html("");
	
	$("#structureType_id_div").removeClass("success").removeClass("error");
	$("#structureType_id_span").html("");
}


var ctx; // 项目根路径
var corpType_id; //类型UUID
var corpType_code; // 类型编码
var corpType_name; // 类型名称
var availableCorpCodes = [];
var operation = null;

Editorial.Product.Structure.validate_code = function() {
	var flag = true;
	var obj = $("#structure_code");
	var id = obj.attr("id");
	obj.val(obj.val().trim());
	
	if(obj.val() == "") {
		flag = false;
		$("#" + id + "_div").removeClass("success").addClass("error");
		$("#" + id + "_span").html("编码不能为空！");
	} else {
		$.ajax({
			type : "POST",
			async : false,
			"dataType" : 'json',
			url: $('#ctx').val() + "/pages/productStructure/form/checkCodeAvailable",
			data: {
				"structure.id": $("#structure_id").val().trim(),
				"structure.code": $("#structure_code").val().trim()
			},
			success: function(response) {
				if (response.isSuccess == "true") {
					$("#structure_code_div").removeClass("error").addClass("success");
					$("#structure_code_span").html(response.msg);
				} else {
					$("#structure_code_div").removeClass("success").addClass("error");
					$("#structure_code_span").html(response.msg);
					flag = false;
				}
			},
			error: function(response) {
				alert("error");
			}
		});
		
	}
	
	return flag;
}

Editorial.Product.Structure.validate_name = function() {
	var flag = true;
	var obj = $("#structure_name");
	var id = obj.attr("id");
	obj.val(obj.val().trim());
	if(obj.val() == "") {
		$("#" + id + "_div").removeClass("success").addClass("error");
		$("#" + id + "_span").html("名称不能为空！");
		flag = false;
	} else {
		$("#" + id + "_div").removeClass("error").addClass("success");
		$("#" + id + "_span").html("");
	}
	return flag;
}

Editorial.Product.Structure.validate_type = function() {
	var flag = true;
	var obj = $("#structureType_id");
	var id = obj.attr("id");
	obj.val(obj.val().trim());
	if(obj.val() == "") {
		$("#" + id + "_div").removeClass("success").addClass("error");
		$("#" + id + "_span").html("编码不能为空！");
		flag = false;
	} else {
		$("#" + id + "_div").removeClass("error").addClass("success");
		$("#" + id + "_span").html("");
	}
	return flag;
}

Editorial.Product.Structure.query = function() {
	initPagingParamsInFrame("Editorial.Product.Structure.oTable1");
	refreshFrameDataTableInFrame("Editorial.Product.Structure.oTable1");
}

Editorial.Product.Structure.retrieveData = function(sSource, aoData, fnCallback) {
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

Editorial.Product.Structure.initDataTable = function() {
	if(Editorial.Product.Structure.oTable1 == null) {
		Editorial.Product.Structure.oTable1 = $("#table_report").dataTable({
			"bFilter" : false, // 开关，是否启用客户端过滤器
			"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
			"bAutoWidth" : false, // 自适应宽度
			"sPaginationType" : "full_numbers", // 分页样式
			"bServerSide" : true, // 从服务器端取数据
			"sAjaxSource" : $("#ctx").val() + "/pages/productStructure/form/manager", // mvc后台ajax调用接口。
			"fnServerParams" : function(aoData) {
				aoData.push({
					"name" : "productStructureRelation.id",
					"value": $("#queryStructureId").val()
				});
				
				aoData.push({
					"name" : "structure.keyword",
					"value": $("#query_element_keyword").val()
				});
				
			},
			"fnServerData" : Editorial.Product.Structure.retrieveData,
			"fnDrawCallback" : function(oSettings) {
				for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
					$(
							'td:eq(0)',
							oSettings.aoData[oSettings.aiDisplay[i]].nTr)
							.html(i + oSettings._iDisplayStart + 1);
				}
			},
			"aoColumns" : [
	                {
						"sTitle" : "序号",
						"mDataProp" : "id"
					},
					{
						"sTitle" : "内容",
						"mData" : null,
						"bSortable" : false,
						"sClass" : "left",
						"fnRender" : function(oObj) {
							var url_uuu = $("#ctx").val() + "/pages/productStructure/form/xmlView";
							url_uuu += "?action=" + oObj.aData.structure.path;
							var title = oObj.aData.name;
							var sReturn = "<a href='"+ url_uuu +"' class='achide' target='_blank' title='"+ title +"'>"+ title +"</a>";
							return sReturn;
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
		
	} else {
		initPagingParamsInFrame("Editorial.Product.Structure.oTable1");
		refreshFrameDataTableInFrame("Editorial.Product.Structure.oTable1");
	}
	
}




Editorial.Product.Structure.clearCustomer = function() {
	$("input[type='text']").val(''); // 清空所有文本框
	$("select option").removeAttr('selected'); // 清空所有文本框
	$("textarea").val(''); // 清空所有文本框
	return false;
};

Editorial.Crm.Corp.code = function() {
	var flag = true;
	$("#corp_code").val($("#corp_code").val().trim());
	if($("#corp_code").val() == "") {
		$("#corp_code_div").removeClass("success").addClass("error");
		$("#corp_code_span").html("编码不能为空！");
		
		$("#corp_id").val("");
		$("#corp_shortName").val("");
		$("#corp_fullName").val("");
		$("#corp_introduction").val("");
		flag = false;
	} else {
		
		var corpCodeExists = false; // 公司编码是否已存在
		for(var i in availableCorpCodes) {
			if($("#corp_code").val() == availableCorpCodes[i].code) {
				corpCodeExists = true;
				break;
			}
		}
		
		if(corpCodeExists) {
			
		} else {
			
//			$("#corp_id").val("");
//			$("#corp_shortName").val("");
//			$("#corp_fullName").val("");
//			$("#corp_introduction").val("");
			
			var url = $("#ctx").val() + "/pages/crmCorp/form/checkCodeIsAvailable?corp.code=" + $("#corp_code").val();
			$.ajax({
				"dataType": "json",
				"type": "POST",
				"url": url,
				"cache": false,
				async: false,
				"success": function(response) {
					if(!response.corpCodeIsAvailable) {
						flag = false;
						
						$("#corp_code_div").removeClass("success").addClass("error");
						$("#corp_code_span").html("编码已存在！");
					}
				}
			});
		}
	}
	
	if(flag) {
		$("#corp_code_div").removeClass("error").addClass("success");
		$("#corp_code_span").html("可以使用");
	}
	return flag;
}

Editorial.Crm.Corp.shortName = function() {
	$("#corp_shortName").val($("#corp_shortName").val().trim());
	if($("#corp_shortName").val() == "") {
		$("#corp_shortName_div").removeClass("success").addClass("error");
		$("#corp_shortName_span").html("简称不能为空！");
		return false;
	} else {
		$("#corp_shortName_div").removeClass("error").addClass("success");
		$("#corp_shortName_span").html("可以使用");
		return true;
	}
}


Editorial.Product.Structure.validate = function() {
	var flag = true;
	
	alert("sdasdasdjklasd");
	
	return false;
//	if(operation == "I") {
//		if(!Editorial.Crm.Corp.code()) {
//			flag = false;
//		}
//	}
//	
//	if(!Editorial.Crm.Corp.shortName()) {
//		flag = false;
//	}
//	
//	if(flag) {
//		Editorial.Product.Structure.disableAllButton();
//	}
	return flag;
};

Editorial.Product.Structure.refreshTree = function(node) {
	updateTreeInFrame("Editorial.Product.Structure.zTree", node);
};

Editorial.Product.Structure.editTreeNodeSubmitSuccess = function(response) {
	if (response.isSuccess == "true") {
		alert( JSON.stringify(Editorial.Product.Structure.zTree) );
		openSuccessAlertModalInFrame(response.msg);
		var selectNode = Editorial.Product.Structure.getSelectedNode();
		if(response.action == "add") {
			Editorial.Product.Structure.zTree.addNodes(selectNode, response.node);
			Editorial.Product.Structure.zTree.selectNode(response.node);
			
			Editorial.Product.Structure.update();
		}
		
		if(response.action == "update") {
			
		}
	} else {
		openErrorAlertModalInFrame(response.msg);
	}
};


Editorial.Product.Structure.removeClassAndText = function() {
	$("#corp_code_div").removeClass("success").removeClass("error");
	$("#corp_code_span").html("");
	
	$("#corp_shortName_div").removeClass("success").removeClass("error");
	$("#corp_shortName_span").html("");
};

/**
 * 添加/修改树节点
 * @param action 操作类型，I=添加，U=修改
 */
Editorial.Product.Structure.editTreeNode = function(action) {
	Editorial.Product.Structure.enableAllButton();
	Editorial.Product.Structure.removeClassAndText();
	
	operation = action;
	Editorial.Product.Structure.hideRMenu(); // 隐藏右键菜单
	var selectNode = Editorial.Product.Structure.zTree.getSelectedNodes()[0];
	if (selectNode) {
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : ctx + "/pages/crmCorp/form/editTreeNode",
			"cache" : false,
			"data" : {
				id : selectNode.id,
				action : action,
				"corpType.id" : corpType_id,
				"corpType.code" : corpType_code
			},
			"success" : function(response) {				
				if (response.isSuccess == "true") {
					$("#node_id").val(selectNode.id);
					$("#relation_id").val(selectNode.id);
					
					var subTitle = null;
					if (action == "U") {
						subTitle = "修改";
						
						$("#corp_code").attr("disabled", "disabled");
						
						try {
							$("#corp_code").autocomplete("destroy");
						} catch (e) {
						}
						
						$("#corp_id").val(response.relation.corp.id);
						$("#corp_code").val(response.relation.corp.code);
						$("#corp_shortName").val(response.relation.corp.shortName);
						$("#corp_fullName").val(response.relation.corp.fullName);
						$("#corp_introduction").val(response.relation.corp.introduction);
						
						var cus1 = $.customProperty.create({
							renderTo: "cp1",
							add_tab_url: $("#ctx").val() + "/pages/crmCorp/form/addTab",
							main_data_param: {
								name: "relation.id",
								value: $("#relation_id").val()
							},
							type_data_param: {
								name: "corpType.id",
								value: $("#corpType_id").val()
							},
							classify_data_param: {
								name: "corpTypePropClassify.id",
								value: ""
							},
							prop_data_param: {
								id_name: "propsId",
								value_name: "propsValue"
							},
							classify_list: {
								name: "typePropClassifyList",
								field: {
									id: "id",
									code: "code",
									name: "name"
								}
							},
							prop_list: {
								name: "corpPropList",
								field: {
									id: "id",
									code: "code",
									name: "name",
									value: "value",
									display: "display",
									must: "must",
									source: "source"
								}
							}
						});
						
					}
					
					if(action == "I") {
						
						$("#corp_code").removeAttr("disabled");
						
						var availableCorpList = response.availableCorpList;
						if(availableCorpList != null && availableCorpList.length > 0) {
							
							availableCorpCodes = availableCorpList;
							
							for(var i in availableCorpList) {
								var item = availableCorpList[i];
								item["label"] = item.code + " " + item.shortName;
							}
							
							$("#corp_code").autocomplete({
								source: availableCorpList,
								autoFocus: true,
								delay: 0,
								minLength: 0,
								select: function(event, ui) {
									$("#corp_id").val(ui.item.id);
									$("#corp_code").val(ui.item.code);
									$("#corp_shortName").val(ui.item.shortName);
									$("#corp_fullName").val(ui.item.fullName);
									$("#corp_introduction").val(ui.item.introduction);
									
									return false;
								}
							});
							
						}
						
						subTitle = "新增";
						Editorial.Product.Structure.resetForm(); // 清空form表单值
						$.customProperty.destroy("cp1");
					}
					
					$("#action").val(action);
					$("#subTitle").html(subTitle);
					Editorial.Product.Structure.showContent();

				} else {
					openErrorAlertModalInFrame(response.msg);
					Editorial.Product.Structure.hideContent();
				}
			},
			"error" : function(response) {
				alert(response);
				alert("error");
			}
		});
		
		return;
		var fatherID;
		if (selectNode.level != 0) {
			fatherID = selectNode.id;
		} else {
			fatherID = "0";
		}
		var url = $('#ctx').val() + "/pages/clientManage/form/edit?fatherId=" + fatherID + "&code=" + rootCode;
		Editorial.Product.Structure.refreshContent(url);
	} else {
		alert("请先选择节点!");
	}
};

// 更新树节点信息
Editorial.Product.Structure.updateNode = function(nodeInfo) {
	var selectNode = Editorial.Product.Structure.zTree.getSelectedNodes()[0];
	if (nodeInfo.nodeId == undefined) {
		Editorial.Product.Structure.zTree.getSelectedNodes()[0].name = nodeInfo.nodeName;
		Editorial.Product.Structure.zTree
				.updateNode(Editorial.Product.Structure.zTree
						.getSelectedNodes()[0]);
	} else {
		if (selectNode.open == true || selectNode.isParent == false) {
			var addNode = [ {
				id : nodeInfo.nodeId,
				name : nodeInfo.nodeName,
				isParent : nodeInfo.isParent,
				otherId : nodeInfo.typeId
			} ];
			Editorial.Product.Structure.zTree.addNodes(selectNode, addNode);
		} else {
			Editorial.Product.Structure.zTree.reAsyncChildNodes(selectNode, "refresh");
		}
		var node = Editorial.Product.Structure.zTree.getNodeByParam("id",
				nodeInfo.nodeId, selectNode);
		Editorial.Product.Structure.zTree.selectNode(node, false);// 添加完毕，新节点被选中
	}
};

Editorial.Product.Structure.delObj = function() {
	Editorial.Product.Structure.hideRMenu();// 隐藏右键菜单
	openConfirmModalInFrame("确定删除该" + corpType_name + "信息?", function() {
		var selectNode = Editorial.Product.Structure.zTree.getSelectedNodes()[0];
		if (selectNode != null) {
			var url = $("#ctx").val() + "/pages/crmCorp/form/delete?relation.id=" + selectNode.id;
			$.ajax({
				"dataType" : "json",
				"type" : "POST",
				"url" : url,
				"cache" : false,
				success : function(response) {
					if(response.isSuccess == "true") {
						openSuccessAlertModalInFrame(response.msg);
						Editorial.Product.Structure.zTree.removeNode(Editorial.Product.Structure.zTree.getSelectedNodes()[0]);
					} else {
						openErrorAlertModalInFrame(response.msg);
					}
					Editorial.Product.Structure.hideContent();
				}
			});
		} else {
			alert("请先选择节点!");
		}
	}, null, null);
};

Editorial.Product.Structure.showRMenu = function(node, x, y) {
	if(node != null) {
		$("#rMenu ul").show();
		$("#shadow").show();
		if (node.level == 0) {// 根节点
			$("#add").show();
			$("#edit").hide();
			$("#delete").hide();
			$("#elementView").hide();
			$("#exportXML").show();
			
			
			//$("#openXML").hide();
		} else { // 叶子节点
			$("#add").show();
			$("#edit").show();
			$("#delete").show();
			$("#elementView").show();
			$("#exportXML").hide();
			
//			if(node.attr.structureType_id == "4028801646cbfa2a0146cbfa2b340003") {
//				$("#openXML").show();
//			} else {
//				$("#openXML").hide();
//			}
		}
		
		Editorial.Product.Structure.showRShadow(Editorial.Product.Structure.rMenu.width(),
				Editorial.Product.Structure.rMenu.height(), x, y);
		Editorial.Product.Structure.rMenu.css({
			"top" : y + "px",
			"left" : x + "px",
			"visibility" : "visible"
		});
		$("body").bind("mousedown", Editorial.Product.Structure.onBodyMouseDown);
	}
};

Editorial.Product.Structure.showRShadow = function(width, height, x, y) {
	Editorial.Product.Structure.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
};

Editorial.Product.Structure.hideRMenu = function() {
	if (Editorial.Product.Structure.rMenu)
		Editorial.Product.Structure.rMenu.css({
			"visibility" : "hidden"
		});
	if (Editorial.Product.Structure.shadow)
		Editorial.Product.Structure.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", Editorial.Product.Structure.onBodyMouseDown);
};

Editorial.Product.Structure.onBodyMouseDown = function(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		Editorial.Product.Structure.rMenu.css({
			"visibility" : "hidden"
		});
		Editorial.Product.Structure.shadow.css({
			"visibility" : "hidden"
		});
	}
};

Editorial.Product.Structure.filter = function(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
};

var mf = null;
Editorial.Product.Structure.hideTree = function() {
	if(!($("#sidebar").hasClass("menu-min"))) {
		mf = $("#main-content").css("margin-left");
	}
	
	$("#sidebar").toggleClass("menu-min").toggleClass("width500");
	
	if($("#sidebar").hasClass("menu-min")) {
		$("#main-content").css("margin-left", 0);
	} else {
		$("#main-content").css("margin-left", mf);
	}
	
	$('#treeManage').toggleClass("hide");
	
};

Editorial.Product.Structure.showContent = function() {
	$('#content').removeClass("hide");
};

Editorial.Product.Structure.hideContent = function() {
	$('#content').addClass("hide");
};

Editorial.Product.Structure.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Product.Structure.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

Editorial.Product.Structure.resetForm = function() {
	$("#crmCorpForm").clearForm();
};


Editorial.Product.Structure.openXML = function() {
	Editorial.Product.Structure.hideRMenu();
	Editorial.Product.Structure.showContent();
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	var url = $("#ctx").val() + "/pages/productStructure/form/xmlView?structure.id=" + selectNode.attr.structure_id;
	window.open (url, 'newwindow', "toolbar=no,menubar=no,scrollbars=yes");
}

Editorial.Product.Structure.elementView = function() {
	$("#query_element_keyword").val("");
	$("#query_elementType_id").val("");
	
	Editorial.Product.Structure.clearValidate();
	Editorial.Product.Structure.hideRMenu();
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	$("#queryStructureId").val(selectNode.id);
	$("#content").addClass("hide");
	$("#elementsTableContent").removeClass("hide");
	Editorial.Product.Structure.initDataTable();
	
	Editorial.Product.Structure.scrollPageTop();
	
}

Editorial.Product.Structure.createElement = function() {
	var selectNode = Editorial.Product.Structure.getSelectedNode();
	var url = $("#ctx").val() + "/pages/structureElement/form/edit?structure.id=" + selectNode.id;
	url += "&product.id=" + $("#product_id").val();
	
	var commonModalCss = {
		"width" : "800px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
}

Editorial.Product.Structure.exportXML = function() {
	Editorial.Product.Structure.hideRMenu(); // 隐藏右键菜单
	window.location.href = $("#ctx").val() + "/pages/productStructure/form/buildBookXML?product.id=" + $("#product_id").val();
}






