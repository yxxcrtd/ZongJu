<input type="hidden" id="ctx" value="${request.contextPath}" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<title>充值</title>
		<link href="${request.contextPath}/css/style.css" rel="stylesheet" type="text/css" />
	</head>

	<body>
	<form id="UserForm" action="save" method="post">
        <#include "Banner.ftl" />
        
		<div id="container">
			<#include "Menu.ftl" />
			
			<div class="class">
				<h1>充值</h1>
				<div class="login">
					<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table">
						<tr>
							<td colspan="2" align="center"><span class="font">充值</span></td>
						</tr>
						<tr>
							<td width="100" align="right">充值用户：</td>
							<td><input id="username" name="obj.username"  placeholder="用户名" /></td>
						</tr>
						<tr>
							<td width="100" align="right">充值金额：</td>
							<td>
								<select id="balance" name="obj.balance">
									<#list ["10", "20", "30", "50", "100", "200", "300", "500"] as i>
										<option>${i}</option>
									</#list>
								</select>
							</td>
						</tr>
						<tr>
							<td>&nbsp;</td>
							<td><input type="submit" id="save" value="确认充值" /></td>
						</tr>
					</table>
				</div>
			</div>
		</div>
		
		<#include "Footer.ftl" />
		</form>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		<script type="text/javascript">
		<!--
		//获取返回信息
		msgsuccess = function(msg) {
			alert(msg.msg);
			//判断信息是否成功，成功返回首页
			if(msg.isSuccess){
				window.location.href = ("" == "${request.contextPath}") ? "/recharge" : "${request.contextPath}/recharge";
			}
		};
		
		// 保存信息
		$(function() {
			var options = {		
				success : msgsuccess,
				url : "${request.contextPath}/recharge/save",
				type : 'post',
				clearForm : false,
				timeout : 3000
			};
			$('#UserForm').ajaxForm(options);
		});
		//-->
		</script>
	</body>
</html>