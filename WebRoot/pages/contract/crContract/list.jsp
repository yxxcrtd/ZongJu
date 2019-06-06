<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title"/></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/contract/crContract/list.js"></script>
<script src="${ctx}/pages/contract/crContract/list_init.js"></script>
<script type="text/javascript">
	/**** 页面Label国际化 ****/
	var System_List_Table_Column_UserID = "whFloorId";
	var System_List_Table_Column_Name = "Name";
	var System_List_Table_Column_Address = "Address";
</script>
</head>

<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						合同管理
						<small>
							<i class="icon-double-angle-right"></i>
							合同管理列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="Editorial.Contract.addObj();">
							<i class="icon-plus-sign bigger-125"></i>新建合同
						</button>
					</div>
					<!-- ------------------功能按钮结束----------------------------- -->
					
					<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
					</div>
					<div class="on-down">
					<form:form id="form" commandName="form" action="managers"
						class="form-horizontal">
							<div class="row-fluid">
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">
										合同名称：
									</label>
									<div class="controls">
										<form:input path="contractName" id="query_contractName" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										合同类型：
									</label>
									<div class="controls">
										<form:select path="contractType" id="query_contractType" class="span10" >
											<form:option value="">-选择-</form:option>
											<c:forEach items="${form.contractTypeMap}" var="t">
												<form:option value="${t.key}">${t.value}</form:option>
											</c:forEach>
										</form:select>
									</div>
								</div>
							</div> 
							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.Contract.query();">
									<i class="icon-zoom-in bigger-110"></i>
									<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Inquiry"/>
								</button>
							</div>
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->

					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header">
						<i class="icon-flag"></i>&nbsp;&nbsp;合同列表
					</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='3%' align='center'></th>
								<th width='5%' align='center' title="合同类型"></th>
								<th width='5%' align='center' title="合同名称"></th>
								<th width='5%' align='center' title="合同签订日期"></th>
								<th width='5%' align='center' title="合同到期日期"></th>
								<th width='5%' align='center' title="授权开始日期"></th>
								<th width='5%' align='center' title="授权到期日期"></th>
								<th width='5%' align='center' title="合同作者获取免费样书个数"></th>
								<th width='5%' align='center' title="合同代理商获取免费样书个数"></th>
								<th width='5%' align='center' title="合同保证金"></th>
								<th width='5%' align='center' title="合同最大金额"></th>
								<th width='5%' align='center' title="合同最小金额"></th>
								<th width='5%' align='center' title="合同代理费"></th>
								<th width='5%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<td width='3%' align='center'></td> 
								<td width='5%' align='center'></td>
								<td width='5%' align='center'></td>
								<td width='5%' align='center'></td>
								<td width='5%' align='center'></td>
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td> 
								<td width='5%' align='center'></td>  
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
