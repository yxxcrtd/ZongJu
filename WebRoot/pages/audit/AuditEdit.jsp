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
<script src="${ctx}/js/audit/ProductAuditList.js"></script>
<script src="${ctx}/js/audit/edit_init.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品信息 <small> <i class="icon-double-angle-right"></i>审核完善产品信息</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
					<div class="table-header on">基本信息</div>
					<form:form id="insertProductForm" commandName="form" class="form-horizontal" enctype="multipart/form-data">
						<div id="baseInfoContentDiv" class="on-down">
							<div class="row-fluid ">
							
							
								<!-- ------------------表单部分开始----------------------------- -->
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div class="control-group" id="titleDiv">
											<label class="control-label" for="form-field-1">书名：</label>
											<div class="controls">
												<form:input path="product.title" id="title" class="span8"/>
												<span id="titleSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="isbnDiv">
											<label class="control-label" for="form-field-1">ISBN：</label>
											<div class="controls">
												<form:input path="product.isbn" id="isbn" onblur="Editorial.Product.ProductInfo.productISBN();"/>
												<span id="isbnSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="keywordDiv">
											<label class="control-label" for="form-field-1">关键词：</label>
											<div class="controls">
												<form:input path="product.keyword" id="keyword" placeholder="关键词以英文状态下,号隔开"/>
												<span id="keywordSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="priceDiv">
											<label class="control-label" for="form-field-1">价格：</label>
											<div class="controls">
												<form:input path="product.price" id="price" placeholder="数字类型,仅支持最多2位小数" onblur="Editorial.Product.ProductInfo.productPrice();"/>
												<span id="priceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="datePublicationDiv">
											<label class="control-label" for="form-field-1">出版日期：</label>
											<div class="controls">
											   <div id="invoiceDate" class="input-append">
												 <form:input path="product.dataPublicationStr" id="dataPublicationStr" class="span8" value="${form.product.datePublication}" data-format="yyyy-MM-dd" onblur="Editorial.Product.ProductInfo.datePublication();"/>
												 <span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
										         </span>
											   </div>
											   <span id="datePublicationSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="authorDiv">
											<label class="control-label" for="form-field-1">作者：</label>
											<div class="controls">
												<form:input path="product.author" id="author" value="${form.product.user.username}"/>
												<span id="authorSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="publisherDiv">
											<label class="control-label" for="form-field-1">出版社：</label>
											<div class="controls">
												<form:input path="product.publisher" id="publisher" />
												<span id="publisherSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="productLicenseDiv">
											<label class="control-label" for="form-field-1">授权：</label>
											<div class="controls">
												<form:select path="product.productLicense.licenseId" id="productLicense" onblur="Editorial.Product.ProductInfo.productLicense();">
                                                            <form:option value="">--选择--</form:option>
                                                            <c:forEach items="${form.productLicenseList}" var="t">
                                                                  <form:option value="${t.licenseId}">${t.licenseName}</form:option>
                                                            </c:forEach>
                                                </form:select>
												<span id="productLicenseSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="bindingDiv">
											<label class="control-label" for="form-field-1">装帧：</label>
											<div class="controls">
												<form:select path="product.binding" id="binding" onblur="Editorial.Product.ProductInfo.productBinding();">
                                                           <form:option value="">--选择--</form:option>
                                                           <form:option value="平装">平装</form:option>
                                                           <form:option value="精装">精装</form:option>
                                                </form:select>
												<span id="bindingSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="upLoadFileDiv">
											<label class="control-label" for="form-field-1">图书封面：</label>
											<div class="controls">
											    <input type="file" name="upLoadFile" id="upLoadFile" onblur="Editorial.Product.ProductInfo.upLoadFile();"/>
												<span id="upLoadFileSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="proportionDiv">
											<label class="control-label" for="form-field-1">分成比例：</label>
											<div class="controls">
												<form:input path="product.proportion" id="proportion" onblur="Editorial.Product.ProductInfo.Proportion();"/>%
												<span id="proportionSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form:hidden path="product.id" id="productId"/>
                            <form:hidden path="tid"/>
                            <form:hidden path="code" id="code"/>
                            <form:hidden path="product.objName" value="${product.objName}"/>
                            <form:hidden path="product.objId" value="${product.objId}"/>
                            
							<!-- ------------------表单部分开始----------------------------- -->
							<!-- ------------------表单按钮部分开始----------------------------- -->
							<div class="form-actions"
								style="text-align: center; padding-left: 0px;">
								<button class="btn btn-success" id="save">
									<i class="icon-save bigger-110"></i> 审核通过
								</button>
								&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset">
									<i class="icon-undo bigger-110"></i> 清空
								</button>
							</div>
							<!-- ------------------表单按钮部分结束----------------------------- -->

						</div>
					</form:form>
			</div>
		</div>
	</div>
</body>
</html>