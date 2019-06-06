<div id="banner">
	<div id="welcome">
		<#if user??>
			欢迎您，<span class="red"><b><#if ("" == user.institutionName)>${user.username!}<#else>${user.institutionName!}</#if></b></span>！&nbsp;
			<a href="${request.contextPath!}/logout" onClick="if (window.confirm('您确定要注销吗？')){return true;}else{ return false;}" title="注销">注销</a>&nbsp;
			<#if ("1" == user.role)><#-- 1 是作者，只有作者可以在线创作 -->
				<a href="${request.contextPath!}/article/manager" title="在线创作" <#if ("article" == active)>class="downline"</#if>>在线创作</a>&nbsp;
			</#if>
			<#if ("2" != user.role)><#-- 2 是机构用户，机构用户不用修改个人信息 -->
				<a href="${request.contextPath!}/profile" title="我的个人信息" <#if ("profile" == active)>class="downline"</#if>>我的个人信息</a>&nbsp;
			</#if>
			<a href="${request.contextPath!}/mycart" title="我的购物车" <#if ("mycart" == active)>class="downline"</#if>>我的购物车(<span id="shoppingcart">${unPayCount!0}</span>)</a>&nbsp;
		<#else>
	        <a href="${request.contextPath!}/login" title="登录系统" <#if ("login" == active)>class="downline"</#if>>登录</a> / 
	        <a href="${request.contextPath!}/register" title="注册新用户" <#if ("register" == active)>class="downline"</#if>>注册</a>&nbsp;
		</#if>
		<a href="${request.contextPath!}/index" title="首页" <#if ("index" == active)>class="downline"</#if>>首页</a>
	</div>
</div>