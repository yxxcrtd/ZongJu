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
       	"sAjaxSource": $('#ctx').val()+"/pages/crContract/form/managers?now=" + new Date().getTime(), //mvc后台ajax调用接口。
       	"fnServerParams": function(aoData) {
       		aoData.push({"name": "contractName", "value": $("#query_contractName").val()});
       		aoData.push({"name": "contractType", "value": $("#query_contractType option:selected").val()});
       	},
        "fnServerData": Editorial.Contract.retrieveData,
        "fnDrawCallback": function(oSettings ) {
			for ( var i=0, iLen=oSettings.aiDisplay.length ; i<iLen ; i++ )	{
				$('td:eq(0)', oSettings.aoData[ oSettings.aiDisplay[i] ].nTr ).html( i+oSettings._iDisplayStart+1 );
			}
        },
        "aoColumns": 
        	[ { 
    			"sTitle": "Id",
        		"mDataProp": "contractId"
            },{
    			"sTitle": "类型",
            	"mDataProp": "contractType"
			}, {
    			"sTitle": "名称",
				"mDataProp": "contractName"
			}, {
    			"sTitle": "签订日期",
				"mDataProp": "contractDate",
				"sType" : 'date',
    			"fnRender" : function(oObj) {
    				var javascriptDate = new Date(oObj.aData.contractDate).toLocaleDateString();
    				return "<div class= date>" + javascriptDate + "<div>";
    			}
			}, {
    			"sTitle": "过期日期",
				"mDataProp": "contractExpired",
				"sType" : 'date',
    			"fnRender" : function(oObj) {
    				var javascriptDate = new Date(oObj.aData.contractExpired).toLocaleDateString();
    				return "<div class= date>" + javascriptDate + "<div>";
    			}
			},{
    			"sTitle": "授权开始日期",
            	"mDataProp": "contractLicenseStartOn",
            	"sType" : 'date',
    			"fnRender" : function(oObj) {
    				var javascriptDate = new Date(oObj.aData.contractLicenseStartOn).toLocaleDateString();
    				return "<div class= date>" + javascriptDate + "<div>";
    			}
			}, {
    			"sTitle": "授权到期日期",
				"mDataProp": "contractLicenseEndOn",
				"sType" : 'date',
    			"fnRender" : function(oObj) {
    				var javascriptDate = new Date(oObj.aData.contractLicenseEndOn).toLocaleDateString();
    				return "<div class= date>" + javascriptDate + "<div>";
    			}
			}, {
    			"sTitle": "作者样书",
    			"mDataProp":"contractAuthorCount"
			},{
    			"sTitle": "代理商样书",
    			"mDataProp":"contractProxyCount"
			},{
    			"sTitle": "保证金",
            	"mDataProp": "contractBailAmount"
			}, {
    			"sTitle": "最大金额",
				"mDataProp": "contractMaxAmount"
			}, {
    			"sTitle": "最小金额",
				"mDataProp": "contractMinAmount"
			}, {
    			"sTitle": "代理费",
    			"mDataProp":"contractProxyAmount"
			}, {
    			"sTitle": Global_Prompt_Operating,
    			"mData": null,
    	        "aTargets": [ -1 ],
              	//自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.Contract.modObj(\'' + oObj.aData.contractId + '\')"><i class="icon-edit bigger-120"></i></button>';
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.Contract.delObj(\'' + oObj.aData.contractId + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + trash + end;
            	}
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

	$('[data-rel=tooltip]').tooltip();
	
	/**时间组件和验证时间**/
	$('#invoiceContractDate').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Contract.validateContractDate();
	});
	
	$('#invoiceContractExpired').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Contract.validateContractExpired();
	});
	
	$('#invoiceLicenseStartOn').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Contract.validateContractLicenseStartOn();
	});
	
	$('#invoiceLicenseEndOn').datetimepicker({
		language : 'cn',
		pickTime : false
	}).on('changeDate', function(ev) {
		Editorial.Contract.validateContractLicenseEndOn();
	});
	//
	var options = {
			beforeSubmit:Editorial.Contract.validate,
			success : Editorial.Contract.showResponse,
			url :  $('#ctx').val()+'/pages/crContract/form/editSubmit',
			type : 'post',
			clearForm : false,
			timeout : 3000
		};
	$('#contractForm').ajaxForm(options);
});
