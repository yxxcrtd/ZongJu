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
<script src="${ctx}/pages/stock/ivshelf/list.js"></script>
<script src="${ctx}/pages/stock/ivshelf/edit.js"></script>
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
						货架管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建货架
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改货架
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
						<div id="shelfCodeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货架编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfCode" id="shelfCode" placeholder="货架编号" onblur="Editorial.User.validateShelfCode();"/>
								<span id="shelfCodeSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid ">
						<div id="shelfDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								货架描述：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfDesc" id="shelfDesc" placeholder="货架描述" onblur="Editorial.User.validateShelfDesc();"/>
								<span id="shelfDescSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="shelfLoadDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货架承重：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfLoad" id="shelfLoad" placeholder="货架承重" onblur="Editorial.User.validateShelfLoad();"/>
								<span id="shelfLoadSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="shelfCapacityDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货架容积：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfCapacity" id="shelfCapacity" placeholder="货架容积" onblur="Editorial.User.validateShelfCapacity();"/>
								<span id="shelfCapacitySpan" class="help-inline"></span>
							</div>
						</div></div>
						
						</div>
						<div class="control-group span6 ">
						<div class="row-fluid ">
						<div id="shelfTypeDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货架类型：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfType" id="shelfType" placeholder="货架类型" onblur="Editorial.User.validateShelfType();"/>
								<span id="shelfTypeSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						<div id="shelfUsageDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								货架用途：
							</label>
							<div class="controls">
                 				<form:input path="obj.shelfUsage" id="shelfUsage" placeholder="货架用途" onblur="Editorial.User.validateShelfUsage();"/>
								<span id="shelfUsageSpan" class="help-inline"></span>
							</div>
						</div></div>
						<div class="row-fluid ">
						 <div id="ivWarehouseRoomDiv" class="control-group">
							<label class="control-label" for="form-field-2">
								所属仓库房间：
							</label>
							<div class="controls">
								 <form:select path="obj.warehouseRoom.whRoomId" id="ivWarehouseRoomId" onblur="Editorial.User.validateWhRoomId();">
									<form:option value="">-选择-</form:option>
									<c:forEach var="warehouseRoom" items="${form.ivWarehouseRoomList}">
											<form:option value="${warehouseRoom.whRoomId}">${warehouseRoom.whRoomDesc}</form:option>
									</c:forEach>
								</form:select>
								<span id="ivWarehouseRoomSpan" class="help-inline"></span>
							</div>
						</div> </div>
						</div>
					<form:hidden path="id"/>
					</div>
					</div>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button id="save" class="btn btn-success" type="submit" >
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
