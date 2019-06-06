<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title" /></title>
<link rel="stylesheet" href="${ctx }/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
<script type="text/javascript" src="${ctx }/ztree/js/jquery.ztree.core-3.4.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/productType/tree_init.js"></script>
<script src="${ctx}/pages/product/productType/tree.js"></script>
<script src="${ctx}/pages/product/productType/classify_list.js"></script>
<script src="${ctx}/pages/product/productType/tprop_list.js"></script>
<script src="${ctx}/pages/product/productType/licence_list.js"></script>
<script src="${ctx}/pages/product/productType/tree.js"></script>
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
</style>
</head>
<body>
	<div id="sidebar">
		<div id="sidebar-collapse" onclick="BMEP.Product.ProductType.Tree.hideTree();">
			<i class="icon-double-angle-left"></i>
		</div>
		<div id="sidebar-shortcuts">
			<div class="zTreeDemoBackground left">
				<ul id="treeDemo" class="ztree"></ul>
			</div>
			<div id="shadow"></div>
			<div id="rMenu">
				<ul>
					<li id="add1" onclick='BMEP.Product.ProductType.Tree.addObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">创建类型</li>
					<li id="edit" onclick='BMEP.Product.ProductType.Tree.editObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">修改类型</li>
					<li id="delete" onclick='BMEP.Product.ProductType.Tree.delObj();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">删除类型</li>
					<li id="licence" onclick='BMEP.Product.ProductType.Tree.showLicenceList();' onmouseover="this.style.backgroundColor='#b6bdd2';" onmouseout="this.style.backgroundColor='';">授权管理</li>
				</ul>
			</div>
		</div>
	</div>
	<div id="main-content" class="clearfix">
		<div id="classifyContent" class="hide">
			<div class="clearfix">
				<div id="page-content" class="clearfix">
					<div class="row-fluid">
						<!-- ------------------导航页面部分开始----------------------------- -->
						<div class="page-header position-relative">
							<h1>
								类型属性分类 <small> <i class="icon-double-angle-right"></i> 类型属性分类列表
								</small>
							</h1>
						</div>
						<!-- ------------------导航页面部分结束----------------------------- -->
						<div class="row-fluid">
							<!-- ------------------功能页面部分开始----------------------------- -->
							<!-- ------------------功能按钮开始----------------------------- -->
							<div class="ace-thumbnails">
								<button class="btn btn-small btn-primary" onclick="BMEP.PTypePropClassify.editObj();">
									<i class="icon-plus-sign bigger-125"></i> 新建类型属性分类
								</button>
							</div>
							<!-- ------------------功能按钮结束----------------------------- -->

							<!-- ------------------查询开始----------------------------- -->
							<div class="table-header on">
								<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
		                    </div>
		                    <div class="on-down">
								<form:form id="form" commandName="form" class="form-horizontal">
									<div class="row-fluid">
										<div class="row-fluid">
											<div class="control-group span3">
												<label class="control-label" for="form-field-1">名称：</label>
												<div class="controls">
													<form:input path="name" id="query_module_name" class="span8" />
												</div>
											</div>
											<div class="control-group span3">
												<label class="control-label" for="form-field-1">编码：</label>
												<div class="controls">
													<form:input path="code" id="query_module_code" class="span8" />
												</div>
											</div>
										</div>
	
										<div style="text-align: center;">
											<button class="btn btn-small btn-success" type="button" onclick="BMEP.PTypePropClassify.query();">
												<i class="icon-zoom-in bigger-110"></i>查询
											</button>
											&nbsp;&nbsp;
											<button type="reset" class="btn btn-small btn-inverse">
												<i class="icon-repeat bigger-110"></i>重置
											</button>
										</div>
									</div>
									<form:hidden path="id" />
									<form:hidden path="tid" id="t_classify_id" />
								</form:form>
							</div>
							<!-- ------------------查询结束----------------------------- -->
							<!-- ------------------功能页面部分结束----------------------------- -->
							<!-- ------------------列表页面部分开始----------------------------- -->

							<div class="table-header">
                                <i class="icon-flag"></i>&nbsp;&nbsp;产品类型属性分类列表
                            </div>
							<table id="table_classify" class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
                                        <th width='10%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='15%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='15%' align='center'></th>
									</tr>
								</thead>
								<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

								</tbody>
								<tfoot>
									<tr>
                                        <th width='10%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='15%' align='center'></th>
                                        <th width='20%' align='center'></th>
                                        <th width='15%' align='center'></th>
									</tr>
								</tfoot>
							</table>
							<!-- ------------------列表页面部分结束----------------------------- -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<div id="propertyContent" class="hide">
			<div class="clearfix">
				<div id="page-content" class="clearfix">
					<div class="row-fluid">
						<!-- ------------------导航页面部分开始----------------------------- -->
						<div class="page-header position-relative">
							<h1>
								产品类型属性<small> <i class="icon-double-angle-right"></i> 类型属性列表
								</small>
							</h1>
						</div>
						<!-- ------------------导航页面部分结束----------------------------- -->
						<div class="row-fluid">
							<!-- ------------------功能页面部分开始----------------------------- -->
							<!-- ------------------功能按钮开始----------------------------- -->
							<div class="ace-thumbnails">
								<button class="btn btn-small btn-primary" onclick="BMEP.ProductTypeProp.editObj();">
									<i class="icon-plus-sign bigger-125"></i> 新建类型属性
								</button>
							</div>
							<!-- ------------------功能按钮结束----------------------------- -->

							<!-- ------------------查询开始----------------------------- -->
							<div class="table-header on">
								<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
		                    </div>
		                    <div class="on-down">
								<form:form id="form" commandName="form" action="manager" class="form-horizontal">
									<div class="row-fluid">
										<div class="row-fluid">
											<div class="control-group span3">
												<label class="control-label" for="form-field-1">名称：</label>
												<div class="controls">
													<form:input path="name" id="query_productTypeProp_name" class="span8" />
												</div>
											</div>
											<div class="control-group span3">
												<label class="control-label" for="form-field-1">编码：</label>
												<div class="controls">
													<form:input path="code" id="query_productTypeProp_code" class="span8" />
												</div>
											</div>
										</div>
	
										<div style="text-align: center;">
											<button class="btn btn-small btn-success" type="button" onclick="BMEP.ProductTypeProp.query();">
												<i class="icon-zoom-in bigger-110"></i>查询
											</button>
											&nbsp;&nbsp;
											<button type="reset" class="btn btn-small btn-inverse">
												<i class="icon-repeat bigger-110"></i>重置
											</button>
										</div>
									</div>
									<form:hidden path="id" />
									<form:hidden path="tid" id="t_property_id" />
								</form:form>
							</div>
							<!-- ------------------查询结束----------------------------- -->
							<!-- ------------------功能页面部分结束----------------------------- -->
							<!-- ------------------列表页面部分开始----------------------------- -->
							<div class="table-header">
                                <i class="icon-flag"></i>&nbsp;&nbsp;产品类型列表
                            </div>
							<table id="table_property" class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th width='5%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='5%' align='center'></th>
										<th width='5%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='25%' align='center'></th>

									</tr>
								</thead>
								<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

								</tbody>
								<tfoot>
									<tr>
										<th width='5%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='5%' align='center'></th>
										<th width='5%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='10%' align='center'></th>
										<th width='25%' align='center'></th>
									</tr>
								</tfoot>
							</table>
							<!-- ------------------列表页面部分结束----------------------------- -->
						</div>
					</div>
				</div>

			</div>
		</div>
        <div id="licenceContent" class="hide">
            <div class="clearfix">
                <div id="page-content" class="clearfix">
                    <div class="row-fluid">
                        <!-- ------------------导航页面部分开始----------------------------- -->
                        <div class="page-header position-relative">
                            <h1>
                                产品类型属性
                                <small><i class="icon-double-angle-right"></i> 授权信息列表
                                </small>
                            </h1>
                        </div>
                        <!-- ------------------导航页面部分结束----------------------------- -->
                        <div class="row-fluid">
                            <!-- ------------------功能页面部分开始----------------------------- -->
                            <!-- ------------------功能按钮开始----------------------------- -->
                            <div class="ace-thumbnails">
                                <button class="btn btn-small btn-primary" onclick="Editorial.ProductType.Licence.editObj();">
                                    <i class="icon-plus-sign bigger-125"></i> 新建授权信息
                                </button>
                                <!-- 
                                <button class="btn btn-small btn-primary"
                                        onclick="Editorial.ProductType.Licence.upload();">
                                    <i class="icon-plus-sign bigger-125"></i> 导入授权信息
                                </button>
                                 -->
                            </div>
                            <!-- ------------------功能按钮结束----------------------------- -->

                            <!-- ------------------查询开始----------------------------- -->
                            <div class="table-header on">
                                <i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
                            </div>
                            <div class="on-down">
                                <form:form id="form" commandName="form" action="manager" class="form-horizontal">
                                    <div class="row-fluid">
                                        <div class="row-fluid">
                                            <div class="control-group span3">
                                                <label class="control-label" for="form-field-1">名称：</label>

                                                <div class="controls">
                                                    <form:input path="name" id="query_license_name" class="span8" style="width: 180px;" onkeydown="if (13 == event.keyCode) { $('.myquery').focus(); }"/>
                                                </div>
                                            </div>

                                        </div>

                                        <div style="text-align: center;">
                                            <button class="btn btn-small btn-success myquery" type="button"
                                                    onclick="Editorial.ProductType.Licence.query();">
                                                <i class="icon-zoom-in bigger-110"></i>查询
                                            </button>
                                            &nbsp;&nbsp;
                                            <button type="reset" class="btn btn-small btn-inverse">
                                                <i class="icon-repeat bigger-110"></i>重置
                                            </button>
                                        </div>
                                    </div>
                                    <form:hidden path="id"/>
                                    <form:hidden path="tid" id="t_property_id"/>
                                </form:form>
                            </div>
                            <!-- ------------------查询结束----------------------------- -->
                            <!-- ------------------功能页面部分结束----------------------------- -->
                            <!-- ------------------列表页面部分开始----------------------------- -->
                            <div class="table-header">
                                <i class="icon-flag"></i>&nbsp;&nbsp;授权信息列表
                            </div>
                            <table id="table_licence" class="table table-striped table-bordered table-hover">
                                <thead>
                                <tr>
                                    <th width='5%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>

                                </tr>
                                </thead>
                                <tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

                                </tbody>
                                <tfoot>
                                <tr>
                                    <th width='5%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                    <th width='10%' align='center'></th>
                                </tr>
                                </tfoot>
                            </table>
                            <!-- ------------------列表页面部分结束----------------------------- -->
                        </div>
                    </div>
                </div>

            </div>
        </div>
	</div>
</body>
</html>