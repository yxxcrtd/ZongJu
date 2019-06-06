<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>版税规则库数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRoyaltyRule/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>版税规则库
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crRoyaltyRule.royaltyRuleId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crRoyaltyRuleForm" commandName="form" class="form-horizontal">
						<form:hidden path="crRoyaltyRule.royaltyRuleId" id="crRoyaltyRule_royaltyRuleId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								<div class="control-group span6" id="crRoyaltyRule_royaltyRuleName_div">
									<label class="control-label" for="form-field-1">规则名称：</label>
									<div class="controls">
										<form:input path="crRoyaltyRule.royaltyRuleName" id="crRoyaltyRule_royaltyRuleName" cssClass="span10" onblur="Editorial.CrRoyaltyRule.validate_royaltyRuleName()" placeholder="规则名称" />
										<span id="crRoyaltyRule_royaltyRuleName_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_royaltyRuleCode_div">
									<label class="control-label" for="form-field-1">规则编号：</label>
									<div class="controls">
									<form:input path="crRoyaltyRule.royaltyRuleCode" id="crRoyaltyRule_royaltyRuleCode" cssClass="span10" onblur="Editorial.CrRoyaltyRule.validate_royaltyRuleCode()" placeholder="规则编号" />
										<span id="crRoyaltyRule_royaltyRuleCode_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_royaltyDiscount_div">
									<label class="control-label" for="form-field-1">版税折扣：</label>
									<div class="controls">
										<form:input path="crRoyaltyRule.royaltyDiscount" id="crRoyaltyRule_royaltyDiscount" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="版税折扣" />
										<span id="crRoyaltyRule_royaltyDiscount_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_royaltyType_div">
									<label class="control-label" for="form-field-1">版税类型：</label>
									<div class="controls">
										<form:select path="crRoyaltyRule.royaltyType" id="crRoyaltyRule_royaltyType" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RoyaltyType}" />
										</form:select>
										<span id="crRoyaltyRule_royaltyType_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_market_div">
									<label class="control-label" for="form-field-1">市场：</label>
									<div class="controls">
										<form:select path="crRoyaltyRule.market" id="crRoyaltyRule_market" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.Market}" />
										</form:select>
										<span id="crRoyaltyRule_market_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_priceType_div">
									<label class="control-label" for="form-field-1">价格类型：</label>
									<div class="controls">
										<form:select path="crRoyaltyRule.priceType" id="crRoyaltyRule_priceType" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.PriceType}" />
										</form:select>
										<span id="crRoyaltyRule_priceType_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_taxDescription_div">
									<label class="control-label" for="form-field-1">税务声明：</label>
									<div class="controls">
										<form:select path="crRoyaltyRule.taxDescription" id="crRoyaltyRule_taxDescription" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.TaxFlag}" />
										</form:select>
										<span id="crRoyaltyRule_taxDescription_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crRoyaltyRule_rulesState_div">
									<label class="control-label" for="form-field-1">规则状态：</label>
									<div class="controls">
										<form:select path="crRoyaltyRule.rulesState" id="crRoyaltyRule_rulesState" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RuleStatus}" />
										</form:select>
										<span id="crRoyaltyRule_rulesState_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crRoyaltyRule_royaltyText_div">
									<label class="control-label" for="form-field-1">版税描述：</label>
									<div class="controls">
										<form:textarea path="crRoyaltyRule.royaltyText" id="crRoyaltyRule_royaltyText" cssClass="span10 h50" placeholder="版税描述" />
										<span id="crRoyaltyRule_royaltyText_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRoyaltyRule_royaltyIndividual_div">
									<label class="control-label" for="form-field-1">个别交易：</label>
									<div class="controls">
										<form:checkbox path="crRoyaltyRule.royaltyIndividual" />
										<span id="crRoyaltyRule_royaltyIndividual_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRoyaltyRule_reserveReturn_div">
									<label class="control-label" for="form-field-1">退货预留：</label>
									<div class="controls">
										<form:checkbox path="crRoyaltyRule.reserveReturn" />
										<span id="crRoyaltyRule_reserveReturn_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRoyaltyRule_royaltyRuleLock_div">
									<label class="control-label" for="form-field-1">锁定：</label>
									<div class="controls">
										<form:checkbox path="crRoyaltyRule.royaltyRuleLock" />
										<span id="crRoyaltyRule_royaltyRuleLock_span" class="help-inline"></span>
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