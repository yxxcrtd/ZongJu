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
<script src="${ctx}/pages/stock/ivsite/list.js"></script>
<script src="${ctx}/pages/stock/ivsite/edit.js"></script>
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
						驻地管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建驻地
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改驻地
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
					<div class="row-fluid">
						<div id="siteCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								驻地编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.siteCode" id="siteCode" placeholder="驻地编号" onblur="Editorial.User.validateSiteCode();"/>
								<span id="siteCodeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="siteDescriptionDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								驻地描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.siteDescription" id="siteDescription" placeholder="驻地描述" onblur="Editorial.User.validateSiteDescription();"/>
								<span id="siteDescriptionSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid">
						<div id="WhFloorByWhIdDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属地域：
							</label>
							<div class="controls">
								 <form:select path="obj.region.id" id="bRegionid" onblur="Editorial.User.validateBRegionid();">
									<form:option value="">-选择-</form:option>
									<%-- <form:options items="${form.bRegionMap}" /> --%>
									<c:forEach var="bRegion" items="${form.bRegionList}">
										<form:option value="${bRegion.id}">${bRegion.name}</form:option>
									</c:forEach>
								</form:select>
								<span id="bRegionidSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
					<form:hidden path="id"/>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div style="text-align: center;">
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
