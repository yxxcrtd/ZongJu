<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title"/></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/stock/ivwarehouse/list.js"></script>
<script src="${ctx}/pages/stock/ivwarehouse/edit.js"></script>
<script type="text/javascript">
	/**** 页面Validate国际化 ****/
	var System_Info_ValidateCode_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateCode.Blank'/>";
	var System_Info_ValidateName_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateName.Blank'/>";
	var System_Info_ValidateStatus_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateStatus.Blank'/>";
</script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						仓库管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建仓库
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改仓库
					    	</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">
						基本信息
					</div>
					<div class="on-down">
					<form:form id="form" commandName="form" action="editSubmit" class="form-horizontal">
						<div id="warehouseCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								仓库编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.warehouseCode" id="warehouseCode" placeholder="仓库编号" onblur="Editorial.User.validateWarehouseCode();"/>
								<span id="warehouseCodeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="warehouseDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								仓库描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.warehouseDesc" id="warehouseDesc" placeholder="仓库描述" onblur="Editorial.User.validateWarehouseDesc();"/>
								<span id="warehouseDescSpan" class="help-inline"></span>
							</div>
						</div>
						
						<div id="warehouseLoadDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								仓库承重：
							</label>
							<div class="controls">
                 				<form:input path="obj.warehouseLoad" id="warehouseLoad" placeholder="仓库承重" onblur="Editorial.User.validateWarehouseLoad();"/>
								<span id="warehouseLoadSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="warehouseCapacityDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								仓库容积：
							</label>
							<div class="controls">
                 				<form:input path="obj.warehouseCapacity" id="warehouseCapacity" placeholder="仓库容积" onblur="Editorial.User.validateWarehouseCapacity();"/>
								<span id="warehouseCapacitySpan" class="help-inline"></span>
							</div>
						</div>
						<div id="ivSiteDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所在驻地：
							</label>
							<div class="controls">
								 <form:select path="obj.site.siteId" id="ivSite" onblur="Editorial.User.validateIvSite();">
									<form:option value="">-选择-</form:option>
									<%-- <form:options items="${form.ivSiteMap}" /> --%>
									<c:forEach var="site" items="${form.ivSiteList}">
														<form:option value="${site.siteId}">${site.siteDescription}</form:option>
												</c:forEach>
								</form:select>
								<span id="ivSiteSpan" class="help-inline"></span>
							</div>
						</div>
					<form:hidden path="id"/>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button id="save" class="btn btn-success" type="submit">
							<i class="icon-save bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Save"/>
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="reset" class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Reset"/>
						</button>
					</div>
					<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
					</div>
					<!-- ------------------表单部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>
