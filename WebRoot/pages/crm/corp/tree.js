jQuery.namespace("Editorial.Crm.Corp");

var ctx; // 项目根路径
var corpType_id; //类型UUID
var corpType_code; // 类型编码
var corpType_name; // 类型名称
var availableCorpCodes = [];
var operation = null;

$(function() {
	
	$("#main_data_btn").click(function() {
		$("#main_data_div").slideToggle("fast");
	});
	
	ctx = $("#ctx").val();
	corpType_id = $("#corpType_id").val();
	corpType_code = $("#corpType_code").val();
	corpType_name = $("#corpType_name").val();
	 
	var setting = {
		view: {
			expandSpeed: 0
		},
		async : {
			enable : true,
			url : $('#ctx').val() + "/pages/crmCorp/form/getChildNodes",
			autoParam : [ "id", "id" ],
			dataFilter : BMEP.Client.ClientInfo.Tree.filter,
			otherParam : {
				"corpType.id" : corpType_id
			}
		},
		edit : {
			enable : true,
			showRemoveBtn : false,
			showRenameBtn : false
		},
		callback : {
			onRightClick : BMEP.Client.ClientInfo.Tree.OnRightClick
		}
	};
	
	var root = [{
		id : "root",
		name : corpType_name,
		isRoot : "true",
		isParent : true,
		icon : $('#ctx').val() + "/img/configration1.gif",
		open : true
	}];

	$.fn.zTree.init($("#treeManage"), setting, root);
	BMEP.Client.ClientInfo.Tree.zTree = $.fn.zTree.getZTreeObj("treeManage");
	BMEP.Client.ClientInfo.Tree.rMenu = $("#rMenu");
	BMEP.Client.ClientInfo.Tree.shadow = $("#shadow");

	var options = {
		beforeSubmit : BMEP.Client.ClientInfo.Tree.validate,
		success : BMEP.Client.ClientInfo.Tree.editTreeNodeSubmitSuccess,
		url : ctx + "/pages/crmCorp/form/editTreeNodeSubmit",
		type : 'post',
		clearForm : false,
		timeout : 10000
	};
	$("#crmCorpForm").ajaxForm(options);
	
});

BMEP.Client.ClientInfo.Tree = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};

BMEP.Client.ClientInfo.Tree.clearCustomer = function() {
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
};

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
};


BMEP.Client.ClientInfo.Tree.validate = function() {
	var flag = true;
	if(operation == "I") {
		if(!Editorial.Crm.Corp.code()) {
			flag = false;
		}
	}
	
	if(!Editorial.Crm.Corp.shortName()) {
		flag = false;
	}
	
	if(flag) {
		BMEP.Client.ClientInfo.Tree.disableAllButton();
	}
	
	return flag;
};

BMEP.Client.ClientInfo.Tree.refreshTree = function(node) {
	updateTreeInFrame("BMEP.Client.ClientInfo.Tree.zTree", node);
};

BMEP.Client.ClientInfo.Tree.editTreeNodeSubmitSuccess = function(response) {
	if (response.isSuccess == "true") {
		openSuccessAlertModalInFrame(response.msg);
		BMEP.Client.ClientInfo.Tree.refreshTree(response.node);
		BMEP.Client.ClientInfo.Tree.zTree.selectNode(response.node, false);
		BMEP.Client.ClientInfo.Tree.editTreeNode("U");
		// BMEP.Client.ClientInfo.Tree.disableAllButton();
	} else {
		openErrorAlertModalInFrame(response.msg);
		BMEP.Client.ClientInfo.Tree.disableAllButton();
	}
};

BMEP.Client.ClientInfo.Tree.OnRightClick = function(event, treeId, treeNode) {
	var st = document.documentElement.scrollTop || document.body.scrollTop;
	BMEP.Client.ClientInfo.Tree.zTree.selectNode(treeNode);
	BMEP.Client.ClientInfo.Tree.showRMenu(treeNode, event.clientX, st + event.clientY);
};
BMEP.Client.ClientInfo.Tree.removeClassAndText = function() {
	$("#corp_code_div").removeClass("success").removeClass("error");
	$("#corp_code_span").html("");
	
	$("#corp_shortName_div").removeClass("success").removeClass("error");
	$("#corp_shortName_span").html("");
};

/**
 * 添加/修改树节点
 * @param action 操作类型，I=添加，U=修改
 */
BMEP.Client.ClientInfo.Tree.editTreeNode = function(action) {
	BMEP.Client.ClientInfo.Tree.enableAllButton();
	BMEP.Client.ClientInfo.Tree.removeClassAndText();
	
	operation = action;
	BMEP.Client.ClientInfo.Tree.hideRMenu(); // 隐藏右键菜单
	var selectNode = BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0];
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
						BMEP.Client.ClientInfo.Tree.resetForm(); // 清空form表单值
						$.customProperty.destroy("cp1");
					}
					
					$("#action").val(action);
					$("#subTitle").html(subTitle);
					BMEP.Client.ClientInfo.Tree.showContent();
					
					$([document.body, document.documentElement]).animate({scrollTop: 0}, "normal");

				} else {
					openErrorAlertModalInFrame(response.msg);
					BMEP.Client.ClientInfo.Tree.hideContent();
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
		BMEP.Client.ClientInfo.Tree.refreshContent(url);
	} else {
		alert("请先选择节点!");
	}
};

// 更新树节点信息
BMEP.Client.ClientInfo.Tree.updateNode = function(nodeInfo) {
	var selectNode = BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0];
	if (nodeInfo.nodeId == undefined) {
		BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0].name = nodeInfo.nodeName;
		BMEP.Client.ClientInfo.Tree.zTree
				.updateNode(BMEP.Client.ClientInfo.Tree.zTree
						.getSelectedNodes()[0]);
	} else {
		if (selectNode.open == true || selectNode.isParent == false) {
			var addNode = [ {
				id : nodeInfo.nodeId,
				name : nodeInfo.nodeName,
				isParent : nodeInfo.isParent,
				otherId : nodeInfo.typeId
			} ];
			BMEP.Client.ClientInfo.Tree.zTree.addNodes(selectNode, addNode);
		} else {
			BMEP.Client.ClientInfo.Tree.zTree.reAsyncChildNodes(selectNode, "refresh");
		}
		var node = BMEP.Client.ClientInfo.Tree.zTree.getNodeByParam("id",
				nodeInfo.nodeId, selectNode);
		BMEP.Client.ClientInfo.Tree.zTree.selectNode(node, false);// 添加完毕，新节点被选中
	}
};

BMEP.Client.ClientInfo.Tree.delObj = function() {
	BMEP.Client.ClientInfo.Tree.hideRMenu();// 隐藏右键菜单
	openConfirmModalInFrame("确定删除该" + corpType_name + "信息?", function() {
		var selectNode = BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0];
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
						BMEP.Client.ClientInfo.Tree.zTree.removeNode(BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0]);
					} else {
						openErrorAlertModalInFrame(response.msg);
					}
					BMEP.Client.ClientInfo.Tree.hideContent();
				}
			});
		} else {
			alert("请先选择节点!");
		}
	}, null, null);
};

BMEP.Client.ClientInfo.Tree.showRMenu = function(node, x, y) {
	if(node != null) {
		$("#rMenu ul").show();
		$("#shadow").show();
		if (node.level == 0) {// 根节点
			$("#add").show();
			$("#edit").hide();
			$("#delete").hide();
			$("#upload").show();
		} else { // 叶子节点
			$("#add").show();
			$("#edit").show();
			$("#delete").show();
			$("#upload").hide();
		}
		BMEP.Client.ClientInfo.Tree.showRShadow(BMEP.Client.ClientInfo.Tree.rMenu.width(),
				BMEP.Client.ClientInfo.Tree.rMenu.height(), x, y);
		BMEP.Client.ClientInfo.Tree.rMenu.css({
			"top" : y + "px",
			"left" : x + "px",
			"visibility" : "visible"
		});
		$("body").bind("mousedown", BMEP.Client.ClientInfo.Tree.onBodyMouseDown);
	}
};

BMEP.Client.ClientInfo.Tree.showRShadow = function(width, height, x, y) {
	BMEP.Client.ClientInfo.Tree.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
};

BMEP.Client.ClientInfo.Tree.hideRMenu = function() {
	if (BMEP.Client.ClientInfo.Tree.rMenu)
		BMEP.Client.ClientInfo.Tree.rMenu.css({
			"visibility" : "hidden"
		});
	if (BMEP.Client.ClientInfo.Tree.shadow)
		BMEP.Client.ClientInfo.Tree.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", BMEP.Client.ClientInfo.Tree.onBodyMouseDown);
};

BMEP.Client.ClientInfo.Tree.onBodyMouseDown = function(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		BMEP.Client.ClientInfo.Tree.rMenu.css({
			"visibility" : "hidden"
		});
		BMEP.Client.ClientInfo.Tree.shadow.css({
			"visibility" : "hidden"
		});
	}
};

BMEP.Client.ClientInfo.Tree.filter = function(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
};

BMEP.Client.ClientInfo.Tree.hideTree = function() {
	$('#treeManage').toggleClass("hide");
};

BMEP.Client.ClientInfo.Tree.showContent = function() {
	$('#content').removeClass("hide");
};

BMEP.Client.ClientInfo.Tree.hideContent = function() {
	$('#content').addClass("hide");
};

BMEP.Client.ClientInfo.Tree.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

BMEP.Client.ClientInfo.Tree.enableAllButton = function() {
	$("#save").removeAttr('disabled');
	$("#reset").removeAttr('disabled');
};

BMEP.Client.ClientInfo.Tree.resetForm = function() {
	$("#crmCorpForm").clearForm();
};

BMEP.Client.ClientInfo.Tree.uploadObj = function() {
	var selectNode = BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0];
	BMEP.Client.ClientInfo.Tree.hideRMenu();
	if (selectNode) {
		var url = $("#ctx").val() + "/pages/crmCorp/form/upload";
		url += "?corpType.id=" + $("#corpType_id").val();
		
		var commonModalCss = {
			"width": "500px",
			"height" : "260px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
	} else {
		alert("请先选择节点!");
	}
};