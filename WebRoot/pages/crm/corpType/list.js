
Editorial.CRM.CorpType = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

Editorial.CRM.CorpType.editObj = function(id) {
	var url = $('#ctx').val()+"/pages/crm/corpType/form/edit?id="+id;
	var commonModalCss = {
		"width": "500px",
		"height" : "260px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.CorpType.delObj = function(id) {
	openConfirmModalInFrame("您确定执行删除用户类别操作吗？",function(){
		var url = $('#ctx').val()+"/pages/crm/corpType/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.CRM.CorpType.oTable1');
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error": function(response) {
				alert("error");
			}
		} );
	},null,null);
};

Editorial.CRM.CorpType.classify = function(id) {
	var url = $('#ctx').val()+"/pages/crm/corpTypePropClassify/form/index?tid="+id;
	window.location.href = url;
};

Editorial.CRM.CorpType.corpTypeProp = function(id) {
	var url = $('#ctx').val()+"/pages/crm/corpTypeProp/form/index?tid="+id;
	window.location.href = url;
};

Editorial.CRM.CorpType.upload = function(id) {
	var url = $('#ctx').val()+"/pages/crm/corpType/form/upload?id="+id;
	var commonModalCss = {
		"width": "500px",
		"height" : "260px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.CRM.CorpType.query = function() {
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.CRM.CorpType.oTable1');
};

Editorial.CRM.CorpType.retrieveData = function(sSource, aoData, fnCallback) {
    $.ajax( {
        "dataType": 'json',
        "type": "POST",
        "url": sSource,
        "cache": false,
        "data": aoData,
        "success": function(response) {
     	   fnCallback(response);
        },
        "error": function(response) {
     	   alert("error");
        }
    } );
};

$(function() {
	
	$(".on").click(function(){
		$(".on-down").slideToggle();
	});
	Editorial.CRM.CorpType.oTable1 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/crm/corpType/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "name", "value": $("#query_productType_name").val()});
           		aoData.push({"name": "code", "value": $("#query_productType_code").val()});
           	},
            "fnServerData": Editorial.CRM.CorpType.retrieveData,
            "fnDrawCallback": function(oSettings ) {
    			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
    				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
    			}
            },
            "aoColumns": [ { 
    			"sTitle": "序号",
    			"mDataProp": "id"
            }, { 
        			"sTitle": "名称",
            		"mDataProp": "name"
                }, {
        			"sTitle": "编码",
        			"mDataProp": "code"
				},{
					"sTitle": "国际化编码",
        			"mDataProp": "internationCode"
				},{
        			"sTitle": "操作",
        			"mData": null,
        	        "aTargets": [ -1 ],
                  	//自定义列的样式
                    "fnRender": function (oObj) {
                        var start = '<div class="hidden-phone visible-desktop btn-group">';
                        var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.CRM.CorpType.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                        var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.CRM.CorpType.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                        var flag0 = '<button class="btn btn-mini btn-success" title="属性分类" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.CRM.CorpType.classify(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                        var flag = '<button class="btn btn-mini btn-success" title="类型属性" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.CRM.CorpType.corpTypeProp(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                        var upload = '<button class="btn btn-mini btn-primary" title="上传公司自定义属性" data-toggle="tooltip" data-placement="bottom" onclick="Editorial.CRM.CorpType.upload(\'' + oObj.aData.id + '\')"><i class="icon-upload bigger-120"></i></button>';
                        var end = '</div>';
                        return start + edit + trash + flag0 + flag + upload + end;
                        
                        /*var start = '<div class="hidden-phone visible-desktop btn-group">';
                        var edit = '<button class="btn btn-mini btn-warning" onclick="Editorial.CRM.PersonType.editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                        var trash = '<button class="btn btn-mini btn-danger" onclick="Editorial.CRM.PersonType.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                        var flag0 = '<button class="btn btn-mini btn-success" data-toggle="tooltip" data-placement="bottom" title="属性分类" onclick="Editorial.CRM.PersonType.personTypeClassify(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                        var flag = '<button class="btn btn-mini btn-success" data-toggle="tooltip" data-placement="bottom" title="类型属性" onclick="Editorial.CRM.PersonType.personTypeProp(\'' + oObj.aData.id + '\')"><i class="icon-list bigger-120"></i></button>';
                        var upload = '<button class="btn btn-mini btn-primary" data-toggle="tooltip" data-placement="bottom" title="上传人员自定义属性" onclick="Editorial.CRM.PersonType.upload(\'' + oObj.aData.id + '\')"><i class="icon-upload bigger-120"></i></button>';
                        var end = '</div>';*/
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
    } );

	$('[data-rel=tooltip]').tooltip();
});