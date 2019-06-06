<#include "Common.ftl" />
<#include "Context.ftl" />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>打包记录信息列表</title>
	</head>
	
	<body>
		<div class="clearfix">
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
				       <div class="ace-thumbnails">
							<span class="fr"></span>
							<button class="btn btn-small btn-primary" onclick="retObj();">
								<i class="icon-retweet bigger-125"></i>返回包管理
							</button>
						</div>
						<div class="table-header">
							<i class="icon-flag"></i>&nbsp;&nbsp;${form.bname}：包的内容文件
						</div>
						<table id="table_report" class="table table-striped table-bordered table-hover">
							<thead>
								<tr>
									<th width="10%" align="center"></th>
									<th width="40%" align="center"></th>
									<th width="40%" align="center"></th>
									<th width="10%" align="center"></th>
								</tr>
							</thead>
							<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
							<tfoot>
								<tr>
									<th width="10%" align="center"></th>
									<th width="40%" align="center"></th>
									<th width="40%" align="center"></th>
									<th width="10%" align="center"></th>
								</tr>
							</tfoot>
						</table>
					</div>
				</div>
			</div>
		</div>
		<input type="hidden" id="name" name="name" value="${form.name}"/>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/record/RecordCompressList.js"></script>
	</body>
</html>
