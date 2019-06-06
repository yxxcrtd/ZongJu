<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!-- InstanceBegin template="/Templates/template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta charset="utf-8" />
<title>分类法管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/personIdentity/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>人员标识管理 
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.identity.id == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">
						基本信息
					</div>
					<form:form  commandName="form" id="personIdentityform" class="form-horizontal">
					<div class="on-down">
						<div id="typeDiv" class="control-group">
							<label class="control-label" for="form-field-1">人员标识类型：</label>
							<div class="controls">
								<form:select path="identity.type" id="personIdentityType" onblur="Editorial.CRM.PersonInfo.validatePersonIdentityType();" class="span6" >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.identityTypeMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
								</form:select>
								<span id="typeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="defaultFlgDiv" class="control-group">
							<label class="control-label" for="form-field-1">是否主标识：</label>
							<div class="controls">
								<form:select path="identity.defaultFlg" id="personIdentityDefaultFlg" onblur="Editorial.CRM.PersonInfo.validatePersonIdentityDefaultFlg();" class="span6" >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.mainIdentityMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
								</form:select>
								<span id="defaultFlgSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="valueDiv" class="control-group">
							<label class="control-label" for="form-field-1">标识值：</label>
							<div class="controls">
								<form:input path="identity.value" id="personIdentityValue" placeholder="标识值" onblur="Editorial.CRM.PersonInfo.validatePersonIdentityValue();" class="span6"/>
								<span id="valueSpan" class="help-inline"></span>
							</div>
						</div>
					</div>
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" type="submit" id="save">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>
						
						<form:hidden path="iDisplayLength" />
						<form:hidden path="iDisplayStart" />
						<form:hidden path="identity.id" id="personIdentityId"/>
						<form:hidden path="identity.crmPersonTypeRelationship.id"/>
						
					</form:form>
					<!-- ------------------表单按钮部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>

</body>
</html>
