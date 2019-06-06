<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品类型管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/productType/list.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						基础信息管理 <small> <i class="icon-double-angle-right"></i> 基础信息管理列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-primary" onclick="BMEP.ProductType.editObj('');">
							<i class="icon-edit bigger-125"></i> 新建产品
						</button>
					</div>
					<!-- ------------------功能按钮结束----------------------------- -->

					<!-- ------------------查询开始----------------------------- -->
					<form:form id="form" commandName="form" action="manager" class="form-horizontal">
						<div class="row-fluid">
							<div class="row-fluid">
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">名称：</label>
									<div class="controls">
										<form:input path="name" id="query_productType_name" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">编码：</label>
									<div class="controls">
										<form:input path="code" id="query_productType_code" class="span10" />
									</div>
								</div>
							</div>

							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="BMEP.ProductType.query();">
									<i class="icon-zoom-in bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-repeat bigger-110"></i>重置
								</button>
							</div>
						</div>
					</form:form>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;基础信息管理列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='30%' align='center'></th>

							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='30%' align='center'></th>
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
