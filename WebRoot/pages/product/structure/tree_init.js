

/**
 * onload
 */
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
	
}); // onload end