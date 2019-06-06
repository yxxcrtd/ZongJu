<div class="taxonomy">
	
	<div id="complex">
		<a href="${request.contextPath!}/index" class="nowBuy">资源分类列表</a>
	</div>
	
	
	<ul class="classUl" id="menu">
		<#if propTypeList??>
			<#list propTypeList as c>
				<li>
					<#if ("" == c.parentId)>
						<a href="index?c=${c.id!}" value="${c.id!}">【${c.name!}】</a>
					</#if>
					<ul></ul>
				</li>
			</#list>
		</#if>
	</ul>
</div>