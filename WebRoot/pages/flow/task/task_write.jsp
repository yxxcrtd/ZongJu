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
    <script src="${ctx}/pages/bpm/task_write.js"></script>
</head>

<body>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>已发布流程</h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->

            <div class="row-fluid">
                <!-- ------------------功能页面部分开始----------------------------- -->
                <!-- ------------------功能按钮开始----------------------------- -->
                <div class="ace-thumbnails"></div>
                <form:form id="uploadForm" commandName="form" class="form-horizontal" enctype="multipart/form-data">
                    <form:hidden path="id"/>
                    <form:hidden path="personId" id="personId"/>
                    <form:hidden path="flag"/>
                </form:form>
                <!-- ------------------功能按钮结束----------------------------- -->

                <!-- ------------------查询开始----------------------------- -->

                <!-- ------------------查询结束----------------------------- -->
                <!-- ------------------功能页面部分结束----------------------------- -->

                <!-- ------------------列表页面部分开始----------------------------- -->
                <div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;流程列表</div>
                <table id="table_report" class="table table-striped table-bordered table-hover">
                    <thead>
                    <tr>
                        <th width='3%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='6%' align='center'></th>
                        <th width='20%' align='center'></th>

                    </tr>
                    </thead>
                    <tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

                    </tbody>
                    <tfoot>
                    <tr>
                        <th width='3%' align='center'></th>
                        <th width='10%' align='center'></th>
                        <th width='6%' align='center'></th>
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
