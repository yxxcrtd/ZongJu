<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品类型属性维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/productTypeProp/edit.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品类型属性管理<small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新增产品类型属性
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改产品类型属性
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
					<form:form id="productTypePropForm" commandName="form"
						class="form-horizontal">
					<div class="on-down">
						<div class="control-group">
							<label class="control-label" for="form-field-2">分类：</label>
							<div class="controls">
								<form:select path="productTypeProp.typePropClassify.id" id="typePropClassify">
									<c:forEach items="${form.productTypePropClassifyList}" var="t">
										<form:option value="${t.id}">${t.name}</form:option>
									</c:forEach>
								</form:select>
								<span class="help-inline"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">名称：</label>
							<div class="controls">
								<form:input path="productTypeProp.name" id="name"  />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">编号：</label>
							<div class="controls">
								<form:input path="productTypeProp.code" id="code"  />
							</div>
						</div>
						<div class="control-group" id="orderDiv">
							<label class="control-label" for="form-field-1">排序：</label>
							<div class="controls">
								<form:input path="productTypeProp.order" id="order"  onblur="alert('oo');BMEP.Product.ProductTypeProp.order();"/>
								<span class="help-inline" id="orderSpan"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">显示方式：</label>
							<div class="controls">
							<form:select path="productTypeProp.display" id="display">
									<form:option value="">--选择--</form:option>
									<c:forEach items="${form.display}" var="t">
										<form:option value="${t.key}">${t.value}</form:option>
									</c:forEach>
							</form:select>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">是否必填：</label>
							<div class="controls">
							<form:select path="productTypeProp.must" id="must">
									<form:option value="">--选择--</form:option>
									<c:forEach items="${form.must}" var="t">
										<form:option value="${t.key}">${t.value}</form:option>
									</c:forEach>
							</form:select>
							</div>
						</div>
						<div class="control-group" id="diveffective">
							<label class="control-label" for="form-field-1">数据来源：</label>
							<div class="controls">
								<form:input path="productTypeProp.source" id="source"  />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">国际化编码：</label>
							<div class="controls">
								<form:input path="productTypeProp.internationCode" id="internationCode"  />
							</div>
						</div>
						<form:hidden path="id" id="id"/>
						<form:hidden path="tid" id="tid"/>
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
