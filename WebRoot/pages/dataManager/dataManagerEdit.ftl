<#include "Context.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
	<!--dataManagerEdit.ftl-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	</head>
	
	<body>
		<div class="clearfix">
			<#include "AjaxMsg.ftl" />
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
					<div class="page-header position-relative">
						<h1>资源管理 <small> <i class="icon-double-angle-right"></i> <#if ("" == id || 0 == id)>新建<#else>修改</#if></small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">资源基本信息</div>
						<form id="DataManagerForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="orderDiv">
									<label class="control-label">资源名称：</label>
									<div class="controls">
										<input class="span6" id="name" name="obj.name" value="${form.obj.name!}" placeholder="资源名称" />
										<span id="orderSpan" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group" id="codeDiv">
									<label class="control-label">ISBN：</label>
									<div class="controls">
										<input id="isbn" class="span6" name="obj.isbn" value="${form.obj.isbn!}" placeholder="ISBN" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('ISBN','isbn');">...</button>
									</div>
								</div>
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源页数：</label>
									<div class="controls">
										<input id="pageNum" class="span6" name="obj.pageNum" value="${form.obj.pageNum!}" placeholder="资源页数" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源页数','pageNum');">...</button>
									</div>
								</div>
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源开本：</label>
									<div class="controls">
										<input id="size" class="span6" name="obj.size" value="${form.obj.size!}" placeholder="资源开本" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源开本','size');">...</button>
									</div>
								</div>
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源尺寸：</label>
									<div class="controls">
										<input id="goodsSize" class="span6" name="obj.goodsSize" value="${form.obj.goodsSize!}" placeholder="资源尺寸" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源尺寸','goodsSize');">...</button>
									</div>
								</div>
								
								<div class="row-fluid ">
									<div class="control-group" id="bookPriceDiv">
										<label class="control-label" for="form-field-1">纸书价格：</label>
										<div class="controls">
											<input name="obj.bookPrice" class="span6" id="bookPrice" placeholder="纸质书价格"  onblur="bookPrice();"/>
											<span id="bookPriceSpan" class="help-inline"></span>
											<button  type="button" id="select_online" onclick="selectOnLine('纸质书价格','bookPrice');">...</button>
										</div>
									</div>
								</div>
								<div class="row-fluid ">
									<div class="control-group" id="e_bookPriceDiv">
										<label class="control-label" for="form-field-1">电子书价格：</label>
										<div class="controls">
											<input name="obj.e_bookPrice" class="span6" id="e_bookPrice" placeholder="电子书价格"  onblur="e_bookPrice();"/>
											<span id="e_bookPriceSpan" class="help-inline"></span>
											<button  type="button" id="select_online" onclick="selectOnLine('电子书价格','e_bookPrice');">...</button>
										</div>
									</div>
								</div>

								
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源出版日期：</label>
									<div class="controls">
									   <div id="invoiceDate" class="input-append">
										 	<input name="obj.dataPublicationStr" class="span6" id="dataPublicationStr" placeholder="资源出版日期" value="${form.obj.dataPublicationStr}" data-format="yyyy-MM-dd" onblur="datePublication();"/>
										 <span class="add-on"> 
										 	<i data-time-icon="icon-time" data-date-icon="icon-calendar"></i>
								         </span>
									   </div>
									   <span id="datePublicationStr" class="help-inline"></span>
									</div>
								</div>
								
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源作者：</label>
									<div class="controls">
										<input id="author" class="span6" name="obj.author" value="${form.obj.author!}" placeholder="资源作者" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源作者','author');">...</button>
									</div>
								</div>
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源出版社：</label>
									<div class="controls">
										<input id="publisher" class="span6" name="obj.publisher" value="${form.obj.publisher!}" placeholder="资源出版社" />
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源出版社','publisher');">...</button>
									</div>
								</div>
								
								<div class="row-fluid ">
									<div class="control-group" id="belongDiv">
										<label class="control-label" for="form-field-1">版权所有者：</label>
										<div class="controls">
											<input name="obj.belong" id="belong" class="span6" placeholder="版权所有者"  onblur="belong();"/>
											<span id="belongSpan" class="help-inline"></span>
											<button  type="button" id="select_online" onclick="selectOnLine('版权所有者','belong');">...</button>
										</div>
									</div>
								</div>
								
								<div class="control-group" id="codeDiv">
									<label class="control-label">资源简介：</label>
									<div class="controls">
										<textarea rows="4" cols="3" id="introduction" class="span6" style="height: 45px" name="obj.introduction" value="${form.obj.introduction!}" placeholder="资源简介"/>
										<span id="codeSpan" class="help-inline"></span>
										<button  type="button" id="select_online" onclick="selectOnLine('资源简介','introduction');">...</button>
									</div>
								</div>
								
								<div class="row-fluid ">
									<div class="control-group" id="bookCoversDiv">
										<label class="control-label" for="form-field-1">图书封面：</label>
										<div class="controls">
										<!--
										<c:if test="${form.obj.bookCovers!=null}">
										   <input type="hidden" name="obj.bookCovers" value="${form.obj.bookCovers}"/> 
										   <image src="${ctx}/upload/${form.obj.bookCovers}" width="60" height="40"/>
										</c:if>
										-->
										   <input type="file" name="upLoadFile"/> 
											<span id="bookCoversSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								
								<div class="row-fluid ">
									<div class="control-group" id="bookCoversDiv">
										<label class="control-label" for="form-field-1">图书PDF：</label>
										<div class="controls">
										   <input type="file" name="upLoadFilePDF"/> 
										   <span id="bookCoversSpan" class="help-inline"></span>
										</div>
									</div>
								</div>
								
								<input type="hidden" id="id" name="id" value="${form.id!}" />
							</div>
							<div class="form-actions" style="text-align: center; padding-left:0px;">
								<button class="btn btn-success" type="submit" id="save"><i class="icon-save bigger-110"></i> 保存</button>&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset"><i class="icon-undo bigger-110"></i> 清空</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/dataManager/dataManagerList.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/dataManager/dataManagerListInit.js"></script>
	</body>
</html>
