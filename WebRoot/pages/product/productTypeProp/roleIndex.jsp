<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品类型属性管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/productTypeProp/roleIndex.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品类型属性<small> <i class="icon-double-angle-right"></i> 产品类型属性权限列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->

					<!-- ------------------查询开始----------------------------- -->
					<form:form id="form" commandName="form" action="manager" class="form-horizontal">
						<div class="row-fluid">
							<div class="row-fluid">
								<div class="control-group span6">
									<label class="control-label" for="form-field-1">角色名：</label>
									<div class="controls">
										<form:select path="roleId" id="roleId">
											<c:forEach items="${form.roleMap}" var="t">
												<form:option id="${t.key}" value="${t.key}">${t.value}</form:option>
											</c:forEach>
										</form:select>
									</div>
								</div>
								<div class="control-group span6">
									<label class="control-label" for="form-field-1">权限：</label>
									<div class="controls">
										<form:select path="authorityId" id="authorityId">
											<c:forEach items="${form.authorityMap}" var="t">
												<form:option value="${t.key}">${t.value}</form:option>
											</c:forEach>
										</form:select>
									</div>
								</div>
							</div>
						</div>
						<form:hidden path="productTypePropId" id="productTypePropId" />
						<form:hidden path="propSource" id="propSource"/>
					</form:form>
					<div style="text-align: center;">
						<button class="btn btn-small btn-success" type="button" onclick="BMEP.Product.ProductRole.addRole();">
							<i class="icon-save bigger-110"></i>添加
						</button>
					</div>

					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;产品类型权限列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
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
