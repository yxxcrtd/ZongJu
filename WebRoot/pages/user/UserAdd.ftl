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
						<h1>用户信息 <small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;用户信息</small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">基本资料</div>
						<form id="UserForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="usernameDiv">
									<label class="control-label">用户名：</label>
									<div class="controls">
										<input type="text" id="username" name="obj.username" class="span6" onblur="ZongJu.User.userName();"/>
										<span id="usernameSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="passwordDiv">
									<label class="control-label">密码：</label>
									<div class="controls">
										<input type="password" id="password" name="obj.password" class="span6" onblur="ZongJu.User.passWord();"/>
										<span id="passwordSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="institutionNameDiv">
									<label class="control-label">机构名称：</label>
									<div class="controls">
										<input type="text" id="institutionName" name="obj.institutionName" class="span6" onblur="ZongJu.User.institutionName();"/>
										<span id="institutionNameSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="productTypeIdDiv">
									<label class="control-label">产品分类：</label>
									<div class="controls">
										 <select id="productTypeId.id" name="obj.productTypeId.id" class="span6">
	                                          <#list productTypeList as productType>
	                                          <option value="${productType.id}">${productType.name}</option>
	                                          </#list>
	                                    </select>
										<span id="productTypeIdSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="telephoneDiv">
									<label class="control-label">联系方式：</label>
									<div class="controls">
										<input type="text" id="telephone" name="obj.telephone" class="span6" onblur="ZongJu.User.telePhone();"/>
										<span id="telephoneSpan" class="help-inline"/></span>
									</div>
								</div>
								<div class="control-group" id="addressDiv">
									<label class="control-label">所在地址：</label>
									<div class="controls">
										<input type="text" id="address" name="obj.address" class="span6" />
										<span id="addressSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="discountDiv">
									<label class="control-label">折扣：</label>
									<div class="controls">
									    <select class="span6" id="discount" name="obj.discount">
					                        <#list 1..99 as i>
						                           <option>${i}</option>
					                        </#list>
			                            </select>%
										<span id="discountSpan" class="help-inline"></span>
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
		<script type="text/javascript" src="${request.contextPath}/js/user/UserList.js"></script>
	</body>
</html>