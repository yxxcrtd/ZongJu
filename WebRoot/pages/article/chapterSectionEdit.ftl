<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<#include "Context.ftl" />
<#include "newformValidate.ftl" />
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>复合出版物生产和投送系统</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
		<script type="text/javascript" src="${request.contextPath}/ueditor/ueditor.all.js"></script>
		<script type="text/javascript" src="${request.contextPath}/ueditor/ueditor.config.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.flexselect.custom.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/liquidmetal.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		<script src="${request.contextPath}/js/article/articleEdit.js"></script>
		<script>
			jQuery(document).ready(function(){
			jQuery("#${form.chapter.id}form").validationEngine();
			});
		</script>
		<script>
			function appendMsg(content){
				var section = "<div style='width:960px; margin:5px 20px;'><form id='"+content+"form' commandName='form' ><div>"
				+"<span>节码：<input type='text' name='obj.coder' data-validation-engine='validate[required,custom[onlyNumberSp]]' value='${section.coder}'/></span>"
				+"<span>节数：<input type='text' name='obj.number' data-validation-engine='validate[required]' value=''/></span>"
				+"<span> 节题：<input type='text' name='obj.name' data-validation-engine='validate[required]' value=''/></span>"
				+"<input type='hidden' name='obj.id' value='"+content+"'/>"
				+"<span><a href='#' onclick=\"shouqi('"+content+"div');\"> <image src='${request.contextPath}/img/shouqi.png'/></a></span>"
				+"<span style='text-align:right;'><a href='#' onclick=\"del('${section.id}');\"> 删除</a></span>"
				+"<div style='display: block;' id='"+content+"div'><div>"
				+"<span><scr"+"ipt name='obj.content' id='"+content+"' type='text/plain' style='width:85%;height:300px'></scr"+"ipt>"
				+"<scr"+"ipt type='text/javascript'> ue"+content+" = UE.getEditor('"+content+"',{wordCount:false,elementPathEnabled:false});</scr"+"ipt></span></div>"
				+"<div style='text-align:center; margin-top:10px;'><span><input type='submit' value='保存' onclick=\"saveSection('"+content+"form','ue"+content+"')\"/></span>"
				+"<span><input type='button' value='完成' onclick=\"finishSection('"+content+"form')\"/></span></div></div>"
				+"<scr"+"ipt>jQuery(document).ready(function(){jQuery('#"+content+"form').validationEngine();});</scr"+"ipt>"
				+"</form></div>";
				$("#section").append(section);
			}
			//异步添加 并返回主键id
			function addSection(){
				var url = $('#ctx').val() + "/section/addinit";
				var id = $("#id").val();
				$.ajax({
					"dataType" : 'json',
					"type" : "GET",
					"url" : url,
					"cache" : false,
					"success" : function(data) {
						appendMsg(data.id);
					},
					"error" : function(data) {
						alert("error");
					}
				});
			}
			
			function saveSection(formid,ue){
					//纯文本  getPlainTxt()
					var url = $('#ctx').val() + "/section/save";
					var chapterid=$('#chapterid').val();
					var options = {
					url : url,
					type : 'post',
					clearForm : false,
					data: {"chapterid":chapterid,"noStyleContent":eval(ue).getContentTxt()},
					timeout : 3000,
					success : function(data) {
			//			console.log(data.chapterList);
						if(data.isSuccess=="1"){
							alert(data.msg);
						}
					},
					error : function(data) {
						alert("error");
					}
				};
				$('#'+formid).ajaxForm(options);
			}
			//完成节内容
			function finishSection(formid){
				var url = $('#ctx').val() + "/section/finishsection";
				$('#'+formid).attr("action",url);
				//用document对象提交  用jquery对象提交有问题。
				document.getElementById(formid).submit();
			}
			
			function shouqi(formdiv){
				//$(this).next("#"+formdiv).slideToggle();	
				$("#"+formdiv).slideToggle("slow");	
			}
			
			function del(sectionid){
				var chapterid = $("#chapterid").val();
				var url = $('#ctx').val() + "/section/delete?chapterid="+chapterid+"&sectionid="+sectionid;
				window.location=url;
			}
			//保存章
			function saveChapter(chapterid){
				var id = $("#chapterid").val();
				var url = $('#ctx').val() + "/article/savechapter?id="+id;
				var options = {
					url : url,
					type : 'post',
					clearForm : false,
					timeout : 3000,
					success : function(data) {
						if(data.isSuccess=="1"){
							alert(data.msg);
						}else{
							
						}
					},
					error : function(data) {
						alert("error");
					}
				};
				
				$('#'+chapterid).ajaxForm(options);
				$('#'+chapterid).submit();
			}
			
			function finishChapter(formid,chapterid){
				var url = $('#ctx').val() + "/article/finishChapter?chapterid="+chapterid;
								window.location=url;

			}
		</script>
	</head>
	<body>
		<#if form.msg??>
			<script language="javascript">
				alert('${form.msg}');
			</script>
		</#if>
		<#include "Banner.ftl" />
		<div id="container">
		
		<form id="${form.chapter.id}form" style="padding:15px;">
				<table>
					<tr>
						<td>章码：</td>
						<td><input name="chapter.coder" id="coder" data-validation-engine="validate[required,custom[onlyNumberSp]]" value="${form.chapter.coder}"/></td>
					</tr>
					<tr>
						<td>章数：</td>
						<td><input name="chapter.number" id="chapterNumber" data-validation-engine="validate[required]" value="${form.chapter.number}"/></td>
					</tr>
					<tr>
						<td>章题：</td>
						<td>
							<input name="chapter.name" id="chapterName" data-validation-engine="validate[required]" value="${form.chapter.name}"/>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td>
							<span><input type="button" value="保存" onclick="saveChapter('${form.chapter.id}form');"/></span>
							<span><input type="button" value="完成" onclick="finishChapter('${form.chapter.id}form','${form.chapter.id}');"/></span>
							<span><input type="button" value="追加节" onclick="addSection();"/></span>
						</td>
					</tr>
				</table>
			</form>
		<div id="container" style="overflow-y:scroll;height:700px;">
			<#if form.chapter.sections ??>
				<#list form.chapter.sections as section>
					<div style="width:960px; margin:5px 20px;">
						<form id="${section.id}form" commandName="form" >
								<span>节码：<input type="text" name="obj.coder" value="${section.coder}" data-validation-engine="validate[required,custom[onlyNumberSp]]" value="${form.chapter.coder}" /></span>
							  	<span>节数：<input type="text" name="obj.number" value="${section.number}" data-validation-engine="validate[required]" /></span>
								<span>节题：<input type="text" name="obj.name" value="${section.name}" data-validation-engine="validate[required]" /></span>
								<input type="hidden" name="obj.id" value="${section.id}"/>
								<span><a href="#" onclick="shouqi('${section.id}div');"><image src="${request.contextPath}/img/shouqi.png"/></a></span>
								<span style="text-align:right;"><a href="#" onclick="del('${section.id}');">删除</a></span>
							<div style="display: block;" id="${section.id}div">
							<div>
								<span>
								<script name="obj.content" id="${section.id}" type="text/plain" style="width:85%;height:300px">${section.content}</script>
								<script type="text/javascript"> 
									eval("var ue${section.id}= UE.getEditor('${section.id}',{wordCount:false,elementPathEnabled:false});");
								</script>
								</span>
							</div>
							<div style="text-align:center; margin-top:10px;" id="${section.id}div">
								<span><input type="submit" value="保存" onclick="saveSection('${section.id}form','ue${section.id}')"/></span>
								<span><input type="button" value="完成" onclick="finishSection('${section.id}form')"/></span>
							</div>
							<script>
								jQuery(document).ready(function(){
								jQuery("#${section.id}form").validationEngine();
								});
							</script>
							</div>
						</form>
					</div>
				</#list>
			</#if>
			<div id="chapter">
				<div id="section"></div>
			</div>
		</div>
		</div>
		</div>
		<input type="hidden" id="chapterid" value="${form.id}"/>
		<#include "Footer.ftl" />
		
	</body>
</html>
