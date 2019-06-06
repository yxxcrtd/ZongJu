<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>版税规则库管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/rightLicense/crRoyaltyRule/list.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- 导航部分开始 -->
				<div class="page-header position-relative">
					<h1>
						版税规则库信息管理 <small> <i class="icon-double-angle-right"></i> 版税规则库信息管理列表
						</small>
					</h1>
				</div>
				<!-- 导航部分结束 -->
				<div class="row-fluid">
					<!-- 功能按钮开始 -->
					<div class="ace-thumbnails">
						<button class="btn btn-small btn-primary" onclick="Editorial.CrRoyaltyRule.edit()">
							<i class="icon-plus-sign bigger-125"></i> 新建版税规则库信息
						</button>
					</div>
					<!-- 功能按钮结束 -->

					<div class="table-header on" id="on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
					</div>
					<div class="on-down" id="on_down">
						<form:form id="form" commandName="form" action="manager" class="form-horizontal">
							<div class="row-fluid">
								<!-- 查询条件开始 -->
								<div class="row-fluid">
									
									<div class="control-group span4">
										<label class="control-label" for="form-field-1">版税类型：</label>
										<div class="controls">
											<form:select path="crRoyaltyRule.royaltyType" id="crRoyaltyRule_royaltyType" cssClass="span10">
												<form:option value="">--选择--</form:option>
												<form:options items="${form.dic.RoyaltyType}" />
											</form:select>
										</div>
									</div>
									
									<div class="control-group span4">
										<label class="control-label" for="form-field-1">市场：</label>
										<div class="controls">
											<form:select path="crRoyaltyRule.market" id="crRoyaltyRule_market" cssClass="span10">
												<form:option value="">--选择--</form:option>
												<form:options items="${form.dic.Market}" />
											</form:select>
										</div>
									</div>
									
									<div class="control-group span4">
										<label class="control-label" for="form-field-1">价格类型：</label>
										<div class="controls">
											<form:select path="crRoyaltyRule.priceType" id="crRoyaltyRule_priceType" cssClass="span10">
												<form:option value="">--选择--</form:option>
												<form:options items="${form.dic.PriceType}" />
											</form:select>
										</div>
									</div>

								</div>
								<!-- 查询条件结束 -->
								
								<!-- 查询按钮开始 -->
								<div style="text-align: center;">
									<button class="btn btn-small btn-success" type="button" onclick="Editorial.CrRoyaltyRule.query()">
										<i class="icon-zoom-in bigger-110"></i>查询
									</button>
									&nbsp;&nbsp;
									<button type="reset" class="btn btn-small btn-inverse">
										<i class="icon-repeat bigger-110"></i>重置
									</button>
								</div>
								<!-- 查询按钮结束 -->
							</div>
						</form:form>
					</div>
					<!-- 列表部分开始 -->
					<div class="table-header">
						<i class="icon-flag"></i>&nbsp;&nbsp;版税规则库信息列表
					</div>
					<table id="dataTable" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width="5%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="8%" align="center"></th>
							</tr>
						</thead>
						<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
						<tfoot>
							<tr>
								<th width="5%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="10%" align="center"></th>
								<th width="8%" align="center"></th>
							</tr>
						</tfoot>
					</table>
					<!-- 列表部分结束 -->
				</div>
			</div>
		</div>
	</div>
</body>
</html>