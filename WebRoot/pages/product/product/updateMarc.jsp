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
<script src="${ctx}/js/jquery.autocomplete.js"></script>
<link rel="stylesheet" href="${ctx}/css/jquery.autocomplete.css" />
<script src="${ctx}/js/jquery.formFill.js"></script>
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/updateMarc.js"></script>

</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						更新marc信息 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	更新marc信息 
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	更新marc信息 
			    </c:if>
						</small>
					</h1>
				</div>
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="updateMarcForm" commandName="form" class="form-horizontal">
						<div class="row-fluid">
							<div id="isbnDiv" class="control-group span6">
								<label class="control-label" for="form-field-1">ISBN：</label>
								<div class="controls">
									<form:textarea path="listIsbn" id="isbn" class="span8"  cssStyle="width:150px;height: 210px"/>
									<span id="isbnSpan" class="help-inline"></span>
								</div>
							</div>
							<div id="listIsbnNotDiv" class="control-group span6">
								<label class="control-label" for="form-field-1">不存在的ISBN：</label>
								<div class="controls">
									<form:textarea path="listIsbnNot" id="listIsbnNot" class="span8" cssStyle="width:150px;height: 210px"/>
									<span id="listIsbnNotSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-info" id="save"  type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn" type="reset" id="reset">
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
