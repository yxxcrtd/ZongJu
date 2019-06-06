<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link href="${ctx}/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/jqueryui/base/jquery-ui.min.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/jqueryui/excite-bike/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${ctx}/js/jquery-ui.min.1.9.2.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ztree.core-3.5.min.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/corp/tree.js"></script>
<script src="${ctx}/pages/crm/corp/custom.js"></script>
<style type="text/css">
#sidebar {
	width: 30%;
}

#sidebar:before {
	width: 30%;
}

#main-content {
	margin-left: 30%;
}

#sidebar-shortcuts {
	line-height: 0px;
	max-height: 0px;
}

div#rMenu {
	visibility: hidden;
	position: absolute;
	top: 0;
	text-align: left;
	padding: 2px;
	backgroundColor: #FFFFFF;
}

div#rMenu ul {
	listStyle: none;
	margin: 0px;
	background-color: #FFFFFF;
	border: 1px solid #999;
	width: 140px;
	padding: 1px;
}

div#rMenu ul li {
	margin: 0px;
	color: #000;
	display: block;
	cursor: default;
	padding: 1px;
	border: 1px solid #fff;
	background-color: transparent;
	font: normal 12px arial, tahoma, helvetica, sans-serif;
}

div#rMenu ul li img {
	vertical-align: middle;
}

div#shadow {
	background-color: #b6bdd2;
	position: absolute;
	opacity: 0.2;
	zIndex: 499;
}

.ui-autocomplete {
	max-height: 355px;
	overflow-y: auto;
	overflow-x: hidden;
}
</style>
</head>
<body>
	<div id="sidebar">
		<div id="sidebar-collapse" onclick="BMEP.Client.ClientInfo.Tree.hideTree();">
			<i class="icon-double-angle-left"></i>
		</div>
		<div id="sidebar-shortcuts">
			<div class="zTreeDemoBackground left">
				<ul id="treeManage" class="ztree"></ul>
			</div>
			<div id="shadow"></div>
			<div id="rMenu">
				<ul>
					<li id="add" onclick="BMEP.Client.ClientInfo.Tree.editTreeNode('I')" onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">创建${form.corpType.name}</li>
					<li id="edit" onclick="BMEP.Client.ClientInfo.Tree.editTreeNode('U')" onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">修改${form.corpType.name}</li>
					<li id="delete" onclick='BMEP.Client.ClientInfo.Tree.delObj()' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">删除${form.corpType.name}</li>
					<li id="upload" onclick='BMEP.Client.ClientInfo.Tree.uploadObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">上传</li> 
				</ul>
			</div>
		</div>
	</div>
	<div id="main-content" class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="content" class="hide">
		
			<div class="clearfix">
				<div id="page-content" class="clearfix">
					<div class="row-fluid">
						<!-- ------------------导航页面部分开始----------------------------- -->
						<div class="page-header position-relative">
							<h1>
								${form.corpType.name}管理<small> <i class="icon-double-angle-right"></i> <span id="subTitle"></span>
								</small>
							</h1>
						</div>
						<!-- ------------------导航页面部分结束----------------------------- -->
						<div class="row-fluid">
							<!-- ------------------表单部分开始----------------------------- -->
							<form:form id="crmCorpForm" commandName="form" class="form-horizontal">
								<form:hidden path="action" id="action" />
								<form:hidden path="node.id" id="node_id" />
								<form:hidden path="corpType.id" id="corpType_id" />
								<form:hidden path="corpType.code" id="corpType_code" />
								<form:hidden path="corpType.name" id="corpType_name" />
								<form:hidden path="corp.id" id="corp_id" />
								<form:hidden path="relation.id" id="relation_id" />
								
								<div class="table-header on" id="main_data_btn">
									<i class="icon-caret-down"></i>&nbsp;&nbsp;基本信息
								</div>
								<div id="main_data_div" class="on-down">

								<div class="row-fluid">
									<div class="control-group span4" id="corp_code_div">
										<label class="control-label" for="form-field-1">编码：</label>
										<div class="controls">
											<form:input path="corp.code" id="corp_code" class="span10" autocomplete="off" onblur="Editorial.Crm.Corp.code()" />
											<span id="corp_code_span" class="help-inline"></span>
										</div>
									</div>
									
									<div class="control-group span4" id="corp_shortName_div">
										<label class="control-label" for="form-field-1">简称：</label>
										<div class="controls">
											<form:input path="corp.shortName" id="corp_shortName" class="span10" onblur="Editorial.Crm.Corp.shortName()" />
											<span id="corp_shortName_span" class="help-inline"></span>
										</div>
									</div>
									
								</div>
								
								<div class="row-fluid">
									<div class="control-group span4">
										<label class="control-label" for="form-field-1">全称：</label>
										<div class="controls">
											<form:input path="corp.fullName" id="corp_fullName" class="span10" />
											<span id="email_defaultFlg_span" class="help-inline"></span>
										</div>
									</div>
									
									<div class="control-group span4">
										<label class="control-label" for="form-field-1">简介：</label>
										<div class="controls">
											<form:textarea path="corp.introduction" id="corp_introduction" class="span11 h50" />
											<span id="email_defaultFlg_span" class="help-inline"></span>
										</div>
									</div>
								</div>
								
								</div>
								
								<div class="row-fluid" id="cp1"></div>
								
								<!-- ------------------表单部分结束----------------------------- -->
								<!-- ------------------表单按钮部分开始----------------------------- -->
								<div class="form-actions"
									style="text-align: center; padding-left: 0px;">
									<button class="btn btn-success" id="save" type="submit">
										<i class="icon-save bigger-110"></i> 保存
									</button>
									&nbsp; &nbsp; &nbsp;
									<button class="btn btn-inverse" id="reset"
										onclick="BMEP.Client.ClientInfo.Tree.clearCustomer()">
										<i class="icon-undo bigger-110"></i> 清空
									</button>
								</div>
							</form:form>
							
							<!-- ------------------表单按钮部分结束----------------------------- -->
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>