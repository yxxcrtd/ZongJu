<span class="number">
	<#if pager??>
		<#assign pageCount = pager.totalPageCount><#-- 分页总数(调用Pager中的getTotalPageCount()方法) -->
		<#if (pageCount > 1)><#-- 当"分页总数"大于1才显示分页 -->
			<#assign offset = 5><#-- 定义前偏移值 -->
			<#assign current = pager.pageNo><#-- 当前分页号 -->
			<#assign maxStart = (pageCount - offset * 2)>
			<#if (maxStart < 1)>
				<#assign maxStart = 1>
			</#if>
			<#assign minEnd = (offset * 2 + 1)>
			<#assign start = (current - offset)>
			<#assign end = (current + offset)>
			<#if (start < 1)>
				<#assign start = 1>
				<#assign end = minEnd>
			</#if>
			<#if (end > pageCount)>
				<#assign end = pageCount>
				<#assign start = maxStart>
			</#if>
			<#if (current > 1)>
				<a href="javascript:go(${current - 1});" class="arrow">上一页</a>
			</#if>
			<#if (start > 1)>
				<a href="javascript:go(1);">1</a>
			</#if>
			<#if (start > 2)>
				<span>...</span>
			</#if>
			<#list start..end - 1 as i>
				<#if (i == current)>
					<a href="javascript:go(${i});" class="now_a">${i}</a>
				<#else>
					<a href="javascript:go(${i});">${i}</a>
				</#if>
			</#list>
			<#if (start < maxStart)>
				<span>...</span>
			</#if>
			<#if current == pageCount>
				<a href="javascript:go(${current});" class="now_a">${current}</a>
			<#else>
				<a href="javascript:go(${pageCount});">${pageCount}</a>
				<a href="javascript:go(${current + 1});" class="arrow">下一页</a>
			</#if>
	
			<script type="text/javascript">
			<!--
			function go(i) {
				window.location.href = "${pager.pageUrl}".replace("{c}", "${c!}").replace("{p}", i);
			}
			//-->
			</script>
		</#if>
	</#if>
</span>