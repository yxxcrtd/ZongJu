Editorial.JBPM.Design.Prop = function () {
    this.zTree = null;
};

Editorial.JBPM.Design.Prop.filter = function (treeId, parentNode, childNodes) {
    if (!childNodes)
        return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
};

Editorial.JBPM.Design.Prop.saveResourceList = function () {
    Editorial.JBPM.Design.Prop.disableAllButton();
    //alert("selectedTreeNodeList:" + JSON.stringify(Editorial.JBPM.Design.Prop.zTree.getCheckedNodes()));
    var selectedTreeNodeList = Editorial.JBPM.Design.Prop.zTree.getCheckedNodes();
    console.log(selectedTreeNodeList);
//	for (var i = 0; i < selectedTreeNodeList.length; i++) {
//		treeNode = selectedTreeNodeList[i];
//		//alert("treeNode:" + JSON.stringify(treeNode));
//		if (treeNode.level > 1) {
//			data.sela.push(treeNode.id);
//		}
//	}
    var id = null;
    var typeId = "";
    var propId = "";

    if (selectedTreeNodeList != null && selectedTreeNodeList.length > 0) {
        console.log('id1' + id);
        for (var i = 0; i < selectedTreeNodeList.length; i++) {
            if (selectedTreeNodeList[i].otherId == "type") {
                typeId = typeId + selectedTreeNodeList[i].id + ",";
            } else if (selectedTreeNodeList[i].otherId == "prop") {
                propId = propId + selectedTreeNodeList[i].id + ",";
            }

        }


    }
    console.log(JSON.stringify({"treeNodeList": selectedTreeNodeList }));
    //alert("data:" + JSON.stringify(data));
    var url = $('#ctx').val() + "/pages/fprop/form/batchSaveDic?id=" + $('#id').val();
    $.ajax({
        "traditional": true,
        "dataType": 'json',
//		"contentType" : "application/json",
        "type": "POST",
        "url": url,
        "cache": false,
//        "data":JSON.stringify( {
//        	"treeNodeList":selectedTreeNodeList
//        }),
        "data": {
            "type": $('#type').val(),
            "typeIds": typeId,
            "propIds": propId
        },
        "success": function (response) {
            if (response.isSuccess == "true") {
                ajaxAlertSuccessMsg(response.msg, true);
                autoCloseCommonModal(5);
            } else {
                ajaxAlertErrorMsg(response.msg, true);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};


Editorial.JBPM.Design.Prop.disableAllButton = function () {
    $("#save").attr('disabled', "true");
};

Editorial.JBPM.Design.Prop.enableAllButton = function () {
    $("#save").removeAttr('disabled');
};

var setting = {
    view: {
        selectedMulti: true
    },
    check: {
        radioType: "all",
        enable: true
    },
    async: {
        enable: true,
        url: $('#ctx').val() + "/pages/fprop/form/getResourceZTree?activityId=" + $('#id').val(),
        autoParam: ["id"],
        dataFilter: Editorial.JBPM.Design.Prop.filter
    },
    edit: {
        enable: true,
        showRemoveBtn: false,
        showRenameBtn: false
    },
    callback: {
    }
};

var root = [
    {
        id: "root",
        name: "产品自定义属性",
        isRoot: "true",
        isParent: true,
        icon: $('#ctx').val() + "/img/configration1.gif",
        open: true,
        nocheck: true
    }
];

$(document).ready(function () {
    setting.async.url = $('#ctx').val() + "/pages/fprop/form/getResourceZTree?activityId=" + $('#id').val() + "&type=" + $('#type').val();
    $.fn.zTree.init($("#treeDemo"), setting, root);
    Editorial.JBPM.Design.Prop.zTree = $.fn.zTree.getZTreeObj("treeDemo");
});
