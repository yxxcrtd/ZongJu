<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>收款人数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/crOwner/edit_crOwnerPayee.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>收款人
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crOwnerPayee.feePayeeId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crOwnerPayeeForm" commandName="form" class="form-horizontal">
						<form:hidden path="crOwnerPayee.feePayeeId" id="crOwnerPayee_feePayeeId" />
						<form:hidden path="crOwnerPayee.personTypeRelationship.id" id="crOwnerPayee_personTypeRelationship_id" />
						<form:hidden path="crOwnerPayee.rlOwner.rlownerId" id="crOwnerPayee_rlOwner_rlownerId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								<div class="control-group span12" id="crOwnerPayee_personTypeRelationship_person_name_div">
									<label class="control-label" for="form-field-1">收款人：</label>
									<div class="controls">
										<form:input path="crOwnerPayee.personTypeRelationship.person.name" id="crOwnerPayee_personTypeRelationship_person_name" readonly="true" cssClass="span7" placeholder="收款人" />
										<button class="btn btn-mini btn-primary" title="选择收款人" type="button" onclick="Editorial.CrOwnerPayee.selectOwnerPayeePerson()">
											<i class="icon-edit bigger-100"></i>
										</button>
										<span id="crOwnerPayee_personTypeRelationship_person_name_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerPayee_currency_currencyId_div">
									<label class="control-label" for="form-field-1">币种：</label>
									<div class="controls">
										<form:select path="crOwnerPayee.currency.currencyId" id="crOwnerPayee_currency_currencyId" onblur="Editorial.CrOwnerPayee.validate_crOwnerPayee_currency()" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.crOwnerPayeeCurrencyList}" itemValue="currencyId" itemLabel="currencyName" />
										</form:select>
										<span id="crOwnerPayee_currency_currencyId_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerPayee_status_div">
									<label class="control-label" for="form-field-1">状态：</label>
									<div class="controls">
										<form:select path="crOwnerPayee.status" id="crOwnerPayee_status" onblur="Editorial.CrOwnerPayee.validate_status()" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.PayeeStatus}" />
										</form:select>
										<span id="crOwnerPayee_status_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerPayee_feePayeePercent_div">
									<label class="control-label" for="form-field-1">收款比率：</label>
									<div class="controls">
									<form:input path="crOwnerPayee.feePayeePercent" id="crOwnerPayee_feePayeePercent" onblur="Editorial.CrOwnerPayee.validate_feePayeePercent()" onkeypress="onlyInputDecimalNumber(event, this)" cssClass="span9" placeholder="收款比率" />%
										<span id="crOwnerPayee_feePayeePercent_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crOwnerPayee_feePayeeReason_div">
									<label class="control-label" for="form-field-1">失效原因：</label>
									<div class="controls">
									<form:input path="crOwnerPayee.feePayeeReason" id="crOwnerPayee_feePayeeReason" onblur="Editorial.CrOwnerPayee.validate_feePayeeReason()" cssClass="span10" placeholder="失效原因" />
										<span id="crOwnerPayee_feePayeeReason_span" class="help-inline"></span>
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