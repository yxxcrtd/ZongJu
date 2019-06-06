<#include "newformValidate.ftl" />
<#include "Context.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>复合出版物生产和投送系统</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		<script src="${request.contextPath}/js/article/articleEdit.js"></script>
		<script>
			jQuery(document).ready(function(){
			jQuery("#ArticleForm").validationEngine();
			});
		</script>
	</head>
	<body>
		<#include "Banner.ftl" />
		<div id="container">
			<form id="ArticleForm" method="POST" commandName="form" class="form-horizontal" >
			<table>
			<tr>
				<th style="width: 10%;">图书标题：</th>
				<td style="width: 80%;"><input type="text" name ="obj.bookName" value="${form.obj.bookName}" data-validation-engine="validate[required]"/></td>
			</tr>
			<tr>
				<th>图书分类：</th>
				<td>
					<select id="bookCategory" name="obj.productType.id" data-validation-engine="validate[required]">
	                    <option value="">--请选择--</option>
	                    <#list productTypeList as productType>
	                        <option value="${productType.id}" <#if productType.id==form.obj.productType.id > selected</#if>>${productType.name}</option>
	                    </#list>
	                </select>
				</td>
			</tr>
			<tr>
				<th style="width: 10%;" >图书摘要：</th>
				<td style="width: 80%;">
					<textarea rows="" cols="" name="obj.bookAbstract" style="width: 90%;">${form.obj.bookAbstract}</textarea>
				</td>
			</tr>
			
			<tr align="center">
				<td colspan="2">
					<input type="button" onclick="saveEdit()" value="保存"/>
					<input type="button" onclick="returnList();" value="返回"/>
				</td>
			</tr>
		</table>
		<input type="hidden" id="id" name="id" value="${form.id!}" />
	</form>
		</div>
		<#include "Footer.ftl" />
	</body>
</html>
