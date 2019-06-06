
BMEP.Base.Subject.Show = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};
function addObj() {
	var selectNode = BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0];
	hideRMenu();// 隐藏右键菜单
	if (selectNode) {
		var fatherID;
		fatherID = selectNode.id;
		var url = $('#ctx').val() + "/pages/base/subject/form/edit?fatherId=" + fatherID;
		var commonModalCss = {
			"width" : "450px",
			"height" : "250px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
	} else {
		alert("请先选择节点!");
	}
}

function editObj() {
	hideRMenu();// 隐藏右键菜单
	if (BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0];
		var url = $('#ctx').val() + "/pages/base/subject/form/edit?eid=" + selectNode.id + "&flag1=tree";

		var commonModalCss = {
			"width" : "450px",
			"height" : "250px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

	} else {
		alert("请先选择节点!");
	}

}

BMEP.Base.Subject.test = function() {
	alert("test");
};

// 更新树节点信息
BMEP.Base.Subject.UpdateNode = function(nodeInfo) {

	// alert(nodeInfo + "mgq");
	var selectNode = BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0];
	if (nodeInfo.id == undefined) {
		BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0].name = nodeInfo.name;
		BMEP.Base.Subject.Show.zTree.updateNode(BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0]);
	} else {
		if (selectNode.open == true || selectNode.isParent == false) {
			var addNode = [ {
				id : nodeInfo.id,
				name : nodeInfo.name,
				isParent : nodeInfo.isParent
			} ];
			BMEP.Base.Subject.Show.zTree.addNodes(selectNode, addNode);
		} else {
			BMEP.Base.Subject.Show.zTree.reAsyncChildNodes(selectNode, "refresh");
		}
		var node = BMEP.Base.Subject.Show.zTree.getNodeByParam("id", nodeInfo.id, selectNode);
		BMEP.Base.Subject.Show.zTree.selectNode(node, false);// 添加完毕，新节点被选中
	}
};

function delObj() {
	hideRMenu();// 隐藏右键菜单
	openConfirmModalInFrame("确定删除该分类？",function() {
		if (BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0]) {
			var url = $('#ctx').val()+"/pages/base/subject/form/delete?id=" + BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0].id;
			$.ajax({
				type : "get",
				url : url,
				beforeSend : function(XMLHttpRequest) {
					// ShowLoading();
				},
				success : function(data, textStatus) {
					
					if (data.isSuccess == 'true') {
						BMEP.Base.Subject.Show.zTree.removeNode(BMEP.Base.Subject.Show.zTree.getSelectedNodes()[0]);
					}
					openSuccessAlertModalInFrame(data.msg);
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
	},null,null);
}

function OnRightClick(event, treeId, treeNode) {
	BMEP.Base.Subject.Show.zTree.selectNode(treeNode);
	showRMenu(treeNode, event.clientX, document.body.scrollTop + event.clientY);
}
function filter(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
}
function showRShadow(width, height, x, y) {
	BMEP.Base.Subject.Show.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
}
function hideRMenu() {
	if (BMEP.Base.Subject.Show.rMenu)
		BMEP.Base.Subject.Show.rMenu.css({
			"visibility" : "hidden"
		});
	if (BMEP.Base.Subject.Show.shadow)
		BMEP.Base.Subject.Show.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		BMEP.Base.Subject.Show.rMenu.css({
			"visibility" : "hidden"
		});
		BMEP.Base.Subject.Show.shadow.css({
			"visibility" : "hidden"
		});
	}
}
function showRMenu(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if (node.isParent) {// 菜单非叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").hide();
	} else { // 菜点叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();

	}

	showRShadow(BMEP.Base.Subject.Show.rMenu.width(), BMEP.Base.Subject.Show.rMenu.height(), x, y);
	BMEP.Base.Subject.Show.rMenu.css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});

	$("body").bind("mousedown", onBodyMouseDown);
}