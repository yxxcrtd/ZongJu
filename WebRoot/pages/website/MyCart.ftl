<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>我的购物车</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<#include "Menu.ftl" />
			
			<div class="class">
				<h1>我的购物车（共：<span class="red">${pager.totalCount}</span>&nbsp;条记录）</h1>
				<#if (0 < shoppingCartList?size)>
					<span class="nowBuy" style="float: right;">&nbsp;&nbsp;支&nbsp;&nbsp;&nbsp;&nbsp;付&nbsp;&nbsp;</span>
				<#else>
					<span style="float: right;"><a class="nowBuy2" href="${request.contextPath!}/index">&nbsp;&nbsp;继续购物&nbsp;&nbsp;</a></span>
				</#if>
				<table width="100%" border="0" cellspacing="0" cellpadding="0" class="classTable">
					<tr class="thead">
						<td width="5%">选择</td>
						<td width="10%">封面</td>
						<td width="20%">标题</td>
						<td width="10%">数量</td>
						<td width="10%">价格</td>
						<td width="15%">下单时间</td>
						<td width="10%">操作</td>
					</tr>
					<#if shoppingCartList??>
						<#if (0 < shoppingCartList?size)>
							<#list shoppingCartList as sc>
								<tr <#if (0 == sc_index % 2)>class="tra"<#else>class="trb"</#if>>
									<td><input type="checkbox" name="checkbox" value="${sc.id!}"></td>
									<td><a href="${request.contextPath}/resource/detail?id=${sc.product.id!}" target="_blank" title="${sc.product.title!}"><img src="/upload/image/${sc.product.bookCovers!}" width="60" /></a></td>
									<td class="left"><a class="a" href="${request.contextPath}/resource/detail?id=${sc.product.id!}" target="_blank" title="${sc.product.title!}">${sc.product.title!}</a></td>
									<td>${sc.count!}</td>
									<td class="right">￥${sc.money?string.currency!?substring(1)}</td>
									<td>${sc.createDate!?string("yyyy-MM-dd HH:mm:ss")}</td>
									<td>
										<a href="javascript:;" class="nowBuy1 del" value="${sc.id!}" title="从购物车中删除">删除</a>&nbsp;
										<a href="javascript:;" class="nowBuy1 buy" value="${sc.id!}" title="支付">支付</a>
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
			// 多选提交
			$(".nowBuy").on("click", function() {
				if (0 == $("input:checked").length) {
					alert("没有选择需要支付的记录！");
					return false;
				}
			
				$("input[name='checkbox']:checked").each(function() {
					console.info("====$(this).val()====" + $(this).val());
				});
			});
			
			// 单个支付
			$(".buy").on("click", function() {
				$.post("alipaySubmit", { "id" : $(this).attr("value") }, function(data) {
					if ("true" == data) {
						alert("支付成功！");
						window.location.href = ("" == "${request.contextPath}") ? "/mycart" : "${request.contextPath}/mycart";
					} else if ("false" == data) {
						alert("支付失败！");
					} else if ("timeout" == data) {
						alert("登录超时，请重新登录！");
					}
				});	
			});
			
			// 单个删除
			$(".del").on("click", function() {
				$.get("mycartd", { "id" : $(this).attr("value") }, function(data) {
					if ("true" == data) {
						alert("删除成功！");
						window.location.href = ("" == "${request.contextPath}") ? "/mycart" : "${request.contextPath}/mycart";
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
