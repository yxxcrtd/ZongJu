<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>人员管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="${ctx}/css/jquery.autocomplete.css" />
<link rel="stylesheet" href="${ctx}/css/TextboxList.css" />
<link href="${ctx}/css/zTreeStyle/zTreeStyle.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/jqueryui/base/jquery-ui.min.css" rel="stylesheet" type="text/css" />
<link href="${ctx}/css/jqueryui/excite-bike/jquery.ui.theme.css" rel="stylesheet" type="text/css" />
<script type="text/javascript">
var availablePersons = [];

	<c:forEach var="person" items="${form.availablePersonList}">
	var availablePersonList = {};
	availablePersonList.id = "${person.id}";
	availablePersonList.code = "${person.code}";
	availablePersonList.name = "${person.name}";
	availablePersonList.telephone = "${person.telephone}";
	availablePersonList.phone = "${person.phone}";
	availablePersonList.address = "${person.address}";
	availablePersonList.postCode = "${person.postCode}";
	availablePersonList.email = "${person.email}";
	availablePersons.push(availablePersonList);
	</c:forEach>
	
</script>
<script type="text/javascript" src="${ctx}/js/jquery.ui.core.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ui.widget.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ui.position.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ui.menu.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ui.autocomplete.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ztree.core-3.5.min.js"></script>
<script type="text/javascript" src="${ctx}/js/jquery.ztree.excheck-3.5.min.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/personInfo/edit.js"></script>
<script src="${ctx}/pages/crm/personInfo/tree.js"></script>

</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						${form.personType.name}信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建${form.personType.name}信息
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改${form.personType.name}信息
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
				<form:form id="personInfoEditForm" commandName="form" class="form-horizontal">
					<div id="baseInfoDiv" class="table-header on">
						<i class="icon-caret-down"></i>
						基本信息
					</div>
					<div class="on-down" id="baseInfoContentDiv">
						<!-- ------------------表单部分开始----------------------------- -->
							<div class="row-fluid ">
								<div class="control-group span6 ">
									
									<div class="row-fluid ">
										<div id="codeDiv" class="control-group">
											<label class="control-label" for="form-field-2">${form.personType.name}编号：</label>
											<div class="controls">
												<form:input path="obj.code" id="code" placeholder="人员编号" onblur="Editorial.CRM.PersonInfo.validatePersonCodeUnique();" class="span8" />
												<span id="codeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid">
											<div id="corpDiv" class="control-group zTreeDemoBackground left">
												<label class="control-label" for="form-field-1"> 公司名称：</label>
												<div class="controls">
													<form:input path="corpName" id="corpName" placeholder="公司名称" class="span8" onblur="Editorial.CRM.PersonInfo.validateCorp();" onclick="showMenu();" readonly="true" />
													<form:hidden path="obj.crmCorpTypeRelationship.id" id="corpId" />
													<span id="corpSpan" class="help-inline"></span>
												</div>
											</div>
											<div id="menuContent" class="menuContent" style="display: none; position: absolute; z-index: 999999;">
												<ul id="treeManage" class="ztree" style="margin-top: 10px; border: 1px solid #617775; background: #f0f6e4; width: 220px; height: 160px; overflow-y: scroll; overflow-x: auto;"></ul>
											</div>
									</div>
									<div class="row-fluid ">
										<div id="addressDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 联系地址：</label>
											<div class="controls">
												<form:input path="obj.address" id="address" placeholder="联系地址" class="span8" />
												<span id="addressSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="emailDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 电子邮箱：</label>
											<div class="controls">
												<form:input path="obj.email" id="email" placeholder="电子邮箱" class="span8" />
												<span id="emailSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									
								</div>
								<div class="control-group span6 ">
									
									<div class="row-fluid ">
										<div id="nameDiv" class="control-group">
											<label class="control-label" for="form-field-1"><span class='red'>*</span> ${form.personType.name}名称：</label>
											<div class="controls">
												<form:input path="obj.name" id="name" placeholder="人员名称" onblur="Editorial.CRM.PersonInfo.validateName();" class="span8" />
												<span id="nameSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="telePhoneDiv" class="control-group">
											<label class="control-label" for="form-field-2"> 座机：</label>
											<div class="controls">
												<form:input path="obj.telephone" id="telePhone" placeholder="座机" class="span8" />
												<span id="telePhoneSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="phoneDiv" class="control-group">
											<label class="control-label" for="form-field-2"> 手机：</label>
											<div class="controls">
												<form:input path="obj.phone" id="phone" placeholder="手机" class="span8" />
												<span id="phoneSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="faxDiv" class="control-group">
											<label class="control-label" for="form-field-2"> 传真：</label>
											<div class="controls">
												<form:input path="obj.fax" id="fax" placeholder="传真" class="span8" />
												<span id="faxSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="postCodeDiv" class="control-group">
											<label class="control-label" for="form-field-2"> 邮编：</label>
											<div class="controls">
												<form:input path="obj.postCode" id="postCode" placeholder="邮编" class="span8" />
												<span id="postCodeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									
								</div>
							</div>
							
							<form:hidden path="code" id="personType" />
							<form:hidden path="obj.id" id="personId" />
							<form:hidden path="personType.id" id="personType_id" />
							
							<form:hidden path="relation.id" id="relation_id" />
							
							
							<form:hidden path="id" />
					</div>
						
						<div class="row-fluid" id="cp1"></div>
						
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-success" type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset">
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
