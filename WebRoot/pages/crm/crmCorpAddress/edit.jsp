<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/crm/crmCorpAddress/edit.js"></script>
</head>
<body>
	<div class="clearfix">
		<%@ include file="/pages/common/ajaxMsg.jsp"%>
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>联系地址信息
						<small><i class="icon-double-angle-right"></i>
							<c:choose>
								<c:when test="${form.address.id == null}">新建</c:when>
								<c:otherwise>修改</c:otherwise>
							</c:choose>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">

					<div class="table-header">基本信息</div>
					<div class="on-down">
					
					<form:form id="crmCorpAddressForm" commandName="form" class="form-horizontal">
						<form:hidden path="address.id" id="address_id" />
						<form:hidden path="address.crmCorpTypeRelationship.id" />
						
						<!-- ------------------表单部分开始----------------------------- -->
						

						<div class="control-group" id="address_type_div">
							<label class="control-label" for="form-field-1">地址分类：</label>
							<div class="controls">
								<form:input path="address.type" id="address_type" placeholder="地址分类" class="span6" />
								<span id="address_type_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_country_div">
							<label class="control-label" for="form-field-1">国家：</label>
							<div class="controls">
								<form:input path="address.country" id="address_country" placeholder="国家" class="span6" />
								<span id="address_country_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_roomNo_div">
							<label class="control-label" for="form-field-1">房间号：</label>
							<div class="controls">
								<form:input path="address.roomNo" id="address_roomNo" placeholder="房间号" class="span6" />
								<span id="address_roomNo_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_floor_div">
							<label class="control-label" for="form-field-1">楼层：</label>
							<div class="controls">
								<form:input path="address.floor" id="address_floor" placeholder="楼层" class="span6" />
								<span id="address_floor_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_building_div">
							<label class="control-label" for="form-field-1">建筑名：</label>
							<div class="controls">
								<form:input path="address.building" id="address_building" placeholder="建筑名" class="span6" />
								<span id="address_building_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_street_div">
							<label class="control-label" for="form-field-1">街道名：</label>
							<div class="controls">
								<form:input path="address.street" id="address_street" placeholder="街道名" class="span6" />
								<span id="address_street_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_block_div">
							<label class="control-label" for="form-field-1">区：</label>
							<div class="controls">
								<form:input path="address.block" id="address_block" placeholder="区" class="span6" />
								<span id="address_block_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_town_div">
							<label class="control-label" for="form-field-1">镇：</label>
							<div class="controls">
								<form:input path="address.town" id="address_town" placeholder="镇" class="span6" />
								<span id="address_town_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_city_div">
							<label class="control-label" for="form-field-1">城市：</label>
							<div class="controls">
								<form:input path="address.city" id="address_city" placeholder="城市" class="span6" />
								<span id="address_city_span" class="help-inline"></span>
							</div>
						</div>

						<div class="control-group" id="address_post_div">
							<label class="control-label" for="form-field-1">邮编：</label>
							<div class="controls">
								<form:input path="address.post" id="address_post" placeholder="邮编" class="span6" />
								<span id="address_post_span" class="help-inline"></span>
							</div>
						</div>
						
						
						<!-- ------------------表单部分开始----------------------------- -->
						<!-- ------------------表单按钮部分开始----------------------------- -->
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" id="save">
								<i class="icon-save bigger-110"></i> 保存
							</button>
							&nbsp; &nbsp; &nbsp;
							<button class="btn btn-inverse" type="reset">
								<i class="icon-undo bigger-110"></i> 清空
							</button>
						</div>
						<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
					</div>
				</div>
			</div>
		</div>
	</div>
</body>
</html>