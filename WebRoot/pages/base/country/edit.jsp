<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!-- InstanceBegin template="/Templates/template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta charset="utf-8" />
<title>分类法管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/base/country/edit.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						国别管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建模块
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改国别信息
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
					<form:form  commandName="form" id="editCountryForm" class="form-horizontal">
					<div class="on-down">
						<div id="cnNameDiv" class="control-group">
							<label class="control-label" for="form-field-1">国别中文名：</label>
							<div class="controls">
								<form:input path="obj.cnName" id="cnName" placeholder="国别中文名"  onblur="BMEP.Base.Country.validateCnName();" class="span6"/>
								<span id="cnNameSpan" class="help-inline"></span>
							</div>
						</div>
						<div id="enNameDiv" class="control-group">
							<label class="control-label" for="form-field-1">国别英文名：</label>
							<div class="controls">
								<form:input path="obj.enName" id="enName" placeholder="国别英文名" onblur="BMEP.Base.Country.validateEnName();" class="span6"/>
								<span id="enNameSpan" class="help-inline"></span>
							</div>
						</div>

						
						<form:hidden path="iDisplayLength" />
						<form:hidden path="iDisplayStart" />
						<form:hidden path="obj.id" />
						
					</div>
					<div class="form-actions" style="text-align: center; padding-left:0px;">
						<button class="btn btn-success" type="submit" id="save">
							<i class="icon-save bigger-110"></i> 保存
						</button>
						&nbsp; &nbsp; &nbsp;
						<button class="btn btn-inverse" type="reset">
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
