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
<script src="${ctx}/pages/product/priceDiscount/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品价格折扣 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
				
					<div class="table-header on">
						基本信息
					</div>
					<!-- ------------------------------------------价格折扣----------------------------------------- -->
					<form:form commandName="form" class="form-horizontal" id="discountForm"  >
						<div class="on-down">
					 	<div class="row-fluid ">
							<div class="control-group" id="priceDiscountCountDiv">
								<label class="control-label" for="form-field-1">价格折扣数量：</label>
								<div class="controls">
									<form:input path="productPriceDiscount.priceDiscountCount"  id="priceDiscountCount" placeholder="价格折扣数量"  class="span6" onblur="Editorial.PriceDiscount.validatePriceDiscountCount();"/>
									<span id="priceDiscountCountSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group" id="priceDiscountValueDiv">
								<label class="control-label" for="form-field-1">价格折扣值：</label>
								<div class="controls">
									<form:input path="productPriceDiscount.priceDiscountValue" id="priceDiscountValue" placeholder="价格折扣值"  class="span6" onblur="Editorial.PriceDiscount.validatePriceDiscountValue();" /> 
									<span id="priceDiscountValueSpan" class="help-inline"></span>
								</div>
							</div>
							<form:hidden path="id" id="id" />
							<form:hidden path="priceId" id="priceId" />
							<form:hidden path="productPriceDiscount.priceDiscountType" id="priceDiscountType" />
							</div>
							</div>
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" id="saveDiscount" type="submit" >
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="resetDiscount" id="reset">
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