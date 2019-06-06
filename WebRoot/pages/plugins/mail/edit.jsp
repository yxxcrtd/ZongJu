<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>采购批次管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<link rel="stylesheet" type="text/css" href="${ctx}/ueditor/themes/default/css/ueditor.css" />
<script src="${ctx}/ueditor/ueditor.config.js"></script>
<script src="${ctx}/ueditor/ueditor.all.js"></script>
<script src="${ctx}/pages/plugins/mail/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>发送邮件</h1>
				</div>
			</div>
			<!-- ------------------导航页面部分结束----------------------------- -->
			<div class="row-fluid">
				<!-- ------------------表单部分开始----------------------------- -->
				<form:form id="mailForm" commandName="form" class="form-horizontal">
					<div class="row-fluid">
						<div id="toUserDiv" class="control-group span12 ">
							<label class="control-label" for="form-field-1"> 收件人：</label>
							<div class="controls">
								<form:input path="toUser" id="toUser" onblur="Editorial.Plugins.Mail.validateToUser();" class="span12" />
								<span id="toUserSpan" class="help-inline"></span>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div id="ccMailDiv" class="control-group span12 ">
							<label class="control-label" for="form-field-1"> 抄送：</label>
							<div class="controls">
								<form:input path="ccMail" id="ccMail" class="span12" />
								<span id="ccMailSpan" class="help-inline"></span>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<div id="subjectDiv" class="control-group span12 ">
							<label class="control-label" for="form-field-1"> 主题：</label>
							<div class="controls">
								<form:input path="subject" id="subject" class="span12" />
								<span id="subjectSpan" class="help-inline"></span>
							</div>
						</div>
					</div>
					<div class="row-fluid">
						<label class="control-label" for="form-field-1">附件：</label>
						<div class="controls">
							<a href="${ctx }${form.path}">${form.attachment }</a>
						</div>
					</div>
					<div class="row-fluid">
						<div id="positionDiv" class="control-group span12 ">
							<label class="control-label" for="form-field-1"> 正文：</label>
							<div class="controls">
								<script type="text/plain" id="position" name="position">
									${form.position}
								</script>
								<%-- 	<form:textarea path="position" id="position" name="position" cssStyle="height: 228px" class="span12" /> --%>
								<span id="positionSpan" class="help-inline"></span>
							</div>
						</div>
					</div>
					<form:hidden path="customerName" />
					<form:hidden path="productId" />
					<form:hidden path="path" />
					<!-- ------------------表单部分结束----------------------------- -->
					<div class="form-actions" style="text-align: center; padding-left: 0px;">
						<button class="btn btn-success" type="submit">
							<i class="icon-save bigger-110"></i> 保存
						</button>
						&nbsp; &nbsp; &nbsp;
						<button class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i> 清空
						</button>
					</div>
				</form:form>
			</div>
			<!-- ------------------表单按钮部分结束----------------------------- -->
		</div>
	</div>

</body>
</html>