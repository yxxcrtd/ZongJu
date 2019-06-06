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
<script src="${ctx}/pages/product/printCosts/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						印装费用信息 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
						<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">基本信息</div>
					<form:form id="printCostsForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<div id="baseInfoContentDiv" class="on-down">
							<!-- ------------------表单部分开始----------------------------- -->
							<div class="row-fluid ">
								<div class="control-group" id="nameDiv">
									<label class="control-label" for="form-field-1">项目：</label>
									<div class="controls">
										 <form:select path="obj.name" id="name" onblur="Editorial.PrintCosts.isNullOrName();">
											<form:option value="">-选择-</form:option>
											<form:options items="${form.xmMap}" />
										</form:select> 
										<span id="nameSpan" class="help-inline"></span>
									</div>
								</div>

							</div>
							<div class="row-fluid ">
								<div class="control-group" id="priceDiv">
									<label class="control-label" for="form-field-1">单价：</label>
									<div class="controls">
										<form:input path="obj.price" id="price" placeholder="单价" onblur="Editorial.PrintCosts.isNullOrPrice();"/>
										<span id="priceSpan" class="help-inline"></span>
									</div>
								</div>
							</div>
							<div class="row-fluid ">
								<div class="control-group" id="numDiv">
									<label class="control-label" for="form-field-1">结算数量：</label>
									<div class="controls">
										<form:input path="obj.num" id="num" placeholder="结算数量" onblur="Editorial.PrintCosts.isNullOrNum();"/>
										<span id="numSpan" class="help-inline"></span>
									</div>
								</div>
							</div>
							<div class="row-fluid ">
								<div class="control-group" id="unitDiv">
									<label class="control-label" for="form-field-1">结算单位：</label>
									<div class="controls">
										<form:input path="obj.unit" id="unit" placeholder="结算单位" onblur="Editorial.PrintCosts.isNullOrUnit();"/>
										<span id="unitSpan" class="help-inline"></span>
									</div>
								</div>
							</div>
							<div class="row-fluid ">
								<div class="control-group" id="totalDiv">
									<label class="control-label" for="form-field-1">总价：</label>
									<div class="controls">
										<form:input path="obj.total" id="total" placeholder="总价" onblur="Editorial.PrintCosts.isNullOrTotal();"/>
										<span id="totalSpan" class="help-inline"></span>
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

					</form:form>
			</div>
		</div>
	</div>
</body>
</html>
