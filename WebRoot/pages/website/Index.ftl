<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>复合出版物生产和投送系统</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="search">
			<form action="index" method="post">
				<input class="input" name="keyWord" placeholder="请输入查询关键字"/>
				<select class="search_select" name="keyType">
				      <#list ["请选择","书名", "ISBN", "作者", "出版社"] as i>
						   <option value="${i_index + 1}">${i}</option>
					  </#list>
			    </select>
				<input type="submit" class="search_button" value="  搜  索  ">
			</form>
		</div>
				
		<div id="container">
			<#include "Category.ftl" />
			
			<div class="class">
				<#if resourceList??>
					<#list resourceList as s>
						<#if ("2" == user.role)>
							<div class="book_list">
	                        	<div class="hot">
	                                <div class="pic_border">
	                                	<div class="sub mt10 ml20 oh">
	                                    	<img src="/upload/image/${s.bookCovers!"default.png"}" width="120" height="160" class="pr10" onerror="javascript:this.src='${request.contextPath}/img/default.png'" />
	                                        <p class="gray">书名：<a class="red" href="${request.contextPath}/resource/detail?id=${s.id!}" title="${s.title!}"><#if (15 < s.name?length)>${s.title[0..14]}...<#else>${s.title!}</#if></a></p>
	                                        <p class="gray">ISBN：${s.isbn!}</p>
	                                        <p class="gray">作者：${s.author!}&nbsp;&nbsp;&nbsp;&nbsp;版别：第${s.edition!}版&nbsp;&nbsp;&nbsp;&nbsp;装订：${s.binding!'平装'}</p>
											<p class="gray">出版社：${s.publisher!}&nbsp;&nbsp;&nbsp;&nbsp;出版时间：${s.datePublication!?string("yyyy-MM-dd")}&nbsp;&nbsp;&nbsp;&nbsp;页数： ${s.pageNum!'0'}&nbsp;&nbsp;&nbsp;&nbsp;语种：${s.language!}</p>
	                                        <p class="gray">分类：${s.productType.name!}</p>
	                                        <p class="mt25">定价：<span class="discontPrice">${(user.discount / 10)?c}折</span><span class="price">￥${(s.price * (user.discount / 100))!?string.currency?substring(1)}</span>&nbsp;&nbsp;<span class="originalPrice">原价：￥${s.price!?string.currency?substring(1)}</span>
	                                        	<span class="fr">
	                                        		<span class="status"></span>
								                	<a class="nowBuy" href="${request.contextPath}/resource/view?id=${s.id!}">在线阅读</a>
								                	<#if user??>
								                		<span class="buyit" value="${s.id!}">加入购物车</span>
								                	</#if>
	                                        	</span>
	                                        </p>
	                                    </div>
	                                </div>
	                            </div>
	                        </div>
				        <#else>
							<div class="classList">
					        	<div class="img"><img src="/upload/image/${s.bookCovers!}" width="120" height="160" onerror="javascript:this.src='${request.contextPath}/img/default.png'" /></div>
					            <div class="details">
					            	<p class="red">书名：<a class="red" href="${request.contextPath}/resource/detail?id=${s.id!}" title="${s.title!}"><#if (15 < s.name?length)>${s.title[0..14]}...<#else>${s.title!}</#if></a></p>
					                <p class="gray">价格：<span class="price"><#if s.price??>￥${s.price!?string.currency?substring(1)}</#if></span></p>
					                <p class="gray">作者：${s.author!}</p>
					                <p class="gray">ISBN：${s.isbn!}</p>
					                <p class="gray">分类：${s.productType.name!}&nbsp;&nbsp;版别：第${s.edition!}版&nbsp;&nbsp;装订：${s.binding!'平装'}</p>
					                <p class="gray">出版社：${s.publisher!}</p>
					                <p>
					                	<a class="nowBuy" href="${request.contextPath}/resource/view?id=${s.id!}">在线阅读</a>
					                	<#if user??>
					                		<span class="buyit" value="${s.id!}">加入购物车</span>
					                		<span class="status"></span>
					                	</#if>
					                </p>
					            </div>
					        </div>
						</#if>
					</#list>
				</#if>
			</div>
		</div>
		<#include "Pager.ftl" />
		<#include "Footer.ftl" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/public.js"></script>
	</body>
</html>
