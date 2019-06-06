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
<script src="${ctx}/pages/crm/crmCorpAccount/edit.js"></script>
</head>
<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>账户信息
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.account.id == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<div class="table-header">基本信息</div>
					<div class="on-down">
					
					<form:form id="crmCorpAccountForm" commandName="form" class="form-horizontal">
						<form:hidden path="account.id" id="account_id" />
						<form:hidden path="account.crmCorpTypeRelationship.id" />
						
						<!-- ------------------表单部分开始----------------------------- -->
						

						<div class="control-group" id="account_term_div">
							<label class="control-label" for="form-field-1">账期：</label>
							<div class="controls">
								<form:input path="account.term" id="account_term" placeholder="账期" class="span6" />
								<span id="account_term_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="account_type_div">
							<label class="control-label" for="form-field-1">账户类型：</label>
							<div class="controls">
								<form:input path="account.type" id="account_type" placeholder="账户类型" class="span6" />
								<span id="account_type_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="account_level_div">
							<label class="control-label" for="form-field-1">重要程度：</label>
							<div class="controls">
								<form:input path="account.level" id="account_level" placeholder="重要程度" class="span6" />
								<span id="account_level_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="account_currency_div">
							<label class="control-label" for="form-field-1">默认币种：</label>
							<div class="controls">
								<form:input path="account.currency" id="account_currency" placeholder="默认币种" class="span6" />
								<span id="account_currency_span" class="help-inline"></span>
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