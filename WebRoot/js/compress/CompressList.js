//查看打包记录信息
lookObj = function(id) {
	var url = $('#ctx').val() + "/pages/record/form/index?id=" + id;
	window.location=url;
};

//继续添加文件
gotoObj = function(id) {
	var url = $('#ctx').val() + "/pages/compress/form/index?id=" + id;
	window.location=url;
};

//新建包
addObj = function() {
	var url = $('#ctx').val() + "/pages/compresszip/form/add";
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "450px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//完善信息生成产品
showObj = function(id) {
	var url = $('#ctx').val() + "/pages/record/form/edit?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "450px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//显示修改
modObj = function(id) {
	var url = $('#ctx').val() + "/pages/compresszip/form/edit?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"margin": "100px 0 0 -450px"
	};
	var commonModalBodyCss = {
		"max-height": "450px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//下载打包zip
load = function(id){
	var url = $('#ctx').val()+"/pages/compresszip/form/download?id="+id;
	window.location=url;
};

//删除信息
delObj = function(id) {
	openConfirmModalInFrame("您确定删除该产品包吗？",function(){
		var url = $('#ctx').val()+"/pages/compresszip/form/delete?id="+id;
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
           	"sAjaxSource": $('#ctx').val()+"/pages/compresszip/form/manager?now=" + new Date().getTime(), //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "name", "value": $("#query_name").val()});
           		aoData.push({"name": "remark", "value": $("#query_remark").val()});
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
        		"sTitle": "包名",
            	"mDataProp": "name"
            }, { 
        		"sTitle": "简介",
            	"mDataProp": "remark",
            	"fnRender": function (oObj) {
                  return '<span title=' + oObj.aData.remark + ' style="display: block; width: 150px; overflow: hidden; white-space: nowrap; -o-text-overflow: ellipsis; text-overflow: ellipsis;">' + oObj.aData.remark + '</span>';
            }
            },	{ 
        		"sTitle": "价格",
            	"mDataProp": "price"
			},{
				"sTitle": "生成时间",
        		"mDataProp": "dateTime",
        		"sType" : 'date',
            	"fnRender" : function(oObj) {
            		var javascriptDate = new Date(oObj.aData.dateTime).toLocaleDateString();
            		return "<div class= date>" + javascriptDate + "<div>";
            	}
			},{
        		"sTitle": "操作",
        		"mData": null,
        	    "aTargets": [ -1 ],
                //自定义列的样式
                "fnRender": function (oObj) {
                	var start = '<div class="hidden-phone visible-desktop btn-group">';
                	if(oObj.aData.status==0){
                		var look = '<button class="btn btn-mini btn-success" title="查看" onclick="lookObj(\'' + oObj.aData.id + '\')"><i class="icon-eye-open bigger-120"></i></button>';
                		var add = '<button class="btn btn-mini btn-warning" title="添加" onclick="gotoObj(\'' + oObj.aData.id + '\')"><i class="icon-plus-sign bigger-120"></i></button>';
                    	var show = '<button class="btn btn-mini btn-info" title="生成成品" onclick="showObj(\'' + oObj.aData.id + '\')"><i class="icon-retweet bigger-120"></i></button>';
                	}
                	if(oObj.aData.status==1){
                		var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                		var download = '<button class="btn btn-mini btn-info" title="下载zip" onclick="load(\'' + oObj.aData.id + '\')"><i class=" icon-arrow-down"></i></button>';
                        var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                	}
                    var end = '</div>';
                    return start + look + add + show + edit + download + trash + end;
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