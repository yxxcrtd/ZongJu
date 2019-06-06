//新增信息
addObj = function(id) {
	var sourceId =  $("#sourceId").val();
	var url = $('#ctx').val() + "/pages/trade/form/edit?sourceId=" + sourceId;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//excel导入
importObj = function(id) {
	var sourceId =  $("#sourceId").val();
	var url = $('#ctx').val() + "/pages/trade/form/upload?sourceId=" + sourceId;
	var commonModalCss = {
			"width": "450px",
			"margin": "100px 0 0 -450px"
		};
		var commonModalBodyCss = {
			"max-height": "800px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//删除信息
delObj = function(id) {
	openConfirmModalInFrame("您确定删除该交易信息吗？",function(){
		var url = $('#ctx').val()+"/pages/trade/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('oTable1');
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

query = function() {
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('oTable1');
};

retrieveData = function(sSource, aoData, fnCallback) {
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
	var sourceId =  $("#sourceId").val();
	oTable1 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/trade/form/manager?sourceId=" + sourceId, //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "tradeStr", "value": $("#query_trade_time").val()});
           	},
            "fnServerData": retrieveData,
            "fnDrawCallback": function(oSettings ) {
    			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
    				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
    			}
            },
            "aoColumns": [ {
    			"sTitle": "序号",
    			"mDataProp": "id"
            }, { 
        		"sTitle": "版本",
            	"mDataProp": "version"
            },{
				"sTitle": "首付",
    			"mDataProp": "downPayment"
            }, {
        		"sTitle": "分成比例",
        		"mDataProp": "proportion",
            	"fnRender" : function(oObj) {
            		return  oObj.aData.proportion + '%';
            	}
			},{
				"sTitle": "交易时间",
        		"mDataProp": "tradeDate",
        		"sType" : 'date',
            	"fnRender" : function(oObj) {
            		var javascriptDate = new Date(oObj.aData.tradeDate).toLocaleDateString();
            		return "<div class= date>" + javascriptDate + "<div>";
            	}
			},{
        		"sTitle": "操作",
        		"mData": null,
        	    "aTargets": [ -1 ],
                //自定义列的样式
                "fnRender": function (oObj) {
                	var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var end = '</div>';
                    return start + trash + end;
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