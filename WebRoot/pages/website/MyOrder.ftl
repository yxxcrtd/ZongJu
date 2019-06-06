<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>我的订单</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<#include "Menu.ftl" />
			
			<div class="class">
				<h1>我的订单（共：<span class="red">${pager.totalCount}</span>&nbsp;条记录）</h1>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="classTable">
					<tr class="thead">
						<td width="10%">封面</td>
						<td width="20%">标题</td>
						<td width="10%">数量</td>
						<td width="10%">价格</td>
						<td width="15%">下单时间</td>
						<td width="15%">密钥</td>
						<td width="15%">操作</td>
					</tr>
					<#if orderList??>
						<#if (0 < orderList?size)>
							<#list orderList as o>
								<tr <#if (0 == o_index % 2)>class="tra"<#else>class="trb"</#if>>
									<td><a href="${request.contextPath}/resource/detail?id=${o.product.id!}" target="_blank" title="${o.product.title!}"><img src="/upload/image/${o.product.bookCovers!}" width="60" /></a></td>
									<td class="left"><a class="a" href="${request.contextPath}/resource/detail?id=${o.product.id!}" target="_blank" title="${o.product.title!}">${o.product.title!}</a></td>
									<td>${o.count}</td>
									<td class="right">￥${o.money?string.currency!?substring(1)}</td>
									<td>${o.createDate!?string("yyyy-MM-dd HH:mm:ss")}</td>
									<td>${o.secretKey!}</td>
									<td>
										<a href="javascript:;" class="nowBuy1 del" value="${o.product.id!}" title="从我的订单中删除">删除</a>&nbsp;
										<a href="${request.contextPath}/download?id=${o.product.id!}&orderid=${o.id!}" class="nowBuy1 down" title="下载">下载</a>
									</td>
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
		<script type="text/javascript">
		<!--
		$(function() {
			// 删除订单
			$(".del").on("click", function() {
				$.get("myorderd", { "id" : $(this).attr("value") }, function(data) {
					if ("true" == data) {
						alert("删除成功！");
						window.location.href = ("" == "${request.contextPath}") ? "/myorder" : "${request.contextPath}/myorder";
					} else if ("false" == data) {
						alert("删除失败！");
					} else if ("timeout" == data) {
						alert("登录超时，请重新登录！");
					}
				});
			});
		});
		//-->
		</script>
	</body>
</html>
