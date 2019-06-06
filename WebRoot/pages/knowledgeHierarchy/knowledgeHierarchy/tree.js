
Editorial.knowledgeHierarchy.Tree = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};

Editorial.knowledgeHierarchy.Tree.addObj = function() {
	var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (selectNode) {
		var fatherID;
		if(selectNode.level == 0){
			fatherID = 'root';
		}else{
			fatherID = selectNode.id;
		}
		var url = $('#ctx').val() + "/pages/knowledgeHierarchy/form/edit?parentId=" + fatherID ;
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

Editorial.knowledgeHierarchy.Tree.editObj = function() {
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
		var url = $('#ctx').val() + "/pages/knowledgeHierarchy/form/edit?id=" + selectNode.id;

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

Editorial.knowledgeHierarchy.Tree.delObj = function(id) {
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	openConfirmModalInFrame("确认删除？",function() {
		if (Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]) {
			var url = $('#ctx').val()+"/pages/knowledgeHierarchy/form/delete?id=" + Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0].id;
			$.ajax({
				type : "get",
				url : url,
				beforeSend : function(XMLHttpRequest) {
					 //ShowLoading();
				},
				success : function(data, textStatus) {
					if (data.isSuccess == 'true') {
                        Editorial.knowledgeHierarchy.Tree.zTree.removeNode(Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]);
					}
					openSuccessAlertModalInFrame(data.msg);
				},
				complete : function(XMLHttpRequest, textStatus) {
					 //HideLoading();
				},
				error : function() {
					
				}
			});
		} else {
			alert("请先选择节点!");
		}
	},null,null);
};

Editorial.knowledgeHierarchy.Tree.uploadObj = function() {
	var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (selectNode) {
		var fatherID;
		if(selectNode.level == 0){
			fatherID = 'root';
		}else{
			fatherID = selectNode.id;
		}
		var url = $('#ctx').val() + "/pages/knowledgeHierarchy/form/upload?fatherId=" + fatherID ;
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

Editorial.knowledgeHierarchy.Tree.OnRightClick = function(event, treeId,treeNode) {
    Editorial.knowledgeHierarchy.Tree.zTree.selectNode(treeNode);
    Editorial.knowledgeHierarchy.Tree.showRMenu(treeNode, event.clientX, document.body.scrollTop + event.clientY);
};

Editorial.knowledgeHierarchy.Tree.filter = function(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
};

Editorial.knowledgeHierarchy.Tree.showRShadow = function(width, height, x, y) {
    Editorial.knowledgeHierarchy.Tree.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
};

//隐藏右键菜单
Editorial.knowledgeHierarchy.Tree.hideRMenu = function() {
	if (Editorial.knowledgeHierarchy.Tree.rMenu)
        Editorial.knowledgeHierarchy.Tree.rMenu.css({
			"visibility" : "hidden"
		});
	if (Editorial.knowledgeHierarchy.Tree.shadow)
        Editorial.knowledgeHierarchy.Tree.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", Editorial.knowledgeHierarchy.Tree.onBodyMouseDown);
};

Editorial.knowledgeHierarchy.Tree.onBodyMouseDown = function(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        Editorial.knowledgeHierarchy.Tree.rMenu.css({
			"visibility" : "hidden"
		});
        Editorial.knowledgeHierarchy.Tree.shadow.css({
			"visibility" : "hidden"
		});
	}
};

Editorial.knowledgeHierarchy.Tree.showRMenu = function(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if(node.level==0) {
		//根节点
		$("#add1").show();
		$("#edit").hide();
		$("#delete").hide();
		$("#upload").show();
	} else if(node.isParent) {
		//菜单非叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").hide();
		$("#upload").hide();
	} else{
		//菜点叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();
		$("#upload").hide();
	}

    Editorial.knowledgeHierarchy.Tree.showRShadow(Editorial.knowledgeHierarchy.Tree.rMenu.width(), Editorial.knowledgeHierarchy.Tree.rMenu.height(), x, y);
    Editorial.knowledgeHierarchy.Tree.rMenu.css({
			"top" : y + "px",
			"left" : x + "px",
			"visibility" : "visible"
		});
	
	$("body").bind("mousedown", Editorial.knowledgeHierarchy.Tree.onBodyMouseDown);
};

Editorial.knowledgeHierarchy.Tree.hideTree = function() {
	$('#treeDemo').toggleClass("hide");
};

Editorial.knowledgeHierarchy.Tree.showPropertyList = function() {
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
        Editorial.knowledgeHierarchy.Tree.showPropertyContent();
		BMEP.ProductTypeProp.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};

Editorial.knowledgeHierarchy.Tree.showClassifyList = function() {
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
        Editorial.knowledgeHierarchy.Tree.showClassifyContent();
		BMEP.PTypePropClassify.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};
Editorial.knowledgeHierarchy.Tree.showLicenceList = function() {
    Editorial.knowledgeHierarchy.Tree.hideRMenu();
	if (Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = Editorial.knowledgeHierarchy.Tree.zTree.getSelectedNodes()[0];
        Editorial.knowledgeHierarchy.Tree.showLicenceContent();
        Editorial.ProductType.Licence.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};

Editorial.knowledgeHierarchy.Tree.showPropertyContent = function() {
	$('#classifyContent').addClass("hide");
	$('#licenceContent').addClass("hide");
	$('#propertyContent').removeClass("hide");
};

Editorial.knowledgeHierarchy.Tree.showClassifyContent = function() {
	$('#propertyContent').addClass("hide");
    $('#licenceContent').addClass("hide");
    $('#classifyContent').removeClass("hide");
};
Editorial.knowledgeHierarchy.Tree.showLicenceContent = function() {
	$('#classifyContent').addClass("hide");
	$('#propertyContent').addClass("hide");
	$('#licenceContent').removeClass("hide");
};