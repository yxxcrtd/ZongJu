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
    var selectedTreeNodeList = Editorial.JBPM.Design.Prop.zTree.getCheckedNodes();
    console.log(selectedTreeNodeList);
    var id = null;
    if (selectedTreeNodeList != null && selectedTreeNodeList.length > 0) {
        id = selectedTreeNodeList[0].id;
        console.log('id1' + id);

    }
    console.log('id2' + id);
    var url = $('#ctx').val() + "/pages/fdesign/form/batchSaveDic?id=" + id;
    $.ajax({
        "traditional": true,
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
//        "data": data,
        "success": function (response) {
            if (response.isSuccess == "true") {
                ajaxAlertSuccessMsg(response.msg, true);
                autoCloseCommonModal(5);
                var jsonObj = {
                    "code": response.code,
                    "display": response.display,
                    "dicMap": response.dicMap
                };
                updateFormInLayer('Editorial.Flow.taskRepo.updateField', jsonObj);
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
        selectedMulti: false
    },
    check: {
        chkStyle: "radio",
        radioType: "all",
        enable: true
    },
    async: {
        enable: true,
        url: $('#ctx').val() + "/pages/fdesign/form/getResourceZTree",
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
    setting.async.url = $('#ctx').val() + "/pages/fdesign/form/getResourceZTree";
    $.fn.zTree.init($("#treeDemo"), setting, root);
    Editorial.JBPM.Design.Prop.zTree = $.fn.zTree.getZTreeObj("treeDemo");
});
