Editorial.Contract.retrieveData = function(sSource, aoData, fnCallback) {
    $.ajax({
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
    });
};

Editorial.Contract.query = function() {
	initPagingParamsInFrame('Editorial.Contract.oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.Contract.oTable1');
};

$(function() {
	 $(".on").click(function(){
			$(".on-down").slideToggle();
	});
	Editorial.Contract.oTable1 = $('#table_report').dataTable({
        "bFilter": false, //开关，是否启用客户端过滤器
        "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
        "bAutoWidth": false, //自适应宽度
        "sPaginationType": "full_numbers", //分页样式
        "bServerSide": true, //从服务器端取数据
       	"sAjaxSource": $('#ctx').val()+"/pages/crContract/form/managers?now=" + new Date().getTime()+"&productId="+$('#productId').val(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name": "contractName", "value": $("#query_contractName").val()});
       		aoData.push({"name": "contractType", "value": $("#query_contractType option:selected").val()});
       	},
        "fnServerData": Editorial.Contract.retrieveData,
        "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(1)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns":[{
    			"mData" : null,
    			"bSortable" : false,
    			"sClass" : "center",
    			"fnRender" : function(oObj) {
    				var sReturn = "";
    				sReturn = '<label><input type="checkbox" name="ids" value="' + oObj.aData.contractId + '"  /><span class="lbl"></span></label>';
    				return sReturn;
    			}
    		},{ 
    			"sTitle": "Id",
        		"mDataProp": "contractId"
            },{
    			"sTitle": "合同类型",
            	"mDataProp": "contractType"
			}, {
    			"sTitle": "合同名称",
				"mDataProp": "contractName"
			}, {
    			"sTitle": "合同签订日期",
				"mDataProp": "contractDate",
				"sType" : 'date',
    			"fnRender" : function(oObj) {
    				var javascriptDate = new Date(oObj.aData.contractDate).toLocaleDateString();
    				return "<div class= date>" + javascriptDate + "<div>";
    			}
			}, {
    			"sTitle": "合同来源",
    			"mDataProp":"contractSource"
			},{
    			"sTitle": "合同原因",
            	"mDataProp": "contractReason"
			}],
		
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

    });

	$('table th input:checkbox').on('click', function() {
		var that = this;
		$(this).closest('table').find('tr > td:first-child input:checkbox').each(function() {
			this.checked = that.checked;
			$(this).closest('tr').toggleClass('selected');
		});
	});
	
	$('[data-rel=tooltip]').tooltip();
});

Editorial.Contract.saveRoleList = function() {
	var sData = $('input', Editorial.Contract.oTable1.fnGetNodes()).serialize();
	if (sData == null || sData == "") {
		openErrorAlertModalInFrame("请至少选择一条客户记录！");
		return false;
	}
	sData = sData.replace(new RegExp('&ids=', 'g'), ',');
	var url = $('#ctx').val() + "/pages/productContractRelationship/form/batchSave?id=" + $('#productId').val()+"&"+sData;
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : url,
		"cache" : false,
		"success" : function(response) {
			if (response.isSuccess == "true") {
				ajaxAlertSuccessMsg(response.msg, true);
				refreshFrameDataTableInLayer('Editorial.Product.Temp.oTable1');
				autoCloseCommonModal(5);
			} else {
				ajaxAlertErrorMsg(response.msg, true);
			}
		},
		"error" : function(response) {
			alert("error");
		}
	});
};

