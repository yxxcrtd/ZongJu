<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<#include "Context.ftl" />
<#include "newformValidate.ftl" />
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>复合出版物生产和投送系统</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
		<script src="${request.contextPath}/js/article/articleList.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		
		<script>
			jQuery(document).ready(function(){
			jQuery("#ChapterForm").validationEngine();
			});
		</script>
		
		<style type="text/css">
			*{
				margin:0;
				padding:0;
			}
			a{
				text-decoration:none;
				color:#000;
				font-size:12px;
				font-family:Arial, Helvetica, sans-serif;
			}
			.detA{
				margin:100px;
				width:100px;
				height:50px;
			}
			.bgA{
				padding:3px 15px;
				background:#DBDBDB;
			}
			.wrong{
				position:relative;
				top:-5px;;
				left:-18px;
			}
		</style>
	</head>
	
	<body>
		<#if form.msg??>
			<script language="javascript">
				alert('${form.msg}');
			</script>
		</#if>
		<#include "Banner.ftl" />
		<div id="container">
		<!--container-->
		<div class="container">
	    <form id="ArticleForm" commandName="form" class="form-horizontal" >
	    <p><a class="nowBuy" onclick="addObj('${article.id!}');">新建</a></span></p>
	    <hr></hr>
			 <div class="book_list">
            	<div class="hot">
                    <div class="pic_border">
                		<!--循环内容列表-->
                		<#if articleList??>
                    		<#list articleList as article>
                    		  	<div class="sub mt10 ml20 oh">
                    		  	<div class="fl w400"><img src="${request.contextPath}/img/default.png" width="79" height="112" class="pr10"/>
                                	<p class="red">${article.bookName!}</p>
                                	<p class="gray">${article.auther!}</p>
                                	<p class="gray">${article.updateTime!}</p>
                                	<p class="gray">${article.auther!}</p>
									<span><a class="nowBuy" onclick="addChapter('${article.bookName!}','${article.id}');">创建章</a></span>
                                	<div id="chapter${article.id!}">
                                		<#if article.chapterList ??>
	                                		<#list article.chapterList as chapter>
                                				<a href="#"  onclick="editChapter('${chapter.id}')"/><span id="${chapter.id}">${chapter.number}</span></a>
	                                		</#list>
                                		</#if>
									</div>
                                </div>
                                <div class="fr">
                                	<p><span><a class="nowBuy" onclick="editObj('${article.id!}');">编辑</a></span></p>
                                	<p class="gray"><span ><a class="nowBuy" onclick="deleteArticle('${article.id!}');">删除</a></span></p>
                                	<p class="gray"><span><a class="nowBuy" onclick="finishArticle('${article.id!}');">完成</a></span></p>
                                </div>
              			  		</div>
                    		</#list>
                		</#if>	
                		
                        <!--分页条开始-->
	                        <#include "Pager.ftl" />
                        <!--分页条结束-->
                        </div>
                        </div>
                    </div>
                </div>
                
            <!--中间部分右侧内容结束-->
		</div>
		</form>
		<!-- end-->
		<!--添加章隐藏div开始-->
		<div id="chapterDiv" style="display:none;top: 160px; left: 40%; border: 1px solid rgb(204, 204, 204); box-shadow: 2px 2px 4px #ccc; position: absolute; width: 230px; background:#fff;">
			<p style="text-align:right; margin-bottom:10px; padding-top:5px;padding-right:4px; background:#ccc;"><a href="" onclick="closeDiv();">
				<img src="${request.contextPath}/img/del.png" width="16" height="16" class="pr10"/>
			</a></p>
			<form id="ChapterForm" style="padding:15px;">
				<table>
					<tr>
						<td>书名：</td>
						<td id="bookName"></td>
					</tr>
					<tr>
						<td>章码：</td>
						<td><input name="chapter.coder" id="chapterCoder" data-validation-engine="validate[required,custom[onlyNumberSp]]" value=""/></td>
					</tr>
					<tr>
						<td>章数：</td>
						<td><input name="chapter.number" id="chapterNumber" data-validation-engine="validate[required]" value=""/></td>
					</tr>
					<tr>
						<td>章题：</td>
						<td>
							<input name="chapter.name" id="chapterName" data-validation-engine="validate[required]" value=""/>
							<!--书id-->
							<input type="hidden" name="chapter.bookid" id="bookid" value=""/>
						</td>
					</tr>
					<tr>
						<td>&nbsp;</td>
						<td><a class="nowBuy" onclick="saveChapter();">保存</a> <a class="nowBuy" onclick="closeDiv();">关闭</a></td>
					</tr>
				</table>
			</form>
		</div>
		<!--添加章隐藏div结束-->				
		<#include "Footer.ftl" />
	</body>
</html>
