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
<script src="${ctx}/pages/product/price/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品价格 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->

					<form:form id="priceForm" commandName="form" class="form-horizontal" onsubmit="return false;">
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="ace-thumbnails" id="saveDiv">
							<button class="btn btn-small btn-primary"  id="save" type="submit" onclick="Editorial.Price.validate();">
								<i class="icon-save bigger-125"></i>保存产品价格
							</button>
							<span id="saveSpan" style="color:#B94A48;"  class="help-inline"></span>
						</div>
						<!-- ------------------表单按钮部分结束----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;产品价格信息
					</div>
					<div class="on-down">
						<!-- ------------------表单部分开始----------------------------- -->
						<div class="row-fluid">
							<div class="control-group span6" id="priceTypeDiv">
								<label class="control-label" for="form-field-1">价格类型：</label>
								<div class="controls">
									<form:select path="productPrice.priceType" id="priceType" class="span6" onblur="Editorial.Price.validatePriceType();" >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.priceTypeMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
									<span id="priceTypeSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span6" id="priceNameDiv">
								<label class="control-label" for="form-field-1">价格名称：</label>
								<div class="controls">
									<form:input path="productPrice.priceName" id="priceName" placeholder="价格名称"  class="span6" onblur="Editorial.Price.validatePriceName();" />
									<span id="priceNameSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6" id="priceValueDiv">
								<label class="control-label" for="form-field-1">价格值：</label>
								<div class="controls">
									<form:input path="productPrice.priceValue" id="priceValue" placeholder="价格值"  class="span6" onblur="Editorial.Price.validatePriceValue();" />
									<span id="priceValueSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span6" id="priceOrderCategoryDiv">
								<label class="control-label" for="form-field-1">价格订单分类：</label>
								<div class="controls">
									<form:select path="productPrice.priceOrderCategory" id="priceOrderCategory" class="span6"  onblur="Editorial.Price.validatePriceOrderCategory();">
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.priceOrderCatagoryMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
									<span id="priceOrderCategorySpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6" id="priceStartOnDiv">
								<label class="control-label" for="form-field-1">价格开始时间：</label>
								<div class="controls">
									<div id="invoiceDate" class="input-append">
										<form:input path="priceStartOn" id="priceStartOn" placeholder="价格开始时间" value="${form.productPrice.priceStartOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Price.validatePriceStartOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
										</span>
									</div>
									<span id="priceStartOnSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span6" id="priceEndOnDiv">
								<label class="control-label" for="form-field-1">价格结束时间：</label>
								<div class="controls">
									<div id="invoiceDate2" class="input-append">
										<form:input path="priceEndOn" id="priceEndOn" placeholder="价格结束时间"  value="${form.productPrice.priceEndOn}" class="span6" data-format="yyyy-MM-dd"  onblur="Editorial.Price.validatePriceEndOn();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
										</span>
									</div>
									<span id="priceEndOnSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group span6" id="priceDefaultFlgDiv">
								<label class="control-label" for="form-field-1">价格默认标识：</label>
								<div class="controls">
									<form:select path="productPrice.priceDefaultFlg" id="priceDefaultFlg" class="span6" onblur="Editorial.Price.validatePriceDefaultFlg();" >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.priceDefaultFlgMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
									<span id="priceDefaultFlgSpan" class="help-inline"></span>
								</div>
							</div>
							<div class="control-group span6" id="regionIdDiv">
								<label class="control-label" for="form-field-1">所属地域：</label>
								<div class="controls">
									<form:select path="productPrice.region.id" id="regionId" class="span6" onblur="Editorial.Price.validateRegionId();"  >
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.regionList}" var="t">
											<form:option value="${t.id}">${t.name}</form:option>
										</c:forEach>
									</form:select>
									<span id="regionIdSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
                        <div class="row-fluid">

                            <div class="control-group span6">
                                <label class="control-label" >授权信息：</label>
                                <div class="controls">
                                    <form:select id="licenseId" path="productPrice.productLicense.licenseId" class="span6">
                                        <option value="0">----选择-----</option>
                                        <form:options items="${form.productLicenseList}" itemLabel="licenseName" itemValue="licenseId"/>
                                    </form:select>
                                </div>
                            </div>

                        </div>

						<form:hidden path="id" id="id" />
						<form:hidden path="productId" id="productId" />

					</div>
					</form:form>

					<!-- ------------------------------------------价格折扣----------------------------------------- -->
						<div id="showPriceDiscount" style="display:none;padding-top:5px;border-top: 1px dotted #E2E2E2;" >
							<div class="ace-thumbnails">
								<button class="btn btn-primary btn-small"  onclick="Editorial.PriceDiscount.AddDiscount();"> <i class="icon-plus-sign  bigger-125"></i>添加价格折扣</button>
								<button class="btn btn-danger btn-small"  onclick="Editorial.PriceDiscount.delAllDiscount();"> <i class="icon-trash  bigger-125"></i>删除全部价格折扣</button>
							</div>
							<!-- 折扣价格列表 -->
							<div class="table-header">
								<i class="icon-flag"></i>&nbsp;&nbsp;价格折扣列表
							</div>
							<table class="table table-striped table-bordered table-hover" id="table_report_2">
								<thead>
									<tr>
										<th width='10%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='15%' align='center'></th>
									</tr>
								</thead>
								<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;" id="table_report_tbody">

								</tbody>
								<tfoot>
									<tr>
										<th width='10%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='25%' align='center'></th>
										<th width='15%' align='center'></th>
									</tr>
								</tfoot>
						</table>
					</div>

				</div>
			</div>
		</div>
</body>
</html>