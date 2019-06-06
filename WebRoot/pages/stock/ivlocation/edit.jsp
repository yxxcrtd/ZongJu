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
<script src="${ctx}/pages/stock/ivlocation/list.js"></script>
<script src="${ctx}/pages/stock/ivlocation/edit.js"></script>
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
						货位管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建货位
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改货位
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
					<div id="baseInfoContentDiv" class="on-down">
					<div class="row-fluid ">
					<div class="control-group span6 ">
					<div class="row-fluid ">
						<div id="locationCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationCode" id="locationCode" placeholder="货位编号" onblur="Editorial.User.validateLocationCode();"/>
								<span id="locationCodeSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid ">
						<div id="locationDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationDesc" id="locationDesc" placeholder="货位描述" onblur="Editorial.User.validateLocationDesc();"/>
								<span id="locationDescSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="locationLoadDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位承重：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationLoad" id="locationLoad" placeholder="货位承重" onblur="Editorial.User.validateLocationLoad();"/>
								<span id="locationLoadSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="locationCapacityDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货位容积：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationCapacity" id="locationCapacity" placeholder="货位容积" onblur="Editorial.User.validateLocationCapacity();"/>
								<span id="locationCapacitySpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="locationPackDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								最大包数：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationPack" id="locationPack" placeholder="最大包数" onblur="Editorial.User.validateLocationPack();"/>
								<span id="locationPackSpan" class="help-inline"></span>
							</div>
						</div></div>
						</div>
						<div class="control-group span6 ">
						<div class="row-fluid ">
						<div id="locationLooseDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								最大散数：
							</label>
							<div class="controls">
                 				<form:input path="obj.locationLoose" id="locationLoose" placeholder="最大散数" onblur="Editorial.User.validateLocationLoose();"/>
								<span id="locationLooseSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="ivFloorDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属层阶：
							</label>
							<div class="controls">
								 <form:select path="obj.floor.shFloorId" id="ivFloor" onblur="Editorial.User.validateIvFloor();">
									<form:option value="">-选择-</form:option>
									<c:forEach var="floor" items="${form.ivFloorList}">
										<form:option value="${floor.shFloorId}">${floor.shFloorDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivFloorSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="ivRegionalDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属区域：
							</label>
							<div class="controls">
								 <form:select path="obj.regional.areaId" id="ivRegional" onblur="Editorial.User.validateIvRegional();">
									<form:option value="">-选择-</form:option>
									<c:forEach var="regional" items="${form.ivRegionalList}">
										<form:option value="${regional.areaId}">${regional.areaDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivRegionalSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						</div>
						</div>
						</div>
					<form:hidden path="id"/>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button id="save" class="btn btn-success" type="submit'">
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
