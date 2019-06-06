<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--[if IE 7]>
	<link rel="stylesheet" href="css/font-awesome-ie7.min.css" />
<![endif]-->
<!--[if lte IE 8]>
	<link rel="stylesheet" href="css/ace-ie.min.css" />
<![endif]-->
<!--inline styles if any-->
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/personInfo/list.js"></script>
</head>

<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						${form.personType.name}信息 <small> <i class="icon-double-angle-right"></i> ${form.personType.name}信息列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				
				
				<div class="row-fluid">

					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="Editorial.CRM.PersonInfo.addObj();">
							<i class="icon-plus-sign bigger-125"></i> 新建${form.personType.name}信息
						</button>
						<button class="btn btn-small btn-primary" onclick="Editorial.CRM.PersonInfo.uploadObj();">
							<i class="icon-plus-sign bigger-125"></i> 导入${form.personType.name}信息
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
										<form:input path="name" id="query_module_name" class="span10" />
									</div>
								</div>

							</div>
							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.CRM.PersonInfo.query();">
									<i class="icon-zoom-in bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-repeat bigger-110"></i>重置
								</button>
							</div>
						</div>
						<form:hidden path="code" id="code"/>
						<form:hidden path="clientId" id="clientId"/>
						<input type="hidden" id="personType" value="${form.code}"> 
						<input type="hidden" id="personTypeId" value="${form.personType.id}" >
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->

					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;${form.personType.name}信息列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
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
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>

							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
