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
    <script src="${ctx}/pages/flow/processDefine/list.js"></script>
    <script type="text/javascript">

    </script>
</head>

<body>

<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>流程列表</h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->
            <div class="row-fluid">

                <!-- ------------------功能按钮开始----------------------------- -->
                <div class="ace-thumbnails">
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.ProcessDefine.addTask();">
                        <i class="icon-list bigger-125"></i> 查看任务仓库
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.ProcessDefine.addSubProcess();">
                        <i class="icon-list bigger-125"></i> 查看子流程仓库
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.ProcessDefine.addObj();">
                        <i class="icon-share-alt bigger-125"></i> 新建并发布流程
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.ProcessDefine.addProcess();">
                        <i class="icon-share-alt bigger-125"></i> 选择流程模板并发布流程
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.ProcessDefine.deploy();">
                        <i class="icon-share-alt bigger-125"></i> 直接发布流程
                    </button>
                </div>
                <!-- ------------------功能按钮结束----------------------------- -->


                <!-- ------------------查询开始----------------------------- -->
                <form:form id="form" commandName="form" action="manager" class="form-horizontal">
                    <form:hidden path="productType"/>
                </form:form>
                <!-- ------------------查询结束----------------------------- -->

                <div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;流程列表</div>
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
