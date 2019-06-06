Editorial.Product.ProductInfo = function() {
	this.editor = null;
	this.artDialog = null;
	this.oTable1 = null;
};

//完善版权信息
Editorial.Product.ProductInfo.perfectObj = function(id) {
	var url = $('#ctx').val()+"/pages/copyright/form/saveSubmit?id=" + id;
	var commonModalCss = {
			"width" : "450px",
			"height" : "400px"
		};
		var commonModalBodyCss = {
			"max-height": "1000px"
		};
		openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//查看版权交易信息
Editorial.Product.ProductInfo.lookObj = function(id) {
	var url = $('#ctx').val() + "/pages/trade/form/index?id=" + id;
	window.location.href = url;
};
//下载Pdf文件
//Editorial.Product.ProductInfo.download = function(id){
//	var url = $('#ctx').val()+"/pages/resource/split/form/download?id="+id;
//	window.location=url;
//};

Editorial.Product.ProductInfo.splitXML = function(isbn) {
	var url = $("#ctx").val() + "/pages/productStructure/form/splitXML";
	url += "?product.isbn=" + isbn;
	window.location.href = url;
};

Editorial.Product.ProductInfo.viewElement = function(id) {
	var url = $("#ctx").val() + "/pages/productStructure/form/index";
	url += "?product.id=" + id;
	window.location.href = url;
};


Editorial.Product.ProductInfo.editObj = function(id, code) {
    console.log("code:" + code);
	var url=$('#ctx').val() + "/pages/resource/split/form/edit/" + code + "?id=" + id;
	window.location.href = url;
};

Editorial.Product.ProductInfo.editShowObj = function(id) {
	var url = $('#ctx').val() + "/pages/resource/split/form/editShow/" + $("#code").val() + "?id=" + id;
	var commonModalCss = {
		"width" : "840px",
		"height" : "560px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.addObj = function() {
    var code = $('#productTypeSelect').val();
    var flag = $('#flag').val();
    console.log("code:" + code);
    console.log("flag:" + flag);
    if(code == null || code == ""){
        window.parent.alertMsg('successModal', 'successMsg', "请选择产品类别");

    } else {
        var url = $('#ctx').val() + "/pages/resource/split/form/edit/" + code + "?flag=" + flag;
        window.location.href = url;
    }

};

Editorial.Product.ProductInfo.marc = function() {
	var url = $('#ctx').val() + "/pages/resource/split/form/updateMarc";
	var commonModalCss = {
		"width" : "600px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};


Editorial.Product.ProductInfo.upload = function() {
	var url = $('#ctx').val() + "/pages/resource/split/form/upload?code" + $("#code").val();
	var commonModalCss = {
		"width" : "840px",
		"height" : "400px"
	};
	var commonModalBodyCss = {
		"max-height" : "900px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

Editorial.Product.ProductInfo.attachment = function(id) {
	var url = $('#ctx').val() + "/pages/attachment/form/index?piid=" + id;
	window.location.href = url;
};

Editorial.Product.ProductInfo.delObj = function(id) {
	openConfirmModalInFrame("您确定执行删除该产品信息操作吗？", function() {
		var url = $('#ctx').val() + "/pages/resource/split/form/delete?id=" + id;
		$.ajax({
			"dataType" : 'json',
			"type" : "POST",
			"url" : url,
			"cache" : false,
			"success" : function(response) {
				if (response.isSuccess == "true") {
					window.parent.alertMsg('successModal', 'successMsg', response.msg);
					refreshFrameDataTableInFrame('Editorial.Product.ProductInfo.oTable1');
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

Editorial.Product.ProductInfo.query = function() {
	// 重新刷新页面Table
	refreshFrameDataTableInFrame('Editorial.Product.ProductInfo.oTable1');
};

Editorial.Product.ProductInfo.retrieveData = function(sSource, aoData, fnCallback) {
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
			alert(response);
			alert("error%%%");
		}
	});
};

$(function() {
    $(".on").click(function(){
		$(".on-down").slideToggle();
	});
    if($("#flag").val()=="product"){
        $("#appTitle").hide();
        $("#appAddButton").hide();
        $("#appListTitle").hide();
    } else if($("#flag").val()=="app") {
        $("#productTitle").hide();
        $("#productAddButton").hide();
        $("#productListTitle").hide();
    };
	Editorial.Product.ProductInfo.oTable1 = $('#table_report').dataTable({
		"bFilter" : false, // 开关，是否启用客户端过滤器
		"bProcessing" : true, // 当datatable获取数据时候是否显示正在处理提示信息。
		"bAutoWidth" : false, // 自适应宽度
		"sPaginationType" : "full_numbers", // 分页样式
		"bServerSide" : true, // 从服务器端取数据
		"sAjaxSource" : $('#ctx').val() + "/pages/resource/split/form/manager?flag="+$('#flag').val(), // mvc后台ajax调用接口。
		"fnServerParams" : function(aoData) {
			aoData.push({
				"name" : "queryIsbn",
				"value" : $("#query_module_isbn").val()
			});
			aoData.push({
				"name" : "title",
				"value" : $("#query_module_title").val()
			});
			aoData.push({
				"name" : "author",
				"value" : $("#query_module_author").val()
			});
		},
		"fnServerData" : Editorial.Product.ProductInfo.retrieveData,
		"fnDrawCallback" : function(oSettings) {
			for ( var i = 0, iLen = oSettings.aiDisplay.length; i < iLen; i++) {
				$('td:eq(0)', oSettings.aoData[oSettings.aiDisplay[i]].nTr).html(i + oSettings._iDisplayStart + 1);
			}
		},
		"aoColumns" : [ {
			"sTitle" : "序号",
			"mDataProp" : "id"
		}, {
            "sTitle" : "类型",
            "mDataProp" : "productType.name"
        }, {
			"sTitle" : "书名",
			"mDataProp" : "title"
		}, {

			"sTitle" : "ISBN号",
			"mDataProp" : "isbn"
		}, {
			"sTitle" : "作者",
			"mDataProp" : "author"
		}, {
			"sTitle" : "出版社",
			"mDataProp" : "publisher"
		}, {

            "sTitle" : "出版日期",
            "mDataProp" : "datePublication",
			"sType" : 'date',
    		"fnRender" : function(oObj) {
    			var javascriptDate = new Date(oObj.aData.datePublication).toLocaleDateString();
    			return "<div class= date>" + javascriptDate + "<div>";
    			}
        }, {

        	"sTitle" : "二维码",
			"mDataProp" : "twoDimension",
	            "fnRender": function (oObj) {
	           	 	return '<img src="'+"/upload/" + oObj.aData.isbn + "/" + oObj.aData.twoDimension + '" width="60"/>';
       	   }
		}, {
			"sTitle" : "操作",
			"mData" : null,
			"aTargets" : [ -1 ],
			// 自定义列的样式
			"fnRender" : function(oObj) {
				var start = '<div class="hidden-phone visible-desktop btn-group">';
				var perfect = '<button class="btn btn-mini btn-warning" title="完善版权信息" onclick="Editorial.Product.ProductInfo.perfectObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                var view = '<button class="btn btn-mini btn-success" title="查看版权交易信息" onclick="Editorial.Product.ProductInfo.lookObj(\'' + oObj.aData.id + '\')"><i class="icon-eye-open bigger-120"></i></button>';
				var edit = '<button class="btn btn-mini btn-warning" title="修改" onclick="Editorial.Product.ProductInfo.editObj(\'' + oObj.aData.id + '\', \'' + oObj.aData.productType.code + '\')"><i class="icon-edit bigger-120"></i></button>';
				var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="Editorial.Product.ProductInfo.delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
				//var download = '<button class="btn btn-mini btn-info" title="下载pdf" onclick="Editorial.Product.ProductInfo.download(\'' + oObj.aData.id + '\')"><i class="icon-download-alt bigger-120"></i></button>';
				var splitXML = '<button class="btn btn-mini btn-info" title="拆分碎片" onclick="Editorial.Product.ProductInfo.splitXML(\'' + oObj.aData.isbn + '\')"><i class="icon-retweet bigger-120"></i></button>';
				var viewElement = '<button class="btn btn-mini btn-success" title="查看碎片" onclick="Editorial.Product.ProductInfo.viewElement(\'' + oObj.aData.id + '\')"><i class="icon-zoom-in bigger-120"></i></button>';
				
				var end = '</div>';
				return start + perfect + view + edit + trash + splitXML + viewElement + end; // download +
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
	$('[data-rel=tooltip]').tooltip();
});