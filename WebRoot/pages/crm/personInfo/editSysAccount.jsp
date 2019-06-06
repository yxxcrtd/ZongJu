<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>人员信息</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/personInfo/editSysAccount.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						人员信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.account==null}">
			    	新建登陆信息
			    </c:if> <c:if test="${form.account!=null}">
			    	修改登陆信息
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="editSysAccontForm" commandName="form" class="form-horizontal">


						<div id="nameDiv" class="control-group ">
							<label class="control-label" for="form-field-2"> 账户名称：</label>
							<div class="controls">
								<form:input path="account.name" id="name" placeholder="账户名称" onblur="Editorial.CRM.PersonInfo.SysAccount.validateName();" class="span6" />
								<span id="nameSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="passDiv" class="control-group ">
							<label class="control-label" for="form-field-1"> 账户密码：</label>
							<div class="controls">
								<form:input path="account.pass" id="pass" placeholder="账户密码" onblur="Editorial.CRM.PersonInfo.SysAccount.validatePass();" class="span6" />
								<span id="passSpan" class="help-inline"></span>
							</div>
						</div>


						<div id="statusDiv" class="control-group ">
							<label class="control-label" for="form-field-1"> 用户状态：</label>
							<div class="controls">
								<form:select path="account.status" id="status" class="span6">
									<c:forEach items="${form.statusMap}" var="t">
										<form:option value="${t.key}">${t.value}</form:option>
									</c:forEach>
								</form:select>
								<span id="statusSpan" class="help-inline"></span>
							</div>
						</div>
						
						<div id="encryptionDiv" class="control-group ">
							<label class="control-label" for="form-field-1"> 加密：</label>
							<div class="controls">
								<form:select path="account.encryption" id="encryption" class="span6">
									<c:forEach items="${form.encryptionMap}" var="t">
										<form:option value="${t.key}">${t.value}</form:option>
									</c:forEach>
								</form:select>
								<span id="statusSpan" class="help-inline"></span>
							</div>
						</div>
						<form:hidden path="id" />
						<form:hidden path="account.id"/>
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-info" type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>

						<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>
<!-- InstanceEnd -->
</html>
