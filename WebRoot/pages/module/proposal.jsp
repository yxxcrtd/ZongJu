<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>策划管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/module/proposal.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix" style="padding:0;">
			<div class="row-fluid">
				<div class="row-fluid">
					<!-- ------------------列表页面部分开始----------------------------- -->
					<table id="table_report" class="table table-striped table-bordered table-hover" >
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>

							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<th width='10%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
								<th width='20%' align='center'></th>
							</tr>
						</tfoot>
					</table>
					<!-- ------------------列表页面部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>
