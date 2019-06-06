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
<script src="${ctx}/pages/stock/ivlocation/list.js"></script>
<script src="${ctx}/pages/stock/ivlocation/list_init.js"></script>
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
						货位管理
						<small>
							<i class="icon-double-angle-right"></i>
							货位管理列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
							<%-- <span class="fr">
						<a class="btn btn-info">
								<i class="icon-signout bigger-125"></i>
								<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Export"/>
							</a>
							&nbsp;
							<a class="btn btn-info">
								<i class="icon-print bigger-125"></i>
								<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Print"/>
							</a> 
						</span>--%>
						<button class="btn btn-small btn-primary" onclick="Editorial.User.addObj();">
							<i class="icon-plus-sign bigger-125"></i>
							新建货位
						</button>
					</div>
					
					<!-- <div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="BMEP.DicClass.addObj();">
							<i class="icon-edit bigger-125"></i> 新建
						</button>
					</div> -->
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
										货位编号：
									</label>
									<div class="controls">
										<form:input path="locationCode" id="query_locationCode" class="span10" />
									</div>
								</div>
							
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										货位描述：
									</label>
									<div class="controls">
										<form:input path="locationDesc" id="query_locationDesc" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										所在层阶：
									</label>
										 <div class="controls">
											 <form:select path="locationStatus" id="query_ivFloor"  class="span10">
												<form:option value="">-选择-</form:option>
												<c:forEach var="floor" items="${form.ivFloorList}">
													<form:option value="${floor.shFloorId}">${floor.shFloorDesc}</form:option>
												</c:forEach>
											</form:select>
										</div> 
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										所在区域：
									</label>
										 <div class="controls">
											 <form:select path="locationStatus" id="query_ivRegional"  class="span10">
												<form:option value="">-选择-</form:option>
												<%-- <form:options items="${form.ivRegionalMap}" /> --%>
												<c:forEach var="regional" items="${form.ivRegionalList}">
													<form:option value="${regional.areaId}">${regional.areaDesc}</form:option>
												</c:forEach>
											</form:select>
										</div> 
								</div>
							</div>
							
							<div class="row-fluid">
								<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											所在仓库：
										</label>
											 <div class="controls">
												 <form:select path="locationStatus" id="query_ivWarehouse"  class="span10">
													<form:option value="">-选择-</form:option>
													<%-- <form:options items="${form.ivWarehouseMap}" /> --%>
													<c:forEach var="warehouse" items="${form.ivWarehouseList}">
														<form:option value="${warehouse.warehouseId}">${warehouse.warehouseDesc}</form:option>
													</c:forEach>
												</form:select>
											</div> 
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											所在货架：
										</label>
											 <div class="controls">
												 <form:select path="locationStatus" id="query_ivShelf"  class="span10">
													<form:option value="">-选择-</form:option>
													<%-- <form:options items="${form.ivShelfMap}" /> --%>
													<c:forEach var="shelf" items="${form.ivShelfList}">
															<form:option value="${shelf.shelfId}">${shelf.shelfDesc}</form:option>
													</c:forEach>
												</form:select>
											</div> 
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											所在仓库层：
										</label>
											 <div class="controls">
												 <form:select path="locationStatus" id="query_ivWarehouseFloor"  class="span10">
													<form:option value="">-选择-</form:option>
													<%-- <form:options items="${form.ivWarehouseMap}" /> --%>
													<c:forEach var="warehouseFloor" items="${form.ivWarehouseFloorList}">
														<form:option value="${warehouseFloor.whFloorId}">${warehouseFloor.whFloorDesc}</form:option>
													</c:forEach>
												</form:select>
											</div> 
									</div>
									<div class="control-group span3">
										<label class="control-label" for="form-field-2">
											所在仓库房间：
										</label>
											 <div class="controls">
												 <form:select path="locationStatus" id="query_ivWarehouseRoom"  class="span10">
													<form:option value="">-选择-</form:option>
													<%-- <form:options items="${form.ivShelfMap}" /> --%>
													<c:forEach var="ivWarehouseRoom" items="${form.ivWarehouseRoomList}">
															<form:option value="${ivWarehouseRoom.whRoomId}">${ivWarehouseRoom.whRoomDesc}</form:option>
													</c:forEach>
												</form:select>
											</div> 
									</div>
							</div>
							
							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.User.query();">
									<i class="icon-zoom-in bigger-110"></i>
									<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Inquiry"/>
								</button>
							</div>
						
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->

					<!-- ------------------列表页面部分开始----------------------------- -->
                    <div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;货位列表</div>
                    <table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
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
