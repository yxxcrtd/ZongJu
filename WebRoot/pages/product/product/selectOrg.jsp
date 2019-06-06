<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>产品信息管理</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="${ctx}/pages/product/product/selectOrg.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<form:form id="orgHiddenForm" commandName="form" class="form-horizontal">
    <form:hidden path="id" id="id"/>
</form:form>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative" >
                <h1 id="productTitle">
                    选择执行者
                </h1>

                </h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->
            <div class="row-fluid">
                <button class="btn btn-small btn-primary"  onclick="Editorial.Product.ProductInfo.cloaseLayerAndGoOn();">
                    <i class="icon-save bigger-110"></i> 保存
                </button>
                <!-- ------------------列表页面部分开始----------------------------- -->

                <div class="table-header">
                    <i class="icon-flag"></i>&nbsp;&nbsp;任务列表
                </div>
                <table id="table_report"
                       class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width='10%' align='center'></th>
                        <th width='70%' align='center'></th>
                        <th width='20%' align='center'></th>

                    </tr>
                    </thead>
                    <tbody align='center'
                           style="line-height: 18px; border: 1px solid #97bbdc;">

                    </tbody>
                    <tfoot>
                    <tr>
                        <th width='10%' align='center'></th>
                        <th width='70%' align='center'></th>
                        <th width='20%' align='center'></th>
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