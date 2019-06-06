jQuery.namespace( 'BMEP.Product.ProductRole' );

BMEP.Product.ProductRole = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

BMEP.Product.ProductRole.delObj = function(id) {
		var url = $('#ctx').val()+"/pages/productTypeProp/form/delete?id="+id;
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					ajaxAlertSuccessMsg(response.msg, true);
					refreshFrameDataTableInFrame('BMEP.Product.ProductRole.oTable1');
				} else {
					ajaxAlertErrorMsg(response.msg, true);
				}
			},
			"error": function(response) {
				alert("error");
			}
		} );
};

BMEP.Product.ProductRole.addRole = function() {
	var productTypePropId = $("#productTypePropId").val();
	var authorityId = $("#authorityId").val();
	var roleId = $("#roleId").val();
	var text = $("#"+roleId).text();
	
		var url = $('#ctx').val()+"/pages/productTypeProp/form/addRole?productTypePropId="+productTypePropId+"&authorityId="+authorityId+"&roleId="+roleId+"&text="+text+"&propSource="+$("#propSource").val();
		$.ajax( {
			"dataType": 'json',
			"type": "POST",
			"url": url,
			"cache": false,
			"success": function(response) {
				if (response.isSuccess == "true") {
					ajaxAlertSuccessMsg(response.msg, true);
					refreshFrameDataTableInFrame('BMEP.Product.ProductRole.oTable1');
				} else {
					ajaxAlertErrorMsg(response.msg, true);
				}
			},
			"error": function(response) {
				alert("error");
			}
		} );
};

BMEP.Product.ProductRole.query = function() {
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('BMEP.Product.ProductRole.oTable1');
};

BMEP.Product.ProductRole.retrieveData = function(sSource, aoData, fnCallback) {
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
	BMEP.Product.ProductRole.oTable1 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/productTypeProp/form/roleManager", //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "productTypePropId", "value": $("#productTypePropId").val()});
           		aoData.push({"name": "propSource", "value": $("#propSource").val()});
           	},
            "fnServerData": BMEP.Product.ProductRole.retrieveData,
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
            		"mDataProp": "roleName"
                },{ 
        			"sTitle": "权限类型",
            		"mDataProp": "authority"
                },{
        			"sTitle": "操作",
        			"mData": null,
        	        "aTargets": [ -1 ],
                  	//自定义列的样式
                    "fnRender": function (oObj) {
                        var start = '<div class="hidden-phone visible-desktop btn-group">';
                        var trash = '<button class="btn btn-mini btn-danger" onclick="BMEP.Product.ProductRole.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                        var end = '</div>';
                        return start  + trash + end;
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