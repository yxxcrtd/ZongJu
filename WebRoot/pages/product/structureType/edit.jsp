<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品结构类型维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/structureType/list.js"></script>
<script src="${ctx}/pages/product/structureType/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>产品结构类型管理
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.structureType.id == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->

					<form:form id="corpTypeForm" commandName="form" class="form-horizontal">
					<form:hidden path="structureType.id" id="structureType_id" />
					<div class="control-group" id="structureType_name_div">
							<label class="control-label" for="form-field-1">结构类型名称：</label>
							<div class="controls">
								<form:input path="structureType.name" id="structureType_name" placeholder="结构类型名称" class="span6" />
								<span id="structureType_name_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="structureType_code_div">
							<label class="control-label" for="form-field-1">结构类型编号：</label>
							<div class="controls">
								<form:input path="structureType.code" id="structureType_code" onblur="Editorial.CRM.CorpType.code()" placeholder="结构类型编号" class="span6" />
								<span id="structureType_code_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="structureType_internationCode_div">
							<label class="control-label" for="form-field-1">国际化参数：</label>
							<div class="controls">
								<form:input path="structureType.internationCode" id="structureType_internationCode" placeholder="国际化参数" class="span6" />
								<span id="structureType_internationCode_span" class="help-inline"></span>
							</div>
						</div>
					
					<!-- ------------------表单部分结束----------------------------- -->
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center; padding-left:0px;">
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