<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<%@ include file="/pages/common/ajaxMsg.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>员工管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<link rel="stylesheet" href="${ctx}/css/jquery.autocomplete.css" />
<link rel="stylesheet" href="${ctx}/css/TextboxList.css" />
<link rel="stylesheet" href="${ctx}/css/TextboxList.Autocomplete.css" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/personInfo/PositionSelect.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						人员信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	选择岗位信息
			    </c:if> 
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button id="save" class="btn btn-small btn-primary" onclick="Editorial.CRM.PersonInfo.savePositionList();">
							<i class="icon-save bigger-125"></i>
							保存
						</button>
					</div>
					<!-- ------------------功能按钮结束----------------------------- -->

					<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
                    </div>
                    <div class="on-down">
						<form:form id="form" commandName="form" action="manager" class="form-horizontal">
							<div class="row-fluid">
								<div class="row-fluid">
									<div class="control-group span3">
										<label class="control-label" for="form-field-1">名称：</label>
										<div class="controls">
											<form:input path="position.name" id="query_module_name" class="span10" />
										</div>
									</div>
	
	
								</div>
								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button" onclick="Editorial.CRM.PersonInfo.query();">
										<i class="icon-zoom-in bigger-110"></i>查询
									</button>
									&nbsp;&nbsp;
									<button type="reset" class="btn btn-small btn-inverse">
										<i class="icon-repeat bigger-110"></i>重置
									</button>
								</div>
							</div>
							<form:hidden path="corpId" id="corpId"/>
							<form:hidden path="personId" id="personId"/>
							<form:hidden path="personTypeCode" id="personTypeCode"/>
							<form:hidden path="relation.id" id="personTypeRelationId" />
						</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->

					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;岗位信息列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<!-- <th width='10%' align='center'></th> -->
								<th width='10%' align='center'>
								 	<label>
								 		 <input type="checkbox" id="all"/> 
							              <span class="lbl"></span>
									 </label>
							    </th> 
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
							</tr>
						</tfoot>
					</table>
					<!-- ------------------列表页面部分结束----------------------------- -->
				</div>
			</div>
		</div>
	</div>
	

</body>
<!-- InstanceEnd -->
</html>
