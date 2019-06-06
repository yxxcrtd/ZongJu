<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>权利授权数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>权利授权
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crRight.rlicenseId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crRightForm" commandName="form" class="form-horizontal">
						<form:hidden path="crRight.rlicenseId" id="crRight_rlicenseId" />
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								<div class="control-group span4" id="licenseType_id_div">
									<label class="control-label" for="form-field-1">授权类型：</label>
									<div class="controls">
										<form:select path="crRight.licenseType.licenseTypeId" id="licenseType_id" cssClass="span10" onblur="Editorial.CrRight.validate_licenseType()">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.licenseType}" itemValue="licenseTypeId" itemLabel="licenseTypeName" />
										</form:select>
										<span id="licenseType_id_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_paymentTrem_div">
									<label class="control-label" for="form-field-1">版税付款条款：</label>
									<div class="controls">
									<form:input path="crRight.paymentTrem" id="crRight_paymentTrem" cssClass="span9" onblur="Editorial.CrRight.validate_paymentTrem()" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="版税付款条款" />天
										<span id="crRight_paymentTrem_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_rcexclusive_div">
									<label class="control-label" for="form-field-1">是否独享：</label>
									<div class="controls">
										<form:select path="crRight.rcexclusive" id="crRight_rcexclusive" cssClass="span10" onblur="Editorial.CrRight.validate_rcexclusive()">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RightExclusiveFlag}" />
										</form:select>
										<span id="crRight_rcexclusive_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_rlicenseName_div">
									<label class="control-label" for="form-field-1">授权名称：</label>
									<div class="controls">
									<form:input path="crRight.rlicenseName" id="crRight_rlicenseName" cssClass="span10" onblur="Editorial.CrRight.validate_rlicenseName()" placeholder="授权名称" />
										<span id="crRight_rlicenseName_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_rlperiod_div">
									<label class="control-label" for="form-field-1">版税报告周期：</label>
									<div class="controls">
										<form:select path="crRight.rlperiod" id="crRight_rlperiod" cssClass="span10" onblur="Editorial.CrRight.validate_rlperiod()">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.SettlePeriod}" />
										</form:select>
										<span id="crRight_rlperiod_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_contract_id_div">
									<label class="control-label" for="form-field-1">所属合同：</label>
									<div class="controls">
										<form:select path="crRight.contract.contractId" id="contract_id" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.contract}" itemValue="contractId" itemLabel="contractName" />
										</form:select>
										<span id="crRight_contract_id_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_status_div">
									<label class="control-label" for="form-field-1">授权状态：</label>
									<div class="controls">
										<form:select path="crRight.status" id="crRight_status" cssClass="span10" onblur="Editorial.CrRight.validate_status()">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RightContractStatus}" />
										</form:select>
										<span id="crRight_status_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span12" id="crRight_rlicenseReference_div">
									<label class="control-label" for="form-field-1">授权说明：</label>
									<div class="controls">
										<form:textarea path="crRight.rlicenseReference" id="crRight_rlicenseReference" cssClass="span10 h50" placeholder="授权说明" />
										<span id="crRight_rlicenseReference_span" class="help-inline"></span>
									</div>
								</div>
								<!-- 字段结束 -->
							</div>
						</div>
						<!-- on_down结束 -->
						
						<!-- TAB页开始 -->
						<ul class="nav nav-tabs">
				            <li class="active"><a href="#contractDetails" data-toggle="tab">合同细节</a></li>
				            
				            <c:if test="${form.crRight.rlicenseId != null}">
				            <!-- <li><a href="#authorizedArea" onclick="Editorial.CrRight.initAuthorizedAreaDataTable()" data-toggle="tab">授权地域</a></li> -->
				            <!-- <li><a href="#authorizationLanguage" onclick="Editorial.CrRight.initAuthorizationLanguageDataTable()" data-toggle="tab">授权语种</a></li> -->
				            <li><a href="#signedProducts" onclick="Editorial.CrRight.initSignedProductsDataTable()" data-toggle="tab">签约产品</a></li>
				            <!-- <li><a href="#signingContributor" onclick="Editorial.CrRight.initSigningContributorDataTable()" data-toggle="tab">签约贡献者</a></li> -->
				            <!-- <li><a href="#subsidiaryRights" onclick="Editorial.CrRight.initSubsidiaryRightsDataTable()" data-toggle="tab">附属版权</a></li> -->
				            </c:if>
				        </ul>
				        <div class="tab-content">
				        	<!-- contractDetails 开始 -->
				            <div class="tab-pane active" id="contractDetails">
				            	<div class="control-group span4" id="crRight_rlicenseStarton_div">
									<label class="control-label" for="form-field-1">授权开始时间：</label>
									<div class="controls">
										<div id="crRight_rlicenseStarton_Date_Control" class="input-append">
											<input type="text" name="crRight.startOnStr" class="span10" value="<fmt:formatDate value="${form.crRight.rlicenseStarton}" pattern="yyyy-MM-dd" />" id="crRight_rlicenseStarton" onblur="Editorial.CrRight.validate_rlicenseStarton()" placeholder="授权开始时间" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crRight_rlicenseStarton_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_rlicenseEndon_div">
									<label class="control-label" for="form-field-1">授权结束时间：</label>
									<div class="controls">
										<div id="crRight_rlicenseEndon_Date_Control" class="input-append">
											<input type="text" name="crRight.stopOnStr" class="span10" value="<fmt:formatDate value="${form.crRight.rlicenseEndon}" pattern="yyyy-MM-dd" />" id="crRight_rlicenseEndon" onblur="Editorial.CrRight.validate_rlicenseEndon()" placeholder="授权结束时间" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crRight_rlicenseEndon_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_start_div">
									<label class="control-label" for="form-field-1">授权开始依据：</label>
									<div class="controls">
										<form:select path="crRight.start" id="crRight_start" cssClass="span10" onblur="Editorial.CrRight.validate_start()">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.LicenceStartType}" />
										</form:select>
										<span id="crRight_start_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_manuscriptDelivery_div">
									<label class="control-label" for="form-field-1">书稿提交日期：</label>
									<div class="controls">
										<div id="crRight_manuscriptDelivery_Date_Control" class="input-append">
											<input type="text" name="crRight.deliveryStr" class="span10" value="<fmt:formatDate value="${form.crRight.manuscriptDelivery}" pattern="yyyy-MM-dd" />" id="crRight_manuscriptDelivery" placeholder="书稿提交日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crRight_manuscriptDelivery_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_pubDeadline_div">
									<label class="control-label" for="form-field-1">出版截至条款：</label>
									<div class="controls">
										<form:input path="crRight.pubDeadline" id="crRight_pubDeadline" cssClass="span9" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="出版截至条款" />月
										<span id="crRight_pubDeadline_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_owerCopy_div">
									<label class="control-label" for="form-field-1">作者副本量：</label>
									<div class="controls">
									<form:input path="crRight.owerCopy" id="crRight_owerCopy" cssClass="span10" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="作者副本量" />
										<span id="crRight_owerCopy_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_agentCopy_div">
									<label class="control-label" for="form-field-1">代理副本量：</label>
									<div class="controls">
									<form:input path="crRight.agentCopy" id="crRight_agentCopy" cssClass="span10" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="代理副本量" />
										<span id="crRight_agentCopy_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_guaranteePayment_div">
									<label class="control-label" for="form-field-1">授权保证金：</label>
									<div class="controls">
									<form:input path="crRight.guaranteePayment" id="crRight_guaranteePayment" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="授权保证金" />
										<span id="crRight_guaranteePayment_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_maxPayment_div">
									<label class="control-label" for="form-field-1">最大版税付款：</label>
									<div class="controls">
									<form:input path="crRight.maxPayment" id="crRight_maxPayment" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="最大版税付款" />
										<span id="crRight_maxPayment_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_minPayment_div">
									<label class="control-label" for="form-field-1">最小版税付款：</label>
									<div class="controls">
									<form:input path="crRight.minPayment" id="crRight_minPayment" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="最小版税付款" />
										<span id="crRight_minPayment_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_agentPercent_div">
									<label class="control-label" for="form-field-1">代理版税比率：</label>
									<div class="controls">
									<form:input path="crRight.agentPercent" id="crRight_agentPercent" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="代理版税比率" />
										<span id="crRight_agentPercent_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_retainPeriod_div">
									<label class="control-label" for="form-field-1">允许保留周期：</label>
									<div class="controls">
									<form:input path="crRight.retainPeriod" id="crRight_retainPeriod" cssClass="span9" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="允许保留周期" />期
										<span id="crRight_retainPeriod_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_retainPercent_div">
									<label class="control-label" for="form-field-1">允许预留比率：</label>
									<div class="controls">
									<form:input path="crRight.retainPercent" id="crRight_retainPercent" cssClass="span9" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="允许预留比率" />%
										<span id="crRight_retainPercent_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_minRetain_div">
									<label class="control-label" for="form-field-1">版税最小预留：</label>
									<div class="controls">
									<form:input path="crRight.minRetain" id="crRight_minRetain" cssClass="span10" onkeypress="onlyInputDecimalNumber(event, this)" placeholder="版税最小预留" />
										<span id="crRight_minRetain_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_lastedDate_div">
									<label class="control-label" for="form-field-1">最近报告日期：</label>
									<div class="controls">
										<div id="crRight_lastedDate_Date_Control" class="input-append">
											<input type="text" name="crRight.lastStr" class="span10" value="<fmt:formatDate value="${form.crRight.lastedDate}" pattern="yyyy-MM-dd" />" id="crRight_lastedDate" placeholder="最近报告日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crRight_lastedDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span4" id="crRight_firstCloseDate_div">
									<label class="control-label" for="form-field-1">首次结算报告日期：</label>
									<div class="controls">
										<div id="crRight_firstCloseDate_Date_Control" class="input-append">
											<input type="text" name="crRight.firstStr" class="span10" value="<fmt:formatDate value="${form.crRight.firstCloseDate}" pattern="yyyy-MM-dd" />" id="crRight_firstCloseDate" placeholder="首次结算报告日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crRight_firstCloseDate_span" class="help-inline"></span>
									</div>
								</div>
				            </div>
				            <!-- contractDetails 结束 -->
				            
				            <c:if test="${form.crRight.rlicenseId != null}">
				            
				            <!-- signedProducts 开始 -->
				            <div class="tab-pane" id="signedProducts">
				            	<div class="row-fluid">
									<!-- 功能按钮开始 -->
									<div class="ace-thumbnails">
										<button class="btn btn-small btn-primary" type="button" onclick="Editorial.CrRight.editSignedProduct()">
											<i class="icon-plus-sign bigger-125"></i> 新建签约产品信息
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
												<div class="control-group span3">
													<label class="control-label" for="form-field-1">产品编号：</label>
													<div class="controls">
														<input type="text" id="crProduct_code" cssClass="span8" placeholder="产品编号" />
													</div>
												</div>
												
												<div class="control-group span3">
													<label class="control-label" for="form-field-1">产品题名：</label>
													<div class="controls">
														<input type="text" id="crProduct_title" cssClass="span8" placeholder="产品题名" />
													</div>
												</div>
											</div>
											<!-- 查询条件结束 -->
											
											<!-- 查询按钮开始 -->
											<div style="text-align: center;">
												<button class="btn btn-small btn-success" type="button" onclick="Editorial.CrProduct.query()">
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
										<i class="icon-flag"></i>&nbsp;&nbsp;签约产品信息列表
									</div>
									<table id="signedProductsDataTable" class="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th width="10%" align="center"></th>
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
												<th width="10%" align="center"></th>
											</tr>
										</tfoot>
									</table>
									<!-- 列表部分结束 -->
								</div>
				            </div>
				            <!-- signedProducts 结束 -->
				            </c:if>
				            
				        </div>
				        <!-- TAB页结束 -->
						
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