<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品结构类型属性维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/structureTypeProp/list.js"></script>
<script src="${ctx}/pages/product/structureTypeProp/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>产品结构类型属性管理
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.structureTypeProp.id == null}">新增</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->

					<form:form id="structureTypePropForm" commandName="form" class="form-horizontal">
						<form:hidden path="structureType.id" />
						<form:hidden path="structureTypeProp.id" />
					
						<div class="row-fluid">
						
							<div class="control-group span6" id="typePropClassifyDiv">
								<label class="control-label" for="form-field-2">分类：</label>
								<div class="controls">
									<form:select path="structureTypeProp.structureTypePropClassify.id" id="typePropClassify" class="span8" onblur="Editorial.CRM.CorpTypeProp.classify();">
										<form:option value="">--选择--</form:option>
										<form:options items="${form.classifyList}" itemValue="id" itemLabel="name" />
									</form:select>
									<span class="help-inline" id="typePropClassifySpan"></span>
								</div>
							</div>
							
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">名称：</label>
								<div class="controls">
									<form:input path="structureTypeProp.name" id="name" class="span8" />
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">编号：</label>
								<div class="controls">
									<form:input path="structureTypeProp.code" id="code" class="span8" />
								</div>
							</div>
							<div class="control-group span6" id="orderDiv">
								<label class="control-label" for="form-field-1">排序：</label>
								<div class="controls">
									<form:input path="structureTypeProp.order" id="order"  onblur="Editorial.CRM.CorpTypeProp.order();" class="span8"/>
									<span class="help-inline" id="orderSpan"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">是否必填：</label>
								<div class="controls">
									<form:select path="structureTypeProp.must" id="must" class="span8">
										<form:option value="">--选择--</form:option>
										<form:options items="${form.dicMust}" />
									</form:select>
								</div>
							</div>
							<div class="control-group span6" style="float: left;">
								<label class="control-label" for="form-field-1">显示方式：</label>
								<div class="controls">
									<form:select path="structureTypeProp.display" id="display" class="span8">
										<form:option value="">--选择--</form:option>
										<form:options items="${form.dicDisplay}" />
									</form:select>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">国际化编码：</label>
								<div class="controls">
									<form:input path="structureTypeProp.internationCode" id="internationCode" class="span8" />
								</div>
							</div>
							<div class="control-group span6" id="diveffective">
								<label class="control-label" for="form-field-1">数据来源：</label>
								<div class="controls">
									<form:input path="structureTypeProp.source" id="source" class="span8" />
								</div>
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