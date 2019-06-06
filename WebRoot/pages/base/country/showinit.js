

var setting = {
		async: {
			enable: true,
			url:$('#ctx').val()+"/pages/base/country/form/getMenuZTree",
			autoParam:["id","otherId"],
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
	setting.async.url=$('#ctx').val()+"/pages/base/country/form/getMenuZTree?countryId="+ $('#id').val(); 
	$.fn.zTree.init($("#treeDemo"), setting);
	BMEP.Base.Country.Show.zTree = $.fn.zTree.getZTreeObj("treeDemo");
	BMEP.Base.Country.Show.rMenu = $("#rMenu");
	BMEP.Base.Country.Show.shadow = $("#shadow");
	//zTree.expandNode(root, true, false, false);
});