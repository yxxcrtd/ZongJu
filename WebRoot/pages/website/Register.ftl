<#include "newformValidate.ftl" />
<input type="hidden" id="ctx" value="${request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>注册页面</title>
		<link href="${request.contextPath}/css/style.css" rel="stylesheet" type="text/css" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/user/Register.js"></script>
		<script type="text/javascript">
			jQuery(document).ready(function(){
				jQuery("#UserForm").validationEngine();
			});
		</script>
	</head>
		
	
	<body>
        <#include "Banner.ftl" />
		
<form id="UserForm" action="save" method="post">
<div id="container">
	<div class="login">
    	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
    	
          <tr>
            <td colspan="2" align="center"><span class="font">新用户注册</span></td>
          </tr>
          <tr>
            <td width="100" align="right">角色：</td>
            <td>
				<input type="radio" id="role" name="obj.role" value="0" onclick="change();" checked="checked">会员
                <input type="radio" id="role" name="obj.role" value="1" onclick="change();">作者
			</td>
          </tr>
          <tr>
            <td width="100" align="right">用户名：</td>
            <td><input type="text" id="username" name="obj.username" placeholder="用户名" data-validation-engine="validate[required]" /></td>
          </tr>
          <tr>
            <td width="100" align="right">密码：</td>
            <td><input type="password" id="password" name="obj.password" placeholder="密码" data-validation-engine="validate[required,minSize[6]]" /></td>
          </tr>
          <tr>
            <td width="100" align="right">确认密码：</td>
            <td><input type="password" id="repasswd" name="repasswd" placeholder="确认密码" data-validation-engine="validate[required,minSize[6],equals[password]]" /></td>
          </tr>
          <tr>
            <td width="100" align="right">联系方式：</td>
            <td><input type="text" id="telephone" name="obj.telephone" placeholder="联系方式" data-validation-engine="validate[required,custom[phone]]" /></td>
          </tr>
          <tr>
            <td width="100" align="right">地址：</td>
            <td><input type="text" id="address" name="obj.address" placeholder="地址" data-validation-engine="validate[required]" /></td>
          </tr>
          <tr>
            <td>&nbsp;</td>
            <td><input type="submit" id="save" value="确定"/> <input type="reset" value="重置" /></td>
          </tr>
        
        </table>

    </div>
</div>
<#include "Footer.ftl" />
</form>
</body>
</html>