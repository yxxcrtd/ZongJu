ZongJu.User = function() {
    this.editor = null;
    this.artDialog = null;
    this.oTable1 = null;
};

ZongJu.User.validate = function() {
	var flag = true;
	if (!ZongJu.User.passWord()) {
		flag = false;
	}
	if (!ZongJu.User.userName()) {
		flag = false;
	}
	if (!ZongJu.User.institutionName()) {
		flag = false;
	}
	if (!ZongJu.User.disCount()) {
		flag = false;
	}
	if (!ZongJu.User.proPortion()) {
		flag = false;
	}
	return flag;
};

ZongJu.User.passWord = function() {
	var regex = /^[a-zA-Z]\w{5,17}$/;
	var val = $("#password").val();
	if ($("#password").val() == "") {
		$("#passwordDiv").addClass("error");
		$("#passwordSpan").html("密码不能为空！");
		return false;
	} else if(!regex.test(val)) {
		$("#passwordDiv").addClass("error");
		$("#passwordSpan").html("以字母开头，长度在6-18之间，只能包含字符、数字和下划线");
		return false;
	}else{
		$("#passwordDiv").removeClass("error").addClass("success");
		$("#passwordSpan").html("通过验证");
		return true;
	}
};

ZongJu.User.userName = function() {
	var val = $("#username").val();
	if ($("#username").val() == "") {
		$("#usernameDiv").addClass("error");
		$("#usernameSpan").html("用户名不能为空！");
		return false;
	}else{
		$("#usernameDiv").removeClass("error").addClass("success");
		$("#usernameSpan").html("通过验证");
		return true;
	}
};

ZongJu.User.institutionName = function() {
	if ($("#institutionName").val() == "") {
		$("#institutionNameDiv").addClass("error");
		$("#institutionNameSpan").html("机构名称不能为空！");
		return false;
	}else{
		$("#institutionNameDiv").removeClass("error").addClass("success");
		$("#institutionNameSpan").html("通过验证");
		return true;
	}
};

ZongJu.User.disCount = function() {
	var val = $("#discount").val();
	if ($("#discount").val() == "") {
		$("#discountDiv").addClass("error");
		$("#discountSpan").html("折扣不能为空！");
		return false;
	} else if(val>parseInt('99')) {
		$("#discountDiv").addClass("error");
		$("#discountSpan").html("折扣不大于100");
		return false;
	}else{
		$("#discountDiv").removeClass("error").addClass("success");
		$("#discountSpan").html("通过验证");
		return true;
	}
};

ZongJu.User.proPortion = function() {
	var val = $("#proportion").val();
	if ($("#proportion").val() == "") {
		$("#proportionDiv").addClass("error");
		$("#proportionSpan").html("分成比例不能为空！");
		return false;
	} else if(val>parseInt('99')) {
		$("#proportionDiv").addClass("error");
		$("#proportionSpan").html("分成比例不大于100");
		return false;
	}else{
		$("#proportionDiv").removeClass("error").addClass("success");
		$("#proportionSpan").html("通过验证");
		return true;
	}
};

showResponse = function(response, statusText) {
	disableAllButton();
	if (response.isSuccess == "true") {
		ajaxAlertSuccessMsg(response.msg, true);
		refreshFrameDataTableInLayer('oTable1');
		autoCloseCommonModal(5);
	} else {
		ajaxAlertErrorMsg(response.msg, true);
		enableAllButton();
	}
};

disableAllButton = function() {
	$("#save").attr('disabled', "true");
	$("#reset").attr('disabled', "true");
};

//显示机构用户新增页
addObj = function(id) {
	var url = $('#ctx').val() + "/pages/user/form/add";
	var commonModalCss = {
		"width": "450px",
		"height": "400px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//显示作者修改
modObj = function(id) {
	var url = $('#ctx').val() + "/pages/user/form/editSubmit?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"height": "400px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//显示机构会员修改
editObj = function(id) {
	var url = $('#ctx').val() + "/pages/user/form/editEnt?id=" + id;
	var commonModalCss = {
		"width": "450px",
		"height": "420px"
	};
	var commonModalBodyCss = {
		"max-height": "800px"
	};
	openCommonModalInFrame(url, commonModalCss, commonModalBodyCss);
};

//修改
$(function() {
	var options = {
		beforeSubmit:ZongJu.User.validate,	
		success : showResponse,
		url : $('#ctx').val() + "/pages/user/form/save",
		type : 'post',
		clearForm : false,
		timeout : 3000
	};
	$('#UserForm').ajaxForm(options);
});

//审核信息
verifyObj = function(id) {
	 openConfirmModalInFrame("您确定审核通过该用户吗？",function(){
		var url = $('#ctx').val()+"/pages/user/form/verify?id="+id;
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

//删除信息
delObj = function(id) {
	openConfirmModalInFrame("您确定删除该用户信息吗？",function(){
		var url = $('#ctx').val()+"/pages/user/form/delete?id="+id;
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

//重置用户密码
resetObj = function(id) {
	openConfirmModalInFrame("您确定重置该用户密码吗？",function(){
		var url = $('#ctx').val()+"/pages/user/form/reset?id="+id;
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
	var role =  $("#role").val();
	if (role == 2) {
		$(".hiddentr").show();
	} else {
		$(".hiddentr").hide();
	}
	oTable1 = $('#table_report').dataTable( {
            "bFilter": false, //开关，是否启用客户端过滤器
            "bProcessing": true, //当datatable获取数据时候是否显示正在处理提示信息。
            "bAutoWidth": false, //自适应宽度
            "sPaginationType": "full_numbers", //分页样式
            "bServerSide": true, //从服务器端取数据
           	"sAjaxSource": $('#ctx').val()+"/pages/user/form/manager?role=" + role, //mvc后台ajax调用接口。
           	"fnServerParams": function(aoData) {
           		aoData.push({"name": "username", "value": $("#query_user_name").val()});
           		aoData.push({"name" : "status", "value" : $("#query_user_status").val()});
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
        			"sTitle": "用户名",
            		"mDataProp": "username"
            },{
				"sTitle": "角色",
    			"mDataProp": "role",
                "fnRender": function (oObj) {
                	if(0==oObj.aData.role){
                		return "会员";
                	}else if(1==oObj.aData.role){
                		return "作者";
                	}else if(2==oObj.aData.role){
                		return "机构用户";
                	}
            	}
            }, {
        		"sTitle": "联系方式",
        		"mDataProp": "telephone"
			},{
				"sTitle": "注册时间",
        		"mDataProp": "createDate",
        		"sType" : 'date',
            	"fnRender" : function(oObj) {
            		var javascriptDate = new Date(oObj.aData.createDate).toLocaleDateString();
            		return "<div class= date>" + javascriptDate + "<div>";
            	}
			},{
				"sTitle": "用户状态",
        		"mDataProp": "status",
                 "fnRender": function (oObj) {
                    if(0==oObj.aData.status){
                    	return "未审核";
                    }else if(1==oObj.aData.status){
                    	return "已审核";
                    }
                 }
			},{
        		"sTitle": "操作",
        		"mData": null,
        	    "aTargets": [ -1 ],
                //自定义列的样式
                "fnRender": function (oObj) {
                    var start = '<div class="hidden-phone visible-desktop btn-group">';
                    //if("作者"==oObj.aData.role){
                    //	 var edit = '<button class="btn btn-mini btn-info" title="修改" onclick="modObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
                	//}
                    if("机构用户"==oObj.aData.role){
                   	 var edit = '<button class="btn btn-mini btn-info" title="修改" onclick="editObj(\'' + oObj.aData.id + '\')"><i class="icon-edit bigger-120"></i></button>';
               	    }
                    if("机构用户"!=oObj.aData.role){
                     var verify = '<button class="btn btn-mini btn-success" title="审核" onclick="verifyObj(\'' + oObj.aData.id + '\')"><i class="icon-check bigger-120"></i></button>';
                    }
                    var trash = '<button class="btn btn-mini btn-danger" title="删除" onclick="delObj(\'' + oObj.aData.id + '\')"><i class="icon-trash bigger-120"></i></button>';
                    var reset = '<button class="btn btn-mini btn-warning" title="密码重置" onclick="resetObj(\'' + oObj.aData.id + '\')"><i class="icon-repeat bigger-120"></i></button>';
                    var end = '</div>';
                    return start + edit + verify + trash + reset + end;
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