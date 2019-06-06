<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/attach/edit.js"></script>
</head>

<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						附加信息 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<div class="table-header on">
						基本信息
					</div>
					<form:form id="attachForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<!-- ------------------表单部分开始----------------------------- -->
						<div class="control-group" id="codeDiv">
							<label class="control-label" for="form-field-1">编号：</label>
							<div class="controls">
								<form:input path="productAttach.code" id="code" placeholder="编号"  class="span6" />
								<span id="codeSpan" class="help-inline"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">名称：</label>
							<div class="controls">
								<form:select path="productAttach.name" id="name" class="span6">
									<form:option value="">--选择--</form:option>
									<c:forEach items="${form.productAttachTypeMap}" var="t">
										<form:option value="${t.key}">${t.value}</form:option>
									</c:forEach>
								</form:select>
								<span id="nameSpan" class="help-inline"></span>
							</div>
						</div>
						<form:hidden path="id" id="id" />
						<form:hidden path="productId" id="productId" />
					</div>	
						<!-- ------------------表单部分开始----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" id="save">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>
						<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>