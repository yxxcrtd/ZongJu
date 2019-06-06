<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<#include "Context.ftl" />
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>复合出版物生产和投送系统</title>
		<link rel="icon" href="./img/favicon.ico" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
		<script src="${request.contextPath}/js/article/articleList.js"></script>
		<script>
			jQuery(document).ready(function(){
			jQuery("#ChapterForm").validationEngine();
			});
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
	                    			<img src="images/pic_01.jpg" width="79" height="112" class="pr10"/>
                                	<p class="red">${article.bookName!}</p>
                                	<p class="gray">${article.auther!}</p>
                                	<p class="gray">${article.auther!}</p>
                                	<p class="gray">${article.updateTime!}<span class="fr"><a class="nowBuy" onclick="editObj('${article.id!}');">编辑</a></span></p>
                  			  	</div>
                    		</#list>
                		</#if>	
                        <!--分页条开始-->
                        
                        <!--分页条结束-->
                        </div>
                        </div>
                    </div>
                </div>
            <!--中间部分右侧内容结束-->
		</div>
		</form>
		<!-- end-->
		<#include "Footer.ftl" />
	</body>
</html>
