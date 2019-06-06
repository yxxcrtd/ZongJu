jQuery.namespace('Editorial.Component.Department');
Editorial.Component.Department = function () {
    this.zTree = null;
};

Editorial.Component.Department.filter = function (treeId, parentNode, childNodes) {
    if (!childNodes)
        return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
};

Editorial.Component.Department.saveObj = function () {
    Editorial.Component.Department.disableAllButton();
    ajaxAlertSuccessMsg("成功", true);
    autoCloseCommonModal(5);
    var selectedTreeNodeList = Editorial.Component.Department.zTree.getCheckedNodes();
    var departmentData = selectedTreeNodeList[0];
    console.log("departmentData:" + JSON.stringify(departmentData));
//	updateFormInLayer('Editorial.Product.ProductInfo.updateAssignee', id);
    updateFormInFrame('Editorial.Product.ProductInfo.updateDepartment', departmentData);
};


Editorial.Component.Department.disableAllButton = function () {
    $("#save").attr('disabled', "true");
};

Editorial.Component.Department.enableAllButton = function () {
    $("#save").removeAttr('disabled');
};

var setting = {
    view: {
        selectedMulti: false
    },
    check: {
        chkStyle: "radio",
        radioType: "all",
        enable: true
    },
    async : {
        enable : true,
        url : $('#ctx').val()
            + "/pages/crmCorp/form/getChildNodes?corpType.code=org",
        autoParam : [ "id" ],
        dataFilter : Editorial.Component.Department.filter
    },
    edit : {
        enable : true,
        showRemoveBtn : false,
        showRenameBtn : false
    },
    callback : {
        onRightClick : function(event, treeId, treeNode) {
            Editorial.Component.Department.zTree.selectNode(treeNode);
            var b=getTreeRightMenuPosition(event,treeId);
            Editorial.Component.Department.showRMenu(treeNode,b.x,b.y);
        }
    }
};

var root = [ {
    id : "root",
    name : "组织机构",
    isRoot : "true",
    isParent : true,
    icon : $('#ctx').val() + "/img/configration1.gif",
    open : true,
    nocheck: true
} ];

$(document).ready(function () {
    $.fn.zTree.init($("#treeDemo"), setting, root);
    Editorial.Component.Department.zTree = $.fn.zTree.getZTreeObj("treeDemo");
    Editorial.Component.Department.rMenu = $("#rMenu");
    Editorial.Component.Department.shadow = $("#shadow");
});
