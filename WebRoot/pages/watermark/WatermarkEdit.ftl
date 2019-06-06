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
						<h1>水印信息<small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;修改</small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">基本信息</div>
						<form id="WatermarkFormEdit" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="contentDiv">
									<label class="control-label">内容：</label>
									<div class="controls">
										<input class="span6" id="content" name="obj.content" value="${form.obj.content!}" placeholder="内容" onblur="ZongJu.Watermark.content();"/>
										<span id="contentSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="fontDiv">
									<label class="control-label">字体大小：</label>
									<div class="controls">
										<input id="font" class="span6" name="obj.font" value="${form.obj.font!}" placeholder="字体大小" onblur="ZongJu.Watermark.font();"/>
										<span id="fontSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="activeDiv">
									<label class="control-label">激活：</label>
									<div class="controls">
									     <select id="active" name="obj.active" class="span6" value="${form.obj.active!}">
									        <option value="0" <#if (0 == form.obj.active)>selected="selected"</#if>>未激活</option>
									        <option value="1" <#if (1 == form.obj.active)>selected="selected"</#if>>激活</option>
									     </select>
										<span id="activeSpan" class="help-inline"></span>
									</div>
								</div>
								<input type="hidden" name="obj.id" value="${form.obj.id!}" />
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
		<script type="text/javascript" src="${request.contextPath}/js/watermark/WatermarkList.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/watermark/WatermarkListInit.js"></script>
	</body>
</html>
