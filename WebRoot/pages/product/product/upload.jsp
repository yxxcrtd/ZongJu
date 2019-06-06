<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>修改产品信息</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/upload.js"></script>

</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	导入Excel
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	导入Excel
			    </c:if>
						</small>
					</h1>
				</div>
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="uploadProductForm" commandName="form" class="form-horizontal">
						<div class="row-fluid">
							<div class="control-group" id="txtFileDiv">
								<label class="control-label" for="form-field-1">上传：</label>
								<div class="controls">
									<input type="file" name="txtFile" class="span6" id="txtFile" /> 
									<span id="txtFileSpan" class="help-inline"></span>
								</div>
							</div>
							
							<div class="control-group" id="uploadTypeDiv">
								<label class="control-label" for="form-field-1">上传：</label>
								<div class="controls">
									<form:select path="uploadType" id="uploadType" class="span8">
										<form:option value="0">只新增</form:option>
										<form:option value="1">只更新</form:option>
										<form:option value="2">新增并更新</form:option>
									</form:select>
									<span id="uploadTypeSpan" class="help-inline"></span>
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
