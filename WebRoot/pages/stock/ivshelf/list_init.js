
$(function() {
	
	$(".on").click(function(){
		$(".on-down").slideToggle();
	});
	
	Editorial.User.oTable1 = $('#table_report').dataTable( {
        "bFilter": false, //开关，是否启用客户端过滤器
        "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, //自适应宽度
        "sPaginationType": "full_numbers", //分页样式
        "bServerSide": true, //从服务器端取数据
       	"sAjaxSource": $('#ctx').val()+"/pages/stock/ivshelf/form/managers?now=" + new Date().getTime(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name": "shelfId", "value": $("#query_shelfId").val()});
       		aoData.push({"name": "shelfCode", "value": $("#query_shelfCode").val()});
       		aoData.push({"name": "shelfDesc", "value": $("#query_shelfDesc").val()});
       		
       		aoData.push({"name": "warehouseId", "value": $("#query_ivWarehouse").val()});
       		aoData.push({"name": "wareFloorId", "value": $("#query_ivWarehouseFloor").val()});
       		aoData.push({"name": "wareRoomId", "value": $("#query_ivWarehouseRoom").val()});
       	},
        "fnServerData": Editorial.User.retrieveData,
        "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns": [ { 
    			"sTitle": "Id",
        		"mDataProp": "shelfId"
            },{
    			"sTitle": "货架编号",
            	"mDataProp": "shelfCode"
			}, {
    			"sTitle": "货架描述",
				"mDataProp": "shelfDesc"
			}, {
    			"sTitle": "货架承重",
				"mDataProp": "shelfLoad"
			}, {
    			"sTitle": "货架容积",
				"mDataProp": "shelfCapacity"
			}, {
    			"sTitle": "货架类型",
				"mDataProp": "shelfType"
			}, {
    			"sTitle": "货架用途",
				"mDataProp": "shelfUsage"
			}
			, {
    			"sTitle": "所属仓库",
				"mDataProp": "warehouse.warehouseDesc"
			}
			, {
    			"sTitle": "所属仓库层",
				"mDataProp": "warehouseFloor.whFloorDesc"
			}
			, {
    			"sTitle": "所属仓库房间",
				"mDataProp": "warehouseRoom.whRoomDesc"
			}
			, {
    			"sTitle": "状态",
    			"mDataProp":"shelfStatus"
				
			}, {
    			"sTitle": Global_Prompt_Operating,
    			"mData": null,
    	        "aTargets": [ -1 ],
              	//自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.User.modObj(\'' + oObj.aData.shelfId + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.User.delObj(\'' + oObj.aData.shelfId + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + trash + end;
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
