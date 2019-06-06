<%--
  Created by IntelliJ IDEA.
  User: huangchenxi
  Date: 14-6-18
  Time: 上午10:06
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/common.jsp" %>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>管理</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/pages/module/taskPersonalListModule.js"></script>
</head>

<body>
<div class="clearfix">
    <div id="page-content" class="clearfix"  style="padding: 0">
        <div class="row-fluid">

            <div class="row-fluid">
                <table id="table_report" class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width='3%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='10%' align='center'></th>
                    </tr>
                    </thead>
                    <tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

                    </tbody>
                    <tfoot>
                    <tr>
                        <th width='3%' align='center'></th>
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

