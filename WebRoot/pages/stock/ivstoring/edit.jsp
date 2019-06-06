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
<script src="${ctx}/pages/stock/ivstoring/list.js"></script>
<script src="${ctx}/pages/stock/ivstoring/edit.js"></script>
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
						存货信息管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建存货信息
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改存货信息
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
						<div id="PProductInfoDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								产品名称：
							</label>
							<div class="controls">
                 				<form:select path="obj.product.id" id="PProductInfo" onblur="Editorial.User.validatePProductInfo();">
									<form:option value="">-选择-</form:option>
									<c:forEach var="pProduct" items="${form.pProductList}">
											<form:option value="${pProduct.id}">${pProduct.title}</form:option>
									</c:forEach>
								</form:select>
								<span id="PProductInfoSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="ivStoringPackDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								包数：
							</label>
							<div class="controls">
                 				<form:input path="obj.ivStoringPack" id="ivStoringPack" placeholder="包数" onblur="Editorial.User.validateIvStoringPack();"/>
								<span id="ivStoringPackSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="ivStoringLooseDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								散数：
							</label>
							<div class="controls">
								<form:input path="obj.ivStoringLoose" id="ivStoringLoose" placeholder="散数" onblur="Editorial.User.validateIvStoringLoose();"/>
								<span id="ivStoringLooseSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="ivLocationDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属货位：
							</label>
							<div class="controls">
								 <form:select path="obj.location.locationId" id="ivLocation" onblur="Editorial.User.validateIvLocation();">
									<form:option value="">-选择-</form:option>
									<c:forEach var="location" items="${form.ivLocationList}">
											<form:option value="${location.locationId}">${location.locationDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivLocationSpan" class="help-inline"></span>
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
