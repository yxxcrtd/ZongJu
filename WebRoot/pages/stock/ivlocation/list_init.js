
$(function() {
	Editorial.User.oTable1 = $('#table_report').dataTable( {
        "bFilter": false, //开关，是否启用客户端过滤器
        "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, //自适应宽度
        "sPaginationType": "full_numbers", //分页样式
        "bServerSide": true, //从服务器端取数据
       	"sAjaxSource": $('#ctx').val()+"/pages/stock/ivlocation/form/managers?now=" + new Date().getTime(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name": "locationId", "value": $("#query_locationId").val()});
       		aoData.push({"name": "locationCode", "value": $("#query_locationCode").val()});
       		aoData.push({"name": "locationDesc", "value": $("#query_locationDesc").val()});
       		aoData.push({"name": "locationLoad", "value": $("#query_locationLoad").val()});
       		aoData.push({"name": "locationCapacity", "value": $("#query_locationCapacity").val()});
       		aoData.push({"name": "locationPack", "value": $("#query_locationPack").val()});
       		aoData.push({"name": "locationLoose", "value": $("#query_locationLoose").val()});
       		
       		aoData.push({"name": "floorId", "value": $("#query_ivFloor").val()});
       		aoData.push({"name": "regionalId", "value": $("#query_ivRegional").val()});
       		aoData.push({"name": "shelfId", "value": $("#query_ivShelf").val()});
       		aoData.push({"name": "warehouseId", "value": $("#query_ivWarehouse").val()});
       		aoData.push({"name": "ivWarehouseFloorId", "value": $("#query_ivWarehouseFloor").val()});
       		aoData.push({"name": "ivWarehouseRoomId", "value": $("#query_ivWarehouseRoom").val()});
       	},
        "fnServerData": Editorial.User.retrieveData,
        "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns": [ { 
    			"sTitle": "Id",
        		"mDataProp": "locationId"
            },{
    			"sTitle": "货位编号",
            	"mDataProp": "locationCode"
			}, {
    			"sTitle": "货位描述",
				"mDataProp": "locationDesc"
			}, {
    			"sTitle": "货位承重",
				"mDataProp": "locationLoad"
			}, {
    			"sTitle": "货位容积",
				"mDataProp": "locationCapacity"
			}, {
    			"sTitle": "最大包数",
				"mDataProp": "locationPack"
			}, {
    			"sTitle": "最大散数",
				"mDataProp": "locationLoose"
			}
			, {
    			"sTitle": "所在层阶",
				"mDataProp": "floor.shFloorDesc"
			}
			, {
    			"sTitle": "所在区域",
				"mDataProp": "regional.areaDesc"
			}
			, {
    			"sTitle": Global_Prompt_Operating,
    			"mData": null,
    	        "aTargets": [ -1 ],
              	//自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.User.modObj(\'' + oObj.aData.locationId + '\',\'' + oObj.aData.floor.shFloorId + '\',\'' + oObj.aData.regional.areaId + '\',\'' + oObj.aData.warehouse.warehouseId + '\',\'' + oObj.aData.shelf.shelfId + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.User.delObj(\'' + oObj.aData.locationId + '\')"><i class="icon-trash bigger-120"></i></button>';
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
