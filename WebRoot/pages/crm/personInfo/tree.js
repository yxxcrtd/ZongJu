var ctx; // 项目根路径
var corpType_id; //类型UUID
var corpType_code; // 类型编码
var corpType_name; // 类型名称

$(function() {




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

BMEP.Client.ClientInfo.Tree.validate = function() {
	var corp_code = $("#corp_code").val().trim();
	var corp_fullName = $("#corp_fullName").val().trim();
	var corp_shortName = $("#corp_shortName").val().trim();
	if(corp_code == "") {
		alert("corp_code is null");
		return false;
	}
	
	if(corp_fullName == "") {
		alert("fullName is null");
		return false;
	}
	
	if(corp_shortName == "") {
		alert("corp_shortName is null");
		return false;
	}
	
	return true;
	BMEP.Client.ClientInfo.Tree.disableAllButton();
};

BMEP.Client.ClientInfo.Tree.refreshTree = function(node) {
	updateTreeInFrame("BMEP.Client.ClientInfo.Tree.zTree", node);
};

BMEP.Client.ClientInfo.Tree.editTreeNodeSubmitSuccess = function(response) {
	if (response.isSuccess == "true") {
		openSuccessAlertModalInFrame(response.msg);
		BMEP.Client.ClientInfo.Tree.refreshTree(response.node);
		BMEP.Client.ClientInfo.Tree.editTreeNode("U");
		//BMEP.Client.ClientInfo.Tree.disableAllButton();
	} else {
		openErrorAlertModalInFrame(response.msg);
		BMEP.Client.ClientInfo.Tree.disableAllButton();
	}
};

BMEP.Client.ClientInfo.Tree.OnRightClick = function(event, treeId, treeNode) {
	BMEP.Client.ClientInfo.Tree.zTree.selectNode(treeNode);
	BMEP.Client.ClientInfo.Tree.showRMenu(treeNode, event.clientX,
			document.body.scrollTop + event.clientY);
};
BMEP.Client.ClientInfo.Tree.removeClassAndText = function() {
	$("#countryDiv").removeClass("error");
	$("#countryDiv").removeClass("success");
	$("#regionDiv").removeClass("error");
	$("#regionDiv").removeClass("success");
	$("#countrySpan").html("");
	$("#regionSpan").html("");
};

/**
 * 装配页面右侧内容
 * @param response
 */
BMEP.Client.ClientInfo.Tree.assemblyContent = function(response) {
	BMEP.Client.ClientInfo.Tree.removeClassAndText();
	BMEP.Client.ClientInfo.Tree.enableAllButton();
	
	return;
	var tabTitles = "";
	var tabContents = "";
	var count = 0;
	var dateIds = new Array();
	$('#id').val(response.id);
	$('#tid').val(response.tid);
	$('#fatherId').val(response.fatherId);

	if (response.clientInfo != null) {
		$('#fullName').val(response.clientInfo.fullName);
		$('#shortName').val(response.clientInfo.shortName);
		$('#address').val(response.clientInfo.address);
		$('#introduction').val(response.clientInfo.introduction);
	}
	for (j in cpmap) {
		var fields = "";

		tabTitles = tabTitles + "<li><a href='#" + j + "' data-toggle='tab'>"
				+ j + "</a></li>";
		for ( var k = 0; k < cpmap[j].length; k++) {
			var name = cpmap[j][k].name;
			var display = cpmap[j][k].display;
			var value = cpmap[j][k].value;
			var must = cpmap[j][k].must;
			if (value == null) {
				value = "";
			}
			var code = cpmap[j][k].code;
			tabTitles = tabTitles + "<div>";
			if (display == "select") {
				var options = "";
				for (m in dicMap) {
					if (m == code) {
						for (n in dicMap[m]) {
							if (value == n) {
								options = options + "<option value='" + n
										+ "' selected>" + dicMap[m][n]
										+ "</option>";
							} else {
								options = options + "<option value='" + n
										+ "'>" + dicMap[m][n] + "</option>";
							}
						}
					}
				}
				fields = fields
						+ "<div class='control-group span6' style='margin-left:0'>"
						+ "<label class='control-label' for='form-field-1'>";
				if (must == "Yes") {
					fields = fields + "<span class='red'>*</span>";
				}
				fields = fields + name + "：" + "</label><div class='controls'>"
						+ "<select id='" + code
						+ "' name='propsValue' class='span12'>"
						+ "<option value='0'>----选择-----</option>" + options
						+ "</select>" + "</div>" + "</div>";
			} else if (display == "checkbox") {
				var options = "";
				for (m in dicMap) {
					if (m == code) {
						for (n in dicMap[m]) {
							if (value == n) {
								options = options
										+ "<input type='checkbox' style='opacity: 1;position: static;' id='"
										+ code + "'name='propsValue'  value='"
										+ n + "' checked>" + dicMap[m][n];
							} else {
								options = options
										+ "<input type='checkbox' style='opacity: 1;position: static;' id='"
										+ code + "' name='propsValue' value='"
										+ n + "'>" + dicMap[m][n];
							}
						}
					}
				}
				fields = fields
						+ "<div class='control-group span6' style='margin-left:0'>"
						+ "<label class='control-label' for='form-field-1'>";
				if (must == "Yes") {
					fields = fields + "<span class='red'>*</span>";
				}
				fields = fields +
				// name + "：" +
				"</label><div class='controls'>" + options + "</div>"
						+ "</div>";
				console.log(options);
			} else if (display == "text") {
				fields = fields
						+ "<div class='control-group span6' style='margin-left:0'>"
						+ "<label class='control-label' for='form-field-1'>";
				if (must == "Yes") {
					fields = fields + "<span class='red'>*</span>";
				}
				fields = fields + name + "：" + "</label>"
						+ "<div class='controls'>" + "<input type='text' id='"
						+ code + "' name='propsValue' class='span12' value='"
						+ value + "'></input>" + "</div>" + "</div>";
			} else if (display == "date") {
				fields = fields
						+ "<div class='control-group span6' style='margin-left:0'>"
						+ "<label class='control-label' for='form-field-1'>";
				if (must == "Yes") {
					fields = fields + "<span class='red'>*</span>";
				}
				fields = fields
						+ name
						+ "："
						+ "</label>"
						+ "<div class='controls'>"
						+ "<div id='"
						+ code
						+ "DatePicker' class='input-append span12'>"
						+ "<input type='text' id='"
						+ code
						+ "' name='propsValue' data-format='yyyy-MM-dd' class='span11' value='"
						+ value
						+ "'></input>"
						+ "<span class='add-on'> <i data-time-icon='icon-time' data-date-icon='icon-calendar'> </i></span>"
						+ "</div>" + "</div>" + "</div>";
				dateIds.push(code + "DatePicker");
			} else if (display == "textarea") {
				fields = fields
						+ "<div class='control-group' style='margin-left:0'>"
						+ "<label class='control-label' for='form-field-1'>";
				if (must == "Yes") {
					fields = fields + "<span class='red'>*</span>";
				}
				fields = fields + name + "：" + "</label>"
						+ "<div class='controls'>" + "<textarea id='" + code
						+ "' name='propsValue' class='span12'>" + value
						+ "</textarea>" + "</div>" + "</div>";
			}
			tabTitles = tabTitles + "</div>";
			tabContents = tabContents
					+ "<input type='hidden' name='typePropIds' value='"
					+ cpmap[j][k].id + "' />";
		}
		if (count == 0) {
			tabContents = tabContents + "<div id='" + j
					+ "' class='tab-pane active'>";
		} else {
			tabContents = tabContents + "<div id='" + j + "' class='tab-pane'>";
		}
		tabContents = tabContents + fields + "</div>";
		count = count + 1;
	}
	$('#expendInfo').html(
			"" + "<ul class='nav nav-tabs active'>" + tabTitles + "</ul>"
					+ "<div class='tab-content'>" + tabContents + "</div>");
	for (id in dateIds) {
		$('#' + dateIds[id]).datetimepicker({
			language : 'cn',
			pickTime : false
		});
	}
};

/**
 * 添加/修改树节点
 * @param action 操作类型，I=添加，U=修改
 */
BMEP.Client.ClientInfo.Tree.editTreeNode = function(action) {
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
				"corpType.code" : corpType_code
			},
			"success" : function(response) {				
				if (response.isSuccess == "true") {
					$("#node_id").val(selectNode.id);
					$("#relation_id").val(selectNode.id);
					
					var subTitle = null;
					if (action == "U") {
						subTitle = "修改";
						
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
						subTitle = "新增";
						BMEP.Client.ClientInfo.Tree.resetForm(); // 清空form表单值
						$.customProperty.destroy("cp1");
					}
					
					$("#action").val(action);
					$("#subTitle").html(subTitle);
					BMEP.Client.ClientInfo.Tree.showContent();

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
			BMEP.Client.ClientInfo.Tree.zTree.reAsyncChildNodes(selectNode,
					"refresh");
		}
		var node = BMEP.Client.ClientInfo.Tree.zTree.getNodeByParam("id",
				nodeInfo.nodeId, selectNode);
		BMEP.Client.ClientInfo.Tree.zTree.selectNode(node, false);// 添加完毕，新节点被选中
	}
};

BMEP.Client.ClientInfo.Tree.delObj = function() {
	BMEP.Client.ClientInfo.Tree.hideRMenu();// 隐藏右键菜单
	openConfirmModalInFrame(
			"确定注销该客戶信息?",
			function() {

				if (BMEP.Client.ClientInfo.Tree.zTree.getSelectedNodes()[0]) {
					var url = $('#ctx').val()
							+ "/pages/clientManage/form/delete?id="
							+ BMEP.Client.ClientInfo.Tree.zTree
									.getSelectedNodes()[0].id;
					$
							.ajax({
								type : "get",
								url : url,
								beforeSend : function(XMLHttpRequest) {
									// ShowLoading();
								},
								success : function(data, textStatus) {
									var returnStr = data.split(":");
									if (returnStr[0] == 'true') {
										openSuccessAlertModalInFrame(returnStr[1]);
										BMEP.Client.ClientInfo.Tree.zTree
												.removeNode(BMEP.Client.ClientInfo.Tree.zTree
														.getSelectedNodes()[0]);
									} else {
										openErrorAlertModalInFrame(returnStr[1]);
									}
									BMEP.Client.ClientInfo.Tree.hideContent();// 删除成功后将form隐藏
								},
								complete : function(XMLHttpRequest, textStatus) {
									// HideLoading();
								},
								error : function() {
									// 请求出错处理
								}
							});
				} else {
					alert("请先选择节点!");
				}
			}, null, null);
};

BMEP.Client.ClientInfo.Tree.showRMenu = function(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if (node.level == 0) {// 根节点
		$("#add").show();
		$("#edit").hide();
		$("#delete").hide();
	} else { // 叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();
	}
	BMEP.Client.ClientInfo.Tree.showRShadow(BMEP.Client.ClientInfo.Tree.rMenu
			.width(), BMEP.Client.ClientInfo.Tree.rMenu.height(), x, y);
	BMEP.Client.ClientInfo.Tree.rMenu.css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});
	$("body").bind("mousedown", BMEP.Client.ClientInfo.Tree.onBodyMouseDown);
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


jQuery.namespace("Editorial.Crm.Corp.Temp");
Editorial.Crm.Corp.Temp = function() {};

Editorial.Crm.Corp.Temp.ppp = function() {
	this.name = "wdasdasd";
}







Editorial.Crm.Corp.Temp.positionEdit = function(id) {
	var param = {
		position_id: id
	};
	var url = new StringBuffer();
	url.add(ctx);
	url.add("/pages/crmPosition/form/edit");
	url.add("?position.id={position_id}", param);
	var commonModalCss = {
		"width" : "550px",
		"height" : "250px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url.toString(), commonModalCss, commonModalBodyCss);
};

Editorial.Crm.Corp.Temp.positionDelete = function(id) {
	openConfirmModalInFrame("您确定执行删除岗位操作吗？", function() {
		var url = $('#ctx').val() + "/pages/crmPosition/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					refreshCustomPropertyDataTable("cp1");
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
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





Editorial.Crm.Corp.Temp.crmPositionAddButtonOnClick = function() {
	var param = {
		"id": $("#relation_id").val()
	}
	var url = new StringBuffer();
	url.add(ctx);
	url.add("/pages/crmPosition/form/edit");
	url.add("?position.crmCorpTypeRelationship.id={id}", param);
	
	var commonModalCss = {
		"width" : "600px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url.toString(), commonModalCss, commonModalBodyCss);
};

Editorial.Crm.Corp.Temp.crmPositionAjaxSource = "$('#ctx').val() + '/pages/crmPosition/form/manager?id=' + $('#relation_id').val()";

Editorial.Crm.Corp.Temp.crmPositionServerParams = function(aoData) {
//	aoData.push({
//		"name" : "position.code",
//		"value" : $("#query_module_isbn").val()
//	});
//	aoData.push({
//		"name" : "position.name",
//		"value" : $("#query_module_title").val()
//	});
};

Editorial.Crm.Corp.Temp.crmPositionColumns = [
	{
		"sTitle" : "序号",
		"mDataProp" : "id"
	}, {
		"sTitle" : "岗位编号",
		"mDataProp" : "code"
	}, {
		"sTitle" : "岗位名称",
		"mDataProp" : "name"
	}, {
		"sTitle" : "操作",
		"mData" : null,
		"aTargets" : [ -1 ],
		"fnRender" : function(oObj) {
			var start = '<div class="hidden-phone visible-desktop btn-group">';
			var edit = '<button class="btn btn-mini btn-info" type="button" title="修改" onclick="Editorial.Crm.Corp.Temp.positionEdit(\''+ oObj.aData.id +'\')"><i class="icon-edit bigger-120"></i></button>';
			var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Crm.Corp.Temp.positionDelete(\''+ oObj.aData.id +'\')"><i class="icon-trash bigger-120"></i></button>';
			var end = '</div>';
			return start + edit + trash + end;
		}
	}
];























Editorial.Crm.Corp.Temp.crmCorpAddressAddButtonOnClick = function() {
	alert("asdasdasdasd");
};
Editorial.Crm.Corp.Temp.crmCorpAddressAjaxSource = "";
Editorial.Crm.Corp.Temp.crmCorpAddressServerParams = function(aoData) {
	aoData.push({
		"name" : "queryIsbn",
		"value" : $("#query_module_isbn").val()
	});
	aoData.push({
		"name" : "title",
		"value" : $("#query_module_title").val()
	});
};
Editorial.Crm.Corp.Temp.crmCorpAddressColumns = [ {
	"sTitle" : "序号",
	"mDataProp" : "id"
}, {
	"sTitle" : "编号",
	"mDataProp" : "code"
}, {
	"sTitle" : "名称",
	"mDataProp" : "name"
}, {
	"sTitle" : "操作",
	"mData" : null,
	"aTargets" : [ -1 ],
	"fnRender" : function(oObj) {
		var start = '<div class="hidden-phone visible-desktop btn-group">';
		var edit = '<button class="btn btn-mini btn-info" type="button" title="修改" onclick="Editorial.Product.Temp.attachModObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
		var trash = '<button class="btn btn-mini btn-danger" type="button" title="删除" onclick="Editorial.Product.Temp.attachDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
		var end = '</div>';
		return start + edit + trash + end;
	}
} ];








