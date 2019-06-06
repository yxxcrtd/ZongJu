<#include "Common.ftl" />
<#include "Context.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>网络素材信息</title>
	</head>
	
	<body>
		<div class="clearfix">
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
					<div class="row-fluid">
					   <div class="ace-thumbnails">
							<span class="fr"></span>
							<button class="btn btn-small btn-primary" onclick="addObj();">
								<i class="icon-plus-sign bigger-125"></i>添加素材
							</button>
							<button class="btn btn-small btn-primary" name="checkAll">
								<i class="icon-plus-sign bigger-125"></i>全选
							</button>
						</div>
						<div class="table-header on">
							<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
						</div>
						<div class="on-down">
							<form id="form" commandName="form" action="manager" class="form-horizontal">
								<div class="row-fluid">
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">产品名：</label>
										<div class="controls">
											<input id="query_title" class="span10"/>
										</div>
									</div>    
								</div>
								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button" onclick="query();">
										<i class="icon-zoom-in bigger-110"></i> 查询
									</button>
									&nbsp;&nbsp;
									<button type="reset" class="btn btn-small btn-inverse">
										<i class="icon-repeat bigger-110"></i>重置
									</button>
								</div>
							</form>
						</div>
						<div class="table-header">
							<i class="icon-flag"></i>&nbsp;&nbsp;网络素材信息列表
						</div>
						<table id="table_report" class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th width="10%" align="center"></th>
									<th width="10%" align="center"></th>
									<th width="25%" align="center"></th>
									<th width="25%" align="center"></th>
								</tr>
							</thead>
							<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
							<tfoot>
								<tr>
									<th width="10%" align="center"></th>
									<th width="10%" align="center"></th>
									<th width="25%" align="center"></th>
									<th width="25%" align="center"></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" id="compressId" name="compressId" value="${form.compressId}" />
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/compress/ProductList.js"></script>
	</body>
</html>
