<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>公司类型属性管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/corpTypeProp/list.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						公司类型属性<small> <i class="icon-double-angle-right"></i> 公司类型属性列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="Editorial.CRM.CorpTypeProp.editObj('');">
							<i class="icon-plus-sign bigger-125"></i> 新建公司类型属性
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
										<form:input path="name" id="query_personTypeProp_name" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">编码：</label>
									<div class="controls">
										<form:input path="code" id="query_personTypeProp_code" class="span10" />
									</div>
								</div>
							</div>

							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.CRM.CorpTypeProp.query();">
									<i class="icon-zoom-in bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-repeat bigger-110"></i>重置
								</button>
							</div>
						</div>
						<form:hidden path="id" id="id"/>
						<form:hidden path="tid" id="tid"/>
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;公司类型列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
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
</body>
</html>
