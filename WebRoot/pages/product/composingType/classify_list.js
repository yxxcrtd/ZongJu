jQuery.namespace('BMEP.PTypePropClassify');

BMEP.PTypePropClassify = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};
BMEP.Product.PTypePropClassify.role = function(id) {
	var url = $('#ctx').val()+"/pages/composingTypeProp/form/roleIndex?productTypePropId="+id+"&propSource=productClassify";
	var commonModalCss = {
		"width" : "750px",
		"height" : "310px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.PTypePropClassify.editObj = function(id) {
	if (id == undefined) {
		id = '';
	}
	var url = $('#ctx').val() + "/pages/composingType/cTypePropClassify/form/edit?id=" + id + "&tid=" + $("#t_classify_id").val();
	var commonModalCss = {
		"width" : "480px",
		"height" : "300px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

BMEP.PTypePropClassify.delObj = function(id) {
	openConfirmModalInFrame(
			"您确定执行删除属性分类操作吗？",
			function() {
				var url = $('#ctx').val() + "/pages/composingType/cTypePropClassify/form/delete?id=" + id;
				$.ajax({
							"dataType" : 'json',
							"type" : "POST",
							"url" : url,
							"cache" : false,
							"success" : function(response) {
								if (response.isSuccess == "true") {
									window.parent.alertMsg('successModal', 'successMsg', response.msg);
									refreshFrameDataTableInFrame('BMEP.PTypePropClassify.oTable1');
								} else {
									window.parent.alertMsg('errorModal', 'errorMsg', response.msg);
								}
							},
							"error" : function(response) {
								alert("error");
							}
						});
			}, null, null);
};

BMEP.PTypePropClassify.query = function() {
	initPagingParamsInFrame('BMEP.PTypePropClassify.oTable1');
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('BMEP.PTypePropClassify.oTable1');
};

BMEP.PTypePropClassify.retrieveData = function(sSource, aoData, fnCallback) {
	$.ajax({
		"dataType" : 'json',
		"type" : "POST",
		"url" : sSource,
		"cache" : false,
		"data" : aoData,
		"success" : function(response) {
			fnCallback(response);
		},
		"error" : function(response) {
			alert("error");
		}
	});
};

BMEP.PTypePropClassify.createDataTable = function(typeId) {
	$("#t_classify_id").val(typeId);
	if (BMEP.PTypePropClassify.oTable1 != null) {
		BMEP.PTypePropClassify.query();
	} else {
		BMEP.PTypePropClassify.oTable1 = $('#table_classify')
				.dataTable(
						{
							"bFilter" : false, // 开关，是否启用客户端过滤器
							"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
							"bAutoWidth" : false, // 自适应宽度
							"sPaginationType" : "full_numbers", // 分页样式
							"bServerSide" : true, // 从服务器端取数据
							"sAjaxSource" : $('#ctx').val()+ "/pages/composingType/cTypePropClassify/form/manager", // mvc后台ajax调用接口。
							"fnServerParams" : function(aoData) {
								aoData.push({"name" : "ctpClassifyName","value" : $("#query_module_ctpClassifyName").val()});
								aoData.push({"name" : "ctpClassifyCode","value" : $("#query_module_ctpClassifyCode").val()});
								aoData.push({"name": "tid", "value": $("#t_classify_id").val()});
								
							},
							"fnServerData" : BMEP.PTypePropClassify.retrieveData,
							"fnDrawCallback" : function(oSettings) {
								for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
									$('td:eq(0)',oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i+ oSettings._iDisplayStart+ 1);
								}
							},
							"aoColumns" : [
									{
										"sTitle" : "序号",
										"mDataProp" : "ctpClassifyId"
									},
									{
										"sTitle" : "名称",
										"mDataProp" : "ctpClassifyName"
									},
									{
										"sTitle" : "编码",
										"mDataProp" : "ctpClassifyCode"
									},
									{
										"sTitle" : "排序",
										"mDataProp" : "ctpClassifyOrder"
									},
									{
										"sTitle" : "国际化编码",
										"mDataProp" : "ctpClassifyInternationCode"
									},
									{
										"sTitle" : "操作",
										"mData" : null,
										"aTargets" : [ -1 ],
										// 自定义列的样式
										"fnRender" : function(oObj) {
											var start = '<div class="hidden-phone visible-desktop btn-group">';
											var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="BMEP.PTypePropClassify.editObj(\''
													+ oObj.aData.ctpClassifyId
													+ '\')"><i class="icon-edit bigger-120"></i></button>';
											var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="BMEP.PTypePropClassify.delObj(\''
													+ oObj.aData.ctpClassifyId
													+ '\')"><i class="icon-trash bigger-120"></i></button>';
											var role = '<button class="btn btn-mini btn-success" title="权限" onclick="BMEP.Product.PTypePropClassify.role(\''
												+ oObj.aData.ctpClassifyId
												+ '\')"><i class="icon-list bigger-120"></i></button>';
											var end = '</div>';
											return start + edit + trash +role+ end;
										}
									} ],

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
	}
	$('[data-rel=tooltip]').tooltip();
};