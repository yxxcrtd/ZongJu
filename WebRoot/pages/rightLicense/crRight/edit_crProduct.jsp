<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>权利授权产品数据维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<meta name="description" content="" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/tools.js"></script>
<script src="${ctx}/pages/rightLicense/crRight/edit_crProduct.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>权利授权产品
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.crProduct.rlpId == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on" id="on">基本信息</div>
					<form:form id="crProductForm" commandName="form" class="form-horizontal">
						<form:hidden path="crProduct.rlpId" id="crProduct_rlpId" />
						<form:hidden path="crProduct.product.id" id="cr_product_id" />
						<form:hidden path="crProduct.right.rlicenseId" id="crProduct_right_rlicenseId" />
						
						<!-- on_down开始 -->
						<div class="on-down" id="on_down">
							<div class="row-fluid ">
								<!-- 字段开始 -->
								<div class="control-group span12" id="cr_product_title_div">
									<label class="control-label" for="form-field-1">产品：</label>
									<div class="controls">
										<form:input path="crProduct.product.title" id="cr_product_title" cssClass="span6" placeholder="产品" readonly="true" />
										<button class="btn btn-mini btn-primary" title="选择产品" type="button" onclick="Editorial.CrProduct.selectProduct()">
											<i class="icon-edit bigger-100"></i>
										</button>
										<span id="cr_product_title_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_firstSaleDate_div">
									<label class="control-label" for="form-field-1">销售开始日期：</label>
									<div class="controls">
										<div id="crProduct_firstSaleDate_Date_Control" class="input-append">
											<input type="text" name="crProduct.firstSaleStr" value="<fmt:formatDate value="${form.crProduct.firstSaleDate}" pattern="yyyy-MM-dd" />" id="crProduct_firstSaleDate" class="span10" placeholder="销售开始日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crProduct_firstSaleDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_sellOutPeriod_div">
									<label class="control-label" for="form-field-1">逾期销售：</label>
									<div class="controls">
										<form:input path="crProduct.sellOutPeriod" id="crProduct_sellOutPeriod" cssClass="span10" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="逾期销售" />月
										<span id="crProduct_sellOutPeriod_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_coprightEndDate_div">
									<label class="control-label" for="form-field-1">版权终止日期：</label>
									<div class="controls">
										<div id="crProduct_coprightEndDate_Date_Control" class="input-append">
											<input type="text" name="crProduct.coprightEndStr" value="<fmt:formatDate value="${form.crProduct.coprightEndDate}" pattern="yyyy-MM-dd" />" id="crProduct_coprightEndDate" class="span10" placeholder="版权终止日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crProduct_coprightEndDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_returnMonth_div">
									<label class="control-label" for="form-field-1">逾期退货：</label>
									<div class="controls">
										<form:input path="crProduct.returnMonth" id="crProduct_returnMonth" cssClass="span10" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="逾期退货" />月
										<span id="crProduct_returnMonth_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_lastEndDate_div">
									<label class="control-label" for="form-field-1">最后版税报告日期：</label>
									<div class="controls">
										<div id="crProduct_lastEndDate_Date_Control" class="input-append">
											<input type="text" name="crProduct.lastEndStr" value="<fmt:formatDate value="${form.crProduct.lastEndDate}" pattern="yyyy-MM-dd" />" id="crProduct_lastEndDate" class="span10" placeholder="最后版税报告日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crProduct_lastEndDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_printMonth_div">
									<label class="control-label" for="form-field-1">印数约定：</label>
									<div class="controls">
										<form:input path="crProduct.printMonth" id="crProduct_printMonth" cssClass="span10" onkeypress="onlyInputIntegerNumber(event, this)" placeholder="印数约定" />
										<span id="crProduct_printMonth_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_expiredDate_div">
									<label class="control-label" for="form-field-1">产品版税过期日期：</label>
									<div class="controls">
									<div id="crProduct_expiredDate_Date_Control" class="input-append">
											<input type="text" name="crProduct.expiredStr" value="<fmt:formatDate value="${form.crProduct.expiredDate}" pattern="yyyy-MM-dd" />" id="crProduct_expiredDate" class="span10" placeholder="产品版税过期日期" data-format="yyyy-MM-dd" />
											<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
										</div>
										<span id="crProduct_expiredDate_span" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group span6" id="crProduct_status_div">
									<label class="control-label" for="form-field-1">版税产品状态：</label>
									<div class="controls">
										<form:select path="crProduct.status" id="crProduct_status" cssClass="span10" onblur="">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.dic.RightLicenceProStatus}" />
										</form:select>
										<span id="crProduct_status_span" class="help-inline"></span>
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