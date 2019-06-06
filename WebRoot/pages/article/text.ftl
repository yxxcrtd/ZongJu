<div>
<form id="ArticleForm" commandName="form" >
	//<input type="hidden" id="id" name="id" value="${form.id!}" />
		<div id="sectionDiv">
				<script name="obj.content" id="content" type="text/plain" style="width:100%;height:300px">${form.obj.content}</script>
			 	<script type="text/javascript"> ue = UE.getEditor('content',{wordCount:false,elementPathEnabled:false});</script>
				</form>
				<span>
					<input type="submit" value="保存"/>
					<input type="button" onclick="createPDF();" value="生成PDF"/>
					<input type="button" onclick="returnList();" value="返回列表"/>
				</span>
</div>