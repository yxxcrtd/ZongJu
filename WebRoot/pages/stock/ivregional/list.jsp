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
<script src="${ctx}/pages/stock/ivregional/list.js"></script>
<script src="${ctx}/pages/stock/ivregional/list_init.js"></script>
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
						区域管理
						<small>
							<i class="icon-double-angle-right"></i>
							区域管理列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<%--<span class="fr">
							 <a class="btn btn-info">
								<i class="icon-signout bigger-125"></i>
								<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Export"/>
							</a>
							&nbsp;
							<a class="btn btn-info">
								<i class="icon-print bigger-125"></i>
								<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Print"/>
							</a>
						</span> --%>
						<button class="btn btn-small btn-primary" onclick="Editorial.User.addObj();">
							<i class="icon-plus-sign bigger-125"></i>
							新建区域
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
										区域编号：
									</label>
									<div class="controls">
										<form:input path="areaCode" id="query_areaCode" class="span10" />
									</div>
								</div>
							
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										区域描述：
									</label>
									<div class="controls">
										<form:input path="areaDesc" id="query_areaDesc" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										区域级别：
									</label>
									<div class="controls">
										<form:input path="activityLevel" id="query_activityLevel" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-2">
										区域类型：
									</label>
										<div class="controls">
											 <form:select path="ivAreaType.areaTypeId" id="ivAreaType"  class="span10">
												<form:option value="">-选择-</form:option>
												<c:forEach var="areaType" items="${form.ivAreaTypeList}">
														<form:option value="${areaType.areaTypeId}">${areaType.areaTypeDesc}</form:option>
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
                    <div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;区域列表</div>
                    <table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='10%' align='center'></th>
							<!-- 	<th width='10%' align='center'></th> -->
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
							<!-- 	<th width='10%' align='center'></th> -->
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
