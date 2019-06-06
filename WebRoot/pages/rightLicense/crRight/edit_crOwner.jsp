<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>签约贡献者数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/edit_crOwner.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>签约贡献者
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crOwner.rlownerId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crOwnerForm" commandName="form" class="form-horizontal">
						<form:hidden path="crOwner.rlownerId" id="crOwner_rlownerId" />
						<form:hidden path="crOwner.corpTypeRelationship.id" id="crOwner_corpTypeRelationship_id" />
						<form:hidden path="crOwner.personTrtr.id" id="crOwner_personTrtr_id" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								
								<div class="control-group span6" id="crOwner_rlProduct_rlpId_div">
									<label class="control-label" for="form-field-1">产品：</label>
									<div class="controls">
										<form:select path="crOwner.rlProduct.rlpId" id="crOwner_rlProduct_rlpId" cssClass="span10" onchange="Editorial.CrOwner.crProductSelectChange(this)" onblur="Editorial.CrOwner.validate_product();">
											<form:option value="">--选择--</form:option>
											<c:forEach var="crProduct" items="${form.dic.crProductList}">
												<form:option value="${crProduct.rlpId}" title="${crProduct.product.id}">${crProduct.product.title}</form:option>
											</c:forEach>
										</form:select>
										<span id="crOwner_rlProduct_rlpId_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_corpTypeRelationship_corp_shortName_div">
									<label class="control-label" for="form-field-1">代理公司：</label>
									<div class="controls">
										<form:input path="crOwner.corpTypeRelationship.corp.shortName" id="crOwner_corpTypeRelationship_corp_shortName" cssClass="span7" onblur="" readonly="true" placeholder="代理公司" />
										<button class="btn btn-mini btn-primary" title="选择代理公司" type="button" onclick="Editorial.CrOwner.selectCorp()">
											<i class="icon-edit bigger-100"></i>
										</button>
										<span id="crOwner_corpTypeRelationship_corp_shortName_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_personTrcr_id_div">
									<label class="control-label" for="form-field-1">贡献者：</label>
									<div class="controls">
										<form:select path="crOwner.personTrcr.id" id="crOwner_personTrcr_id" cssClass="span10" onblur="Editorial.CrOwner.validate_owner();">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.productPersonList}" itemValue="personTypeRelationship.id" itemLabel="personTypeRelationship.person.name" />
										</form:select>
										<span id="crOwner_personTrcr_id_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_personTrtr_person_name_div">
									<label class="control-label" for="form-field-1">联系人：</label>
									<div class="controls">
										<form:input path="crOwner.personTrtr.person.name" id="crOwner_personTrtr_person_name" cssClass="span7" onblur="" readonly="true" placeholder="联系人" />
										<button class="btn btn-mini btn-primary" title="选择联系人" type="button" onclick="Editorial.CrOwner.selectPerson()">
											<i class="icon-edit bigger-100"></i>
										</button>
										<span id="crOwner_personTrtr_person_name_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_rlperiod_div">
									<label class="control-label" for="form-field-1">版税报告周期：</label>
									<div class="controls">
										<form:select path="crOwner.rlperiod" id="crOwner_rlperiod" cssClass="span10" onblur="">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.SettlePeriod}" />
										</form:select>
										<span id="crOwner_rlperiod_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_ownerPercent_div">
									<label class="control-label" for="form-field-1">版税分成比率：</label>
									<div class="controls">
										<form:input path="crOwner.ownerPercent" id="crOwner_ownerPercent" cssClass="span9" onblur="Editorial.CrOwner.validate_ownerPercent()" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="版税分成比率" />%
										<span id="crOwner_ownerPercent_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_lastedDate_div">
									<label class="control-label" for="form-field-1">上期版税结算日：</label>
									<div class="controls">
										<div id="crOwner_lastedDate_Date_Control" class="input-append">
											<input type="text" name="crOwner.lastedDate" value="<fmt:formatDate value="${form.crOwner.lastedDate}" pattern="yyyy-MM-dd" />" id="crOwner_lastedDate" class="span10" placeholder="上期版税结算日" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crOwner_lastedDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_paymentTrem_div">
									<label class="control-label" for="form-field-1">付款条款：</label>
									<div class="controls">
										<form:input path="crOwner.paymentTrem" id="crOwner_paymentTrem" cssClass="span9" onblur="Editorial.CrOwner.validate_paymentTrem()" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="付款条款" />天
										<span id="crOwner_paymentTrem_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_owerCopy_div">
									<label class="control-label" for="form-field-1">作者复本量：</label>
									<div class="controls">
										<form:input path="crOwner.owerCopy" id="crOwner_owerCopy" cssClass="span9" onblur="Editorial.CrOwner.validate_owerCopy()" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="作者复本量" />本
										<span id="crOwner_owerCopy_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_agentCopy_div">
									<label class="control-label" for="form-field-1">代理复本量：</label>
									<div class="controls">
										<form:input path="crOwner.agentCopy" id="crOwner_agentCopy" cssClass="span9" onblur="Editorial.CrOwner.validate_agentCopy()" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="代理复本量" />本
										<span id="crOwner_agentCopy_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_owerDiscount_div">
									<label class="control-label" for="form-field-1">作者折扣：</label>
									<div class="controls">
										<form:input path="crOwner.owerDiscount" id="crOwner_owerDiscount" cssClass="span9" onblur="Editorial.CrOwner.validate_owerDiscount()" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="作者折扣" />%
										<span id="crOwner_owerDiscount_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_retainPeriod_div">
									<label class="control-label" for="form-field-1">预留结算期：</label>
									<div class="controls">
										<form:input path="crOwner.retainPeriod" id="crOwner_retainPeriod" cssClass="span9" onblur="Editorial.CrOwner.validate_retainPeriod()" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="预留结算期" />期
										<span id="crOwner_retainPeriod_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_retainPercent_div">
									<label class="control-label" for="form-field-1">预留比率：</label>
									<div class="controls">
										<form:input path="crOwner.retainPercent" id="crOwner_retainPercent" cssClass="span9" onblur="Editorial.CrOwner.validate_retainPercent()" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="预留比率" />%
										<span id="crOwner_retainPercent_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_minRetain_div">
									<label class="control-label" for="form-field-1">最小预留：</label>
									<div class="controls">
										<form:input path="crOwner.minRetain" id="crOwner_minRetain" cssClass="span10" onblur="Editorial.CrOwner.validate_minRetain()" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="最小预留" />
										<span id="crOwner_minRetain_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crOwner_status_div">
									<label class="control-label" for="form-field-1">状态：</label>
									<div class="controls">
										<form:select path="crOwner.status" id="crOwner_status" cssClass="span10" onblur="">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.AuthorStatus}" />
										</form:select>
										<span id="crOwner_status_span" class="help-inline"></span>
									</div>
								</div>
								<!-- 字段结束 -->
							</div>
						</div>
						<!-- on_down结束 -->
						
						<c:if test="${form.crOwner.rlownerId != null}">
						
						<!-- TAB页 开始 -->
						<ul class="nav nav-tabs">
				            <li class="active"><a href="#royaltyCalculationRules" onclick="Editorial.CrOwner.initRoyaltyCalculationRulesDataTable()" data-toggle="tab">版税计算规则</a></li>
				            <li><a href="#prepaidAndExpenses" onclick="Editorial.CrOwner.initPrepaidAndExpensesDataTable()" data-toggle="tab">预付及费用</a></li>
				            <li><a href="#beneficiary" onclick="Editorial.CrOwner.initBeneficiaryDataTable()" data-toggle="tab">收款人</a></li>
				        </ul>
				        <!-- TAB页 结束 -->
				        
				        <!-- TAB页 内容 开始 -->
				        <div class="tab-content">
				        
				        	<!-- royaltyCalculationRules 开始 -->
				            <div class="tab-pane active" id="royaltyCalculationRules">
								            
					            <div class="row-fluid">
									<!-- 功能按钮开始 -->
									<div class="ace-thumbnails">
										<button class="btn btn-small btn-primary" type="button" onclick="Editorial.CrOwner.editRoyaltyCalculationRules()">
											<i class="icon-plus-sign bigger-125"></i> 新建版税计算规则信息
										</button>
									</div>
									<!-- 功能按钮结束 -->
				
									<div class="table-header on" id="on">
										<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
									</div>
									<div class="on-down" id="on_down">
										<div class="row-fluid">
											<!-- 查询条件开始 -->
											<div class="row-fluid">
											
											</div>
											<!-- 查询条件结束 -->
											
											<!-- 查询按钮开始 -->
											<div style="text-align: center;">
												<button class="btn btn-small btn-success" type="button" onclick="Editorial.CrOwnerRoyalty.query()">
													<i class="icon-zoom-in bigger-110"></i>查询
												</button>
												&nbsp;&nbsp;
												<button type="reset" class="btn btn-small btn-inverse">
													<i class="icon-repeat bigger-110"></i>重置
												</button>
											</div>
											<!-- 查询按钮结束 -->
										</div>
									</div>
									<!-- 列表部分开始 -->
									<div class="table-header">
										<i class="icon-flag"></i>&nbsp;&nbsp;版税计算规则信息列表
									</div>
									<table id="royaltyCalculationRulesDataTable" class="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th width="10%" align="center"></th>
												<th width="10%" align="center"></th>
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
												<th width="10%" align="center"></th>
												<th width="10%" align="center"></th>
											</tr>
										</tfoot>
									</table>
									<!-- 列表部分结束 -->
								</div>
				            
				            </div>
				            <!-- royaltyCalculationRules 结束 -->
				            
				            <!-- prepaidAndExpenses 开始 -->
				            <div class="tab-pane" id="prepaidAndExpenses">
								<div class="row-fluid">
									<!-- 功能按钮开始 -->
									<div class="ace-thumbnails">
										<button class="btn btn-small btn-primary" type="button" onclick="Editorial.CrOwner.editPrepaidAndExpenses()">
											<i class="icon-plus-sign bigger-125"></i> 新建预付及费用信息
										</button>
									</div>
									<!-- 功能按钮结束 -->

									<!-- 列表部分开始 -->
									<div class="table-header">
										<i class="icon-flag"></i>&nbsp;&nbsp;预付及费用信息列表
									</div>
									<table id="prepaidAndExpensesDataTable" class="table table-striped table-bordered table-hover">
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
				            </div>
				            <!-- prepaidAndExpenses 结束 -->
				            
				            <!-- beneficiary 开始 -->
				            <div class="tab-pane" id="beneficiary">
				            	<div class="row-fluid">
									<!-- 功能按钮开始 -->
									<div class="ace-thumbnails">
										<button class="btn btn-small btn-primary" type="button" onclick="Editorial.CrOwner.editBeneficiary()">
											<i class="icon-plus-sign bigger-125"></i> 新建收款人信息
										</button>
									</div>
									<!-- 功能按钮结束 -->
									
									<!-- 列表部分开始 -->
									<div class="table-header">
										<i class="icon-flag"></i>&nbsp;&nbsp;收款人信息列表
									</div>
									<table id="beneficiaryDataTable" class="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th width="10%" align="center"></th>
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
												<th width="10%" align="center"></th>
											</tr>
										</tfoot>
									</table>
									<!-- 列表部分结束 -->
								</div>
				            </div>
				            <!-- beneficiary 结束 -->
						</div>
						<!-- TAB页 内容 结束 -->
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