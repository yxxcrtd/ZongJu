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
<script src="${ctx}/pages/product/structureElement/edit.js"></script>
</head>
<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>素材信息
						<small><i class="icon-double-angle-right"></i>新建</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
									
				<div class="row-fluid">
					<div class="table-header">基本信息</div>
					<div class="on-down">
					
					<form:form id="addElementForm" commandName="form" class="form-horizontal">
						<form:hidden path="structure.id" />
						<form:hidden path="product.id" />
						<form:hidden path="id" id="khids" />
						<!-- ------------------表单部分开始----------------------------- -->
						<div class="control-group" id="element_name_div">
							<label class="control-label" for="form-field-1">素材内容：</label>
							<div class="controls">
								<form:textarea path="element.name" id="element_name" class="span10 h100" placeholder="素材内容" onblur="Editorial.Material.validate()" />
								<span id="element_name_span" class="help-inline"></span>
							</div>
						</div>
						
						<div class="control-group" id="element_keyword_div">
							<label class="control-label" for="form-field-1">关键字：</label>
							<div class="controls">
								<form:input path="element.keyword" id="element_keyword" class="span10" placeholder="关键字,多个关键字逗号分割" />
								<span id="element_keyword_span" class="help-inline"></span>
							</div>
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
	</div>
</body>
</html>