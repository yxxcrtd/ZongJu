<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title></title>

<link rel="stylesheet" href="${ctx }/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
<script type="text/javascript" src="${ctx }/ztree/js/jquery.ztree.core-3.4.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/base/country/show.js"></script>
<script src="${ctx}/pages/base/country/showinit.js"></script>
<style type="text/css">
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
</style>

</head>

<body>
	<input type="hidden" id="id" value=<%=request.getParameter("id")%> />
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!--PAGE CONTENT BEGINS HERE-->
				<!-- InstanceBeginEditable name="EditRegion4" -->
				<div class="page-header position-relative">
					<h1>
						地域信息 <small> <i class="icon-double-angle-right"></i> 地域信息设置
						</small>
					</h1>
				</div>



				<div class="zTreeDemoBackground left">
					<ul id="treeDemo" class="ztree"></ul>
				</div>
				<div id="shadow"></div>
				<div id="rMenu">
					<ul>
						<li id="add" onclick='addObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';"><img src="${ctx}/pages/images/simpletree/folder_add.png" />添加</li>
						<li id="edit" onclick='editObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';"><img src="${ctx}/pages/images/simpletree/folder_edit.png" />修改</li>
						<li id="delete" onclick='delObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';"><img src="${ctx}/pages/images/simpletree/folder_delete.png" />删除</li>
					</ul>
				</div>
			</div>
		</div>
	</div>

</body>
</html>