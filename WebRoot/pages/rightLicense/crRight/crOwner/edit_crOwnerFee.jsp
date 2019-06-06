<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>预付款及固定费用数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/crOwner/edit_crOwnerFee.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>预付款及固定费用
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crOwnerFee.fixfeeId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crOwnerFeeForm" commandName="form" class="form-horizontal">
						<form:hidden path="crOwnerFee.fixfeeId" id="crOwnerFee_fixfeeId" />
						<form:hidden path="crOwnerFee.rlOwner.rlownerId" id="crOwnerFee_rlOwner_rlownerId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								<div class="control-group span12" id="crOwnerFee_expenseType_div">
									<label class="control-label" for="form-field-1">类型：</label>
									<div class="controls">
										<form:select path="crOwnerFee.expenseType" id="crOwnerFee_expenseType" onblur="Editorial.CrOwnerFee.validate_expenseType()" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.ExpenseType}" />
										</form:select>
										<span id="crOwnerFee_expenseType_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerFee_currency_currencyId_div">
									<label class="control-label" for="form-field-1">币种：</label>
									<div class="controls">
										<form:select path="crOwnerFee.currency.currencyId" id="crOwnerFee_currency_currencyId" onblur="Editorial.CrOwnerFee.validate_currency()" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.currencyList}" itemValue="currencyId" itemLabel="currencyName" />
										</form:select>
										<span id="crOwnerFee_currency_currencyId_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerFee_fixfeeVal_div">
									<label class="control-label" for="form-field-1">费用：</label>
									<div class="controls">
										<form:input path="crOwnerFee.fixfeeVal" id="crOwnerFee_fixfeeVal" onblur="Editorial.CrOwnerFee.validate_fixfeeVal()" onkeypress="onlyInputDecimalNumber(event, this)" cssClass="span10" placeholder="费用值" />
										<span id="crOwnerFee_fixfeeVal_span" class="help-inline"></span>
									</div>
								</div>
								
								<!-- 字段结束 -->
							</div>
						</div>
						<!-- on_down结束 -->
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