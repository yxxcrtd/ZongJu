<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>我的积分</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<#include "Menu.ftl" />
			
			<div class="class">
				<h1>我的积分（共：<span class="red">${pager.totalCount}</span>&nbsp;条记录）</h1>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="classTable">
					<tr class="thead">
						<td width="40%">积分来源</td>
						<td width="20%">积分</td>
						<td width="40%">获得时间</td>
					</tr>
					<#if integralList??>
						<#list integralList as int>
							<tr <#if (0 == int_index % 2)>class="tra"<#else>class="trb"</#if>>
								<td>${int.source}</td>
								<td>+${int.integral}</td>
								<td>${int.createDate!?string("yyyy-MM-dd HH:mm:ss")}</td>
							</tr>
						</#list>
					</#if>
				</table>
				<#include "Pager.ftl" />
			</div>
		</div>
		<#include "Footer.ftl" />
	</body>
</html>