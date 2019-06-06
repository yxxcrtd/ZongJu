<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/material/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						材料信息 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
					<div class="table-header on">基本信息</div>
					<form:form id="materialForm" commandName="form"
						class="form-horizontal">
						<div id="baseInfoContentDiv" class="on-down">
							<div class="row-fluid ">
								<!-- ------------------表单部分开始----------------------------- -->
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div class="control-group" id="nameDiv">
											<label class="control-label" for="form-field-1">材料名称：</label>
											<div class="controls">
												<form:input path="material.name" id="name"
													placeholder="材料名称"  onblur="Editorial.PrintCosts.isNullOrName();"/>
												<span id="nameSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="priceDiv">
											<label class="control-label" for="form-field-1">单价：</label>
											<div class="controls">
												<form:input path="material.price" id="price"
													placeholder="单价"  onblur="Editorial.PrintCosts.isNullOrPrice();"/>
												<span id="priceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="gramsDiv">
											<label class="control-label" for="form-field-1">材料克重：</label>
											<div class="controls">
												<form:input path="material.grams" id="grams"
													placeholder="材料克重"  onblur="Editorial.PrintCosts.isNullOrGrams();"/>
												<span id="gramsSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="typeDiv">
											<label class="control-label" for="form-field-1">材料类型：</label>
											<div class="controls">
												<form:select path="material.type" id="type"  onblur="Editorial.PrintCosts.isNullOrType();">
													<form:option value="">-选择-</form:option>
													<form:options items="${form.typeMap}" />
												</form:select> 
												<span id="typeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="specDiv">
											<label class="control-label" for="form-field-1">材料规格：</label>
											<div class="controls">
												<form:select path="material.spec" id="spec"  onblur="Editorial.PrintCosts.isNullOrSpec();">
													<form:option value="">-选择-</form:option>
													<form:options items="${form.specMap}" />
												</form:select> 
												<span id="specSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
								</div>
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div class="control-group" id="numDiv">
											<label class="control-label" for="form-field-1">用纸量：</label>
											<div class="controls">
												<form:input path="material.num" id="num" placeholder="用纸量"  onblur="Editorial.PrintCosts.isNullOrNum();"/>
												<span id="numSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="paperTypeDiv">
											<label class="control-label" for="form-field-1">用纸类型：</label>
											<div class="controls">
												<form:select path="material.paperType" id="paperType"  onblur="Editorial.PrintCosts.isNullOrPaperType();">
													<form:option value="">-选择-</form:option>
													<form:options items="${form.paperTypeMap}" />
												</form:select> 
												<span id="paperTypeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="stockCountDiv">
											<label class="control-label" for="form-field-1">库存：</label>
											<div class="controls">
												<form:input path="material.stockCount" id="stockCount"
													placeholder="库存"  onblur="Editorial.PrintCosts.isNullOrStockCount();"/>
												<span id="stockCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="stockIdDiv">
											<label class="control-label" for="form-field-1">所属库存：</label>
											<div class="controls">
												<form:input path="material.stockId" id="stockId"
													placeholder="所属库存"  onblur="Editorial.PrintCosts.isNullOrStockId();"/>
												<span id="stockIdSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form:hidden path="id" id="id" />
							<form:hidden path="printId" id="printId" />
							<!-- ------------------表单部分开始----------------------------- -->
							<!-- ------------------表单按钮部分开始----------------------------- -->
							<div class="form-actions"
								style="text-align: center; padding-left: 0px;">
								<button class="btn btn-success" id="save">
									<i class="icon-save bigger-110"></i> 保存
								</button>
								&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset">
									<i class="icon-undo bigger-110"></i> 清空
								</button>
							</div>
							<!-- ------------------表单按钮部分结束----------------------------- -->

						</div>
					</form:form>
			</div>
		</div>
	</div>
</body>
</html>
