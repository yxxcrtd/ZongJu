<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品类型管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/structure/list.js"></script>
<script type="text/javascript">

</script>
</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">

				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button type="button" class="btn btn-small btn-primary" onclick="Editorial.CRM.CorpType.selectStructure()">
							<i class="icon-plus-sign bigger-125"></i>创建素材
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
							
								<div class="control-group span4">
									<label class="control-label" for="form-field-1">编码：</label>
									<div class="controls">
										<form:input path="structure.code" id="select_structure_code" class="span10" />
									</div>
								</div>
							
								<div class="control-group span4">
									<label class="control-label" for="form-field-1">名称：</label>
									<div class="controls">
										<form:input path="structure.name" id="select_structure_name" class="span10" />
									</div>
								</div>
								
								<div class="control-group span4">
									<label class="control-label" for="form-field-1">类型：</label>
									<div class="controls">
										<form:select path="structureType.id" id="select_structureType_id" cssClass="span10">
											<form:option value="">--选择--</form:option>
											<form:options items="${form.structureTypeList}" itemValue="id" itemLabel="name" />
										</form:select>
									</div>
								</div>
							</div>

							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.CRM.CorpType.query()">
									<i class="icon-save bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-print bigger-110"></i>重置
								</button>
							</div>
						</div>
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;产品结构信息列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='10%' align='center'></th>
								<th width='40%' align='center'></th>
								<th width='40%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<th width='10%' align='center'></th>
								<th width='40%' align='center'></th>
								<th width='40%' align='center'></th>
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