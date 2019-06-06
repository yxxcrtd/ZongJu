<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>在线阅读 - ${r.name!}</title>
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="container">
			<div class="oh mt25">
				<div class="book"><img src="/upload/image/${r.bookCovers!"default.png"}" width="223" heith="316" /></div>
			            <div class="bookDet">
			            	<h1>${r.title!}</h1>
			                <div class="oh w400">
			                	<p class="oh info">
			                    	<span class="w60 tr">作者：</span>
			                        <span class="w120">${r.author!}</span>
			                        <span class="w60 tr">标题：</span>
			                        <span class="w120">${r.title!}</span>
			                    </p>
			                    <p class="oh info">
			                    	<span class="w60 tr">语种：</span>
			                        <span class="w120"><#if ("" == r.language)>无<#else>${r.language!}</#if></span>
			                        <span class="w60 tr">版别：</span>
			                        <span class="w120">${r.edition!}</span>
			                    </p>
			                    <p class="oh info">
			                    	<span class="w60 tr">ISBN ：</span>
			                        <span class="w120">${r.isbn!}</span>
			                        <span class="w60 tr">页数：</span>
			                        <span class="w120">${r.pageNum!}</span>
			                    </p>
			                    <p class="oh info">
			                    	<span class="w60 tr">关键字 ：</span>
			                        <span class="w120">${r.keyword!}</span>
			                        <span class="w60 tr">出版社：</span>
			                        <span class="w120">${r.publisher!}</span>
			                    </p>
			                    
			                    <p class="oh info">
			                        <span class="w60 tr">出版日期：</span>
			                        <span class="w200">${r.datePublication!?string("yyyy-MM-dd")}</span>
			                    </p>
			                    <p class="oh info">
			                        <span class="w60 tr">定价：</span>
			                        <#if ("2" == user.role)>
			                        	<span class="w120"><span class="discontPrice">${(user.discount / 10)?c}折</span><span class="price">￥${(r.price * (user.discount / 100))!?string.currency?substring(1)}</span>&nbsp;&nbsp;<span class="originalPrice">原价：￥${r.price!?string.currency?substring(1)}</span>
			                        <#else>
				                        <span class="w120"><span class="price"><#if r.price??>￥${r.price!?string.currency?substring(1)}</#if></span></span>
			                        </#if>
			                    </p>
			                 
			                    <p class="oh info mt95">
			                        <span><img src="/upload/${r.isbn!}/${r.twoDimension!}" width="139" /></span>
			                    	<span><a class="nowBuy2" href="${request.contextPath}/resource/view?id=${r.id!}">在线阅读</a></span>
			                        <#if user??>
				                        <span class="nowBuy1" value="${r.id!}">加入购物车</span>
				                        <span class="status"></span>
									</#if>
			                    </p>
			                </div>
			            </div>
			        </div>
			        <div class="book_cont">
			        	<h1>内容简介</h1>
			            <p>${r.remark!}</p>
			        </div>
			    </div>
			</div>

		<#include "Footer.ftl" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript">
		<!--
		// 加入购物车
		$(".nowBuy1").on("click", function() {
			var This = $(this);
			var curid = This.attr("value");
			var total =  parseInt($("#shoppingcart").text());
			$.get("${request.contextPath}/buy", { "resourceId" : curid }, function(data) {
				if ("true" == data) {
					This.siblings(".status").html("添加成功！").show().fadeOut(1500);
					$("#shoppingcart").html(total + 1);
				} else {
					This.siblings(".status").html("添加失败！").show().fadeOut(5000);
				}
			});
		});
		//-->
		</script>
	</body>
</html>
