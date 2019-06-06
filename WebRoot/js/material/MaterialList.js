addObj = function() {
	var url = $('#ctx').val() + "/pages/material/form/edit";
	var commonModalCss = {
			"width" : "800px",
			"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "900px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

modObj = function(id) {
	var url = $('#ctx').val() + "/pages/material/form/edit?id="+id;
	var commonModalCss = {
		"width" : "800px",
		"height" : "600px"
	};
	var commonModalBodyCss = {
		"max-height" : "900px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

delObj = function(id) {
	openConfirmModalInFrame("您确定删除这条素材信息吗？",function(){
		var url = $('#ctx').val()+"/pages/material/form/delete?id="+id;
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
	oTable1 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/material/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "name", "value": $("#query_material_name").val()});
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
        			"sTitle": "书名",
            		"mDataProp": "name",
                    "fnRender": function (oObj) {
                        return '<span style="display: block; width: 150px; overflow: hidden; white-space: nowrap; -o-text-overflow: ellipsis; text-overflow: ellipsis;">' + oObj.aData.name + '</span>';
                	}
                }, {
                	"sTitle": "ISBN号",
            		"mDataProp": "isbn"
                }, {
        			"sTitle": "作者",
            		"mDataProp": "author"
                }, {
        			"sTitle": "出版社",
        			"mDataProp": "publisher"
                }, {
        			"sTitle": "版权所有者",
        			"mDataProp": "belong"		
				},{
					"sTitle": "出版日期",
        			"mDataProp": "datePublication",
        			"sType" : 'date',
            		"fnRender" : function(oObj) {
            			var javascriptDate = new Date(oObj.aData.datePublication).toLocaleDateString();
            			return "<div class= date>" + javascriptDate + "<div>";
            			}
				},{
					"sTitle": "图书封面",
        			"mDataProp": "bookCovers",
                    "fnRender": function (oObj) {
                        return '<img src="'+"/upload/material/" +oObj.aData.bookCovers + '" width="60" />';
                	}
				},{
        			"sTitle": "操作",
        			"mData": null,
        	        "aTargets": [ -1 ],
                  	//自定义列的样式
                    "fnRender": function (oObj) {
                        var start = '<div class="hidden-phone visible-desktop btn-group">';
                        var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                        var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                        var end = '</div>';
                        return start + edit + trash + end;
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