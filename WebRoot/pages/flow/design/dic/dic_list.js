$(function () {
    Editorial.JBPM.Design.Dic.oTable1 = $('#table_report').dataTable({
        "bFilter": false, // 开关，是否启用客户端过滤器
        "bProcessing": true, // 当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, // 自适应宽度
        "sPaginationType": "full_numbers", // 分页样式
        "bServerSide": true, // 从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/fdesign/form/dicManager", // mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({
                "name": "shortName",
                "value": $("#query_module_shortName").val()
            });
        },
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(1)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "mData": null,
                "bSortable": false,
                "sClass": "center",
                "fnRender": function (oObj) {
                    var sReturn = "";
                    sReturn = '<label><input type="checkbox" name="ids" value="' + oObj.aData.id + '" /><span class="lbl"></span></label>';
                    return sReturn;
                }
            },
            {
                "sTitle": "序号",
                "mDataProp": "id"
            },
            {
                "sTitle": "数据字典分类",
                "mDataProp": "code"
            },
            {
                "sTitle": "数据字典名称",
                "mDataProp": "name"
            },
            {
                "sTitle": "国际化参数值",
                "mDataProp": "internationCode"
            },
            {
                "sTitle": "操作",
                "mData": null,
                "aTargets": [ -1 ],
                // 自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-info" onclick="BMEP.DicClass.modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" onclick="BMEP.DicClass.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var contract = '<button class="btn btn-mini btn-danger"  data-toggle="tooltip" data-placement="bottom" title="数据字典" onclick="BMEP.DicClass.dic(\'' + oObj.aData.id + '\')"><i class="icon-th bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + trash + contract + end;
                }
            }
        ],

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
});

Editorial.JBPM.Design.Dic.saveDicList = function () {
    var sData = $('input', Editorial.JBPM.Design.Dic.oTable1.fnGetNodes()).serialize();
    console.log("sData:" + sData);
    if (sData == null || sData == "") {
        ajaxAlertErrorMsg("请选择一条数据字典分类！");
        return false;
    }
    sData = sData.replace(new RegExp('ids=', 'g'), '');
    console.log("sData:" + sData);
    var idArray = sData.split('&');
    console.log("idArray:" + idArray);
    console.log("idArray.length:" + idArray.length);
    if (idArray.length > 1) {
        ajaxAlertErrorMsg("只能选择一条数据字典分类！");
        return false;
    }
    var url = $('#ctx').val() + "/pages/fdesign/form/batchSaveDic?id=" + idArray[0];
    //alert(url);
    $.ajax({
        "dataType": 'json',
        "type": "POST",
        "url": url,
        "cache": false,
        "success": function (response) {
            if (response.isSuccess == "true") {
                ajaxAlertSuccessMsg(response.msg, true);
                autoCloseCommonModal(5);
                var jsonObj = {
                    "code": response.code,
                    "dicMap": response.dicMap
                };
                //alert(":" + window.frames["iframe_main"].document);
                //alert(":" + window.frames["iframe_main"].document.body.innerHTML);
                //alert($(window.frames["iframe_main"].document).html());
                //alert($(window.frames["iframe_main"].document).contents().find("#taskName").val());
                updateFormInFrame('Editorial.JBPM.Design.updateField', jsonObj);
            } else {
                ajaxAlertErrorMsg(response.msg, true);
            }
        },
        "error": function (response) {
            alert("error");
        }
    });
};