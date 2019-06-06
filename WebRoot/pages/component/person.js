jQuery.namespace('Editorial.Component.Person.Tree');
Editorial.Component.Person.Tree = function() {
    this.zTree = null;
    this.rMenu = null;
    this.shadow = null;
};
Editorial.Component.Person.Tree.saveAndClose = function() {
    ajaxAlertSuccessMsg("成功", true);
    autoCloseCommonModal(5);
    var person = $("input[name='ids']:checked").val();
    var personArray = person.split(",");
    var personData = {
        'id':personArray[0],
        'name':personArray[1]
    };
    updateFormInFrame('Editorial.Product.ProductInfo.updatePerson', personData);
};

Editorial.Component.Person.Tree.OnRightClick = function(event, treeId, treeNode) {
    console.log("document.body.scrollTop:" + document.body.scrollTop);
    console.log("event.clientX:" + event.clientX);
    console.log("event.clientY:" + event.clientY);
    Editorial.Component.Person.Tree.zTree.selectNode(treeNode);
    Editorial.Component.Person.Tree.showRMenu(treeNode, event.clientX,
        document.body.scrollTop + event.clientY);
};

Editorial.Component.Person.Tree.filter = function(treeId, parentNode, childNodes) {
    if (!childNodes)
        return null;
    for (var i = 0, l = childNodes.length; i < l; i++) {
        childNodes[i].name = childNodes[i].name.replace(/\.n/g, '.');
    }
    return childNodes;
};

Editorial.Component.Person.Tree.showRShadow = function(width, height, x, y) {
    Editorial.Component.Person.Tree.shadow.css({
        "width" : width + "px",
        "height" : height + "px",
        "left" : x + 4 + "px",
        "top" : y + 4 + "px",
        "visibility" : "visible"
    });
};

// 隐藏右键菜单
Editorial.Component.Person.Tree.hideRMenu = function() {
    if (Editorial.Component.Person.Tree.rMenu)
        Editorial.Component.Person.Tree.rMenu.css({
            "visibility" : "hidden"
        });
    if (Editorial.Component.Person.Tree.shadow)
        Editorial.Component.Person.Tree.shadow.css({
            "visibility" : "hidden"
        });
    $("body").unbind("mousedown", Editorial.Component.Person.Tree.onBodyMouseDown);
};

Editorial.Component.Person.Tree.onBodyMouseDown = function(event) {
    if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length > 0)) {
        Editorial.Component.Person.Tree.rMenu.css({
            "visibility" : "hidden"
        });
        Editorial.Component.Person.Tree.shadow.css({
            "visibility" : "hidden"
        });
    }
};

Editorial.Component.Person.Tree.showRMenu = function(node, x, y) {
    $("#rMenu ul").show();
    $("#shadow").show();
    if (node.level == 0) {
        // 根节点
        $("#add1").show();
        $("#edit").hide();
        $("#delete").hide();
        $("#classify").hide();
        $("#property").hide();
        $("#upload").hide();
    } else if (node.isParent) {
        // 菜单非叶子节点
        $("#add").show();
        $("#edit").show();
        $("#delete").hide();
        $("#classify").show();
        $("#property").show();
        $("#upload").show();
    } else {
        // 菜点叶子节点
        $("#add").show();
        $("#edit").show();
        $("#delete").show();
        $("#classify").show();
        $("#property").show();
        $("#upload").show();
    }

    Editorial.Component.Person.Tree.showRShadow(Editorial.Component.Person.Tree.rMenu
        .width(), Editorial.Component.Person.Tree.rMenu.height(), x, y);
    Editorial.Component.Person.Tree.rMenu.css({
        "top" : y + "px",
        "left" : x + "px",
        "visibility" : "visible"
    });

    $("body").bind("mousedown", Editorial.Component.Person.Tree.onBodyMouseDown);
};

Editorial.Component.Person.Tree.hideTree = function() {
    $('#treeDemo').toggleClass("hide");
};

Editorial.Component.Person.Tree.showList = function() {
    Editorial.Component.Person.Tree.hideRMenu();

    if (Editorial.Component.Person.Tree.zTree.getSelectedNodes()[0]) {
        var selectNode = Editorial.Component.Person.Tree.zTree.getSelectedNodes()[0];
        console.log("-----------------------------");
        console.log(Editorial.Component.Person.Tree.zTree.getSelectedNodes());
        console.log("+++++++++++++++++++++++++++++");
        console.log(selectNode);
        console.log("=============================");
        console.log(selectNode.id);
        console.log("==============================");
        Editorial.Component.Person.Tree.showPropertyContent();
        Editorial.Component.Person.Tree.createDataTable(selectNode.id);
    } else {
        alert("请先选择节点!");
    }
};
Editorial.Component.Person.Tree.query = function(typeId) {
    $("#corpId").val(typeId);
    initPagingParamsInFrame('Editorial.Component.Person.Tree.oTable1');
    // 重新刷新页面Table
    refreshFrameDataTableInFrame('Editorial.Component.Person.Tree.oTable1');
};
Editorial.Component.Person.Tree.createDataTable = function(typeId) {
    $("#corpId").val(typeId);
    console.log("11111111111111111111111");
    console.log(typeId);
    console.log("11111111111111111111111");
    if (Editorial.Component.Person.Tree.oTable1 != null) {
        Editorial.Component.Person.Tree.query(typeId);
    } else {
        Editorial.Component.Person.Tree.oTable1 = $('#table_classify')
            .dataTable(
            {
                "bFilter" : false, // 开关，是否启用客户端过滤器
                "bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
                "bAutoWidth" : false, // 自适应宽度
                "sPaginationType" : "full_numbers", // 分页样式
                "bServerSide" : true, // 从服务器端取数据
                "sAjaxSource" : $('#ctx').val()
                    + "/pages/crm/personInfo/form/manager", // mvc后台ajax调用接口。
                "fnServerParams" : function(aoData) {
                    aoData.push({
                        "name" : "id",
                        "value" : $("#id").val()
                    });
                    aoData.push({
                        "name" : "code",
                        "value" : "employee"
                    });
                    aoData.push({
                        "name" : "corpId",
                        "value" : $("#corpId").val()
                    });
                },
                "fnServerData" : Editorial.Component.Person.Tree.retrieveData,
                "fnDrawCallback" : function(oSettings) {
                    for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                        $('td:eq(1)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
                    }
                },
                "aoColumns" : [
                    {
                        "mData" : null,
                        "bSortable" : false,
                        "sClass" : "center",
                        "fnRender" : function(oObj) {
                            console.log(oObj.aData);
                            console.log(oObj.aData.id);
                            var sReturn = "";
                            sReturn = '<label><input type="radio" name="ids" value="'
                                + oObj.aData.id
                                + ','
                                + oObj.aData.person.name
                                + '" /><span class="lbl"></span></label>';
                            return sReturn;
                        }
                    }, {
                        "sTitle" : "序号",
                        "mDataProp" : "id"
                    }, {
                        "sTitle" : "雇员名称",
                        "mDataProp" : "person.name"
                    }, {
                        "sTitle" : "雇员电话",
                        "mDataProp" : "person.phone"
                    } ],
                // 多语言配置
                "oLanguage" : {
                    "sProcessing" : "正在加载中......",
                    "sLengthMenu" : "每页显示 _MENU_ 条记录",
                    "sZeroRecords" : "对不起，查询不到相关数据！",
                    "sEmptyTable" : "表中无数据存在！",
                    "sInfo" : "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
                    "sInfoFiltered" : "数据表中共为 _MAX_ 条记录",
                    "sSearch" : "搜索",
                    "oPaginate" : {
                        "sFirst" : "首页",
                        "sPrevious" : "上一页",
                        "sNext" : "下一页",
                        "sLast" : "末页"
                    }
                }
            });
    }
    $('[data-rel=tooltip]').tooltip();
};
Editorial.Component.Person.Tree.retrieveData = function(sSource, aoData, fnCallback) {
    $.ajax({
        "dataType" : 'json',
        "type" : "POST",
        "url" : sSource,
        "cache" : false,
        "data" : aoData,
        "success" : function(response) {
            fnCallback(response);
        },
        "error" : function(response) {
            alert("error");
        }
    });
};

Editorial.Component.Person.Tree.showPropertyContent = function() {
    // $('#classifyContent').addClass("hide");
    $('#classifyContent').removeClass("hide");
};

var setting = {
    async : {
        enable : true,
        url : $('#ctx').val()
            + "/pages/crmCorp/form/getChildNodes?corpType.code=org",
        autoParam : [ "id" ],
        dataFilter : Editorial.Component.Person.Tree.filter
    },
    edit : {
        enable : true,
        showRemoveBtn : false,
        showRenameBtn : false
    },
    callback : {
        onRightClick : function(event, treeId, treeNode) {
            Editorial.Component.Person.Tree.zTree.selectNode(treeNode);
            var b=getTreeRightMenuPosition(event,treeId);
            Editorial.Component.Person.Tree.showRMenu(treeNode,b.x,b.y);
        }
    }
};

var root = [ {
    id : "root",
    name : "组织机构",
    isRoot : "true",
    isParent : true,
    icon : $('#ctx').val() + "/img/configration1.gif",
    open : true
} ];

$(document).ready(function() {

    rebindingTreeOnClickInLayer();

    $.fn.zTree.init($("#treeDemo"), setting, root);
    Editorial.Component.Person.Tree.zTree = $.fn.zTree.getZTreeObj("treeDemo");
    Editorial.Component.Person.Tree.rMenu = $("#rMenu");
    Editorial.Component.Person.Tree.shadow = $("#shadow");
});
