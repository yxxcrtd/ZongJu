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
						<h1>版权信息<small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;<#if ("" == form.id || 0 == form.id)>新建<#else>修改</#if></small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">版权基本信息</div>
						<form id="CopyrightForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="belongDiv">
									<label class="control-label">版权所有者：</label>
									<div class="controls">
										<input class="span6" id="belong" name="obj.belong" value="${form.obj.belong!}" placeholder="版权所有人" onblur="ZongJu.Copyright.beLong();"/>
										<span id="belongSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="codeDiv">
									<label class="control-label">版权所属地：</label>
									<div class="controls">
										<input id="code" class="span6" name="obj.property" value="${form.obj.property!}" placeholder="版权所属地" />
										<span id="codeSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="startDateStrDiv">
									<label class="control-label">版权开始日期：</label>
									<div id="invoiceDate" class="controls">
										<input id="startDateStr" class="span6" name="obj.startDateStr" value="${form.obj.startDate!}" data-format="yyyy-MM-dd HH:mm:ss" onblur="startDateStr();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>
								</div>
								<div class="control-group" id="endDateStrDiv">
									<label class="control-label">版权结束日期：</label>
									<div id="invoiceDate2" class="controls">
										<input id="endDateStr" class="span6" name="obj.endDateStr" value="${form.obj.endDate!}" data-format="yyyy-MM-dd HH:mm:ss" onblur="endDateStr();" />
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>
								</div>
								<div class="control-group" id="underDiv">
									<label class="control-label">版权归属：</label>
									<div class="controls">
										<input id="under" class="span6" name="obj.under" value="${form.obj.under!}" placeholder="版权归属" onblur="ZongJu.Copyright.unDer();"/>
										<span id="underSpan" class="help-inline"></span>
									</div>
								</div>
								<input type="hidden" name="obj.id" value="${form.obj.id!}" />
								<input type="hidden" name="obj.sourceId.id" value="${form.obj.sourceId.id}"/>
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
		<script type="text/javascript" src="${request.contextPath}/js/copyright/CopyrightList.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/copyright/CopyrightListInit.js"></script>
	</body>
</html>
