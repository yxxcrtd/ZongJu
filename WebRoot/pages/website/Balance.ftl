<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>我的充值</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<#include "Menu.ftl" />
			<div class="class">
				<h1>我的充值（共：<span class="red">${pager.totalCount}</span>&nbsp;条记录）</h1>
				<span style="float: right;"><a class="nowBuy2" href="${request.contextPath!}/topup">&nbsp;&nbsp;充&nbsp;&nbsp;值&nbsp;&nbsp;</a></span>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="classTable">
					<tr class="thead">
						<td width="20%">充值金额</td>
						<td width="40%">充值时间</td>
					</tr>
					<#if rechargeList??>
						<#if (0 < rechargeList?size)>
							<#list rechargeList as rc>
								<tr <#if (0 == rc_index % 2)>class="tra"<#else>class="trb"</#if>>
									<td>${rc.money}</td>
									<td>${rc.tradeDate!?string("yyyy-MM-dd HH:mm:ss")}</td>
								</tr>
							</#list>
						<#else>
							<tr class="tra">
								<td colspan="7">没有数据！</td>
							</tr>
						</#if>
					</#if>
				</table>
				<#include "Pager.ftl" />
			</div>
		</div>
		<#include "Footer.ftl" />
	</body>
</html>
