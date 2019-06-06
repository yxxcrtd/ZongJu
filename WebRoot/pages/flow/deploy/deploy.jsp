<%--
  Created by IntelliJ IDEA.
  User: huangchenxi
  Date: 14-5-22
  Time: 下午2:17
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <title>发布流程</title>
    <meta name="description" content="" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/pages/flow/deploy/deploy.js"></script>

</head>
<body>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <!-- ------------------导航页面部分开始----------------------------- -->
            <div class="page-header position-relative">
                <h1>
                    发布流程
                </h1>
            </div>
            <div class="row-fluid">
                <!-- ------------------表单部分开始----------------------------- -->
                <form:form id="uploadPersonTypeForm" commandName="form" class="form-horizontal">
                    <div class="row-fluid">
                        <div class="control-group" id="txtFileDiv">
                            <label class="control-label" for="form-field-1">上传：</label>
                            <div class="controls">
                                <form:input path="file" type="file" name="txtFile" class="span6" id="txtFile" onmousedown="Editorial.CRM.PersonType.validateUploadDown();" />
                                <span id="txtFileSpan" class="help-inline"></span>
                            </div>
                        </div>
                    </div>
                    <form:hidden path="code" id="code" />
                    <!-- ------------------表单部分结束----------------------------- -->
                    <!-- ------------------表单按钮部分开始----------------------------- -->
                    <div class="form-actions" style="text-align: center; padding-left: 0px;">
                        <button class="btn btn-success" id="save" type="submit">
                            <i class="icon-save bigger-110"></i> 保存
                        </button>
                        &nbsp; &nbsp; &nbsp;
                        <button class="btn btn-inverse" type="reset" id="reset" onclick = "clearMessage()">
                            <i class="icon-undo bigger-110"></i> 清空
                        </button>
                    </div>
                </form:form>
                <!-- ------------------表单按钮部分结束----------------------------- -->
            </div>
        </div>
    </div>
</div>
</body>
</html>


