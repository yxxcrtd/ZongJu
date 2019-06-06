<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title"/></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/contract/crContract/list.js"></script>
<script src="${ctx}/pages/contract/crContract/edit.js"></script>
<script src="${ctx}/pages/contract/crContract/list_init.js"></script>
<script type="text/javascript">
	/**** 页面Validate国际化 ****/
	var System_Info_ValidateCode_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateCode.Blank'/>";
	var System_Info_ValidateName_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateName.Blank'/>";
	var System_Info_ValidateStatus_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateStatus.Blank'/>";
</script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						合同管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建合同
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改合同
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
					<form:form id="contractForm" commandName="form" class="form-horizontal">
						<div class="on-down">
					 	<div class="row-fluid ">
						<div class="row-fluid">
							<div id="contractNameDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									 合同名称：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractName" id="contractName" placeholder="合同名称" onblur="Editorial.Contract.validateContractName();"/>
									<span id="contractNameSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractTypeDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									 合同类型：
								</label>
								<div class="controls">
									 <form:select path="crContract.contractType" id="contractType" onblur="Editorial.Contract.validateContractType();">
										<form:option value="">-选择-</form:option>
										<c:forEach items="${form.contractTypeMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
									<span id="contractTypeSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractReasonDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									合同原因：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractReason" id="contractReason" placeholder="合同原因" onblur="Editorial.Contract.validateContractReason();"/>
									<span id="contractReasonSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractSourceDiv" class="control-group  span6">
								<label class="control-label"  style="width:180px;" for="form-field-2">
									合同来源：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractSource" id="contractSource" placeholder="合同来源" onblur="Editorial.Contract.validateContractSource();"/>
									<span id="contractSourceSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">	
							<div id="contractDateDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									签订日期：
								</label>
								<div class="controls">
	                 				<%-- <form:input path="crContract.contractDate" id="contractDate" placeholder="contractDate" onblur="Editorial.Contract.validateContractDate();"/> --%>
	                 				<div id="invoiceContractDate" class="input-append">
										<form:input path="contractDate" id="contractDate" placeholder="合同签订日期" value="${form.crContract.contractDate}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Contract.validateContractDate();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>	
									<span id="contractDateSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractExpiredDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									过期日期：
								</label>
								<div class="controls">
	                 				<%-- <form:input path="crContract.contractExpired" id="contractExpired" placeholder="contractExpired" onblur="Editorial.Contract.validateContractExpired();"/> --%>
									<div id="invoiceContractExpired" class="input-append">
										<form:input path="contractExpired" id="contractExpired"  placeholder="合同过期日期" value="${form.crContract.contractExpired}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Contract.validateContractExpired();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>	
									<span id="contractExpiredSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractDaysDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									过期天数：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractDays" id="contractDays" placeholder="合同过期天数" onblur="Editorial.Contract.validateContractDays();"/>
									<span id="contractDaysSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractLicenseDurationDiv" class="control-group span6">
								<label class="control-label" style="width:180px;"  for="form-field-2">
									授权时间：
								</label>
								<div class="controls">
	                 				 <form:input path="crContract.contractLicenseDuration" id="contractLicenseDuration" placeholder="合同License时间" onblur="Editorial.Contract.validateContractLicenseDuration();"/>
									<span id="contractLicenseDurationSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractLicenseStartOnDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									授权开始日期：
								</label>
								<div class="controls">
									<div id="invoiceLicenseStartOn" class="input-append">
										<form:input path="contractLicenseStartOn" id="contractLicenseStartOn"  placeholder="合同License开始日期" value="${form.crContract.contractLicenseStartOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Contract.validateContractLicenseStartOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>
									<span id="contractLicenseStartOnSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractLicenseEndOnDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									授权到期日期：
								</label>
								<div class="controls">
	                 				<div id="invoiceLicenseEndOn" class="input-append">
										<form:input path="contractLicenseEndOn" id="contractLicenseEndOn"  placeholder="合同License开始日期" value="${form.crContract.contractLicenseEndOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Contract.validateContractLicenseEndOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>
									<span id="contractLicenseEndOnSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractLicenseOptionDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									授权开始选项：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractLicenseOption" id="contractLicenseOption" placeholder="合同License开始日期" onblur="Editorial.Contract.validateContractLicenseOption();"/>
									<span id="contractLicenseOptionSpan" class="help-inline"></span>
								</div>
							</div>
							
							<div id="contractAuthorCountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									作者样书个数：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractAuthorCount" id="contractAuthorCount" placeholder="合同作者获取免费样书个数" onblur="Editorial.Contract.validateContractAuthorCount();"/>
									<span id="contractAuthorCountSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractProxyCountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									代理商样书个数：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractProxyCount" id="contractProxyCount" placeholder="合同代理商获取免费样书个数" onblur="Editorial.Contract.validateContractProxyCount();"/>
									<span id="contractProxyCountSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="contractBailAmountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									保证金：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractBailAmount" id="contractBailAmount" placeholder="合同保证金" onblur="Editorial.Contract.validateContractBailAmount();"/>
									<span id="contractBailAmountSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractMaxAmountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									最大金额：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractMaxAmount" id="contractMaxAmount" placeholder="合同最大金额" onblur="Editorial.Contract.validateContractMaxAmount();"/>
									<span id="contractMaxAmountSpan" class="help-inline"></span>
								</div>
							</div>
							
							<div id="contractMinAmountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									最小金额：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractMinAmount" id="contractMinAmount" placeholder="合同最小金额" onblur="Editorial.Contract.validateContractMinAmount();"/>
									<span id="contractMinAmountSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div id="contractProxyAmountDiv" class="control-group span6">
								<label class="control-label" style="width:180px;" for="form-field-2">
									代理费：
								</label>
								<div class="controls">
	                 				<form:input path="crContract.contractProxyAmount" id="contractProxyAmount" placeholder="合同代理费" onblur="Editorial.Contract.validateContractProxyAmount();"/>
									<span id="contractProxyAmountSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
					<form:hidden path="id"/>
					</div>
					</div>
					<!-- ------------------表单部分结束----------------------------- -->
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button id="save" class="btn btn-success" >
							<i class="icon-save bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Save"/>
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="reset" class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Reset"/>
						</button>
					</div>
					</form:form>
					<!-- ------------------表单按钮部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>
