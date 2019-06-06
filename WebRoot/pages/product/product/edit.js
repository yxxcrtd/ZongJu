Editorial.Product.Temp = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Product.ProductInfo.validate = function () {
    var flag = true;
    return flag;
};
Editorial.Product.ProductInfo.validateFlow = function () {
    var flag = true;
    if ($('#taskAssigneeId').val() == null || $('#taskAssigneeId').val() == "") {
        openSuccessAlertModalInFrame("请选择任务执行者！");
        return false;
    }
    return flag;
};
Editorial.Product.ProductInfo.updateAssigneeHidden = function (JSONObj, context) {
    $(context).contents().find("#taskAssigneeId").val(JSONObj);

};
Editorial.Product.Temp.createProjectCode = function () {
    var url = $('#ctx').val() + "/pages/resource/split/form/createCode?productId=" + $("#productId").val() + "&orgId=" + $('#pubBy').val();
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            if (response.isSuccess == "true") {
                window.parent.alertMsg('successModal', 'successMsg', response.msg);
                $('#projectCode').val(response.projectCode);
            } else {
                window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};
/**
 * ******************************加载 tab 页
 */
var propValueCache = new Map();
function setPropValueCache(id) {
    propValueCache.put(id, $('#' + id).val());
}

function putPropValueFromCache() {
    var values = propValueCache.values();
    var ids = propValueCache.keys();
    for (var i = 0, count = ids.length; i < count; i++) {
        $('#' + ids[i]).val(values[i]);
    }
}

/**
 * 加载子tab页内容
 */
Editorial.Product.ProductInfo.addTab = function (id, code, callback) {
    var theme = $("#theme").val();
    var nextId = "";
    var nextCode = "";
    var url = $("#ctx").val() + "/pages/resource/split/form/addTab?classId=" + id + "&activityId=" + $("#activityId").val();
    if ($("#productId").val() != null) {
        url = $("#ctx").val() + "/pages/resource/split/form/addTab?classId=" + id + "&productId=" + $("#productId").val() + "&activityId=" + $("#activityId").val();
    }
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            var tabbable = '<div class="tabbable span12" id="' + id + '">';
            var divEnd = '</div>';
            var ul = '<ul class="nav nav-tabs active">';
            var ulEnd = '</ul>';
            var divTab = '<div class="tab-content">';
            var a = "";

            var inDivTab = '';
            console.log("response classList:" + JSON.stringify(response.productTypePropClassifyList));
            if (response.productTypePropClassifyList != null) {
                var classList = response.productTypePropClassifyList;
                for (var i = 0; i < classList.length; i++) {
                    if (i == 0) {
                        a += '<li class="active"><a href="#' + classList[i].code + '"  onclick="Editorial.Product.ProductInfo.addTab(\'' + classList[i].id + '\',\'' + classList[i].code + '\');" data-toggle="tab">' + classList[i].name + '</a></li>';
                        divTab += '<div class="tab-pane active" id="' + classList[i].code + '"></div>';
                        nextId = classList[i].id;
                        nextCode = classList[i].code;
                    } else {
                        a += '<li ><a href="#' + classList[i].code + '"  onclick="Editorial.Product.ProductInfo.addTab(\'' + classList[i].id + '\',\'' + classList[i].code + '\');" data-toggle="tab">' + classList[i].name + '</a></li>';
                        divTab += '<div class="tab-pane " id="' + classList[i].code + '"></div>';
                    }
                }
                $("div#" + id + ".tabbable").remove();
                $("#" + code).append(tabbable + ul + a + ulEnd + divTab + divEnd);
                console.log("if:" + code + " html:" + tabbable + ul + a + ulEnd + divTab + divEnd);
            } else {
                var dataTableArray = [];
                var buttonArray = [];
                if (response.map[code] != null) {
                    var map = response.map;
                    list = map[code];
                    for (var j = 0; j < list.length; j++) {
                        var value = "";
                        if ($("#productId").val() != null && $("#productId").val() != "") {
                            value = list[j].value;
                        }

                        if (list[j].display == 'select') {

                            inDivTab += '<input type="hidden" name="typePropIds" value="' + list[j].id + '" />';
                            inDivTab += '<div>';
                            inDivTab += '<div class="control-group  span3">';
                            inDivTab += '<label class="control-label" for="form-field-1">';
                            if (list[j].must == "YES") {
                                inDivTab += '<span class="red">*</span>';
                            }

                            inDivTab += list[j].name + ":";
                            inDivTab += '</label>';

                            inDivTab += '<div class="controls">';
                            inDivTab += '<select id="' + code + list[j].code + '" name="propsValue" style="height:25px;" value=' + value + ' class="span10"' + ' onblur="setPropValueCache(\'' + code + list[j].code + '\')"' + '>';
                            inDivTab += '<option value="0">----选择-----</option>';
                            var dicMap = response.dicMap[list[j].code];
                            for (var key in dicMap) {
                                inDivTab += '<option value="' + key + '"';
                                if (key == list[j].value) {
                                    inDivTab += ' selected ';
                                }

                                inDivTab += '>' + dicMap[key] + '</option>';
                            }
                            inDivTab += '</select>';
                            inDivTab += '</div>';
                        }
                        if (list[j].display == 'text') {

                            inDivTab += '<input type="hidden" name="typePropIds" value="' + list[j].id + '" />';
                            inDivTab += '<div>';
                            inDivTab += '<div class="control-group  span3">';
                            inDivTab += '<label class="control-label" for="form-field-1">';
                            if (list[j].must == "YES") {
                                inDivTab += '<span class="red">*</span>';
                            }

                            inDivTab += list[j].name + ":";
                            inDivTab += '</label>';

                            inDivTab += '<div class="controls">';
                            if (value == null) {
                                inDivTab += '<input type="text"  name="propsValue" id="' + code + list[j].code + '" value="" class="span10"  onblur="setPropValueCache(\'' + code + list[j].code + '\')" />';
                            } else {
                                inDivTab += '<input type="text"  name="propsValue" id="' + code + list[j].code + '" value="' + value + '" class="span10"  onblur="setPropValueCache(\'' + code + list[j].code + '\')" />';
                            }
                            inDivTab += '</div>';
                        }
                        if (list[j].display == 'textarea') {

                            inDivTab += '<input type="hidden" name="typePropIds" value="' + list[j].id + '" />';
                            inDivTab += '<div>';
                            inDivTab += '<div class="control-group  span3">';
                            inDivTab += '<label class="control-label" for="form-field-1">';
                            if (list[j].must == "YES") {
                                inDivTab += '<span class="red">*</span>';
                            }

                            inDivTab += list[j].name + ":";
                            inDivTab += '</label>';

                            inDivTab += '<div class="controls">';
                            if (value == null) {
                                inDivTab += '<textarea  name="propsValue" id="' + code + list[j].code + '"  class="span10 h50" onblur="setPropValueCache(\'' + code + list[j].code + '\')"></textarea>';
                            } else {
                                inDivTab += '<textarea  name="propsValue" id="' + code + list[j].code + '"  class="span10 h50" onblur="setPropValueCache(\'' + code + list[j].code + '\')">' + value + '</textarea>';
                            }
                            inDivTab += '</div>';
                        }
                        if (list[j].display == 'button') {
                            var onclick = "";
                            if (list[j].source != null && list[j].source != "") {
                                var sourceObj = JSON.parse(list[j].source);
                                onclick = sourceObj.onclick;

                                inDivTab += '<input type="hidden" name="typePropIds" value="' + list[j].id + '" />';
                                inDivTab += '<input type="hidden" name="propsValue" id="button_' + list[j].code + '" value="' + list[j].id + '" />';
                                inDivTab += '<div class="row-fluid"><div class="ace-thumbnails">';
                                inDivTab += '<button type="button" class="btn btn-small btn-primary" id="' + list[j].code + '"><i class="icon-plus-sign" bigger-125=""></i>' + list[j].name + '</button>';
                                inDivTab += '</div></div>';
                                var buttonObj = {
                                    "id": list[j].code,
                                    "click": onclick
                                };
                                buttonArray.push(buttonObj);
                            }
                        }
                        if (list[j].display == 'datatable') {

                            inDivTab += '<input type="hidden" name="typePropIds" value="' + list[j].id + '" />';
                            inDivTab += '<input type="hidden" name="propsValue" id="datatable_' + list[j].code + '" value="' + list[j].id + '" />';

                            inDivTab += '<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;' + list[j].name + '</div>';
                            inDivTab += '<table id="' + list[j].code + '" class="table table-striped table-bordered table-hover">';
                            inDivTab += '<thead>' + '<tr>';
                            var sourceObj = JSON.parse(list[j].source);
                            var columnCount = sourceObj.columnCount;
                            for (var x = 0; x < columnCount; x++) {
                                inDivTab += '<th width="3%" align="center"></th>';
                            }
                            inDivTab += '</tr>' + '</thead>' + '<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;">' + '</tbody>' + '<tfoot>' + '<tr>';
                            for (var x = 0; x < list[j].source; x++) {
                                inDivTab += '<th width="3%" align="center"></th>';
                            }
                            inDivTab += '</tr>' + '</tfoot>';
                            inDivTab += '</table>';

                            var dataTableObj = {
                                "id": list[j].code,
                                "ajaxSource": sourceObj.ajaxSource,
                                "columnCount": sourceObj.columnCount,
                                "serverParams": sourceObj.serverParams,
                                "columns": sourceObj.columns
                            };
                            dataTableArray.push(dataTableObj);
                        }

                        inDivTab += '</div>';
                        inDivTab += '</div>';
                    }
                }
                console.log("else:" + code + " before empty html:" + $("#" + code).html());
                $("#" + code).empty();
                $("#" + code).append(inDivTab);

                console.log("else:" + code + " html:" + inDivTab);
                console.log("else:" + code + " after empty html:" + $("#" + code).html());
                for (var index = 0; index < dataTableArray.length; index++) {
                    Editorial.Product.Temp.createDataTable(dataTableArray[index]);
                }
                for (var index = 0; index < buttonArray.length; index++) {
                    Editorial.Product.Temp.bindingOnClick(buttonArray[index]);
                }
            }
            if (nextId != "" && nextCode != "") {
                Editorial.Product.ProductInfo.addTab(nextId, nextCode, function () {
                    if (theme == "3") {
                        $("#" + code).addClass("active");
                    }
                });
                return;
            }
            // 将页面缓存的数据重新赋值给属性信息
            putPropValueFromCache();

            if ($.isFunction(callback)) {
                callback(id, code);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};
/**
 * ***************************************加载 tab 页
 */

Editorial.Product.ProductInfo.disableAllButton = function () {
    $("#save").attr('disabled', "true");
    $("#reset").attr('disabled', "true");
};

Editorial.Product.ProductInfo.enableAllButton = function () {
    $("#save").attr('disabled', "false");
    $("#reset").attr('disabled', "false");
};

Editorial.Product.ProductInfo.delSubject = function (obj) {
    $(obj).remove();
};

Editorial.Product.ProductInfo.openSelectOrg = function () {
    var url = $('#ctx').val() + "/pages/pflow/form/selectOrg?id=" + $('#taskId').val();
    var commonModalCss = {
        "width": "1000px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.openSelectDepartment = function () {
    var url = $('#ctx').val() + "/pages/resource/split/form/selectDepartment";
    var commonModalCss = {
        "width": "1000px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.updateDepartment = function (jsonObj, context) {
    console.log("jsonObj:" + jsonObj);
    //alert(":" + window.frames["iframe_main"].document);
    //alert(":" + window.frames["iframe_main"].document.body.innerHTML);
    //alert(":" + $(context).html());
    //alert("taskName:" + $(context).contents().find("#taskName").val());
    console.log("jsonObj.id:" + jsonObj.id);
    console.log("jsonObj.name:" + jsonObj.name);
    $(context).contents().find("#pubBy").val(jsonObj.id);
    $(context).contents().find("#pubName").val(jsonObj.name);
};

Editorial.Product.ProductInfo.openSelectPerson = function () {
    var url = $('#ctx').val() + "/pages/product/form/selectPerson";
    var commonModalCss = {
        "width": "1000px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.updatePerson = function (jsonObj, context) {
    console.log("jsonObj:" + jsonObj);
    console.log("jsonObj.id:" + jsonObj.id);
    console.log("jsonObj.name:" + jsonObj.name);
    $(context).contents().find("#editorBy").val(jsonObj.id);
    $(context).contents().find("#editorName").val(jsonObj.name);
};

Editorial.Product.ProductInfo.showResponse = function (response, statusText) {
    if (response.isSuccess == "true") {
        openSuccessAlertModalInFrame(response.msg);
        var id = response.product.id;
        var url = $('#ctx').val() + "/pages/resource/split/form/edit/" + $("#code").val() + "?id=" + id;
        window.location.href = url;
    } else {
        ajaxAlertErrorMsg(response.msg, true);
        Editorial.Product.ProductInfo.enableAllButton();
    }
};


Editorial.Product.ProductInfo.showResponse1 = function (response, statusText) {
    if (response.isSuccess == "true") {
        var url;
        if ($('#taskId').val() == "") {
            url = "/pages/resource/split/form/app";
        } else {
            url = "/pages/fdeploy/form/taskPersonalList";
        }
        window.location.href = $('#ctx').val() + url;
        openSuccessAlertModalInFrame(response.msg);

    } else {
        openSuccessAlertModalInFrame(response.msg);
        Editorial.Product.ProductInfo.enableAllButton();
    }
};

Editorial.Product.Temp.retrieveData = function (sSource, aoData, fnCallback) {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": sSource,
        "cache": false,
        "data": aoData,
        "success": function (response) {
            fnCallback(response);
        },
        "error": function (response) {
            alert(response);
            alert("error%%%");
        }
    });
};
Editorial.Product.Temp.query = function () {
    // 重新刷新页面Table
    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
};
Editorial.Product.Temp.retrieveData = function (sSource, aoData, fnCallback) {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": sSource,
        "cache": false,
        "data": aoData,
        "success": function (response) {
            fnCallback(response);
        },
        "error": function (response) {
            alert("error");
        }
    });
};

Editorial.Product.Temp.bindingOnClick = function (buttonObj) {
    $("#" + buttonObj.id).click(function () {
        eval(buttonObj.click);
    });
};

Editorial.Product.Temp.createDataTable = function (dataTableObj) {
    console.log(eval(eval(dataTableObj.ajaxSource)));
    Editorial.Product.Temp.oTable1 = $('#' + dataTableObj.id).dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": eval(eval(dataTableObj.ajaxSource)),
        "fnServerParams": eval(dataTableObj.serverParams),
        "fnServerData": Editorial.Product.Temp.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": eval(dataTableObj.columns),

        // 多语言配置
        "oLanguage": {
            "sProcessing": "正在加载中......",
            "sLengthMenu": "每页显示 _MENU_ 条记录",
            "sZeroRecords": "对不起，查询不到相关数据！",
            "sEmptyTable": "表中无数据存在！",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "首页",
                "sPrevious": "上一页",
                "sNext": "下一页",
                "sLast": "末页"
            }
        }
    });
    $('[data-rel=tooltip]').tooltip();
};

/** createCostDataTable start * */
Editorial.Product.Temp.costModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productCost/form/edit?id=" + id;
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.costDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除印前成本操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productCost/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
//印前成本
Editorial.Product.Temp.costAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productCost/form/edit?productId=" + $("#productId").val() + "&type=costBefore";
    var commonModalCss = {
        "width": "600px",
        "height": "400px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.costAjaxSource = "$('#ctx').val() + '/pages/productCost/form/manager?productId=' + $('#productId').val()+'&type=costBefore'";
Editorial.Product.Temp.costServerParams = function (aoData) {
    aoData.push({
        "name": "queryIsbn",
        "value": $("#query_module_isbn").val()
    });
    aoData.push({
        "name": "title",
        "value": $("#query_module_title").val()
    });
};
Editorial.Product.Temp.costColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "项目名称",
        "mDataProp": "name"
    },
    {
        "sTitle": "项目值",
        "mDataProp": "value"
    },
    {
        "sTitle": "项目分类",
        "mDataProp": "classify"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.costModObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.costDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];

//印制成本
Editorial.Product.Temp.costAddButtonOnClickNow = function () {
    var url = $('#ctx').val() + "/pages/productCost/form/edit?productId=" + $("#productId").val() + "&type=costNow";
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.costAjaxSourceNow = "$('#ctx').val() + '/pages/productCost/form/manager?productId=' + $('#productId').val()+'&type=costNow'";
//其他成本
Editorial.Product.Temp.costAddButtonOnClickOther = function () {
    var url = $('#ctx').val() + "/pages/productCost/form/edit?productId=" + $("#productId").val() + "&type=costOther";
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.costAjaxSourceOther = "$('#ctx').val() + '/pages/productCost/form/manager?productId=' + $('#productId').val()+'&type=costOther'";

/** createCostDataTable end * */
/** createAttachDataTable start * */
Editorial.Product.Temp.attachModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productAttach/form/edit?id=" + id;
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.attachDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除附加信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productAttach/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.query = function () {
    // 重新刷新页面Table
    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
};
Editorial.Product.Temp.retrieveData = function (sSource, aoData, fnCallback) {
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": sSource,
        "cache": false,
        "data": aoData,
        "success": function (response) {
            fnCallback(response);
        },
        "error": function (response) {
            alert("error");
        }
    });
};
Editorial.Product.Temp.attachAddButtonOnClick = function () {
    // alert("clicked");
    var url = $('#ctx').val() + "/pages/productAttach/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "600px",
        "height": "400px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.attachAjaxSource = "$('#ctx').val() + '/pages/productAttach/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.attachServerParams = function (aoData) {
    aoData.push({
        "name": "queryIsbn",
        "value": $("#query_module_isbn").val()
    });
    aoData.push({
        "name": "title",
        "value": $("#query_module_title").val()
    });
};
Editorial.Product.Temp.attachColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "编号",
        "mDataProp": "code"
    },
    {
        "sTitle": "名称",
        "mDataProp": "name"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.attachModObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.attachDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];

/** createAttachDataTable end * */
/** createCopyRightDataTable start * */
Editorial.Product.Temp.copyRightModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productContractRelationship/form/contractIndex?id=" + id;
    var commonModalCss = {
        "width": "1000px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.copyRightDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除版权信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productContractRelationship/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.copyRightAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productContractRelationship/form/contractIndex?id=" + $('#productId').val();
    var commonModalCss = {
        "width": "1000px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.copyRightAjaxSource = "$('#ctx').val() + '/pages/productContractRelationship/form/manager?productId=' + $('#productId').val()";

Editorial.Product.Temp.copyRightServerParams = function (aoData) {
    /*aoData.push({
     "name" : "queryIsbn",
     "value" : $("#query_module_isbn").val()
     });
     aoData.push({
     "name" : "title",
     "value" : $("#query_module_title").val()
     });*/
};
Editorial.Product.Temp.copyRightColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "合同名称",
        "mDataProp": "contract.contractName"
    },
    {
        "sTitle": "合同类型",
        "mDataProp": "contract.contractType"
    },
    {
        "sTitle": "合同签订日期",
        "mDataProp": "contract.contractDate",
        "sType": 'date',
        "fnRender": function (oObj) {
            var javascriptDate = new Date(oObj.aData.contract.contractDate).toLocaleDateString();
            return "<div class= date>" + javascriptDate + "<div>";
        }
    },
    {
        "sTitle": "合同来源",
        "mDataProp": "contract.contractSource"
    },
    {
        "sTitle": "合同原因",
        "mDataProp": "contract.contractReason"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            //var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.copyRightModObj(\'' + oObj.aData.productId + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.copyRightDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + trash + end;
        }
    }
];
/** createCopyRightDataTable end * */
/** createAuthorDataTable start * */
Editorial.Product.Temp.authorAddButtonOnClick = function () {
    // alert("clicked");
    var url = $('#ctx').val() + "/pages/productPersonRelationship/form/authorIndex?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1200px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "600px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.authorAjaxSource = "$('#ctx').val() + '/pages/productPersonRelationship/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.authorServerParams = function (aoData) {
    aoData.push({
        "name": "queryIsbn",
        "value": $("#query_module_isbn").val()
    });
    aoData.push({
        "name": "title",
        "value": $("#query_module_title").val()
    });
};
Editorial.Product.Temp.authorColumns = [
    {
        "sTitle": "ID",
        "mDataProp": "id"
    },
    {
        "sTitle": "贡献者名称",
        "mDataProp": "personTypeRelationship.person.name"
    },
    {
        "sTitle": "座机",
        "mDataProp": "personTypeRelationship.person.telephone"
    },
    {
        "sTitle": "手机",
        "mDataProp": "personTypeRelationship.person.phone"
    },
    {
        "sTitle": "联系地址",
        "mDataProp": "personTypeRelationship.person.address"
    },
    {
        "sTitle": "邮编",
        "mDataProp": "personTypeRelationship.person.postCode"
    },
    {
        "sTitle": "电子邮箱",
        "mDataProp": "personTypeRelationship.person.email"
    },
    {
        "sTitle": "传真",
        "mDataProp": "personTypeRelationship.person.fax"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.authorDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + trash + end;
        }
    }
];

Editorial.Product.Temp.authorDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除作者信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productPersonRelationship/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
/** createAuthorDataTable end * */
/** createSubjectDataTable start * */
Editorial.Product.Temp.delSubjectObj = function (id) {
    openConfirmModalInFrame("您确定执行删除分类信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productSubjectRelationship/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.subjectChooseButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productSubjectRelationship/form/subjectIndex?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1200px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "600px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.subjectAjaxSource = "$('#ctx').val() + '/pages/productSubjectRelationship/form/manager?productId=' + $('#productId').val()";

Editorial.Product.Temp.subjectServerParams = function (aoData) {
    aoData.push({
        "name": "queryIsbn",
        "value": $("#query_module_isbn").val()
    });
    aoData.push({
        "name": "title",
        "value": $("#query_module_title").val()
    });
};
Editorial.Product.Temp.subjectColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "编号",
        "mDataProp": "subject.code"
    },
    {
        "sTitle": "名称",
        "mDataProp": "subject.name"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.delSubjectObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + trash + end;
        }
    }
];

/** createSubjectDataTable end * */
/** createMaterialDataTable start **/
Editorial.Product.Temp.materialModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productMaterial/form/edit?id=" + id;
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.materialDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除材料需求操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productMaterial/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.materialAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productMaterial/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "600px",
        "height": "400px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.materialAjaxSource = "$('#ctx').val() + '/pages/productMaterial/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.materialServerParams = function (aoData) {
    aoData.push({
        "name": "queryIsbn",
        "value": $("#query_module_isbn").val()
    });
    aoData.push({
        "name": "title",
        "value": $("#query_module_title").val()
    });
};
Editorial.Product.Temp.materialColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "单价",
        "mDataProp": "price"
    },
    {
        "sTitle": "克重",
        "mDataProp": "grams"
    },
    {
        "sTitle": "类型",
        "mDataProp": "type"
    },
    {
        "sTitle": "规格",
        "mDataProp": "spec"
    },
    {
        "sTitle": "用纸量",
        "mDataProp": "num"
    },
    {
        "sTitle": "用纸类型",
        "mDataProp": "paperType"
    },
    {
        "sTitle": "库存量",
        "mDataProp": "stockCount"
    },
    {
        "sTitle": "所属库存",
        "mDataProp": "stockId"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.materialModObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.materialDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];
/** createMaterialDataTable end **/
/** createPrintCostsDataTable start **/

Editorial.Product.Temp.printCostsModObj = function (id) {
    var url = $('#ctx').val() + "/pages/printCosts/form/edit?id=" + id;
    var commonModalCss = {
        "width": "550px",
        "height": "250px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.printCostsDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除印装费用操作吗？", function () {
        var url = $('#ctx').val() + "/pages/printCosts/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.printCostsAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/printCosts/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "600px",
        "height": "400px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.printCostsAjaxSource = "$('#ctx').val() + '/pages/printCosts/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.printCostsServerParams = function (aoData) {

};
Editorial.Product.Temp.printCostsColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    },
    {
        "sTitle": "产品",
        "mDataProp": "name"
    },
    {
        "sTitle": "单价",
        "mDataProp": "price"
    },
    {
        "sTitle": "结算数量",
        "mDataProp": "num"
    },
    {
        "sTitle": "结算单位",
        "mDataProp": "unit"
    },
    {
        "sTitle": "总价",
        "mDataProp": "total"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.printCostsModObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.printCostsDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];
/** createPrintCostsDataTable end **/
/** createParentProductDataTable start **/


Editorial.Product.Temp.parentProductAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productCollection/form/selectParent?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1400px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.parentProductAjaxSource = "$('#ctx').val() + '/pages/productCollection/form/parentManager?productId=' + $('#productId').val()";
Editorial.Product.Temp.parentProductServerParams = function (aoData) {

};
Editorial.Product.Temp.parentProductColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    }, {
        "sTitle" : "类型",
        "mDataProp" : "productType.name"
    }, {
        "sTitle" : "书名",
        "mDataProp" : "title"
    }, {
        "sTitle" : "译名",
        "mDataProp" : "translation"
    }, {
        "sTitle" : "所属分社",
        "mDataProp" : "pubName"
    }, {
        "sTitle" : "所属责编",
        "mDataProp" : "editorName"
    }, {
        "sTitle" : "语种",
        "mDataProp" : "language"
    }
];
/** createParentProductDataTable end **/
/** createCollectionDataTable start **/


Editorial.Product.Temp.collectionAjaxSource = "$('#ctx').val() + '/pages/productCollection/form/collectionManager?productId=' + $('#productId').val()";
Editorial.Product.Temp.collectionServerParams = function (aoData) {

};
Editorial.Product.Temp.collectionColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "id"
    }, {
        "sTitle" : "类型",
        "mDataProp" : "productType.name"
    }, {
        "sTitle" : "书名",
        "mDataProp" : "title"
    }, {
        "sTitle" : "译名",
        "mDataProp" : "translation"
    }, {
        "sTitle" : "所属分社",
        "mDataProp" : "pubName"
    }, {
        "sTitle" : "所属责编",
        "mDataProp" : "editorName"
    }, {
        "sTitle" : "语种",
        "mDataProp" : "language"
    }
];
/** createcollectionDataTable end **/
/** createPackageDataTable start **/

Editorial.Product.Temp.packageDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除印装费用操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productPackage/form/delete?packId=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};

Editorial.Product.Temp.packageAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productPackage/form/selectProduct?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1400px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.packageAjaxSource = "$('#ctx').val() + '/pages/productPackage/form/productManager?productId=' + $('#productId').val()";
Editorial.Product.Temp.packageServerParams = function (aoData) {

};
Editorial.Product.Temp.packageColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "product.id"
    }, {
        "sTitle" : "类型",
        "mDataProp" : "product.productType.name"
    }, {
        "sTitle" : "书名",
        "mDataProp" : "product.title"
    }, {
        "sTitle" : "译名",
        "mDataProp" : "product.translation"
    }, {
        "sTitle" : "所属分社",
        "mDataProp" : "product.pubName"
    }, {
        "sTitle" : "所属责编",
        "mDataProp" : "product.editorName"
    }, {
        "sTitle" : "语种",
        "mDataProp" : "product.language"
    }, {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.packageDelObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + trash + end;
        }
    }
];
/** createcollectionDataTable end **/
/** createPackageDataTable start **/


Editorial.Product.Temp.packAjaxSource = "$('#ctx').val() + '/pages/productPackage/form/packManager?productId=' + $('#productId').val()";
Editorial.Product.Temp.packServerParams = function (aoData) {

};
Editorial.Product.Temp.packColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "pack.id"
    }, {
        "sTitle" : "类型",
        "mDataProp" : "pack.productType.name"
    }, {
        "sTitle" : "书名",
        "mDataProp" : "pack.title"
    }, {
        "sTitle" : "译名",
        "mDataProp" : "pack.translation"
    }, {
        "sTitle" : "所属分社",
        "mDataProp" : "pack.pubName"
    }, {
        "sTitle" : "所属责编",
        "mDataProp" : "pack.editorName"
    }, {
        "sTitle" : "语种",
        "mDataProp" : "pack.language"
    }
];
/** createcollectionDataTable end **/

Editorial.Product.ProductInfo.initDetailFields = function () {
    if ($("#productId").val() != "") {
        var id = $("#default_classifyId").val();
        var code = $("#default_classifyCode").val();
        var theme = $("#theme").val();
        Editorial.Product.ProductInfo.renderDetailFields(theme, id, code);
    }
};

/**
 * 加载第一层tab页
 */
Editorial.Product.ProductInfo.renderDetailFields = function (theme, id, code) {
    var html = "";

    if (theme == "1") { // Tab
        var classifyIdArray = $('input[id^="classifyId_"]');
        var classifyCodeArray = $('input[id^="classifyCode_"]');
        var classifyNameArray = $('input[id^="classifyName_"]');
        if (classifyIdArray.length != 0) {
            html = html + '<div class="tabbable span12">';
            html = html + '<ul class="nav nav-tabs active">';
            for (var i = 0; i < classifyIdArray.length; i++) {
                var classifyId = classifyIdArray[i].value;
                var classifyCode = classifyCodeArray[i].value;
                var classifyName = classifyNameArray[i].value;
                if (i == 0) {
                    html = html + '<li class="active" classifyId="' + classifyId + '" classifyCode="' + classifyCode + '"><a href="#' + classifyCode + '" onclick="Editorial.Product.ProductInfo.addTab(\'' + classifyId + '\',\'' + classifyCode + '\');" data-toggle="tab">' + classifyName + '</a></li>';
                } else {
                    html = html + '<li classifyId="' + classifyId + '" classifyCode="' + classifyCode + '"><a href="#' + classifyCode + '" onclick="Editorial.Product.ProductInfo.addTab(\'' + classifyId + '\',\'' + classifyCode + '\');" data-toggle="tab">' + classifyName + '</a></li>';
                }
            }
            html = html + '</ul>';
            html = html + '<div class="tab-content">';
            for (var i = 0; i < classifyIdArray.length; i++) {
                var classifyCode = classifyCodeArray[i].value;
                if (i == 0) {
                    html = html + '<div class="tab-pane active" id="' + classifyCode + '"></div>';
                } else {
                    html = html + '<div class="tab-pane" id="' + classifyCode + '"></div>';
                }
            }
            html = html + '</div>';
        }
        $("#fieldsContent").html(html);

        if ($("#productId").val() != "") {
            Editorial.Product.ProductInfo.addTab(id, code);
        }
    } else if (theme == "2") { // accordion
        var classifyIdArray = $('input[id^="classifyId_"]');
        var classifyCodeArray = $('input[id^="classifyCode_"]');
        var classifyNameArray = $('input[id^="classifyName_"]');
        if (classifyIdArray.length != 0) {
            for (var i = 0; i < classifyIdArray.length; i++) {
                var classifyId = classifyIdArray[i].value;
                var classifyCode = classifyCodeArray[i].value;
                var classifyName = classifyNameArray[i].value;
                html = html + '<div class="table-header on" onclick="Editorial.Product.ProductInfo.accordionToggle(\'' + classifyId + '\',\'' + classifyCode + '\',this);">';
                html = html + '<a href="###"><i class="icon-folder-open"></i>&nbsp;&nbsp;';
                html = html + classifyName;
                html = html + '</a>';
                html = html + '</div>';

                html = html + '<div class="on-down tab-list">';
                html = html + '<div class="tabbable" id="' + classifyCode + '">';
                html = html + '</div>';
                html = html + '</div>';

                if ($("#productId").val() != "") {
                    Editorial.Product.ProductInfo.addTab(classifyId, classifyCode);
                }
            }
        }
        $("#fieldsContent").html(html);


    } else if (theme == "3") { // sequence
        var step_ul_li_html = '';
        var step_div_html = '';

        var classifyIdArray = $('input[id^="classifyId_"]');
        var classifyCodeArray = $('input[id^="classifyCode_"]');
        var classifyNameArray = $('input[id^="classifyName_"]');
        if (classifyIdArray.length != 0) {
            for (var i = 0; i < classifyIdArray.length; i++) {
                var classifyId = classifyIdArray[i].value;
                var classifyCode = classifyCodeArray[i].value;
                var classifyName = classifyNameArray[i].value;
                var tabNum = i + 1; // TAB页计数器

                step_ul_li_html += '<li data-target="#step' + tabNum + '\"';
                if (i == 0) {
                    step_ul_li_html += ' class="active"';
                }
                step_ul_li_html += ' classifyId="' + classifyId + '" classifyCode="' + classifyCode + '">';
                step_ul_li_html += '	<span class="step">' + tabNum + '</span>';
                step_ul_li_html += '	<span class="title">' + classifyName + '</span>';
                step_ul_li_html += '</li>';

                step_div_html += '<div class="step-pane';
                if (i == 0) {
                    step_div_html += ' active';
                }
                step_div_html += '" id="' + classifyCode + '">';
                step_div_html += '</div>';

            }

            html += '		<div class="span12">';
            html += '			<div class="widget-box">';
            html += '				<div class="widget-header widget-header-blue widget-header-flat wi1dget-header-large">';
            html += '					<h4 class="lighter">操作</h4>';

            html += '					<span id="prevBtn" class="btn btn-prev">';
            html += '						<i class="icon-arrow-left"></i>';
            html += '						Prev';
            html += '					</span>';

            html += '					<span id="nextBtn" class="btn btn-success btn-next">';
            html += '						Next';
            html += '						<i class="icon-arrow-right icon-on-right"></i>';
            html += '					</span>';

            html += '				</div>';
            html += '				<div class="widget-body">';
            html += '					<div class="widget-main">';
            html += '						<div class="row-fluid">';
            html += '							<div id="fuelux-wizard" class="row-fluid hidden">';
            html += '								<ul class="wizard-steps">';

            html += step_ul_li_html;

            html += '								</ul>';
            html += '							</div>';
            html += '							<hr />';
            html += '							<div class="step-content row-fluid position-relative">';

            html += step_div_html;

            html += '							</div>';
            html += '						</div>';
            html += '					</div>';
            html += '				</div>';
            html += '			</div>';
            html += '		</div>';

        }
        $("#fieldsContent").html(html);

        // 加载序列滚动元素
        $('#fuelux-wizard').ace_digital_wizard("prevBtn", "nextBtn")
            .on('change', function (e, info) {
                var currentLi = $(this).find("li[class=active]"); // 当前li
                if (info.direction == "previous") {
                    currentLi = currentLi.prev();
                } else if (info.direction == "next") {
                    currentLi = currentLi.next();
                }
                var classifyId = currentLi.attr("classifyId");
                var classifyCode = currentLi.attr("classifyCode");
                Editorial.Product.ProductInfo.addTab(classifyId, classifyCode, function () {
                    $("#" + classifyCode).addClass("active");
                });
            })
            .on('finished', function (e) {
                return false;
            })
            .on('stepclick', function (e) {
                return false;
            });

        if ($("#productId").val() != "") {
            Editorial.Product.ProductInfo.addTab(id, code);
        }
    } else {

    }
};

/**
 * 显示/隐藏accordion
 */
Editorial.Product.ProductInfo.accordionToggle = function (id, code, obj) {
    var openClassName = "icon-folder-open";
    var closeClassName = "icon-folder-close";
    var imark = $(obj).find("i");
    var disp = $("#" + code).css("display"); // 当前accordion显示状态
    if (disp == "none") {
        Editorial.Product.ProductInfo.addTab(id, code);
        imark.removeClass(closeClassName).addClass(openClassName);
    } else {
        imark.removeClass(openClassName).addClass(closeClassName);
    }
    $("#" + code).slideToggle("fast");
};

/**
 * 切换显示样式
 */
Editorial.Product.ProductInfo.changeTheme = function () {
    var url = $('#ctx').val() + "/pages/product/form/changeTheme?theme=" + $("#theme").val();
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            if (response.isSuccess == "true") {
                window.parent.alertMsg('successModal', 'successMsg', response.msg);
                $("#theme").val(response.theme);
                Editorial.Product.ProductInfo.initDetailFields();
            } else {
                window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};

Editorial.Product.Temp.pushPluginsOnClick = function () {
    var url = $('#ctx').val() + "/pages/plugins/pushmsg/form/pushplugins?id=" + $("#productId").val();
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            if (response.isSuccess == "true") {
                window.parent.alertMsg('successModal', 'successMsg', response.msg);
            } else {
                window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};

Editorial.Product.Temp.sendMailButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/plugins/mail/form/getTemplate?id=" + $("#productId").val();
    var commonModalCss = {
        "width": "900px",
        "height": "650px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
/**createPriceDataTab start **/
Editorial.Product.Temp.priceModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productPrice/form/edit?id=" + id + "&productId=" + $('#productId').val();
    var commonModalCss = {
        "width": "1000px",
        "height": "700px"
    };
    var commonModalBodyCss = {
        "max-height": "1400px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.priceDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除产品价格信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productPrice/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.priceAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productPrice/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1000px",
        "height": "700px"
    };
    var commonModalBodyCss = {
        "max-height": "1400px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.priceAjaxSource = "$('#ctx').val() + '/pages/productPrice/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.priceServerParams = function (aoData) {//查询功能
};

Editorial.Product.Temp.priceColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "priceId"
    },
    {
        "sTitle": "价格类型",
        "mDataProp": "priceType"
    },
    {
        "sTitle": "价格名称",
        "mDataProp": "priceName"
    },
    {
        "sTitle": "价格值",
        "mDataProp": "priceValue"
    },
    {
        "sTitle": "价格开始时间",
        "mDataProp": "priceStartOn",
        "sType": 'date',
        "fnRender": function (oObj) {
            var javascriptDate = new Date(oObj.aData.priceStartOn).toLocaleDateString();
            return "<div class= date>" + javascriptDate + "<div>";
        }
    },
    {
        "sTitle": "价格结束时间",
        "mDataProp": "priceEndOn",
        "sType": 'date',
        "fnRender": function (oObj) {
            var javascriptDate = new Date(oObj.aData.priceEndOn).toLocaleDateString();
            return "<div class= date>" + javascriptDate + "<div>";
        }
    },
    {
        "sTitle": "价格订单分类",
        "mDataProp": "priceOrderCategory"
    },
    {
        "sTitle": "价格默认标识",
        "mDataProp": "priceDefaultFlg"
    },
    {
        "sTitle": "所属地域",
        "mDataProp": "region.name"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.priceModObj(\'' + oObj.aData.priceId + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.priceDelObj(\'' + oObj.aData.priceId + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];

/**createPriceDataTab end**/

Editorial.Product.Temp.composingColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "composingId"
    },
    {
        "sTitle": "成品",
        "mDataProp": "composingProduct"
    },
    {
        "sTitle": "原稿数",
        "mDataProp": "composingManuscriptCount"
    },
    {
        "sTitle": "图片",
        "mDataProp": "composingPhotoCount"
    },
    {
        "sTitle": "样板数",
        "mDataProp": "composingLayoutCount"
    },
    {
        "sTitle": "初稿打样",
        "mDataProp": "composingFirstCount"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.composingModObj(\'' + oObj.aData.composingId + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.composingDelObj(\'' + oObj.aData.composingId + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];
Editorial.Product.Temp.composingAjaxSource = "$('#ctx').val() + '/pages/composing/form/manager?productId=' + $('#composingId').val()";
Editorial.Product.Temp.EComposingAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/composing/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1100px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.composingModObj = function (id) {
    var url = $('#ctx').val() + "/pages/composing/form/edit?id=" + id;
    var commonModalCss = {
        "width": "1100px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "1400px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.composingDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除印前成本操作吗？", function () {
        var url = $('#ctx').val() + "/pages/composing/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};

/**
 * 付印单
 */
Editorial.Product.Temp.eprintAjaxSource = "$('#ctx').val() + '/pages/product/print/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.eprintServerParams = function (aoData) {
};
Editorial.Product.Temp.eprintColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "printId"
    },
    {
        "sTitle": "定价",
        "mDataProp": "printPrice"
    },
    {
        "sTitle": "印数",
        "mDataProp": "printCount"
    },
    {
        "sTitle": "开本",
        "mDataProp": "printOpenFlg"
    },
    {
        "sTitle": "成品尺寸",
        "mDataProp": "printSize"
    },
    {
        "sTitle": "装订方式",
        "mDataProp": "printBinding"
    },
    {
        "sTitle": "印张",
        "mDataProp": "printSheet"
    },
    {
        "sTitle": "样书册数",
        "mDataProp": "printSampleCount"
    },
    {
        "sTitle": "版次",
        "mDataProp": "printEdition"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.printModObj(\'' + oObj.aData.printId + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.printDelObj(\'' + oObj.aData.printId + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];
Editorial.Product.Temp.EPrintAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/product/print/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "1200px",
        "height": "700px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.printModObj = function (id) {
    var url = $('#ctx').val() + "/pages/product/print/form/edit?printId=" + id;
    var commonModalCss = {
        "width": "1200px",
        "height": "700px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.printDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除印前成本操作吗？", function () {
        var url = $('#ctx').val() + "/pages/product/print/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};


/**createCheckDataTab start **/
Editorial.Product.Temp.checkModObj = function (id) {
    var url = $('#ctx').val() + "/pages/productCheck/form/edit?id=" + id;
    var commonModalCss = {
        "width": "600px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.checkDelObj = function (id) {
    openConfirmModalInFrame("您确定执行删除产品价格信息操作吗？", function () {
        var url = $('#ctx').val() + "/pages/productCheck/form/delete?id=" + id;
        $.ajax({
            "dataType": 'json',
            "type": "POST",
            "url": url,
            "cache": false,
            "success": function (response) {
                if (response.isSuccess == "true") {
                    window.parent.alertMsg('successModal', 'successMsg', response.msg);
                    refreshFrameDataTableInFrame('Editorial.Product.Temp.oTable1');
                } else {
                    window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
                }
            },
            "error": function (response) {
                alert("error");
            }
        });
    }, null, null);
};
Editorial.Product.Temp.checkAddButtonOnClick = function () {
    var url = $('#ctx').val() + "/pages/productCheck/form/edit?productId=" + $("#productId").val();
    var commonModalCss = {
        "width": "600px",
        "height": "500px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};
Editorial.Product.Temp.checkAjaxSource = "$('#ctx').val() + '/pages/productCheck/form/manager?productId=' + $('#productId').val()";
Editorial.Product.Temp.checkServerParams = function (aoData) {//查询功能
};

Editorial.Product.Temp.checkColumns = [
    {
        "sTitle": "序号",
        "mDataProp": "checkId"
    },
    {
        "sTitle": "校对程序卡类型",
        "mDataProp": "checkType"
    },
    {
        "sTitle": "校对程序卡开始日期",
        "mDataProp": "checkStartOn",
        "sType": 'date',
        "fnRender": function (oObj) {
            var javascriptDate = new Date(oObj.aData.checkStartOn).toLocaleDateString();
            return "<div class= date>" + javascriptDate + "<div>";
        }
    },
    {
        "sTitle": " 校对程序卡完成日期",
        "mDataProp": "checkEndOn",
        "sType": 'date',
        "fnRender": function (oObj) {
            var javascriptDate = new Date(oObj.aData.checkEndOn).toLocaleDateString();
            return "<div class= date>" + javascriptDate + "<div>";
        }
    },
    {
        "sTitle": "校对程序卡校对人",
        "mDataProp": "checkBy"
    },
    {
        "sTitle": "校对程序卡责任人",
        "mDataProp": "checkResponsibleBy"
    },
    {
        "sTitle": "校对程序卡责编收",
        "mDataProp": "checkEditorBy"
    },
    {
        "sTitle": "校对程序卡印制收",
        "mDataProp": "checkPrintBy"
    },
    {
        "sTitle": "操作",
        "mData": null,
        "aTargets": [ -1 ],
        // 自定义列的样式
        "fnRender": function (oObj) {
            var start = '<div class="hidden-phone visible-desktop btn-group">';
            var edit = '<button class="btn btn-mini btn-warning" title="修改" type="button" onclick="Editorial.Product.Temp.checkModObj(\'' + oObj.aData.checkId + '\')"><i class="icon-edit bigger-120"></i></button>';
            var trash = '<button class="btn btn-mini btn-danger" title="删除" type="button" onclick="Editorial.Product.Temp.checkDelObj(\'' + oObj.aData.checkIdId + '\')"><i class="icon-trash bigger-120"></i></button>';
            var end = '</div>';
            return start + edit + trash + end;
        }
    }
];

/**createCheckDataTab end**/

Editorial.Product.Temp.StructureButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productStructure/form/index?product.id=" + $("#productId").val();
    var commonModalCss = {
        "width": "1250px",
        "height": "600px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.Temp.IreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/product/form/ireport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.appIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/product/form/appIreport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.DemonstrationIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/product/form/demonstrationIreport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.ReviewReportIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/product/form/reviewReportIreport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.changeOrderIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productIreport/form/changerOrderIreport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.regularProjectApplicationFormIreportIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productIreport/form/regularProjectApplicationFormIreport?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.workSampleApplicationListIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productIreport/form/workSampleApplicationList?product.id=" + $("#productId").val();
    window.open(url);
};

Editorial.Product.Temp.productLayoutDesignIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productIreport/form/productLayoutDesignIreport?product.id=" + $("#productId").val();
    window.open(url);
};
Editorial.Product.Temp.sampleQualityInspectionSheetIreportButtonOnClick = function () {
    var url = $("#ctx").val() + "/pages/productIreport/form/sampleQualityInspectionSheetIreport?product.id=" + $("#productId").val();
    window.open(url);
};