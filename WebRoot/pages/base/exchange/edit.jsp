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
<script src="${ctx}/pages/base/exchange/list.js"></script>
<script src="${ctx}/pages/base/exchange/edit.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						币种汇率信息 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    					新建
			    				</c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    					修改
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
					<form:form id="ExchangeForm" commandName="form" action="editSubmit" class="form-horizontal">
					<div class="on-down">
						<div class="row-fluid">
							<div class="control-group span6">
								<div class="row-fluid">
									<div class="control-group">
										<label class="control-label" for="form-field-1">源币种：</label>
										<div class="controls">
											<form:select path="obj.fromCurrency.currencyId" id="from">
												<form:option value="">--选择--</form:option>
												<c:forEach items="${form.blist}" var="t">
													<form:option value="${t.currencyId}">${t.currencyCode}</form:option>
												</c:forEach>
											</form:select>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div class="control-group" id="rmbRateDiv">
										<label class="control-label" for="form-field-1"> 汇率： </label>
										<div class="controls">
											<form:input path="obj.exRate" id="rmbRate" placeholder="汇率" class="span8"/>
										</div>
									</div>
								</div>
							</div>
							<div class="control-group span6">
								<div class="row-fluid">
									<div class="control-group">
										<label class="control-label" for="form-field-1">目标币种：</label>
										<div class="controls">
											<form:select path="obj.toCurrency.currencyId" id="to">
												<form:option value="">--选择--</form:option>
												<c:forEach items="${form.blist}" var="t">
													<form:option value="${t.currencyId}">${t.currencyCode}</form:option>
												</c:forEach>
											</form:select>
										</div>
									</div>
								</div>
							</div>
						</div>
						<form:hidden path="obj.exId" id="exId" />
						<form:hidden path="id" />
						<!-- ------------------表单部分开始----------------------------- -->
						</div>
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button id="save" class="btn btn-success" type="submit">
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
	</div>
</body>
</html>
