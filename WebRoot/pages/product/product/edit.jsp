<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/common.jsp" %>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>编辑资源信息</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="${ctx}/js/jquery.autocomplete.js"></script>
    <link rel="stylesheet" href="${ctx}/css/jquery.autocomplete.css"/>
    <script src="${ctx}/js/jquery.formFill.js"></script>
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/js/MAP.js"></script>
    <script src="${ctx}/pages/product/product/edit.js"></script>
    <script src="${ctx}/pages/product/product/edit_init.js"></script>

    <script src="${ctx}/js/fuelux/fuelux.wizard.min.js"></script>
    <script src="${ctx}/js/additional-methods.min.js"></script>
    <script src="${ctx}/js/bootbox.min.js"></script>
    <script src="${ctx}/js/jquery.maskedinput.min.js"></script>
    <script src="${ctx}/js/chosen.jquery.min.js"></script>
    <script src="${ctx}/js/ace.digital.wizard.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<div class="clearfix">
<div id="page-content" class="clearfix">
<div class="row-fluid">
<!-- ------------------导航页面部分开始----------------------------- -->

<div class="row-fluid">
<%--<button class="btn btn-info"  onclick="Editorial.Product.ProductInfo.openSelectOrg();">--%>
<%--<i class="icon-share-alt bigger-110"></i> 保存并继续--%>
<%--</button>--%>
<!-- ------------------表单部分开始----------------------------- -->
<form:form id="insertProductForm" commandName="form" class="form-horizontal" enctype="multipart/form-data">
<form:hidden path="product.id" id="productId"/>
<form:hidden path="tid"/>
<form:hidden path="code" id="code"/>
<div class="table-header on" id="baseInfoDiv">
    <i class="icon-caret-down"></i>&nbsp;&nbsp;基本信息
</div>
<div id="baseInfoContentDiv" class="on-down">
    <div class="row-fluid">
        <div class="control-group span6" id="titleDiv">
            <label class="control-label" for="form-field-1">题名：</label>
            <div class="controls">
                <form:input path="product.title" id="title" class="span8" onblur="Editorial.Product.ProductInfo.titleName();"/>
                <span id="titleSpan" class="help-inline"></span>
            </div>
        </div>
        <div class="control-group span6">
            <label class="control-label" for="form-field-2">译名：</label>
            <div class="controls">
                <form:input path="product.translation" id="translation" class="span8"/>
            </div>
        </div>
    </div>
    <div class="row-fluid">
        <div class="control-group span6">
            <label class="control-label" for="form-field-2">副题名：</label>
            <div class="controls">
                <form:input path="product.subTitle" id="subTitle" class="span8"/>
            </div>
        </div>
        <div class="control-group span6" id="isbnDiv">
            <label class="control-label" for="form-field-2">ISBN：</label>
            <div class="controls">
                <form:input path="product.isbn" id="isbn" class="span8" onblur="Editorial.Product.ProductInfo.productISBN();"/>
                <span id="isbnSpan" class="help-inline"></span>
            </div>
        </div>
    </div>
    
    <div class="row-fluid">
        <div class="control-group span6">
            <label class="control-label" for="form-field-2">关键字：</label>
            <div class="controls">
                <form:input path="product.keyword" id="keyword" class="span8" placeholder="关键词以英文状态下,号隔开"/>
            </div>
        </div>
        <div class="control-group span6" id="priceDiv">
            <label class="control-label" for="form-field-2">价格：</label>
            <div class="controls">
                <form:input path="product.price" id="price" class="span8" placeholder="数字类型,仅支持最多2位小数" onblur="Editorial.Product.ProductInfo.productPrice();"/>
                <span id="priceSpan" class="help-inline"></span>
            </div>
        </div>
    </div>
    
    <div class="row-fluid">
        <div class="control-group span6" id="publisherDiv">
            <label class="control-label" for="form-field-2">出版社：</label>
            <div class="controls">
                <form:input path="product.publisher" id="publisher" class="span8" onblur="Editorial.Product.ProductInfo.productPublisher();"/>
                <span id="publisherSpan" class="help-inline"></span>
            </div>
        </div>
        <div class="control-group span6" id="dataPublicationStrDiv">
            <label class="control-label" for="form-field-1">出版日期：</label>

            <div id="invoiceDate" class="controls">
                <form:input path="product.dataPublicationStr" id="dataPublicationStr" class="span8" value="${form.product.datePublication}" data-format="yyyy-MM-dd" onblur="Editorial.Product.ProductInfo.datePublication();"/>
                <span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i>
            </div>
        </div>
    </div>

    <div class="row-fluid">
        <div class="control-group span6">
            <label class="control-label" for="form-field-2">版别：</label>
            <div class="controls">
                <form:input path="product.edition" id="edition" class="span8" placeholder="是第几版，如果是第一版只需填写“一”"/>
            </div>
        </div>
        <div class="control-group span6" id="pageNumDiv">
            <label class="control-label" for="form-field-1">页数：</label>
            <div class="controls">
                <form:input path="product.pageNum" id="pageNum" class="span8" placeholder="页数仅支持数字" onblur="Editorial.Product.ProductInfo.productPageNum();"/>
                <span id="pageNumSpan" class="help-inline"></span>
            </div>
        </div>
    </div>

    <div class="row-fluid">
        <div class="control-group span6" id="productLicenseDiv">
            <label class="control-label" for="form-field-1">授权：</label>
            <div class="controls">
                <form:select path="product.productLicense.licenseId" id="productLicense" class=" span8" onblur="Editorial.Product.ProductInfo.productLicense();">
                    <form:option value="">--选择--</form:option>
                    <c:forEach items="${form.productLicenseList}" var="t">
                        <form:option value="${t.licenseId}">${t.licenseName}</form:option>
                    </c:forEach>
                </form:select>
            </div>
            <span id="productLicenseSpan" class="help-inline"></span>
        </div>
        <div class="control-group span6" id="authorDiv">
            <label class="control-label" for="form-field-2">作者：</label>
            <div class="controls">
                <form:input path="product.author" id="author" class="span8" onblur="Editorial.Product.ProductInfo.productAuthor();"/>
                <span id="authorSpan" class="help-inline"></span>
            </div>
        </div>
    </div>

    <div class="row-fluid">
        <div class="control-group span6" id="bindingDiv">
            <label class="control-label" for="form-field-1">装帧：</label>
            <div class="controls">
                <form:select path="product.binding" id="binding" class=" span8" onblur="Editorial.Product.ProductInfo.productBinding();">
                    <form:option value="">--选择--</form:option>
                    <form:option value="平装">平装</form:option>
                    <form:option value="精装">精装</form:option>
                </form:select>
            </div>
            <span id="bindingSpan" class="help-inline"></span>
        </div>
        <div class="control-group span6">
            <label class="control-label" for="form-field-2">语种：</label>

            <div class="controls">
                <form:input path="product.language" id="language" class="span8" placeholder="哪种译本"/>
            </div>
        </div>
    </div>
    
    <div class="row-fluid">
        <div class="control-group span6" id="upLoadFileDiv">
            <label class="control-label" for="form-field-2">图书封面：</label>
            <div class="controls">
				<c:if test="${form.product.bookCovers!=null}">
				<input type="hidden" name="product.bookCovers" value="${form.product.bookCovers}"/> 
				<image src="/upload/image/${form.product.bookCovers}" width="160" />
				<input type="file" name="upLoadFile" id="upLoadFile" onblur="Editorial.Product.ProductInfo.upLoadFile();"/>
				</c:if>
				<c:if test="${form.product.bookCovers==null}">
				<input type="file" name="upLoadFile" id="upLoadFile" class="span8" onblur="Editorial.Product.ProductInfo.upLoadFile();"/>
				</c:if>
            </div>
            <span id="upLoadFileSpan" class="help-inline"></span>
        </div>
        <div class="control-group span6" id="upLoadFilePDFDiv">
            <label class="control-label" for="form-field-1">图书PDF：</label>
            <div class="controls">
				<c:if test="${form.product.bookPDFSystemName!=null}">
                <input type="hidden" name="product.bookPDFSystemName" value="${form.product.bookPDFSystemName}"/> 
				<c:out value="${form.product.bookPDFSystemName}"></c:out>
				<input type="file" name="upLoadFilePDF" id="upLoadFilePDF" onblur="Editorial.Product.ProductInfo.upLoadFilePDF();"/>
				</c:if>
				<c:if test="${form.product.bookPDFSystemName==null}">
				<input type="file" name="upLoadFilePDF" id="upLoadFilePDF" class="span8" onblur="Editorial.Product.ProductInfo.upLoadFilePDF();"/>
				</c:if>
            </div>
            <span id="upLoadFilePDFSpan" class="help-inline"></span>
        </div>
    </div>
    
    <div class="row-fluid">
        <div class="control-group span6" id="upLoadFileXMLDiv">
            <label class="control-label" for="form-field-2">Xml文件：</label>
            <div class="controls">
				<c:if test="${form.product.bookXMLName!=null}">
				<input type="hidden" name="product.bookXMLName" value="${form.product.bookXMLName}"/> 
				<c:out value="${form.product.bookXMLName}"></c:out>
				<input type="file" name="upLoadFileXML" id="upLoadFileXML" onblur="Editorial.Product.ProductInfo.upLoadFileXML();"/>
				</c:if>
				<c:if test="${form.product.bookXMLName==null}">
				<input type="file" name="upLoadFileXML" id="upLoadFileXML" class="span8" onblur="Editorial.Product.ProductInfo.upLoadFileXML();"/>
				</c:if>
            </div>
            <span id="upLoadFileXMLSpan" class="help-inline"></span>
        </div>
        <div class="control-group span6" id="proportionDiv">
            <label class="control-label" for="form-field-2">折扣率：</label>
            <div class="controls">
                <form:input path="product.proportion" id="proportion" class="span8" onblur="Editorial.Product.ProductInfo.Proportion();"/>%
                <span id="proportionSpan" class="help-inline"></span>
            </div>
        </div>
    </div>

    <div class="row-fluid">
        <div class="control-group">
            <label class="control-label" for="form-field-2">备注：</label>
            <div class="controls">
                <form:textarea path="product.remark" id="remark" class="span10 h100"/>
            </div>
        </div>
    </div>

</div>

<!-- ------------------表单部分结束----------------------------- -->
<!-- ------------------表单按钮部分开始----------------------------- -->
<div class="form-actions span12" style="text-align: center; padding-left: 0px;">
    <button class="btn btn-success" id="save">
        <i class="icon-save bigger-110"></i> 保存
    </button>
    &nbsp; &nbsp; &nbsp;
    <button class="btn btn-inverse" type="reset">
        <i class="icon-undo bigger-110"></i> 清空
    </button>
</div>
<form:hidden path="flag" id="flag"/>
<form:hidden path="activityId"/>
<form:hidden path="taskId"/>
<form:hidden path="taskFlag"/>
</form:form>
<!-- ------------------表单按钮部分结束----------------------------- -->
</div>
</div>
</div>
</div>
</body>
</html>