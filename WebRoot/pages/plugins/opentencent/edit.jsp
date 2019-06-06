<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang"
		key="Global.Label.Title" /></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/plugins/opentencent/list.js"></script>
<script src="${ctx}/pages/plugins/opentencent/edit.js"></script>
<script type="text/javascript">
	/**** 页面Validate国际化 ****/
	var System_Info_ValidateCode_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateCode.Blank'/>";
	var System_Info_ValidateName_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateName.Blank'/>";
	var System_Info_ValidateStatus_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateStatus.Blank'/>";
</script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						第三方推送管理 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
					    		添加推送平台
					    	</c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改推送平台
					    	</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="form" commandName="form" action="editSubmit" class="form-horizontal">
						<div class="row-fluid">
							<div class="control-group span6">
								<div class="row-fluid">
									<div id="nameDiv" class="control-group">
										<label class="control-label" for="form-field-1"> 推送平台名称：
										</label>
										<div class="controls">
											<form:input path="obj.name" id="name" onblur="Editorial.User.validateName();" />
											<span id="nameSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div id="refreshTokenDiv" class="control-group">
										<label class="control-label" for="form-field-1"> 刷新Token：
										</label>
										<div class="controls">
											<form:input path="obj.refreshToken" id="refreshToken"/>
											<span id="refreshTokenSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								
							</div>
							<div class="control-group span6">
								<div class="row-fluid">
									<div id="app_keyDiv" class="control-group">
										<label class="control-label" for="form-field-1"> AppKey：
										</label>
										<div class="controls">
											<form:input path="obj.app_key" id="app_key"
												onblur="Editorial.User.validateAppKey();" />
											<span id="app_keySpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div id="app_secretDiv" class="control-group">
										<label class="control-label" for="form-field-1"> AppSercet：
										</label>
										<div class="controls">
											<form:input path="obj.app_secret" id="app_secret"
												onblur="Editorial.User.validateAppSercet();" />
											<span id="app_secretSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
							</div>
							<div class="control-group span6">
								<div class="row-fluid">
									<div id="redirectUriDiv" class="control-group">
										<label class="control-label" for="form-field-1"> 授权回调地址：
										</label>
										<div class="controls">
											<form:input path="obj.redirectUri" id="redirectUri"
												onblur="Editorial.User.validateRedirectUri();" />
											<span id="redirectUriSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div id="authorizeCodeDiv" class="control-group">
										<label class="control-label" for="form-field-1"> 授权码：
										</label>
										<div class="controls">
											<form:input path="obj.authorizeCode" id="authorizeCode" value="默认为空"/>
											<span id="authorizeCodeSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
							</div>
							<div class="control-group span6">
								<div class="row-fluid">
									<div id="accessTokenDiv" class="control-group">
										<label class="control-label" for="form-field-1"> accessToken：
										</label>
										<div class="controls">
											<form:input path="obj.accessToken" id="accessToken"/>
											<span id="accessTokenSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div id="expiresInDiv" class="control-group">
										<label class="control-label" for="form-field-1"> 过期时间：
										</label>
										<div class="controls">
											<form:input path="obj.expiresIn" id="expiresIn"/>
											<span id="expiresInSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
							</div>
							<div class="control-group span6">
								<div class="row-fluid">
									<div id="openkeyDiv" class="control-group">
										<label class="control-label" for="form-field-1"> openkey：
										</label>
										<div class="controls">
											<form:input path="obj.openkey" id="openkey"/>
											<span id="openkeySpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								<div class="row-fluid">
									<div id="openidDiv" class="control-group">
										<label class="control-label" for="form-field-1"> openid：
										</label>
										<div class="controls">
											<form:input path="obj.openid" id="openid"/>
											<span id="openidSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
							</div>
						</div>
						<form:hidden path="id" />
					</form:form>
					<!-- ------------------表单部分结束----------------------------- -->
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button id="save" class="btn btn-success"
							onclick="Editorial.User.save();">
							<i class="icon-save bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang"
								key="Global.Button.Save" />
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="reset" class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang"
								key="Global.Button.Reset" />
						</button>
					</div>
					<!-- ------------------表单按钮部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>
