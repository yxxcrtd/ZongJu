<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>授权类型数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crLicenseType/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>授权类型
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crLicenseType.licenseTypeId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crLicenseTypeForm" commandName="form" class="form-horizontal">
						<form:hidden path="crLicenseType.licenseTypeId" id="crLicenseType_licenseTypeId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								
								<div class="control-group span12" id="crLicenseType_licenseTypeCode_div">
									<label class="control-label" for="form-field-1">授权类型编号：</label>
									<div class="controls">
									<form:input path="crLicenseType.licenseTypeCode" id="crLicenseType_licenseTypeCode" onblur="Editorial.CrLicenseType.validate_licenseTypeCode()" cssClass="span10" placeholder="授权类型编号" />
										<span id="crLicenseType_licenseTypeCode_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crLicenseType_licenseTypeName_div">
									<label class="control-label" for="form-field-1">授权类型名称：</label>
									<div class="controls">
									<form:input path="crLicenseType.licenseTypeName" id="crLicenseType_licenseTypeName" onblur="Editorial.CrLicenseType.validate_licenseTypeName()" cssClass="span10" placeholder="授权类型名称" />
										<span id="crLicenseType_licenseTypeName_span" class="help-inline"></span>
									</div>
								</div>
								
								<!-- 字段结束 -->
							</div>
						</div>
						<!-- on_down结束 -->
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-success" id="save" type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset" id="reset">
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
</html>