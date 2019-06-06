<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品类型属性分类维护</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/classify/edit.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<!-- ------------------导航页面部分开始----------------------------- -->
			<div class="row-fluid">
				<div class="page-header position-relative">
					<h1>
						产品类型属性分类管理<small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新增产品类型属性分类
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改产品类型属性分类
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">
						基本信息
					</div>
					<form:form id="pTypePropClassifyForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<div class="control-group">
							<label class="control-label" for="form-field-1">名称：</label>
							<div class="controls">
								<form:input path="classify.name" id="name" class="span6" />
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">编号：</label>
							<div class="controls">
								<form:input path="classify.code" id="code" class="span6" />
							</div>
						</div>
						<div class="control-group" id="orderDiv">
							<label class="control-label" for="form-field-1">排序：</label>
							<div class="controls">
								<form:input path="classify.order" id="order" onblur="BMEP.Product.PTypePropClassify.order();" class="span6" />
								<span id="orderSpan" class="help-inline"></span>
							</div>
						</div>
						<div class="control-group">
							<label class="control-label" for="form-field-1">国际化编码：</label>
							<div class="controls">
								<form:input path="classify.internationCode" id="internationCode" class="span6" />
							</div>
						</div>
						<form:hidden path="id" id="classifyId" />
						<form:hidden path="tid" id="tid" />
					</div>	
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-success" id="save" type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset" id="reset">
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
