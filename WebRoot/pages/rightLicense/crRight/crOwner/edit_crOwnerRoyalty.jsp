<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>人员版税计算规则数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/crOwner/edit_crOwnerRoyalty.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>人员版税计算规则
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crOwnerRoyalty.rloRoyaltyId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crOwnerRoyaltyForm" commandName="form" class="form-horizontal">
						<form:hidden path="crOwnerRoyalty.rloRoyaltyId" id="crOwnerRoyalty_rloRoyaltyId" />
						<form:hidden path="crOwnerRoyalty.rlOwner.rlownerId" id="crOwnerRoyalty_rlOwner_rlownerId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
							
								<div class="control-group span6" id="crOwnerRoyalty_rlRoyaltyRule_royaltyRuleId_div">
									<label class="control-label" for="form-field-1">版税计算规则：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.rlRoyaltyRule.royaltyRuleId" id="crOwnerRoyalty_rlRoyaltyRule_royaltyRuleId" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.royaltyRuleList}" itemValue="royaltyRuleId" itemLabel="royaltyRuleName" />
										</form:select>
										<span id="crOwnerRoyalty_rlRoyaltyRule_royaltyRuleId_span" class="help-inline"></span>
									</div>
								</div>
							
								<!-- 字段开始 -->
								<div class="control-group span6" id="crOwnerRoyalty_royaltyText_div">
									<label class="control-label" for="form-field-1">版税描述：</label>
									<div class="controls">
									<form:input path="crOwnerRoyalty.royaltyText" id="crOwnerRoyalty_royaltyText" onblur="Editorial.CrOwnerRoyalty.validate_royaltyText()" cssClass="span10" placeholder="版税描述" />
										<span id="crOwnerRoyalty_royaltyText_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_royaltyType_div">
									<label class="control-label" for="form-field-1">版税类型：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.royaltyType" id="crOwnerRoyalty_royaltyType" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RoyaltyType}" />
										</form:select>
										<span id="crOwnerRoyalty_royaltyType_span" class="help-inline"></span>
									</div>
								</div>

								<div class="control-group span6" id="crOwnerRoyalty_market_div">
									<label class="control-label" for="form-field-1">市场：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.market" id="crOwnerRoyalty_market" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.Market}" />
										</form:select>
										<span id="crOwnerRoyalty_market_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_priceType_div">
									<label class="control-label" for="form-field-1">价格类型：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.priceType" id="crOwnerRoyalty_priceType" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.PriceType}" />
										</form:select>
										<span id="crOwnerRoyalty_priceType_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_taxDescription_div">
									<label class="control-label" for="form-field-1">税务说明：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.taxDescription" id="crOwnerRoyalty_taxDescription" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.TaxFlag}" />
										</form:select>
										<span id="crOwnerRoyalty_taxDescription_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_initRate_div">
									<label class="control-label" for="form-field-1">初始比率：</label>
									<div class="controls">
										<form:input path="crOwnerRoyalty.initRate" id="crOwnerRoyalty_initRate" onblur="Editorial.CrOwnerRoyalty.validate_initRate()" onkeypress="onlyInputDecimalNumber(event, this)" cssClass="span9" placeholder="初始比率" />%
										<span id="crOwnerRoyalty_initRate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_adjustRule_div">
									<label class="control-label" for="form-field-1">调整规则：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.adjustRule" id="crOwnerRoyalty_adjustRule" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.AdjustRule}" />
										</form:select>
										<span id="crOwnerRoyalty_adjustRule_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_royaltyDiscount_div">
									<label class="control-label" for="form-field-1">版税折扣：</label>
									<div class="controls">
									<form:input path="crOwnerRoyalty.royaltyDiscount" id="crOwnerRoyalty_royaltyDiscount" onblur="Editorial.CrOwnerRoyalty.validate_royaltyDiscount()" onkeypress="onlyInputDecimalNumber(event, this)" cssClass="span10" placeholder="版税折扣" />
										<span id="crOwnerRoyalty_royaltyDiscount_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_rulesState_div">
									<label class="control-label" for="form-field-1">规则状态：</label>
									<div class="controls">
										<form:select path="crOwnerRoyalty.rulesState" id="crOwnerRoyalty_rulesState" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RuleStatus}" />
										</form:select>
										<span id="crOwnerRoyalty_rulesState_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_royaltyIndividual_div">
									<label class="control-label" for="form-field-1">个别交易：</label>
									<div class="controls">
										<form:checkbox path="crOwnerRoyalty.royaltyIndividual" />
										<span id="crOwnerRoyalty_royaltyIndividual_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwnerRoyalty_reserveReturn_div">
									<label class="control-label" for="form-field-1">退货预留：</label>
									<div class="controls">
										<form:checkbox path="crOwnerRoyalty.reserveReturn" />										
										<span id="crOwnerRoyalty_reserveReturn_span" class="help-inline"></span>
									</div>
								</div>
								
								<!-- 字段结束 -->
							</div>
						</div>
						<!-- on_down结束 -->
						
						<c:if test="${form.crOwnerRoyalty.rloRoyaltyId != null}">
						<div class="row-fluid">
							<!-- 功能按钮开始 -->
							<div class="ace-thumbnails">
								<button class="btn btn-small btn-primary" type="button" onclick="Editorial.CrOwnerRoyalty.editCrFormulaDataTable()">
									<i class="icon-plus-sign bigger-125"></i> 新建计算公式信息
								</button>
							</div>
							<!-- 功能按钮结束 -->
							<!-- 列表部分开始 -->
							<div class="table-header">
								<i class="icon-flag"></i>&nbsp;&nbsp;计算公式信息列表
							</div>
							<table id="crFormulaDataTable" class="table table-striped table-bordered table-hover">
								<thead>
									<tr>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
									</tr>
								</thead>
								<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
								<tfoot>
									<tr>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
										<th width="10%" align="center"></th>
									</tr>
								</tfoot>
							</table>
							<!-- 列表部分结束 -->
						</div>
						</c:if>
						
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