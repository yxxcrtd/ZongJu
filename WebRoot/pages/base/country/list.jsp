<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!-- InstanceBegin template="/Templates/template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<!--[if IE 7]>
	<link rel="stylesheet" href="css/font-awesome-ie7.min.css" />
<![endif]-->
<!--[if lte IE 8]>
	<link rel="stylesheet" href="css/ace-ie.min.css" />
<![endif]-->
<!--inline styles if any-->
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/base/country/list.js"></script>
</head>

<body>

	<div class="clearfix">

		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						国别信息 <small> <i class="icon-double-angle-right"></i> 国别信息列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="BMEP.Base.Country.addObj();">
							<i class="icon-plus-sign bigger-125"></i> 新建国别信息
						</button>
					</div>


					<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
					</div>
					<div class="on-down">
					<form:form id="form" commandName="form" action="manager" class="form-horizontal">
							<div class="row-fluid">
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">中文国别名称：</label>
									<div class="controls">
										<form:input path="cnName" id="countryCnName" class="span10" />
									</div>
								</div>
								<div class="control-group span3">
									<label class="control-label" for="form-field-1">英文国别名称：</label>
									<div class="controls">
										<form:input path="enName" id="countryEnName" class="span10" />
									</div>
								</div>

							</div>
							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="BMEP.Base.Country.query();">
									<i class="icon-zoom-in bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-repeat bigger-110"></i>重置
								</button>
							</div>
					</form:form>
					</div>
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->

					<!-- ------------------列表页面部分开始----------------------------- -->

					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;国别信息列表</div>
					<table id="table_report" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
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

							</tr>
						</tfoot>
					</table>
				</div>
			</div>
			<!-- ------------------列表页面部分结束----------------------------- -->
		</div>
	</div>
</body>
</html>
