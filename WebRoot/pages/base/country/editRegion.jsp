<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!-- InstanceBegin template="/Templates/template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/base/country/show.js"></script>
<script src="${ctx}/pages/base/country/editRegion.js"></script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<div class="page-header position-relative">
					<h1>
						地域信息<small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建模块
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改地域信息
			    </c:if>
						</small>
					</h1>
				</div>
				<!--/.page-header-->

				<div class="row-fluid">
					<div class="table-header on">
							基本信息
					</div>
					<form:form id="editRegionForm" commandName="form" class="form-horizontal">
					<div class="on-down">
						<div id="nameDiv" class="control-group">
							<label class="control-label" for="form-field-1">地域名称：</label>
							<div class="controls">
								<form:input path="name" id="name" placeholder="地域名称" onblur="BMEP.Base.Country.Show.validateName();" class="span6" />
								<span id="nameSpan" class="help-inline"></span>
							</div>
						</div>

						<div id="codeDiv" class="control-group">
							<label class="control-label" for="form-field-1">区域代码：</label>
							<div class="controls">
								<form:input path="code" id="code" placeholder="区域代码" onblur="BMEP.Base.Country.Show.validateCode();" class="span6" />
								<span id="codeSpan" class="help-inline"></span>
							</div>
						</div>




						<form:hidden path="id" />
						<form:hidden path="fatherId" />
						<form:hidden path="otherId" />
						<form:hidden path="iDisplayLength" />
						<form:hidden path="iDisplayStart" />
					</div>
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
			</div>
		</div>
	</div>
</body>
<!-- InstanceEnd -->
</html>