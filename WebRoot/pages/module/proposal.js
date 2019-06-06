jQuery.namespace('Editorial.Proposal');

Editorial.Proposal = function () {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.Proposal.editObj = function (id) {
    var url = $('#ctx').val() + "/pages/product/proposal/form/edit?id=" + id;
    var commonModalCss = {
        "width": "500px",
        "height": "260px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
//    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
    window.parent.parent.openCommonModalInLayer(url, commonModalCss, commonModalBodyCss);

};

Editorial.Proposal.query = function () {
    // 重新刷新页面Table
    refreshFrameDataTableInFrame('Editorial.Proposal.oTable1');
};

Editorial.Proposal.retrieveData = function (sSource, aoData, fnCallback) {
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

$(function () {
    $(".on").click(function () {
        $(".on-down").slideToggle();
    });

    Editorial.Proposal.oTable1 = $('#table_report').dataTable({
        "bFilter": false, //开关，是否启用客户端过滤器
        "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, //自适应宽度
        "sPaginationType": "full_numbers", //分页样式
        "bServerSide": true, //从服务器端取数据
        "sAjaxSource": $('#ctx').val() + "/pages/product/proposal/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
        "fnServerParams": function (aoData) {
            aoData.push({"name": "name", "value": $("#query_proposal_name").val()});
            aoData.push({"name": "desc", "value": $("#query_proposal_desc").val()});
        },
        "fnServerData": Editorial.Proposal.retrieveData,
        "fnDrawCallback": function (oSettings) {
            for (var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
                $('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr).html(i + oSettings._iDisplayStart + 1);
            }
        },
        "aoColumns": [
            {
                "sTitle": "序号",
                "mDataProp": "id"
            },
            {
                "sTitle": "名称",
                "mDataProp": "name"
            },
            {
                "sTitle": "创建人",
                "mDataProp": "createBy"
            }
            ,
            {
                "sTitle": "创建时间",
                "mDataProp": "createOn",
                "sType": 'date',
                "fnRender": function (oObj) {
                    var javascriptDate = new Date(oObj.aData.createOn).toLocaleDateString();
                    return "<div class= date>" + javascriptDate + "<div>";
                }
            },
            {
                "sTitle": "操作",
                "mData": null,
                "aTargets": [ -1 ],
                //自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div>';
                    var edit = '<button class="btn btn-mini btn-warning" title="修改策划" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.Proposal.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var addAdvice = '<button class="btn btn-mini btn-primary" title="新增策划意见" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.Proposal.proposalAdviceAdd(\'' + oObj.aData.id + '\')"><i class="icon-plus-sign bigger-120"></i></button>';
                    var listAdvice = '<button class="btn btn-mini btn-success" title="查看策划意见" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.Proposal.proposalAdviceList(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + addAdvice + listAdvice + end;
                }
            }
        ],
        //多语言配置
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

Editorial.Proposal.proposalAdviceAdd = function (id) {
    var url = $('#ctx').val() + "/pages/product/proposalAdvice/form/edit?tid=" + id;
    var commonModalCss = {
        "width": "500px",
        "height": "300px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
//    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
    window.parent.parent.openCommonModalInLayer(url, commonModalCss, commonModalBodyCss);

};

Editorial.Proposal.proposalAdviceList = function (id) {
    var url = $('#ctx').val() + "/pages/product/proposalAdvice/form/index?tid=" + id;
    var commonModalCss = {
        "width": "1200px",
        "height": "560px"
    };
    var commonModalBodyCss = {
        "max-height": "800px"
    };
//    openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
    window.parent.parent.openCommonModalInLayer(url, commonModalCss, commonModalBodyCss);

};