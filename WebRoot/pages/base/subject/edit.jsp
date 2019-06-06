<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
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
<script src="${ctx}/pages/base/subject/show.js"></script>
<script src="${ctx}/pages/base/subject/edit.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						分类法管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		新建分类法
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改分类法
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
					<!-- <form class="form-horizontal"> -->
					<form:form id="addForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<div id="nameDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								名称：
							</label>
							<div class="controls">
								<!-- <input type="text" name="obj.name" id="name" value="${form.obj.name }" placeholder="模块名称" /> -->
                 				<form:input path="obj.name" id="name" placeholder="名称" onblur="BMEP.Base.Subject.validateName();" class="span6"/>
								<span id="nameSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="codeDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								编号：
							</label>
							<div class="controls">
                 				<form:input path="obj.code" id="code" placeholder="编号" onblur="BMEP.Base.Subject.validateCode();" class="span6"/>
								<span id="codeSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="moreDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								英文名称：
							</label>
							<div class="controls">
                 				<form:input path="obj.nameEn" id="nameEn" placeholder="英文名称" class="span6"/>
								<span id="nameEnSpan" class="help-inline"></span>
							</div>
						</div>
							<div id="orderDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								序号：
							</label>
							<div class="controls">
                 				<form:input path="obj.order" id="order" placeholder="序号" onblur="BMEP.Base.Subject.validateOrder();" class="span6"/>
								<span id="orderSpan" class="help-inline"></span>
							</div>
						</div>
					<form:hidden path="obj.id"/>
					<form:hidden path="id"/>
					<form:hidden path="iDisplayLength"/>
					<form:hidden path="iDisplayStart"/>
					<form:hidden path="fatherId"/>
					<form:hidden path="flag"/>
					<!-- </form> -->
					
					<!-- ------------------表单部分结束----------------------------- -->
					</div>
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center; padding-left:0px;">
						<button id="save" class="btn btn-success" type="submit">
							<i class="icon-save bigger-110"></i>
							保存
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="reset" class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i>
							清空
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
