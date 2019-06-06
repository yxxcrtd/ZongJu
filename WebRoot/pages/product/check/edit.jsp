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
<script src="${ctx}/pages/product/check/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						校对程序卡 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;校对程序卡信息
					</div>
					<form:form id="checkForm" commandName="form" class="form-horizontal">
					
					<div class="on-down">	
						<!-- ------------------表单部分开始----------------------------- -->
						<div class="row-fluid">
							<div class="control-group span10" id="checkTypeDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡类型：</label>
								<div class="controls">
									<form:select path="productCheck.checkType" id="checkType" class="span6" onblur="Editorial.Check.validateCheckType();" >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.checkTypeMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
									<span id="checkTypeSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkStartOnDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡开始日期：</label>
								<div class="controls">
									<div id="invoiceDate" class="input-append">
										<form:input path="checkStartOn" id="checkStartOn" placeholder="校对程序卡开始日期" value="${form.productCheck.checkStartOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Check.validateCheckStartOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
										</span>
									</div>
									<span id="checkStartOnSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkEndOnDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡完成日期：</label>
								<div class="controls">
									<div id="invoiceDate2" class="input-append">
										<form:input path="checkEndOn" id="checkEndOn" placeholder="校对程序卡完成日期"  value="${form.productCheck.checkEndOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Check.validateCheckEndOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
										</span>
									</div>
									<span id="checkEndOnSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkByDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡校对人：</label>
								<div class="controls">
									<form:input path="productCheck.checkBy" id="checkBy" placeholder="校对程序卡校对人"  class="span6" onblur="Editorial.Check.validateCheckBy();" />
									<span id="checkBySpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkResponsibleByDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡责任人：</label>
								<div class="controls">
									<form:input path="productCheck.checkResponsibleBy" id="checkResponsibleBy" placeholder="校对程序卡责任人" class="span6"   onblur="Editorial.Check.validateCheckResponsibleBy();" />
									<span id="checkResponsibleBySpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkEditorByDiv">
								<label class="control-label"  style="width:180px;" for="form-field-1">校对程序卡责编收：</label>
								<div class="controls">
									<form:input path="productCheck.checkEditorBy" id="checkEditorBy" placeholder="校对程序卡责任人" class="span6" onblur="Editorial.Check.validateCheckEditorBy();" />
									<span id="checkEditorBySpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span10" id="checkPrintByDiv">
								<label class="control-label" style="width:180px;" for="form-field-1">校对程序卡印制收：</label>
								<div class="controls">
									<form:input path="productCheck.checkPrintBy" id="checkPrintBy" placeholder="校对程序卡印制收" class="span6"   onblur="Editorial.Check.validateCheckPrintBy();" />
									<span id="checkPrintBySpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						</div>	
						<form:hidden path="id" id="id" />
						<form:hidden path="productId" id="productId" />
						
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
						<!-- ------------------表单按钮部分结束----------------------------- -->
					
					</form:form>
					
				</div>
			</div>
		</div>
</body>
</html>