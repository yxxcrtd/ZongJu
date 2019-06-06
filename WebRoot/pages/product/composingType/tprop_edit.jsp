<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>类型属性维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/composingType/tprop_list.js"></script>
<script src="${ctx}/pages/product/composingType/tprop_edit.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						类型属性管理<small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新增类型属性
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改类型属性
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->

					<form:form id="composingTypePropForm" commandName="form" class="form-horizontal">
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-2">分类：</label>
								<div class="controls">
									<form:select path="composingTypeProp.composingTypePropClassify.ctpClassifyId" id="ctpClassifyId" class="span8">
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.composingTypePropClassifyList}" var="t">
											<form:option value="${t.ctpClassifyId}">${t.ctpClassifyName}</form:option>
										</c:forEach>
									</form:select>
									<span class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">名称：</label>
								<div class="controls">
									<form:input path="composingTypeProp.ctypePropName" id="ctypePropName" class="span8" />
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">编号：</label>
								<div class="controls">
									<form:input path="composingTypeProp.ctypePropCode" id="ctypePropCode" class="span8" />
								</div>
							</div>
							<div class="control-group span6" id="ctypePropOrderDiv">
								<label class="control-label" for="form-field-1">排序：</label>
								<div class="controls">
									<form:input path="composingTypeProp.ctypePropOrder" id="ctypePropOrder" onblur="BMEP.ProductTypeProp.order();" class="span8"/>
									<span class="help-inline" id="ctypePropOrderSpan"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">是否必填：</label>
								<div class="controls">
									<form:select path="composingTypeProp.ctypePropMust" id="ctypePropMust" class="span8">
										<form:option value="">--选择--</form:option>
											<form:options items="${form.must}"/>
									</form:select>
								</div>
							</div>
							<div class="control-group span6" style="float: left;">
								<label class="control-label" for="form-field-1">显示方式：</label>
								<div class="controls">
									<form:select path="composingTypeProp.ctypePropDisplay" id="ctypePropDisplay" class="span8">
										<form:option value="">--选择--</form:option>
											<form:options items="${form.display}"/>
									</form:select>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">国际化编码：</label>
								<div class="controls">
									<form:input path="composingTypeProp.ctypePropInternationCode" id="ctypePropInternationCode" class="span8" />
								</div>
							</div>
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">数据来源：</label>
								<div class="controls">
									<form:input path="composingTypeProp.ctypePropSource" id="ctypePropSource" class="span8" />
								</div>
							</div>
						</div>
						<form:hidden path="id" />
						<form:hidden path="tid" name="tid"/>
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
