<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>资源管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/list.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<!--  <div class="page-header position-relative" >
					<h1 id="productTitle">
						资源管理 <small> <i class="icon-double-angle-right"></i>
							资源管理列表
						</small>
					</h1>
            </div>-->
            <!-- ------------------导航页面部分结束----------------------------- -->
            <div class="row-fluid">
                <!-- ------------------功能页面部分开始----------------------------- -->
                <!-- ------------------功能按钮开始----------------------------- -->
                <div class="ace-thumbnails">
                    <select id="productTypeSelect" name="productTypeSelect" >
                        <option value="">--请选择--</option>
                        <c:forEach var="productType" items="${form.productTypeList}">
                            <option value="${productType.code}"><c:if test="${!empty productType.parentId}">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</c:if>${productType.name}</option>
                        </c:forEach>
                    </select>
                    <button class="btn btn-small btn-primary" id="productAddButton"
                            onclick="Editorial.Product.ProductInfo.addObj();">
                        <i class="icon-plus-sign bigger-125"></i> 新建产品信息
                    </button>
                </div>
                <!-- ------------------功能按钮结束----------------------------- -->

					<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
					</div>
					<div class="on-down">
						<form:form id="form" commandName="form" class="form-horizontal">
							<div class="row-fluid">
								<div class="row-fluid">
									<div class="control-group span3">
										<label class="control-label" for="form-field-1">ISBN：</label>
										<div class="controls">
											<form:input path="queryIsbn" id="query_module_isbn"
												class="span10" />
										</div>
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-1">书名：</label>
										<div class="controls">
											<form:input path="title" id="query_module_title"
												class="span10" />
										</div>
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-1">作者：</label>
										<div class="controls">
											<form:input path="author" id="query_module_author"
												class="span10" />
										</div>
									</div>
								</div>

								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button"
										onclick="Editorial.Product.ProductInfo.query();">
										<i class="icon-zoom-in bigger-110"></i>查询
									</button>
									&nbsp;&nbsp;
									<button type="reset" class="btn btn-small btn-inverse">
										<i class="icon-repeat bigger-110"></i>重置
									</button>
								</div>
							</div>
							<form:hidden path="id" />
							<form:hidden path="tid" />
							<form:hidden path="flag" id="flag" />
						</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->

                    <div id="productListTitle" class="table-header">
                        <i class="icon-flag"></i>&nbsp;&nbsp;资源管理列表
                    </div>
					<table id="table_report"
						class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='5%' align='center'></th>
                                <th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center'
							style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
                                <th width='5%' align='center'></th>
                                <th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
							</tr>
						</tfoot>
					</table>
					<!-- ------------------列表页面部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>