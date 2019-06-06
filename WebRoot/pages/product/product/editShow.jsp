<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>修改产品信息</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/jquery.autocomplete.js"></script>
<link rel="stylesheet" href="${ctx}/css/jquery.autocomplete.css" />
<script src="${ctx}/js/jquery.formFill.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/editShow.js"></script>

</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建产品信息
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改产品信息
			    </c:if>
						</small>
					</h1>
				</div>
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">
						基本信息
					</div>
					<form:form id="insertProductForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<div class="row-fluid">
							<div id="isbnDiv" class="control-group span6">
								<label class="control-label" for="form-field-1">ISBN：</label>
								<div class="controls">
									<form:input path="product.isbn" id="isbn" onblur="BMEP.Product.ProductInfo.validateIsbn();BMEP.Product.ProductInfo.getMsgFromCode();"  class="span8" />
									<span id="isbnSpan" class="help-inline"></span>
									<form:hidden path="product.codeType" id="codeType" />
								</div>
							</div>
							<div class="control-group span6">
								<label class="control-label" for="form-field-2">译名：</label>
								<div class="controls">
									<form:input path="product.translation" id="translation" class="span8" />
								</div>
							</div>
						</div>

						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-2">副题名：</label>
								<div class="controls">
									<form:input path="product.subTitle" id="subTitle" class="span8" />
								</div>
							</div>
						</div>

						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">题名：</label>
								<div class="controls">
									<form:input path="product.title" id="title" class="span8" />
								</div>
							</div>
							<div class="control-group span6">
								<label class="control-label" for="form-field-2">出版年：</label>
								<div class="controls">
									<!--  		<div id="pubYearPicker" class="input-append">
										<form:input class="span6" path="product.pubYear" id="query_module_pubYear" data-format="yyyy-MM-dd" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar"> </i>
										</span>
									</div>
									-->
									<form:input class="span8" path="product.pubYear" id="pubYear" />
								</div>
							</div>


						</div>

						<div class="row-fluid">

							<div class="control-group span6">
								<label class="control-label" for="form-field-2">价格：</label>
								<div class="controls">
									<form:input path="product.price" id="price" class="span8" />
								</div>
							</div>
						</div>

						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">所属分社：</label>
								<div class="controls">
									<form:input path="product.pubName" id="pubName" class="span8" />
								</div>
							</div>

							<div class="control-group span6">
								<label class="control-label" for="form-field-2">版别：</label>
								<div class="controls">
									<form:input path="product.edition" id="edition" class="span8" />
								</div>
							</div>

						</div>

						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">页数：</label>
								<div class="controls">
									<form:input path="product.pageNum" id="pageNum" class="span8" />
								</div>
							</div>

							<div class="control-group span6">
								<label class="control-label" for="form-field-2">语种：</label>
								<div class="controls">
									<form:select path="product.language" id="language" class="span8">
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.languageMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
								</div>
							</div>

						</div>
						<div class="row-fluid">
							<div class="control-group span6">
								<label class="control-label" for="form-field-1">装帧：</label>
								<div class="controls">
									<form:select path="product.binding" id="binding" class=" span8">
										<form:option value="">--选择--</form:option>
										<c:forEach items="${form.bindingMap}" var="t">
											<form:option value="${t.key}">${t.value}</form:option>
										</c:forEach>
									</form:select>
								</div>
							</div>

						</div>
						<div class="row-fluid">
							<div class="control-group">
								<label class="control-label">已有分类法：</label>
								<div class="controls" id="subjectListShow">
									<c:forEach items="${form.subjectList}" var="s">
										<span onclick="BMEP.Product.ProductInfo.delSubject(this)" style="border: 1px solid #BDC0C5; margin: 3px; cursor: pointer" title="删除" id="sub_${s.id }"> ${s.name}-${s.code} <input type="hidden" name="subjectIds" value="${s.id}" />
										</span>
									</c:forEach>
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group">
								<label class="control-label">分类法：</label>
								<div class="controls">
									<input type="text" id="subject"  class="span8" /> <input type="hidden" name="subIds" id="subIds" />
								</div>
							</div>
						</div>

						<div class="row-fluid">
							<div class="control-group">
								<label class="control-label" for="form-field-2">关键字：</label>
								<div class="controls">
									<form:textarea path="product.keyword" id="keyword" class="span8" />
								</div>
							</div>
						</div>
						<div class="row-fluid">
							<div class="control-group">
								<label class="control-label" for="form-field-2">备注：</label>
								<div class="controls">
									<form:textarea path="product.remark" id="remark" class="span8" />
								</div>
							</div>
						</div>

						<c:if test="${fn:length(form.productTypePropClassifyList) !=0}">
							<div class="tabbable">
								<ul class="nav nav-tabs active">
									<c:forEach items="${form.productTypePropClassifyList}" var="m">
										<li><a href="#${m.code}" data-toggle="tab">${m.name}</a></li>
									</c:forEach>
								</ul>
								<div class="tab-content">
									<c:if test="${fn:length(form.productTypePropClassifyList) !=0}">
										<c:forEach items="${form.productTypePropClassifyList}" var="m" varStatus="productProps">
											<div <c:if test="${(productProps.index) == 0}"> class="tab-pane active" </c:if> <c:if test="${(productProps.index) != 0}"> class="tab-pane" </c:if> id="${m.code}">
												<c:forEach items="${form.map[m.code]}" var="c" varStatus="status">
													<input type="hidden" name="typePropIds" value="${c.id}" />
													<div>
														<c:if test="${c.display=='select'}">
															<div class="control-group  span6">
																<label class="control-label" for="form-field-1"><c:if test="${c.must=='YES'}">
																		<span class="red">*</span>
																	</c:if>${c.name}：</label>
																<div class="controls">
																	<select id="${c.code}" name="propsValue" class="span12">
																		<option value="0">----选择-----</option>
																		<c:forEach items="${form.dicMap[c.code]}" var="m">
																			<option value="${m.key}" <c:if test="${m.key==c.value}"> selected</c:if>>${m.value}</option>
																		</c:forEach>
																	</select>
																</div>
															</div>
														</c:if>
														<c:if test="${c.display=='text'}">
															<div class="control-group  span6">
																<label class="control-label" for="form-field-1"><c:if test="${c.must=='Yes'}">
																		<span class="red">*</span>
																	</c:if>${c.name}：</label>
																<div class="controls">
																	<c:if test="${form.product.id != null }">
																		<form:input path="propsValue" id="${c.code}" value="${c.value}" class="span12" />
																	</c:if>
																	<c:if test="${form.product.id == null }">
																		<form:input path="propsValue" id="${c.code}" class="span12" />
																	</c:if>
																</div>
															</div>
														</c:if>
														<c:if test="${c.display=='date'}">
															<div class="control-group  span6">
																<label class="control-label" for="form-field-1"><c:if test="${c.must=='Yes'}">
																		<span class="red">*</span>
																	</c:if>${c.name}：</label>
																<div class="controls">
																	<div id="${c.code}Time" class="input-append">
																		<c:if test="${form.product.id != null }">
																			<form:input path="propsValue" id="${c.code}" value="${c.value}" class="span12" data-format="yyyy-MM-dd" />
																		</c:if>
																		<c:if test="${form.product.id == null }">
																			<form:input path="propsValue" id="${c.code}" class="span12" data-format="yyyy-MM-dd" />
																		</c:if>
																		<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar"> </i>
																		</span> <span id="${c.code}Span" class="help-inline"></span>
																	</div>
																</div>
															</div>
														</c:if>
														<c:if test="${c.display=='textarea'}">
															<div class="control-group s6n6">
																<label class="control-label" for="form-field-1"><c:if test="${c.must=='Yes'}">
																		<span class="red">*</span>
																	</c:if>${c.name}：</label>
																<div class="controls">
																	<c:if test="${form.product.id != null }">
																		<textarea id="${c.code}" name="propsValue" class="span12">${c.value}</textarea>
																	</c:if>
																	<c:if test="${form.product.id == null }">
																		<textarea id="${c.code}" name="propsValue" class="span12"></textarea>
																	</c:if>
																</div>
															</div>
														</c:if>

													</div>
												</c:forEach>
											</div>
										</c:forEach>
									</c:if>
								</div>
							</div>
						</c:if>

						<form:hidden path="product.id" id="productInfoId"/>
						<form:hidden path="tid" />
						<form:hidden path="code" id="code" />
					</div>
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						
					</form:form>
					<!-- ------------------表单按钮部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>
