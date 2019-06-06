var setting = {
	async: {
		enable: true,
		url:$('#ctx').val() + "/pages/productType/form/getPropTypeTree",
		autoParam:["id"],
		dataFilter: BMEP.Product.ProductType.Tree.filter
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	callback: {
		onRightClick: function(event, treeId,treeNode) {
			BMEP.Product.ProductType.Tree.zTree.selectNode(treeNode);
			BMEP.Product.ProductType.Tree.showRMenu(treeNode, event.clientX, document.body.scrollTop + event.clientY);
		}
	}
};

var root = [ {
	id : "root",
	name : "产品分类",
	isRoot : "true",
	isParent : true,
	icon : $('#ctx').val() + "/img/configration1.gif",
	open : true
} ];


$(document).ready(function() {
    $(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	$.fn.zTree.init($("#treeDemo"), setting, root);
	BMEP.Product.ProductType.Tree.zTree = $.fn.zTree.getZTreeObj("treeDemo");
	BMEP.Product.ProductType.Tree.rMenu = $("#rMenu");
	BMEP.Product.ProductType.Tree.shadow = $("#shadow");
});
