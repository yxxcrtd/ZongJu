<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title"/></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/contract/crContract/product_contract_list.js"></script>
<script type="text/javascript">
	/**** 页面Label国际化 ****/
	var System_List_Table_Column_UserID = "whFloorId";
	var System_List_Table_Column_Name = "Name";
	var System_List_Table_Column_Address = "Address";
</script>
</head>

<body>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
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
					<div class="ace-thumbnails" id="saveDiv">
						<button id="save" class="btn btn-small btn-primary" id="save" onclick="Editorial.Contract.saveRoleList();">
							<i class="icon-save bigger-125"></i>
							保存
						</button>
						<span id="saveSpan" style="color:#B94A48;"  class="help-inline"></span>	
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
								<div class="control-group span6">
									<label class="control-label" for="form-field-1">
										合同名称：
									</label>
									<div class="controls">
										<form:input path="contractName" id="query_contractName" class="span10" />
									</div>
								</div>
								<div class="control-group span6">
									<label class="control-label" for="form-field-2">
										合同类型：
									</label>
									<div class="controls">
										<form:select path="contractType" id="query_contractType"  >
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
							<form:hidden path="productId" id="productId"/>
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
								<th width='15%' align='center'>
								 	<label>
								 		 <input type="checkbox" id="all"/> 
							              <span class="lbl"></span>
									 </label>
							    </th> 
								<th width='15%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='15%' align='center'></th>
								<th width='15%' align='center'></th>
								
							
							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
							 	<td width='15%' align='center'></td> 
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
