
var setting = {
		async: {
			enable: true,
			url:$('#ctx').val() + "/pages/base/subject/form/getMenuZTree",
			autoParam:["id"],
			dataFilter: filter
		},
		edit: {
			enable: true,
			showRemoveBtn: false,
			showRenameBtn: false
		},callback: {
			
			onRightClick: OnRightClick
			
			
		}
		
	};
$(document).ready(function(){
	setting.async.url=$('#ctx').val() + "/pages/base/subject/form/getMenuZTree?rootId=" + $('#subjectId').val();
		$.fn.zTree.init($("#treeDemo"), setting);
		BMEP.Base.Subject.Show.zTree = $.fn.zTree.getZTreeObj("treeDemo");
		BMEP.Base.Subject.Show.rMenu = $("#rMenu");
		BMEP.Base.Subject.Show.shadow = $("#shadow");
		//zTree.expandNode(root, true, false, false);
	});