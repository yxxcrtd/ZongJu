<#include "Context.ftl" />
<#assign ingentatag=JspTaglibs["/WEB-INF/taglib/ingenta-taglib.tld"] />
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/x html">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	</head>
	
	<body>
		<div class="clearfix">
			<#include "AjaxMsg.ftl" />
			<div id="page-content" class="clearfix">
				<div class="row-fluid">
					<div class="page-header position-relative">
						<h1>版权交易信息 <small> <i class="icon-double-angle-right"></i>&nbsp;&nbsp;新建</small></h1>
					</div>
					<div class="row-fluid">
						<div class="table-header on">版权交易基本信息</div>
						<form id="PublishTradeForm" commandName="form" class="form-horizontal">
							<div class="on-down">
								<div class="control-group" id="versionDiv">
									<label class="control-label">版本：</label>
									<div class="controls">
									    <select class="span6" id="version" name="obj.version">
					                        <#list ["bg_BG", "cz_CS", "de_DE","dn_DN", "el_EL", "en_US", "es_ES", "fi_FN","fr_FR", "he_IL", "hu_HU", "it_IT", "lt_LT","nl_NL", "pl_PL", "pt_BR", "pt_PT", "pv_FN","ru_RU", "se_SE", "tr_TR", "zh_CN", "zh_TW"] as i>
						                           <option>${i}</option>
					                        </#list>
			                            </select>
										<span id="versionSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="downPaymentDiv">
									<label class="control-label">首付：</label>
									<div class="controls">
										<input id="downPayment" class="span6" name="obj.downPayment" placeholder="首付款" onblur="ZongJu.PublishTrade.downPayment();" />
										<span id="downPaymentSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="proportionDiv">
									<label class="control-label">分成比例：</label>
									<div class="controls">
									    <select class="span6" id="proportion" name="obj.proportion">
					                        <#list 1..100 as i>
						                           <option>${i}</option>
					                        </#list>
			                            </select>%
										<span id="proportionSpan" class="help-inline"></span>
									</div>
								</div>
								<div class="control-group" id="tradeStrDiv">
									<label class="control-label">交易时间：</label>
									<div id="invoiceDate" class="controls">
										<input id="tradeStr" class="span6" name="obj.tradeStr" data-format="yyyy-MM-dd" onblur="ZongJu.PublishTrade.publishTrade();"/>
										<span class="add-on"> <i data-time-icon="icon-time" data-date-icon="icon-calendar" > </i></span>
									</div>
								</div>
								<input type="hidden" name="obj.sourceId.id" value="${form.sourceId}"/>
							</div>
							<div class="form-actions" style="text-align: center; padding-left:0px;">
								<button class="btn btn-success" type="submit" id="save"><i class="icon-save bigger-110"></i> 保存</button>&nbsp; &nbsp; &nbsp;
								<button class="btn btn-inverse" type="reset"><i class="icon-undo bigger-110"></i> 清空</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript" src="${request.contextPath}/js/common.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.namespace.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/publishTrade/PublishTradeEdit.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/publishTrade/PublishTradeList.js"></script>
	</body>
</html>
