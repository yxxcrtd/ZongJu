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
<script src="${ctx}/pages/stock/ivregional/list.js"></script>
<script src="${ctx}/pages/stock/ivregional/edit.js"></script>
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
						区域管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建区域
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改区域
					    	</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
				<div class="table-header on">
						基本信息
					</div>
					<div class="on-down">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="form" commandName="form" action="editSubmit" class="form-horizontal">
						<div id="areaCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								区域编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.areaCode" id="areaCode" placeholder="区域编号" onblur="Editorial.User.validateAreaCode();"/>
								<span id="areaCodeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="areaDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								区域描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.areaDesc" id="areaDesc" placeholder="区域描述" onblur="Editorial.User.validateAreaDesc();"/>
								<span id="areaDescSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="activityLevelDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								区域级别：
							</label>
							<div class="controls">
								 <form:input path="obj.activityLevel" id="activityLevel" placeholder="区域级别" onblur="Editorial.User.validateActivityLevel();"/>
								<span id="activityLevelSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="ivAreaTypeDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								区域类型：
							</label>
							<div class="controls">
								 <form:select path="ivAreaType.areaTypeId" id="ivAreaType" onblur="Editorial.User.validateIvAreaType();">
									<form:option value="">-选择-</form:option>
									<%-- <form:options items="${form.ivAreaTypeMap}" /> --%>
									<c:forEach var="areaType" items="${form.ivAreaTypeList}">
											<form:option value="${areaType.areaTypeId}">${areaType.areaTypeDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivAreaTypeSpan" class="help-inline"></span>
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
