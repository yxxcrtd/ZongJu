<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="row-fluid">
	<!-- 功能按钮开始 -->
	<div class="ace-thumbnails">
		<button class="btn btn-small btn-primary" type="button" onclick="Editorial.SubsidaryRight.selectCountry()">
			<i class="icon-plus-sign bigger-125"></i> 选择
		</button>

		<button class="btn btn-small btn-primary" type="button" onclick="Editorial.SubsidaryRight.removeCountry()">
			<i class="icon-plus-sign bigger-125"></i> 删除
		</button>
	</div>
	<!-- 功能按钮结束 -->

	<div class="table-header on" id="on">
		<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
	</div>
	<div class="on-down" id="on_down">
		<div class="row-fluid">
			<!-- 查询条件开始 -->
			<div class="row-fluid">
				<div class="control-group span4">
					<label class="control-label" for="form-field-1">编码：</label>
					<div class="controls">
						<input type="text" id="country_enName" cssClass="span10" placeholder="编码" />
					</div>
				</div>

				<div class="control-group span4">
					<label class="control-label" for="form-field-1">名称：</label>
					<div class="controls">
						<input type="text" id="country_cnName" cssClass="span10" placeholder="名称" />
					</div>
				</div>
			</div>
			<!-- 查询条件结束 -->

			<!-- 查询按钮开始 -->
			<div style="text-align: center;">
				<button class="btn btn-small btn-success" type="button" onclick="Editorial.SubsidaryRight.queryCountry()">
					<i class="icon-zoom-in bigger-110"></i>查询
				</button>
				&nbsp;&nbsp;
				<button type="reset" class="btn btn-small btn-inverse">
					<i class="icon-repeat bigger-110"></i>重置
				</button>
			</div>
			<!-- 查询按钮结束 -->
		</div>
	</div>
	<!-- 列表部分开始 -->
	<div class="table-header">
		<i class="icon-flag"></i>&nbsp;&nbsp;附属权利授权地域信息列表
	</div>
	<table id="authorizedAreaDataTable" class="table table-striped table-bordered table-hover">
		<thead>
			<tr>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
			</tr>
		</thead>
		<tbody align="center" style="line-height: 18px; border: 1px solid #97bbdc;"></tbody>
		<tfoot>
			<tr>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
				<th width="10%" align="center"></th>
			</tr>
		</tfoot>
	</table>
	<!-- 列表部分结束 -->
</div>