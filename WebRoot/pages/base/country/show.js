BMEP.Base.Country.Show = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};

function addObj() {
	var selectNode = BMEP.Base.Country.Show.zTree.getSelectedNodes()[0];
	hideRMenu();// 隐藏右键菜单
	if (selectNode) {
		var fatherID;
		fatherID = selectNode.id;
		var url = $('#ctx').val() + "/pages/base/country/form/editRegion?fatherId=" + fatherID + "&otherId=" + selectNode.otherId;
		var commonModalCss = {
			"width" : "450px",
			"height" : "300px"
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
	if (BMEP.Base.Country.Show.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Base.Country.Show.zTree.getSelectedNodes()[0];
		var url = $('#ctx').val() + "/pages/base/country/form/editRegion?eid=" + selectNode.id+"&otherId=" + selectNode.otherId;
		var commonModalCss = {
				"width" : "450px",
				"height" : "300px"
		};
		var commonModalBodyCss = {
			"max-height" : "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);

	} else {
		alert("请先选择节点!");
	}

}

function delObj() {
	hideRMenu();// 隐藏右键菜单
	openConfirmModalInFrame("确定删除该分类？", function() {
		if (BMEP.Base.Country.Show.zTree.getSelectedNodes()[0]) {
			var url = $('#ctx').val() + "/pages/base/country/form/deleteRegion?eid=" + BMEP.Base.Country.Show.zTree.getSelectedNodes()[0].id;
			$.ajax({
				type : "get",
				url : url,
				beforeSend : function(XMLHttpRequest) {
					// ShowLoading();
				},
				success : function(data, textStatus) {

					if (data.isSuccess == 'true') {
						BMEP.Base.Country.Show.zTree.removeNode(BMEP.Base.Country.Show.zTree.getSelectedNodes()[0]);
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
	}, null, null);
}

function OnRightClick(event, treeId, treeNode) {
	BMEP.Base.Country.Show.zTree.selectNode(treeNode);
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
	BMEP.Base.Country.Show.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
}
function hideRMenu() {
	if (BMEP.Base.Country.Show.rMenu)
		BMEP.Base.Country.Show.rMenu.css({
			"visibility" : "hidden"
		});
	if (BMEP.Base.Country.Show.shadow)
		BMEP.Base.Country.Show.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", onBodyMouseDown);
}
function onBodyMouseDown(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		BMEP.Base.Country.Show.rMenu.css({
			"visibility" : "hidden"
		});
		BMEP.Base.Country.Show.shadow.css({
			"visibility" : "hidden"
		});
	}
}
function showRMenu(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if (node.isParent) {// 菜单非叶子节点
		if (node.level == 0) {
			$("#add").show();
			$("#edit").hide();
			$("#delete").hide();
		} else {
			$("#add").show();
			$("#edit").show();
			$("#delete").hide();
		}

	} else { // 菜点叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();

	}

	showRShadow(BMEP.Base.Country.Show.rMenu.width(), BMEP.Base.Country.Show.rMenu.height(), x, y);
	BMEP.Base.Country.Show.rMenu.css({
		"top" : y + "px",
		"left" : x + "px",
		"visibility" : "visible"
	});

	$("body").bind("mousedown", onBodyMouseDown);
}