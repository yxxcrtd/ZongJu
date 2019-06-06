<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/common.jsp" %>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>后台管理</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/pages/flow/productType/list.js"></script>
    <script type="text/javascript">
    </script>
</head>

<body>

<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>
                    产品类型列表
                </h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->

            <div class="row-fluid">

                <div class="table-header">
                    <i class="icon-flag"></i>&nbsp;&nbsp;产品类型列表
                </div>
                <table id="table_report" class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>

                    </thead>
                    <tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

                    </tbody>
                    <tfoot>
                    <tr>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>

                    </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    </div>
</div>
</body>
</html>
