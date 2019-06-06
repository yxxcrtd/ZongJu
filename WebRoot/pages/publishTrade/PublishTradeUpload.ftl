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
						<h1>版权交易信息 <small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;Excel导入</small></h1>
					</div>
					<div class="row-fluid">
						<form id="PublishTradeForm" commandName="form" class="form-horizontal">
						  <div class="on-down">
                            <div class="control-group" id="txtFileDiv">
									<label class="control-label">上传：</label>
									<div class="controls">
										<input type="file" id="txtFile" class="span6" name="txtFile" onmousedown="ZongJu.PublishTrade.UploadDown();" />
										<span id="txtFileSpan" class="help-inline"></span>
									</div>
							</div>
							<div>
							    
							</div>
                            <input type="hidden" id="sourceId" name="sourceId" value="${form.sourceId}"/>
                          </div>
							<div class="form-actions" style="text-align: center; padding-left:0px;">
								<button class="btn btn-success" type="submit" id="save"><i class="icon-save bigger-110"></i> 保存</button>&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset" id="reset"><i class="icon-undo bigger-110"></i> 清空</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.namespace.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/publishTrade/PublishTradeUpload.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/publishTrade/PublishTradeList.js"></script>
	</body>
</html>
