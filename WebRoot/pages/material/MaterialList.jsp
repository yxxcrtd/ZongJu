<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>素材库后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/js/material/MaterialList.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!---------------导航页面部分开始 --------------------->
				<div class="page-header position-relative">
					<h1>
						素材库 <small> <i class="icon-double-angle-right"></i>
							素材信息列表
						</small>
					</h1>
				</div>
				<!---------------导航页面部分结束 --------------------->
				<div class="row-fluid">
					<!---------------功能页面部分开始 --------------------->
					<!---------------功能按钮部分开始 --------------------->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="addObj('');">
							<i class="icon-plus-sign bigger-125"></i> 新建
						</button>
					</div>
					<!---------------功能按钮部分开始 --------------------->
					<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
                    </div>
                    <div class="on-down">
						<form:form id="form" commandName="form" action="manager" class="form-horizontal">
							<div class="row-fluid">
								<div class="row-fluid">
									<div class="control-group span3">
										<label class="control-label" for="form-field-1">素材名称：</label>
										<div class="controls">
											<form:input path="name" id="query_material_name"
												class="span10" />
										</div>
									</div>
								</div>	
								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button"
										onclick="query();">
										<i class="icon-zoom-in bigger-110"></i>查询
									</button>
									&nbsp;&nbsp;
									<button type="reset" class="btn btn-small btn-inverse">
										<i class="icon-repeat bigger-110"></i>重置
									</button>
								</div>
							</div>
						<form:hidden path="id"/>
						</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;素材库信息列表</div>
					<table id="table_report"
						class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='4%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='5%' align='center'></th>
								<th width='8%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
							</tr>
						</thead>
						<tbody align='center'
							style="line-height: 18px; border: 1px solid #97bbdc;">
						</tbody>
						<tfoot>
							<tr>
								<td width='4%' align='center'></td> 
								<td width='6%' align='center'></td> 
								<td width='6%' align='center'></td>
								<td width='5%' align='center'></td> 
								<td width='8%' align='center'></td> 
								<td width='6%' align='center'></td> 
								<td width='6%' align='center'></td> 
								<td width='6%' align='center'></td>  
								<td width='6%' align='center'></td> 
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