<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>我的个人信息</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<#include "Menu.ftl" />
			
			<div class="class">
				<h1>我的个人信息</h1>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="classTable">
					<tr class="thead">
						<td width="10%">统计编号</td>
						<td width="30%">统计项</td>
						<td width="30%">统计值</td>
						<td width="30%">其他</td>
					</tr>
					<tr class="tra">
						<td>1</td>
						<td>我的积分：</td>
						<td>${user.integral!0}</td>
						<td></td>
					</tr>
					<tr class="trb">
						<td>2</td>
						<td>我的点卡余额：</td>
						<td>￥${user.balance!?string.currency?substring(1)}</td>
						<td></td>
					</tr>
					<tr class="tra">
						<td>3</td>
						<td>我的订单数：</td>
						<td>${orderCount!0}</td>
						<td><a class="a" href="mypay">详情</a></td>
					</tr>
				</table>
			</div>
		</div>
		<#include "Footer.ftl" />
	</body>
</html>
