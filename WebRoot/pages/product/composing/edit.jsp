<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<%-- <%@ include file="/pages/common/common.jsp"%> --%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title><ingenta-tag:LanguageTag sessionKey="lang" key="Global.Label.Title"/></title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/product/composing/edit.js"></script>
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
						发排单管理
						<small>
							<i class="icon-double-angle-right"></i>
							<c:if test="${form.id==null||form.id=='0'||form.id==''}">
					    		创建发排单
					    	</c:if>
					    	<c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
					    		修改发排单
					    	</c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<form:form id="composingForm" commandName="form" class="form-horizontal">
					<div class="table-header on" id="baseInfoDiv">
							<i class="icon-caret-down"></i>&nbsp;&nbsp;基本信息
					</div>
					<div id="baseInfoContentDiv" class="on-down">
					<div class="row-fluid ">
					<div class="control-group span6 ">
						<div class="row-fluid ">
							<div id="proIdDiv" class="control-group">
								<label class="control-label" for="form-field-1">
								产品名称：
								</label>
								<div class="controls">
									<form:input path="composing.product.title" readonly="true"/>
									<form:hidden path="composing.product.id" id="proId"/>
									<span id="proIdSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid ">
						<div id="composingProductDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								成品：
							</label>
							<div class="controls">
                 				<form:input path="composing.composingProduct" id="composingProduct" placeholder="成品" onblur="Editorial.User.validateComposingProduct();"/>
								<span id="composingProductSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid ">
						<div id="areaTypeDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								原稿数（张）：
							</label>
							<div class="controls">
                 				<form:input path="composing.composingManuscriptCount" id="composingManuscriptCount" placeholder="原稿数"/>
								<span id="areaTypeDescSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid ">
						<div id="areaTypeDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								初稿打样（张）：
							</label>
							<div class="controls">
                 				<form:input path="composing.composingFirstCount" id="composingFirstCount" placeholder="初稿打样" />
								<span id="areaTypeDescSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						</div>
						<div class="control-group span6 ">
						<div class="row-fluid ">
							<div id="proIdDiv" class="control-group">
								<label class="control-label" for="form-field-1">
								发排单类型：
								</label>
								<div class="controls">
								<c:choose>
								<c:when test="${form.id!=null&&form.id!='0'&&form.id!=''}">
									<form:input path="composing.composingType.ctypeName"  readonly="true"/>
									<form:hidden path="composing.composingType.ctypeId" id="ctypeId"/>
								</c:when>
   								<c:otherwise>
   									<form:select path="composing.composingType.ctypeId" id="ctypeId">
										<form:option value="">-选择-</form:option>
										<c:forEach var="ct" items="${form.composingTypeList}">
												<form:option value="${ct.ctypeId}">${ct.ctypeName}</form:option>
										</c:forEach>
									</form:select>
   								</c:otherwise>
								</c:choose>
									<span id="proIdSpan" class="help-inline"></span>
								</div>
							</div>
						</div>
						<div class="row-fluid ">
						<div id="areaTypeDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								图片（张）：
							</label>
							<div class="controls">
                 				<form:input path="composing.composingPhotoCount" id="composingPhotoCount" placeholder="图片"/>
								<span id="areaTypeDescSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						<div class="row-fluid ">
						<div id="areaTypeDescDiv" class="control-group">
							<label class="control-label" for="form-field-1">
								版样数（张）：
							</label>
							<div class="controls">
                 				<form:input path="composing.composingLayoutCount" id="composingLayoutCount" placeholder="版样数"/>
								<span id="areaTypeDescSpan" class="help-inline"></span>
							</div>
						</div>
						</div>
						</div>
						</div>
					<form:hidden path="composing.composingId" id="composingId"/>
					<form:hidden path="id"/>
					</div>
					<div class="row-fluid" id="cp1"></div>
					
					<!-- ------------------表单部分结束----------------------------- -->
					<!-- ------------------表单按钮部分开始----------------------------- -->
					<div class="form-actions" style="text-align: center;">
						<button class="btn btn-success" type="submit">
							<i class="icon-save bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Save"/>
						</button>
						&nbsp; &nbsp; &nbsp;
						<button id="reset" class="btn btn-inverse" type="reset">
							<i class="icon-undo bigger-110"></i>
							<ingenta-tag:LanguageTag sessionKey="lang" key="Global.Button.Reset"/>
						</button>
					</div>
					<!-- ------------------表单按钮部分结束----------------------------- -->
					</form:form>
				</div>
			</div>
		</div>
	</div>
</body>
</html>
