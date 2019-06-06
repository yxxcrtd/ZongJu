<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/position/edit.js"></script>
</head>
<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>岗位信息
						<small><i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">新建</c:if>
							<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">修改</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<div class="table-header">基本信息</div>
					<div class="on-down">
					
					<form:form id="crmPositionForm" commandName="form" class="form-horizontal">
						<form:hidden path="position.id" id="position_id" />
						<form:hidden path="position.crmCorpTypeRelationship.id" id="position_crmCorpTypeRelationship_id" />
						<!-- ------------------表单部分开始----------------------------- -->
						<div class="control-group" id="priceDiv">
							<label class="control-label" for="form-field-1">岗位编号：</label>
							<div class="controls">
								<form:input path="position.code" id="position_code" placeholder="岗位编号"  class="span6" />
								<span id="position_code_span" class="help-inline"></span>
							</div>
						</div>
						<div class="control-group" id="gramsDiv">
							<label class="control-label" for="form-field-1">岗位名称：</label>
							<div class="controls">
								<form:input path="position.name" id="position_name" placeholder="岗位名称" class="span6" />
								<span id="position_name_span" class="help-inline"></span>
							</div>
						</div>
						<!-- ------------------表单部分开始----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" id="save">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>
						<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>