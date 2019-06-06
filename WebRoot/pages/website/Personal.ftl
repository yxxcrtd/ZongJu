<#include "newformValidate.ftl" />
<input type="hidden" id="ctx" value="${request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>个人信息</title>
<link href="${request.contextPath}/css/style.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
<script type="text/javascript" src="${request.contextPath}/js/user/Register.js"></script>
</head>
<body>
        <#include "Banner.ftl" />

<form id="UserForm" action="save" method="post">
<div class="container">
	<div class="login">
    	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
          <tr>
            <td colspan="2" align="center"><span class="font">个人详细信息</span></td>
            </tr>
          <tr>
            <td width="100" align="right">用户昵称：</td>
            <td>${form.obj.username}</td>
          </tr>
          <tr>
            <td width="100" align="right">联系方式：</td>
            <td><input id="telephone" name="obj.telephone" value="${form.obj.telephone}" data-validation-engine="validate[required,custom[phone]]" /></td>
          </tr>
           <tr>
            <td width="100" align="right">所在地址：</td>
            <td><input id="address" name="obj.address" value="${form.obj.address}" data-validation-engine="validate[required]" /></td>
          </tr>
           <tr>
            <td width="100" align="right">会员积分：</td>
            <td>${form.obj.integral}</td>
          </tr>
          <tr>
            <td width="100" align="right">点卡余额：</td>
            <td>${form.obj.balance}</td>
          </tr>
          <tr>
            <td width="100" align="right">注册时间：</td>
            <td>${form.obj.createDate?string('yyyy-MM-dd HH:mm:ss')}</td>
          </tr>
          <input type="hidden" name="obj.id" value="${form.obj.id}" />
          <tr>
            <td>&nbsp;</td>
            <td><input type="submit" id="save" value="修改信息" /></td>
          </tr>
        </table>

    </div>
</div>
	<#include "Footer.ftl" />
</form>
</body>
</html>