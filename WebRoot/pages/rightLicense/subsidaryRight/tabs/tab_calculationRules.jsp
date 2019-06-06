<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<div class="row-fluid">
	<!-- 功能按钮开始 -->
	<div class="ace-thumbnails">
		<button class="btn btn-small btn-primary" type="button" onclick="Editorial.SubsidaryRight.editCrFormulaDataTable()">
			<i class="icon-plus-sign bigger-125"></i> 新建计算公式信息
		</button>
	</div>
	<!-- 功能按钮结束 -->
	<!-- 列表部分开始 -->
	<div class="table-header">
		<i class="icon-flag"></i>&nbsp;&nbsp;计算公式信息列表
	</div>
	<table id="crFormulaDataTable" class="table table-striped table-bordered table-hover">
		<thead>
			<tr>
				<th width="10%" align="center"></th>
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
				<th width="10%" align="center"></th>
			</tr>
		</tfoot>
	</table>
	<!-- 列表部分结束 -->
</div>