<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<%-- <%@ include file="/pages/common/common.jsp"%> --%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang"
		key="Global.Label.Title" /></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/print/edit.js"></script>
<script type="text/javascript">
	/**** 页面Validate国际化 ****/
	var System_Info_ValidateCode_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateCode.Blank'/>";
	var System_Info_ValidateName_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateName.Blank'/>";
	var System_Info_ValidateStatus_Blank = "<ingenta-tag:LanguageTag sessionKey='lang' key='System.Info.ValidateStatus.Blank'/>";
</script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
						付印单管理 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建付印单
					    	</c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改付印单
					    	</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="printForm" commandName="form"
						class="form-horizontal">
						<div class="table-header on" id="baseInfoDiv">
							<i class="icon-caret-down"></i>&nbsp;&nbsp;基本信息
						</div>
						<div id="baseInfoContentDiv" class="on-down">
							<div class="row-fluid ">
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div id="proIdDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												产品名称： </label>
											<div class="controls">
												<form:input path="product.title" readonly="true" />
												<form:hidden path="product.id" id="proId" />
												<span id="proIdSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printPriceDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 定价：
											</label>
											<div class="controls">
												<form:input path="print.printPrice" id="printPrice"
													placeholder="定价"
													onblur="Editorial.PrintCosts.isNullOrPrintPrice();" />
												<span id="printPriceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printCountDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 印数：
											</label>
											<div class="controls">
												<form:input path="print.printCount" id="printCount"
													placeholder="印数"
													onblur="Editorial.PrintCosts.isNullOrPrintCount();" />
												<span id="printCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printOpenFlgDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 开本：
											</label>
											<div class="controls">
												<form:select path="print.printOpenFlg" id="printOpenFlg"
													onblur="Editorial.PrintCosts.isNullOrPrintOpenFlg();">
													<form:option value="">-选择-</form:option>
													<form:options items="${form.openFlgMap}" />
												</form:select>
												<span id="printOpenFlgSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printEditionDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 版次：
											</label>
											<div class="controls">
												<form:input path="print.printEdition" id="printEdition"
													placeholder="版次"
													onblur="Editorial.PrintCosts.isNullOrPrintEdition();" />
												<span id="printEditionSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printPaperCountDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												用纸正数： </label>
											<div class="controls">
												<form:input path="print.printPaperCount"
													id="printPaperCount" placeholder=" 用纸正数"
													onblur="Editorial.PrintCosts.isNullOrPrintPaperCount();" />
												<span id="printPaperCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printPaperAddCountDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 加放量：
											</label>
											<div class="controls">
												<form:input path="print.printPaperAddCount"
													id="printPaperAddCount" placeholder="加放量"
													onblur="Editorial.PrintCosts.isNullOrPrintPaperAddCount();" />
												<span id="printPaperAddCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>

								</div>
								<div class="control-group span6 ">
									<div class="row-fluid ">
										<div id="printSizeDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												成品尺寸： </label>
											<div class="controls">
												<form:input path="print.printSize" id="printSize"
													placeholder="成品尺寸"
													onblur="Editorial.PrintCosts.isNullOrPrintSize();" />
												<%-- <form:select path="print.printSize" id="printSize">
									<form:option value="">-选择-</form:option>
									<form:options items="${form.printSizeMap}" />
								</form:select> --%>
												<span id="printSizeSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printBindingDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												装订方式： </label>
											<div class="controls">
												<%-- <form:input path="print.printBinding" id="printBinding" placeholder="装订方式"/> --%>
												<form:select path="print.printBinding"
													id="printprintBindingSize"
													onblur="Editorial.PrintCosts.isNullOrPrintprintBindingSize();">
													<form:option value="">-选择-</form:option>
													<form:options items="${form.printBindingMap}" />
												</form:select>
												<span id="printBindingSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printSheetDiv" class="control-group">
											<label class="control-label" for="form-field-1"> 印张：
											</label>
											<div class="controls">
												<form:input path="print.printSheet" id="printSheet"
													placeholder="印张"
													onblur="Editorial.PrintCosts.isNullOrPrintSheet();" />
												<span id="printSheetSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printSampleCountDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												样书册数： </label>
											<div class="controls">
												<form:input path="print.printSampleCount"
													id="printSampleCount" placeholder="样书册数"
													onblur="Editorial.PrintCosts.isNullOrPrintSampleCount();" />
												<span id="printSampleCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printPaperTotalCountDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												用纸总量： </label>
											<div class="controls">
												<form:input path="print.printPaperTotalCount"
													id="printPaperTotalCount" placeholder="用纸总量"
													onblur="Editorial.PrintCosts.isNullOrPrintPaperTotalCount();" />
												<span id="printPaperTotalCountSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
									<div class="row-fluid ">
										<div id="printPaperTotalPriceDiv" class="control-group">
											<label class="control-label" for="form-field-1">
												总用纸价格： </label>
											<div class="controls">
												<form:input path="print.printPaperTotalPrice"
													id="printPaperTotalPrice" placeholder="总用纸价格"
													onblur="Editorial.PrintCosts.isNullOrPrintPaperTotalPrice();" />
												<span id="printPaperTotalPriceSpan" class="help-inline"></span>
											</div>
										</div>
									</div>
								</div>
							</div>
							<form:hidden path="print.printId" id="printId" />
							<form:hidden path="id" />
						</div>

						<!-- ------------------表单部分结束----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center;">
							<button class="btn btn-success" type="submit">
								<i class="icon-save bigger-110"></i>
								<ingenta-tag:LanguageTag sessionKey="lang"
									key="Global.Button.Save" />
							</button>
							&nbsp; &nbsp; &nbsp;
							<button id="reset" class="btn btn-inverse" type="reset">
								<i class="icon-undo bigger-110"></i>
								<ingenta-tag:LanguageTag sessionKey="lang"
									key="Global.Button.Reset" />
							</button>
						</div>
						<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>

					<!-- 材料需求 start-->
					<div id="materialDiv"
						style="display: none; padding-top: 5px; border-top: 1px dotted #E2E2E2;">
						<div class="ace-thumbnails">
							<button class="btn btn-primary btn-small"
								onclick="Editorial.EPrint.AddMaterial();">
								<i class="icon-plus-sign  bigger-125"></i>添加材料需求
							</button>
						</div>
						<!-- 材料需求列表 -->
						<div class="table-header">
							<i class="icon-flag"></i>&nbsp;&nbsp;材料需求列表
						</div>
						<table class="table table-striped table-bordered table-hover"
							id="table_report_2">
							<thead>
								<tr>
									<th width='10%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='15%' align='center'></th>
								</tr>
							</thead>
							<tbody align='center'
								style="line-height: 18px; border: 1px solid #97bbdc;"
								id="table_report_tbody">

							</tbody>
							<tfoot>
								<tr>
									<th width='10%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='15%' align='center'></th>
								</tr>
							</tfoot>
						</table>
					</div>
					<!-- 材料需求 end-->

					<!-- 印装费用 start-->
					<div id="costDiv"
						style="display: none; padding-top: 5px; border-top: 1px dotted #E2E2E2;">
						<div class="ace-thumbnails">
							<button class="btn btn-primary btn-small"
								onclick="Editorial.EPrint.AddCost();">
								<i class="icon-plus-sign  bigger-125"></i>添加印装费用
							</button>
						</div>
						<!-- 印装费用列表 -->
						<div class="table-header">
							<i class="icon-flag"></i>&nbsp;&nbsp;印装费用列表
						</div>
						<table class="table table-striped table-bordered table-hover"
							id="table_report_3">
							<thead>
								<tr>
									<th width='10%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='15%' align='center'></th>
								</tr>
							</thead>
							<tbody align='center'
								style="line-height: 18px; border: 1px solid #97bbdc;"
								id="table_report_tbody">

							</tbody>
							<tfoot>
								<tr>
									<th width='10%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='25%' align='center'></th>
									<th width='15%' align='center'></th>
								</tr>
							</tfoot>
						</table>
					</div>
					<!-- 印装费用  end-->


				</div>
			</div>
		</div>
	</div>
</body>
</html>
