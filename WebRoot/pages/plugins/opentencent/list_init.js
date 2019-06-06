
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
       	"sAjaxSource": $('#ctx').val()+"/pages/plugins/opentencent/form/managers?now=" + new Date().getTime(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name": "id", "value": $("#query_id").val()});
       		aoData.push({"name": "name", "value": $("#query_name").val()});
       		aoData.push({"name": "app_key", "value": $("#query_app_key").val()});
       		aoData.push({"name": "app_secret", "value": $("#query_app_secret").val()});
       		aoData.push({"name": "redirectUri", "value": $("#query_redirectUri").val()});
       		aoData.push({"name": "authorizeCode", "value": $("#query_authorizeCode").val()});
       		aoData.push({"name": "accessToken", "value": $("#query_accessToken").val()});
       		aoData.push({"name": "expiresIn", "value": $("#query_expiresIn").val()});
       		aoData.push({"name": "refreshToken", "value": $("#query_refreshToken").val()});
       		aoData.push({"name": "openid", "value": $("#query_openid").val()});
       		aoData.push({"name": "openkey", "value": $("#query_openkey").val()});
       	},
        "fnServerData": Editorial.User.retrieveData,
        "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns": [ { 
    			"sTitle": "Id",
        		"mDataProp": "id"
            }, {
    			"sTitle": "推送平台名称",
            	"mDataProp": "name"
			}, {
    			"sTitle": "AppKey",
				"mDataProp": "app_key"
			}, {
    			"sTitle": "AppSercet",
				"mDataProp": "app_secret"
			}, {
    			"sTitle": Global_Prompt_Operating,
    			"mData": null,
    	        "aTargets": [ -1 ],
              	//自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.User.modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.User.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
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
