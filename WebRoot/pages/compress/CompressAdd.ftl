<#include "Context.ftl" />
<#assign ingentatag=JspTaglibs["/WEB-INF/taglib/ingenta-taglib.tld"] />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	</head>
	
	<body>
		<div class="clearfix">
			<#include "AjaxMsg.ftl" />
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
					<div class="page-header position-relative">
						<h1>产品打包信息 <small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;新建产品包文件夹</small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">基本信息</div>
						<form id="CompressForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="nameDiv">
									<label class="control-label">新建包名：</label>
									<div class="controls">
										<input id="name" class="span6" name="obj.name" placeholder="包名" onblur="ZongJu.Compress.BoxName();"/>
										<span id="nameSpan" class="help-inline"></span>
									</div>
								</div>
							</div>
							<div class="form-actions" style="text-align: center; padding-left:0px;">
								<button class="btn btn-success" type="submit" id="save"><i class="icon-save bigger-110"></i> 保存</button>&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset"><i class="icon-undo bigger-110"></i> 清空</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.namespace.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/compress/CompressAdd.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/compress/CompressList.js"></script>
		
	</body>
</html>
