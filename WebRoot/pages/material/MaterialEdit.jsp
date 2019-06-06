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
<script src="${ctx}/js/material/MaterialEdit.js"></script>
<script src="${ctx}/js/material/MaterialList.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						素材信息 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
					<div class="table-header on">基本信息</div>
					<form:form id="MaterialForm" commandName="form" class="form-horizontal" enctype="multipart/form-data">
						<div id="baseInfoContentDiv" class="on-down">
							<div class="row-fluid ">
							
							
								<!-- ------------------表单部分开始----------------------------- -->
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div class="control-group" id="nameDiv">
											<label class="control-label" for="form-field-1">书名：</label>
											<div class="controls">
												<form:input path="obj.name" id="name" placeholder="名称"  onblur="name();"/>
												<span id="nameSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="introductionDiv">
											<label class="control-label" for="form-field-1">简介：</label>
											<div class="controls">
												<form:textarea path="obj.introduction" id="introduction" placeholder="简介" />
												<span id="introductionSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="isbnDiv">
											<label class="control-label" for="form-field-1">ISBN：</label>
											<div class="controls">
												<form:input path="obj.isbn" id="isbn" placeholder="ISBN"  onblur="isbn();"/>
												<span id="isbnSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="pageNumDiv">
											<label class="control-label" for="form-field-1">页数：</label>
											<div class="controls">
												<form:input path="obj.pageNum" id="pageNum" placeholder="页数" />
												<span id="pageNumSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="sizeDiv">
											<label class="control-label" for="form-field-1">开本：</label>
											<div class="controls">
												<form:input path="obj.size" id="size" placeholder="开本" />
												<span id="sizeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="goodsSizeDiv">
											<label class="control-label" for="form-field-1">尺寸：</label>
											<div class="controls">
												<form:input path="obj.goodsSize" id="goodsSize" placeholder="尺寸" />
												<span id="goodsSizeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="bookPriceDiv">
											<label class="control-label" for="form-field-1">纸书价格：</label>
											<div class="controls">
												<form:input path="obj.bookPrice" id="bookPrice" placeholder="纸书价格"  onblur="bookPrice();"/>
												<span id="bookPriceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="e_bookPriceDiv">
											<label class="control-label" for="form-field-1">电子书价格：</label>
											<div class="controls">
												<form:input path="obj.e_bookPrice" id="e_bookPrice" placeholder="电子书价格"  onblur="e_bookPrice();"/>
												<span id="e_bookPriceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="datePublicationDiv">
											<label class="control-label" for="form-field-1">出版日期：</label>
											<div class="controls">
											   <div id="invoiceDate" class="input-append">
												 <form:input path="obj.datePublicationStr" id="datePublicationStr" placeholder="出版日期" value="${form.obj.datePublication}" data-format="yyyy-MM-dd" onblur="datePublication();"/>
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
												<form:input path="obj.author" id="author" placeholder="作者" />
												<span id="authorSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="publisherDiv">
											<label class="control-label" for="form-field-1">出版社：</label>
											<div class="controls">
												<form:input path="obj.publisher" id="publisher" placeholder="出版社"  onblur="publisher();"/>
												<span id="publisherSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="belongDiv">
											<label class="control-label" for="form-field-1">版权所有者：</label>
											<div class="controls">
												<form:input path="obj.belong" id="belong" placeholder="版权所有者"  onblur="belong();"/>
												<span id="belongSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div class="control-group" id="bookCoversDiv">
											<label class="control-label" for="form-field-1">图书封面：</label>
											<div class="controls">
											<c:if test="${form.obj.bookCovers!=null}">
											   <input type="hidden" name="obj.bookCovers" value="${form.obj.bookCovers}"/> 
											   <image src="${ctx}/upload/${form.obj.bookCovers}" width="60" height="40"/>
											</c:if>
											<c:if test="${form.obj.bookCovers==null}">
											   <input type="file" name="txtFile"/> 
											</c:if>
												<span id="bookCoversSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form:hidden path="id" id="id" />
							<!-- ------------------表单部分开始----------------------------- -->
							<!-- ------------------表单按钮部分开始----------------------------- -->
							<div class="form-actions"
								style="text-align: center; padding-left: 0px;">
								<button class="btn btn-success" id="save">
									<i class="icon-save bigger-110"></i> 保存
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