<%--
  Created by IntelliJ IDEA.
  User: huangchenxi
  Date: 14-5-23
  Time: 上午10:51
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
    <script src="${ctx}/pages/flow/taskRepo/edit.js"></script>
</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<form:form id="task_form" commandName="form" action="manager" class="form-horizontal">
    <div class="clearfix">
        <div id="page-content" class="clearfix">
            <div class="row-fluid">
                <!-- ------------------导航页面部分开始----------------------------- -->
                <div class="page-header position-relative">
                    <h1>创建任务</h1>
                </div>
                <!-- ------------------导航页面部分结束----------------------------- -->
                <!-- ------------------查询开始----------------------------- -->

                <div class="row-fluid">
                    <div class="table-header on">
                        基本信息
                    </div>
                    <div class="on-down">
                        <div class="row-fluid">
                            <div class="control-group span6">
                                <label class="control-label" for="form-field-1">流程名称：</label>

                                <div class="controls">
                                    <form:input path="task.name" name="taskName" id="taskName" class="span10"/>
                                </div>
                            </div>
                            <div class="control-group span6">
                                <label class="control-label" for="form-field-1">是否是开始任务：</label>

                                <div class="controls">
                                    <form:select path="task.startFlag" id="taskStartFlag" name="taskStartFlag"
                                                 class="span10">
                                        <option value="">--请选择--</option>
                                        <option value="1">是</option>
                                        <option value="2">否</option>
                                    </form:select>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="control-group span6">
                                <label class="control-label" for="form-field-1">任务类型：</label>

                                <div class="controls">
                                    <form:select path="task.taskAssigneeFlag" id="taskAssigneeFlag"
                                                 name="taskAssigneeFlag"
                                                 onblur="Editorial.Flow.taskRepo.selectTaskAssigneeFlag(this.value);"
                                                 class="span10">
                                        <option value="">--请选择--</option>
                                        <option value="1">普通任务</option>
                                        <option value="2">自动处理任务</option>
                                        <option value="3">并发任务起始</option>
                                        <option value="4">并发任务汇总</option>
                                    </form:select>
                                </div>
                            </div>
                            <div class="control-group span6" id="taskFieldDiv">
                                <label class="control-label" for="form-field-1">自定义属性编号：</label>

                                <div class="controls">
                                    <form:input path="task.field" name="taskField" id="taskField" class="span6"
                                                readonly="true"/>
                                    <input type="hidden" name="taskFieldHidden" id="taskFieldHidden"/>
                                    <form:input path="task.display" type="hidden" name="taskDisplayFieldHidden"
                                                id="taskDisplayFieldHidden"/>
                                    <button type="button" class="btn btn-small btn-primary"
                                            onclick="Editorial.Flow.taskRepo.selectField();"><i
                                            class="icon-edit bigger-125"></i> 选择属性
                                    </button>
                                </div>
                            </div>

                        </div>
                        <div class="row-fluid">
                            <div class="control-group span6" id="taskUrlDiv">
                                <label class="control-label" for="form-field-1">页面访问路径：</label>

                                <div class="controls">
                                    <form:input path="task.url" name="taskUrl" id="taskUrl" class="span10"/>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
            <input type="hidden" id="flowNodeCount"/>
            <form:hidden path="productType"/>

            <div class="row-fluid">
                <div id="fieldsContent"></div>
            </div>
            <div class="form-actions" style="text-align: center; padding-left:0px;">
                <button class="btn btn-success" id="save" type="submit">
                    <i class="icon-save bigger-110"></i> 保存
                </button>
                &nbsp; &nbsp; &nbsp;
                <button class="btn btn-inverse" type="reset">
                    <i class="icon-undo bigger-110"></i> 清空
                </button>
            </div>

            <!-- ------------------查询结束----------------------------- -->

        </div>
    </div>
    <form:hidden path="task.productType" id="productType"/>
</form:form>
</body>
</html>
