<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品信息管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/packList.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<form:form id="insertProductForm" commandName="form" class="form-horizontal">
    <form:hidden path="productId" id="productId"/>
</form:form>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->

				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails" id="productAddButton">
                            <button class="btn btn-small btn-primary"
                                    onclick="Editorial.Product.ProductInfo.Parent.saveAndClose();">
                                <i class="icon-plus-sign bigger-125"></i> 保存
                            </button>
					</div>

					<!-- ------------------功能按钮结束----------------------------- -->

					<!-- ------------------列表页面部分开始----------------------------- -->

					<div class="table-header">
                        <i class="icon-flag"></i>&nbsp;&nbsp;产品信息列表
                    </div>
					<table id="table_report"
						class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
                                <th width='4%' align='center'></th>
                                <th width='6%' align='center'></th>
                                <th width='6%' align='center'></th>
                                <th width='30%' align='center'></th>
                                <th width='30%' align='center'></th>
                                <th width='8%' align='center'></th>
                                <th width='8%' align='center'></th>
                                <th width='8%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center'
							style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
                                <th width='4%' align='center'></th>
                                <th width='6%' align='center'></th>
                                <th width='6%' align='center'></th>
                                <th width='30%' align='center'></th>
                                <th width='30%' align='center'></th>
                                <th width='8%' align='center'></th>
                                <th width='8%' align='center'></th>
                                <th width='8%' align='center'></th>
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