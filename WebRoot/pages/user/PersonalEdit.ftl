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
						<h1>作者信息 <small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;作者信息</small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">基本资料</div>
						<form id="UserForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group">
									<label class="control-label">用户帐号：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.username}" readonly/>
										<span class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="telephoneDiv">
									<label class="control-label">联系方式：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.telephone}" readonly/>
										<span id="telephoneSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="addressDiv">
									<label class="control-label">所在地址：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.address}" readonly/>
										<span id="addressSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="integralDiv">
									<label class="control-label">会员积分：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.integral}" readonly/>
										<span id="integralSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="balanceDiv">
									<label class="control-label">点卡余额：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.balance}" readonly/>
										<span id="balanceSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="proportionDiv">
									<label class="control-label">分成比例：</label>
									<div class="controls">
										<input id="proportion"  name="obj.proportion" class="span6" value="${form.obj.proportion}" onblur="ZongJu.User.proPortion();"/>%
										<span id="proportionSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="createDateDiv">
									<label class="control-label">注册日期：</label>
									<div class="controls">
										<input style="border:0px" class="span6" value="${form.obj.createDate}"  readonly/>
										<span id="createDateSpan" class="help-inline"></span>
									</div>
								</div>
								<input type="hidden" name="obj.id" value="${form.obj.id}" />
							</div>
							<div class="form-actions" style="text-align: center; padding-left:0px;">
								<button class="btn btn-success" type="submit" id="save"><i class="icon-save bigger-110"></i> 修改</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.namespace.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/user/UserList.js"></script>
	</body>
</html>