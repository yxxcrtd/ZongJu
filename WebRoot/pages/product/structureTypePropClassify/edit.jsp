<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品结构类型属性分类维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/structureTypePropClassify/list.js"></script>
<script src="${ctx}/pages/product/structureTypePropClassify/edit.js"></script>
</head>						  
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<!-- ------------------导航页面部分开始----------------------------- -->
			<div class="row-fluid">
				<div class="page-header position-relative">
					<h1>产品结构类型属性分类管理
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.structureTypePropClassify.id == null}">新增</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="structureTypePropClassifyForm" commandName="form" class="form-horizontal">
						<form:hidden path="structureType.id" />
						<form:hidden path="structureTypePropClassify.id" />
						
						<div class="control-group">
							<label class="control-label" for="form-field-1">父分组：</label>
							<div class="controls">
								<form:select path="structureTypePropClassify.parentClassify.id" class="span6">
									<form:option value="">----选择----</form:option>
									<form:options items="${form.classifyList}" itemValue="id" itemLabel="name" />
								</form:select>
							</div>
						</div>
					
						<div class="control-group" id="structureTypePropClassify_name_div">
							<label class="control-label" for="form-field-1">结构分类名称：</label>
							<div class="controls">
								<form:input path="structureTypePropClassify.name" id="structureTypePropClassify_name" placeholder="结构分类名称" class="span6" />
								<span id="structureTypePropClassify_name_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="structureTypePropClassify_code_div">
							<label class="control-label" for="form-field-1">结构分类编码：</label>
							<div class="controls">
								<form:input path="structureTypePropClassify.code" id="structureTypePropClassify_code" placeholder="结构分类编码" class="span6" />
								<span id="structureTypePropClassify_code_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="structureTypePropClassify_order_div">
							<label class="control-label" for="form-field-1">结构分类排序：</label>
							<div class="controls">
								<form:input path="structureTypePropClassify.order" id="structureTypePropClassify_order" placeholder="结构分类排序" class="span6" />
								<span id="structureTypePropClassify_order_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="structureTypePropClassify_internationCode_div">
							<label class="control-label" for="form-field-1">国际化参数：</label>
							<div class="controls">
								<form:input path="structureTypePropClassify.internationCode" id="structureTypePropClassify_internationCode" placeholder="国际化参数" class="span6" />
								<span id="structureTypePropClassify_internationCode_span" class="help-inline"></span>
							</div>
						</div>

						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
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