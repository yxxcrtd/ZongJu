<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>修改产品信息</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/upload.js"></script>

</head>
<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品信息管理 <small> <i class="icon-double-angle-right"></i> <c:if test="${form.id==null||form.id=='0'||form.id==''}">
			    	导入Excel
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	导入Excel
			    </c:if>
						</small>
					</h1>
				</div>
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="uploadProductForm" commandName="form" class="form-horizontal">
						<div class="row-fluid">
							<div class="control-group" id="txtFileDiv">
								<label class="control-label" for="form-field-1">上传：</label>
								<div class="controls">
									<input type="file" name="txtFile" class="span6" id="txtFile" /> <span id="txtFileSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<form:hidden path="product.id" />
						<form:hidden path="tid" />
						<form:hidden path="code" id="code" />
						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left: 0px;">
							<button class="btn btn-info" id="save" type="submit">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>
					</form:form>
					<!-- ------------------表单按钮部分结束----------------------------- -->
				</div><%@ page contentType="text/html;charset=UTF-8"%>
				<%@ include file="/common/taglibs.jsp"%>
				<%@ include file="/pages/common/common.jsp"%>
				<%@ include file="/pages/common/alert.jsp"%>
				<%@ include file="/pages/common/context.jsp"%>
				<!DOCTYPE html>
				<html lang="en">
<head>
<meta charset="utf-8" />
<title>产品信息管理</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/product/list.js"></script>
</head>
<body>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						产品信息 <small> <i class="icon-double-angle-right"></i> 产品信息列表
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------功能页面部分开始----------------------------- -->
					<!-- ------------------功能按钮开始----------------------------- -->
					<div class="ace-thumbnails">
						<button class="btn btn-primary" onclick="BMEP.Product.ProductInfo.upload();">
							<i class="icon-edit bigger-125"></i> 导入
						</button>
					</div>
					<!-- ------------------功能按钮结束----------------------------- -->

					<!-- ------------------查询开始----------------------------- -->
					<!-- ------------------查询结束----------------------------- -->
					<!-- ------------------功能页面部分结束----------------------------- -->
					<!-- ------------------列表页面部分开始----------------------------- -->
					<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;冲突信息列表</div>
					<table id="table_report2" class="table table-striped table-bordered table-hover">
						<thead>
							<tr>
								<th width='3%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='10%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
								<th width='6%' align='center'>
								<label> <input type="checkbox" /> <span class="lbl"></span></label>
								</th>
							</tr>
						</thead>
						<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

						</tbody>
						<tfoot>
							<tr>
								<th width='3%' align='center'></th>
								<th width='10%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
								<th width='6%' align='center'></th>
							</tr>
						</tfoot>
					</table>
					<!-- ------------------列表页面部分结束----------------------------- -->
				</div>

				<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;新增信息列表</div>
				<table id="table_report1" class="table table-striped table-bordered table-hover">
					<thead>
						<tr>
							<th width='3%' align='center'></th>
							<th width='10%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
						</tr>
					</thead>
					<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">

					</tbody>
					<tfoot>
						<tr>
							<th width='3%' align='center'></th>
							<th width='10%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
							<th width='6%' align='center'></th>
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

</div>
</div>
</div>
</body>
</html>
