
var setting = {
	async: {
		enable: true,
		url:$('#ctx').val() + "/pages/knowledgeHierarchy/form/getKnowledgeHierarchyTree",
		autoParam:["id"],
		dataFilter: Editorial.knowledgeHierarchy.Tree.filter
	},
	edit: {
		enable: true,
		showRemoveBtn: false,
		showRenameBtn: false
	},
	callback: {
		onRightClick: function(event, treeId,treeNode) {
            Editorial.knowledgeHierarchy.Tree.zTree.selectNode(treeNode);
            Editorial.knowledgeHierarchy.Tree.showRMenu(treeNode, event.clientX, document.body.scrollTop + event.clientY);
		}
	}
};

var root = [ {
	id : "root",
	name : "知识体系管理",
	isRoot : "true",
	isParent : true,
	icon : $('#ctx').val() + "/img/configration1.gif",
	open : true
} ];

$(document).ready(function(){

    $(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	$.fn.zTree.init($("#treeDemo"), setting, root);
    Editorial.knowledgeHierarchy.Tree.zTree = $.fn.zTree.getZTreeObj("treeDemo");
    Editorial.knowledgeHierarchy.Tree.rMenu = $("#rMenu");
    Editorial.knowledgeHierarchy.Tree.shadow = $("#shadow");
});
