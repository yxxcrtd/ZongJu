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
    <!--[if IE 7]>
    <link rel="stylesheet" href="css/font-awesome-ie7.min.css"/>
    <![endif]-->
    <!--[if lte IE 8]>
    <link rel="stylesheet" href="css/ace-ie.min.css"/>
    <![endif]-->
    <!--inline styles if any-->
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/js/MAP.js"></script>
    <script src="${ctx}/pages/flow/design/index.js"></script>
</head>
<body>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>流程编辑</h1>
            </div>
            <!-- ------------------导航页面部分结束----------------------------- -->
            <!-- ------------------查询开始----------------------------- -->
            <div class="table-header on">
                <i class="icon-caret-down"></i>&nbsp;&nbsp;添加任务
            </div>
            <div class="on-down">
                <form:form id="form" commandName="form" action="manager" class="form-horizontal">
                    <div class="row-fluid">
                        <div class="row-fluid">
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">流程名称：</label>

                                <div class="controls">
                                    <input name="taskName" id="taskName" class="span10"/>
                                </div>
                            </div>
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">页面访问路径：</label>

                                <div class="controls">
                                    <input name="taskUrl" id="taskUrl" class="span10"/>
                                </div>
                            </div>
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">是否需要人为参与：</label>

                                <div class="controls">
                                    <select id="taskAssigneeFlag" name="taskAssigneeFlag"
                                            onblur="Editorial.JBPM.Design.selectTaskAssigneeFlag(this.value);"
                                            class="span10">
                                        <option value="">--请选择--</option>
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </select>
                                </div>
                            </div>
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">分配人：</label>

                                <div class="controls">
                                    <input name="taskAssignee" id="taskAssignee" class="span10"/>
                                </div>
                            </div>
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">是否是开始任务：</label>

                                <div class="controls">
                                    <select id="taskStartFlag" name="taskStartFlag" class="span10">
                                        <option value="">--请选择--</option>
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </select>
                                </div>
                            </div>
                            <!--
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">是否是结束任务：</label>
                                <div class="controls">
                                    <select id="taskEndFlag" name="taskEndFlag" class="span10" >
                                        <option	value="">--请选择--</option>
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </select>
                                </div>
                            </div>
                             -->
                            <div class="control-group span3">
                                <label class="control-label" for="form-field-1">自定义属性编号：</label>

                                <div class="controls">
                                    <input name="taskField" id="taskField" class="span6" disabled/>
                                    <input type="hidden" name="taskFieldHidden" id="taskFieldHidden"/>
                                    <input type="hidden" name="taskDisplayFieldHidden" id="taskDisplayFieldHidden"/>
                                    <button type="button" class="btn btn-small btn-primary"
                                            onclick="Editorial.JBPM.Design.selectField();"><i
                                            class="icon-edit bigger-125"></i> 选择属性
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <input type="hidden" id="flowNodeCount"/>
                    <form:hidden path="productType"/>
                </form:form>
                <div class="ace-thumbnails">
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.Design.addObj();">
                        <i class="icon-plus-sign bigger-125"></i> 添加
                    </button>
                </div>
            </div>
            <!-- ------------------查询结束----------------------------- -->
            <div class="row-fluid">
                <!-- ------------------功能按钮开始----------------------------- -->
                <div class="ace-thumbnails">
                    <button class="btn btn-small btn-primary" onclick="Editorial.JBPM.Design.deploy();">
                        <i class="icon-share-alt bigger-125"></i> 发布
                    </button>
                </div>
                <!-- ------------------功能按钮结束----------------------------- -->
                <!-- ----------------------------------------------- -->
                <div id="content" class="content">
                </div>
            </div>
        </div>
    </div>
</div>
</body>
</html>
