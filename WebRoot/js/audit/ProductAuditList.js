//查看信息
Editorial.Product.ProductInfo.lookObj = function(id) {
	var url = $('#ctx').val() + "/pages/audit/form/look?id=" + id;
	var commonModalCss = {
		"width": "800px",
		"height": "600px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//显示审核修改
Editorial.Product.ProductInfo.modObj = function(id, code) {
	console.log("code:" + code);
	var url=$('#ctx').val() + "/pages/audit/form/edit/" + code + "?id=" + id;
	var commonModalCss = {
		"width": "800px",
		"height": "600px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.delObj = function(id) {
	openConfirmModalInFrame("您确定对该资源信息执行审核不通过吗？", function() {
		var url = $('#ctx').val() + "/pages/audit/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.Product.ProductInfo.oTable2');
				} else {
					window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
				}
			},
			"error" : function(response) {
				alert("error");
			}
		});
	}, null, null);
};

Editorial.Product.ProductInfo.showResponse = function(response, statusText) {
	Editorial.Product.ProductInfo.disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('Editorial.Product.ProductInfo.oTable2');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		Editorial.Product.ProductInfo.enableAllButton();
	}
};

Editorial.Product.ProductInfo.disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

Editorial.Product.ProductInfo.retrieveData = function(sSource, aoData, fnCallback) {
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
	Editorial.Product.ProductInfo.oTable2 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/audit/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
            "fnServerData": Editorial.Product.ProductInfo.retrieveData,
            "fnDrawCallback": function(oSettings ) {
    			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
    				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
    			}
            },
            "aoColumns": [ {
    			"sTitle": "序号",
    			"mDataProp": "id"
            }, {
                "sTitle" : "类型",
                "mDataProp" : "productType.name"
            }, {
    			"sTitle" : "书名",
    			"mDataProp" : "title"
            }, {
    			"sTitle" : "作者",
    			"mDataProp" : "user.username"
    		}, {
                "sTitle" : "创作时间",
                "mDataProp" : "createOn",
        		"sType" : 'date',
            	"fnRender" : function(oObj) {
            		var javascriptDate = new Date(oObj.aData.createOn).toLocaleDateString();
            		return "<div class= date>" + javascriptDate + "<div>";
            	}
            }, {
        		"sTitle": "操作",
        		"mData": null,
        	    "aTargets": [ -1 ],
                //自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var view = '<button class="btn btn-mini btn-success" title="查看信息" onclick="Editorial.Product.ProductInfo.lookObj(\'' + oObj.aData.id + '\')"><i class="icon-eye-open bigger-120"></i></button>';
                    var edit = '<button class="btn btn-mini btn-warning" title="审核信息" onclick="Editorial.Product.ProductInfo.modObj(\'' + oObj.aData.id + '\', \'' + oObj.aData.productType.code + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="审核不通过" onclick="Editorial.Product.ProductInfo.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var end = '</div>';
                    return start + view + edit + trash + end;
                }
			}],
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