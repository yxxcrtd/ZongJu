$(function() {
	$(".on").click(function(){
		$(".on-down").slideToggle();
	});

	oTable1 = $('#table_report').dataTable( {
        "bFilter": false, //开关，是否启用客户端过滤器
        "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, //自适应宽度
        "sPaginationType": "full_numbers", //分页样式
        "bServerSide": true, //从服务器端取数据
       	"sAjaxSource": $('#ctx').val() + "/pages/dataManager/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name" : "isbn", "value" : $("#query_isbn").val()});
       		aoData.push({"name" : "name", "value" : $("#query_name").val()});
       		aoData.push({"name" : "author", "value" : $("#query_author").val()});
       		aoData.push({"name" : "publisher", "value" : $("#query_publisher").val()});
       		aoData.push({"name" : "starTime", "value" : $("#query_starTime").val()});
       		aoData.push({"name" : "endTime", "value" : $("#query_endTime").val()});
       	},
        "fnServerData": retrieveData,
        "fnDrawCallback": function(oSettings) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns": [ { 
			"sTitle": "序号",
			"mDataProp": "id"
        }, { 
        	"sTitle": "ISBN",
			"mDataProp": "isbn"
            }, {
            	"sTitle": "书名",
            	"mDataProp": "name"
			},{
    			"sTitle": "简介",
    			"mDataProp": "introduction"
			}, { 
    			"sTitle": "作者",
        		"mDataProp": "author"
            }, {
    			"sTitle": "出版社",
    			"mDataProp": "publisher"
            },{
            	"sTitle": "出版日期",
            	"mDataProp": "datePublication",
            	"sType" : 'date',
            	"fnRender" : function(oObj) {
            		var javascriptDate = new Date(oObj.aData.datePublication).toLocaleDateString();
            		return "<div class= date>" + javascriptDate + "<div>";
            	}
			},{
    			"sTitle": "操作",
    			"mData": null,
    	        "aTargets": [ -1 ],
              	//自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-info" title="修改" onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var perfect = '<button class="btn btn-mini btn-warning" title="完善版权信息" onclick="perfectObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var view = '<button class="btn btn-mini btn-success" title="查看版权交易信息" onclick="lookObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var download = '<button class="btn btn-mini btn-warning" title="下载pdf" onclick="download(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + perfect + view + trash + download + end;
            	}
			}
        ],
        
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

    } );

	$('[data-rel=tooltip]').tooltip();
});
