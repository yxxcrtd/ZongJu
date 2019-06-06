<#include "Common.ftl" />
<#include "Context.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
	<!--dataManagerList.ftl-->
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>资源管理列表</title>
	</head>
	
	<body>
		<div class="clearfix">
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
					<div class="page-header position-relative">
						<h1>资源管理<small><i class="icon-double-angle-right"></i> 资源管理列表</small></h1>
					</div>
					<div class="row-fluid">
						<div class="ace-thumbnails">
							<span class="fr"></span>
							<button class="btn btn-small btn-primary" onclick="addObj();">
								<i class="icon-plus-sign bigger-125"></i>新建资源
							</button>
						</div>
						
						<div class="table-header on">
							<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
						</div>
						<div class="on-down">
							<form id="form" commandName="form" action="manager" class="form-horizontal">
								<div class="row-fluid">
										<div class="control-group span3">
											<label class="control-label" for="form-field-1">ISBN：</label>
											<div class="controls">
											<input name="isbn" id="query_isbn" class="span10" />
										</div>
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											书名：
										</label>
										<div class="controls">
											<input name="name" id="query_name" class="span10" />
										</div>
									</div>
									<!--
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											作者：
										</label>
											<div class="controls">
												 <select path="ivWarehouse.warehouseId" id="query_ivWarehouse"  class="span10">
													<option value="">-选择-</option>
														<#if copyrightList??>
															<#list copyrightList as c>
																${c.id} = ${c.belong} = ${c.property}
															</#list>
														</#if>
												</select>
											</div>
									</div>	
									-->
									
									<div class="control-group span3">
										<label class="control-label"  for="form-field-2">
											作者：
										</label>
										<div class="controls">
											<input name="author" id="query_author" class="span10" />
										</div>
									</div>
									
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											出版社：
										</label>
										<div class="controls">
											<input name="publisher" id="query_publisher" class="span10" />
										</div>
									</div>
									
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											出版日期：
										</label>
										<div class="controls">
											<input name="starTime" id="query_starTime" class="span10" /> - <input name="endTime" id="query_endTime" class="span10" />
										</div>
									</div>
									
								</div>
								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button" onclick="query();">
										<i class="icon-zoom-in bigger-110"></i>
										<@ingentatag.LanguageTag sessionKey="lang" key="Global.Button.Inquiry" />
									</button>
								</div>
							</form>
						</div>
	
						<div class="table-header">
							<i class="icon-flag"></i>&nbsp;&nbsp;资源管理列表
						</div>
						<table id="table_report" class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='6%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='8%' align='center'></th>
								</tr>
							</thead>
							<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
							<tfoot>
								<tr>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='6%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='5%' align='center'></th>
									<th width='8%' align='center'></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/dataManager/dataManagerList.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/dataManager/dataManagerListInit.js"></script>
	</body>
</html>
