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
<script src="${ctx}/pages/stock/ivfloor/list.js"></script>
<script src="${ctx}/pages/stock/ivfloor/edit.js"></script>
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
						货位层管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建货位层
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改货位层
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
						<div id="shFloorCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位层编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.shFloorCode" id="shFloorCode" placeholder="货位层编号" onblur="Editorial.User.validateShFloorCode();"/>
								<span id="shFloorCodeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="shFloorDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位层描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.shFloorDesc" id="shFloorDesc" placeholder="货位层描述" onblur="Editorial.User.validateShFloorDesc();"/>
								<span id="shFloorDescSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="shFloorLoadDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货位层承重：
							</label>
							<div class="controls">
								 <form:input path="obj.shFloorLoad" id="shFloorLoad" placeholder="货位层承重" onblur="Editorial.User.validateShFloorLoad();"/>
								<span id="shFloorLoadSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="shFloorCapacityDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货位层容积：
							</label>
							<div class="controls">
								 <form:input path="obj.shFloorCapacity" id="shFloorCapacity" placeholder="货位层容积" onblur="Editorial.User.validateShFloorCapacity();"/>
								<span id="shFloorCapacitySpan" class="help-inline"></span>
							</div>
						</div>
						
						<div id="ivShelfIdDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属货架：
							</label>
							<div class="controls">
								 <form:select path="ivShelf.shelfId" id="ivShelfId" onblur="Editorial.User.validateIvShelfId();">
									<form:option value="">-选择-</form:option>
									<%-- <form:options items="${form.ivShelfMap}" /> --%>
									<c:forEach var="shelf" items="${form.ivShelfList}">
										
										<form:option value="${shelf.shelfId}">${shelf.shelfDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivShelfIdSpan" class="help-inline"></span>
							</div>
						</div>
					<form:hidden path="id"/>
					<form:hidden path="obj.shFloorId" id="shFloorId"/>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div style="text-align: center;">
						<button id="save" class="btn btn-success" onclick="Editorial.User.save();">
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
