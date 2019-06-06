
BMEP.Product.ProductType.Tree = function() {
	this.zTree = null;
	this.rMenu = null;
	this.shadow = null;
};

BMEP.Product.ProductType.Tree.addObj = function() {
	var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (selectNode) {
		var fatherID;
		if(selectNode.level == 0){
			fatherID = 'root';
		}else{
			fatherID = selectNode.id;
		}
		var url = $('#ctx').val() + "/pages/productType/form/edit?fatherId=" + fatherID ;
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

BMEP.Product.ProductType.Tree.editObj = function() {
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
		var url = $('#ctx').val() + "/pages/productType/form/edit?id=" + selectNode.id;

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

BMEP.Product.ProductType.Tree.delObj = function(id) {
	BMEP.Product.ProductType.Tree.hideRMenu();
	openConfirmModalInFrame("确认删除？",function() {
		if (BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]) {
			var url = $('#ctx').val()+"/pages/productType/form/delete?id=" + BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0].id;
			$.ajax({
				type : "get",
				url : url,
				beforeSend : function(XMLHttpRequest) {
					 //ShowLoading();
				},
				success : function(data, textStatus) {
					if (data.isSuccess == 'true') {
						BMEP.Product.ProductType.Tree.zTree.removeNode(BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]);
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

BMEP.Product.ProductType.Tree.uploadObj = function() {
	var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (selectNode) {
		var fatherID;
		if(selectNode.level == 0){
			fatherID = 'root';
		}else{
			fatherID = selectNode.id;
		}
		var url = $('#ctx').val() + "/pages/productType/form/upload?fatherId=" + fatherID ;
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

BMEP.Product.ProductType.Tree.OnRightClick = function(event, treeId,treeNode) {
	BMEP.Product.ProductType.Tree.zTree.selectNode(treeNode);
	BMEP.Product.ProductType.Tree.showRMenu(treeNode, event.clientX, document.body.scrollTop + event.clientY);
};

BMEP.Product.ProductType.Tree.filter = function(treeId, parentNode, childNodes) {
	if (!childNodes)
		return null;
	for ( var i = 0, l = childNodes.length; i < l; i++) {
		childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
	}
	return childNodes;
};

BMEP.Product.ProductType.Tree.showRShadow = function(width, height, x, y) {
	BMEP.Product.ProductType.Tree.shadow.css({
		"width" : width + "px",
		"height" : height + "px",
		"left" : x + 4 + "px",
		"top" : y + 4 + "px",
		"visibility" : "visible"
	});
};

//隐藏右键菜单
BMEP.Product.ProductType.Tree.hideRMenu = function() {
	if (BMEP.Product.ProductType.Tree.rMenu)
		BMEP.Product.ProductType.Tree.rMenu.css({
			"visibility" : "hidden"
		});
	if (BMEP.Product.ProductType.Tree.shadow)
		BMEP.Product.ProductType.Tree.shadow.css({
			"visibility" : "hidden"
		});
	$("body").unbind("mousedown", BMEP.Product.ProductType.Tree.onBodyMouseDown);
};

BMEP.Product.ProductType.Tree.onBodyMouseDown = function(event) {
	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
		BMEP.Product.ProductType.Tree.rMenu.css({
			"visibility" : "hidden"
		});
		BMEP.Product.ProductType.Tree.shadow.css({
			"visibility" : "hidden"
		});
	}
};

BMEP.Product.ProductType.Tree.showRMenu = function(node, x, y) {
	$("#rMenu ul").show();
	$("#shadow").show();
	if(node.level==0) {
		//根节点
		$("#add1").show();
		$("#edit").hide();
		$("#delete").hide();
		$("#licence").hide();
		$("#property").hide();
		$("#upload").hide();
	} else if(node.isParent) {
		//菜单非叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").hide();
		$("#licence").show();
		$("#property").show();
		$("#upload").show();
	} else{
		//菜点叶子节点
		$("#add").show();
		$("#edit").show();
		$("#delete").show();
		$("#licence").show();
		$("#property").show();
		$("#upload").show();
	}
	
	// 目前只支持2级菜单，为了门户页面的显示。以后再门户页面重新设计再放开此限制
	if (node.level == 2) {
		$("#add1").hide();
	} else {
		$("#add1").show();
	}

		BMEP.Product.ProductType.Tree.showRShadow(BMEP.Product.ProductType.Tree.rMenu.width(), BMEP.Product.ProductType.Tree.rMenu.height(), x, y);
		BMEP.Product.ProductType.Tree.rMenu.css({
			"top" : y + "px",
			"left" : x + "px",
			"visibility" : "visible"
		});
	
	$("body").bind("mousedown", BMEP.Product.ProductType.Tree.onBodyMouseDown);
};

BMEP.Product.ProductType.Tree.hideTree = function() {
	$('#treeDemo').toggleClass("hide");
};

BMEP.Product.ProductType.Tree.showPropertyList = function() {
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
		BMEP.Product.ProductType.Tree.showPropertyContent();
		BMEP.ProductTypeProp.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};

BMEP.Product.ProductType.Tree.showClassifyList = function() {
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
		BMEP.Product.ProductType.Tree.showClassifyContent();
		BMEP.PTypePropClassify.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};
BMEP.Product.ProductType.Tree.showLicenceList = function() {
	BMEP.Product.ProductType.Tree.hideRMenu();
	if (BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0]) {
		var selectNode = BMEP.Product.ProductType.Tree.zTree.getSelectedNodes()[0];
		BMEP.Product.ProductType.Tree.showLicenceContent();
        Editorial.ProductType.Licence.createDataTable(selectNode.id);
	} else {
		alert("请先选择节点!");
	}
};

BMEP.Product.ProductType.Tree.showPropertyContent = function() {
	$('#classifyContent').addClass("hide");
	$('#licenceContent').addClass("hide");
	$('#propertyContent').removeClass("hide");
};

BMEP.Product.ProductType.Tree.showClassifyContent = function() {
	$('#propertyContent').addClass("hide");
    $('#licenceContent').addClass("hide");
    $('#classifyContent').removeClass("hide");
};
BMEP.Product.ProductType.Tree.showLicenceContent = function() {
	$('#classifyContent').addClass("hide");
	$('#propertyContent').addClass("hide");
	$('#licenceContent').removeClass("hide");
};