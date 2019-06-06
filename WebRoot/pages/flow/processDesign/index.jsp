<%--
  Created by IntelliJ IDEA.
  User: huangchenxi
  Date: 14-5-26
  Time: 上午10:40
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8"/>
    <title>后台管理</title>
    <meta name="description" content=""/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!--[if IE 7]>
    <link rel="stylesheet" href="css/font-awesome-ie7.min.css"/>
    <![endif]-->
    <!--[if lte IE 8]>
    <link rel="stylesheet" href="css/ace-ie.min.css"/>
    <![endif]-->
    <!--inline styles if any-->
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/js/MAP.js"></script>
    <script src="${ctx}/pages/flow/processDesign/index.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>流程编辑</h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->
            <!-- ------------------查询开始----------------------------- -->

            <!-- ------------------查询结束----------------------------- -->
            <div class="row-fluid">
                <!-- ------------------功能按钮开始----------------------------- -->
                <div class="ace-thumbnails">
                    <button class="btn btn-small btn-primary" onclick="Editorial.Flow.processDesign.deploy();">
                        <i class="icon-share-alt bigger-125"></i> 发布
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.Flow.processDesign.addTask();">
                        <i class="icon-plus-sign bigger-125"></i> 添加任务
                    </button>
                    <button class="btn btn-small btn-primary" onclick="Editorial.Flow.processDesign.addSubProcess();">
                        <i class="icon-plus-sign bigger-125"></i> 添加子流程
                    </button>
                </div>
                <!-- ------------------功能按钮结束----------------------------- -->
                <div class="row-fluid">
                    <form:form id="costForm" commandName="form" class="form-horizontal">
                        <!-- ------------------表单部分开始----------------------------- -->
                        <div class="control-group">
                            <label class="control-label" >流程名称：</label>

                            <div class="controls">
                                <form:input path="processName" id="processName" placeholder="流程名称" class="span6"/>
                            </div>
                        </div>
                        <form:hidden path="id" id="id"/>
                        <form:hidden path="productType" id="productType"/>
                        <!-- ------------------表单部分开始----------------------------- -->
                        <!-- ------------------表单按钮部分开始----------------------------- -->

                        <!-- ------------------表单按钮部分结束----------------------------- -->
                    </form:form>
                </div>
                <!-- ----------------------------------------------- -->
                <div id="content" class="content">
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
