<%@ page contentType="text/html;charset=UTF-8"%>
<%@ include file="/common/taglibs.jsp"%>
<%@ include file="/pages/common/context.jsp"%>
<!DOCTYPE html>
<html lang="en">
<!-- InstanceBegin template="/Templates/template.dwt" codeOutsideHTMLIsLocked="false" -->
<head>
<meta charset="utf-8" />
<title>后台管理</title>
<meta name="description" content="" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<script src="${ctx}/js/common.js"></script>
<script src="${ctx}/pages/rightLicense/subsidaryRight/tabs/tab_authorizedArea.js"></script>
<script src="${ctx}/pages/rightLicense/subsidaryRight/tabs/tab_authorizationLanguage.js"></script>
<script src="${ctx}/pages/rightLicense/subsidaryRight/tabs/tab_calculationRules.js"></script>
<script src="${ctx}/pages/rightLicense/subsidaryRight/edit.js"></script>
</head>

<body>
	<%@ include file="/pages/common/ajaxMsg.jsp"%>
	<div class="clearfix">
		<div id="page-content" class="clearfix">
			<div class="row-fluid">
				<!-- ------------------导航页面部分开始----------------------------- -->
				<div class="page-header position-relative">
					<h1>
                        版税附属权利 <small> <i class="icon-double-angle-right"></i> <c:if
								test="${form.id==null||form.id=='0'||form.id==''}">
			    	新建
			    </c:if> <c:if test="${form.id!=null&&form.id!='0'&&form.id!=''}">
			    	修改
			    </c:if>
						</small>
					</h1>
				</div>
				<!-- ------------------导航页面部分结束----------------------------- -->
				<div class="row-fluid">
					<!-- ------------------表单部分开始----------------------------- -->
					<div class="table-header on">
						基本信息
					</div>
					<form:form id="DicClassForm" commandName="form" class="form-horizontal">
					<form:hidden path="obj.right.rlicenseId" id="subsidaryRight_right_rlicenseId" />
					
					<div class="on-down">
                        <div class="row-fluid">
                            <div class="control-group span6">
                                <div class="control-group" id="levelDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>附属权利级别：</label>
                                    <div class="controls">
                                        <form:select path="obj.level" id="level" class="span8" onblur="Editorial.SubsidaryRight.changeLevel();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.levelMap}" var="t">
                                                <form:option value="${t.key}">${t.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="levelSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="productDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>签约产品：</label>
                                    <div class="controls">
                                        <form:select path="obj.product.id" id="product" class="span8" onblur="Editorial.SubsidaryRight.changeProduct();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.productList}" var="t">
                                                <form:option value="${t.id}">${t.title}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="productSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="personTypeRelationshipDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>签约贡献者：</label>
                                    <div class="controls">
                                        <form:select path="obj.personTypeRelationship.id" id="personTypeRelationship" class="span8" onblur="Editorial.SubsidaryRight.validateAuthor();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.productPersonRelationshipList}" var="t">
                                                <form:option value="${t.id}">${t.person.name}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="personTypeRelationshipSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="structureTypeDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>素材类型：</label>
                                    <div class="controls">
                                        <form:select path="obj.structureType.id" id="structureType" class="span8" onblur="Editorial.SubsidaryRight.validateStructureType();Editorial.SubsidaryRight.clearStructure();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.productStructureRelationshipList}" var="t">
                                                <form:option value="${t.structure.structureType.id}">${t.structure.structureType.name}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="structureTypeSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="structureNameDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>素材：</label>
                                    <div class="controls">
                                        <form:hidden path="obj.structure.id" id="structure" />
                                        <form:input path="obj.structure.name" id="structureName" class="span6" disabled="true"/>
                                        <button type="button" class="btn btn-small btn-primary"
                                                onclick="Editorial.SubsidaryRight.selectStructure();"><i class="icon-edit bigger-125"></i> 选择素材
                                        </button>
                                        <span id="structureNameSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="statusDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>附属权利状态：</label>
                                    <div class="controls">
                                        <form:select path="obj.status" id="status" class="span8" onblur="Editorial.SubsidaryRight.validateAdjustRule();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.statusMap}" var="t">
                                                <form:option value="${t.key}">${t.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="statusSpan" class="help-inline"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="control-group span6">
                                <div class="control-group" id="licenseTypeDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>授权类型：</label>
                                    <div class="controls">
                                        <form:select path="obj.licenseType.licenseTypeId" id="licenseType" class="span8" onblur="Editorial.SubsidaryRight.validateLicenseType();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.licenseTypeList}" var="t">
                                                <form:option value="${t.licenseTypeId}">${t.licenseTypeName}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="licenseTypeSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="royaltyRuleDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>版税规则：</label>
                                    <div class="controls">
                                        <form:select path="obj.royaltyRule" id="royaltyRule" class="span8" onblur="Editorial.SubsidaryRight.validateRoyaltyRule();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.royaltyRuleMap}" var="t">
                                                <form:option value="${t.key}">${t.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="royaltyRuleSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="retainPercentDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>出版社比率：</label>
                                    <div class="controls">
                                        <form:input path="obj.retainPercent" id="retainPercent"
                                                    placeholder="出版社比率" class="span6" />
                                        <span id="retainPercentSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="ownerPercentDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>贡献者比率：</label>
                                    <div class="controls">
                                        <form:input path="obj.ownerPercent" id="ownerPercent"
                                                    placeholder="贡献者比率" class="span6" />
                                        <span id="ownerPercentSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="initRateDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>初始比率：</label>
                                    <div class="controls">
                                        <form:input path="obj.initRate" id="initRate"
                                                    placeholder="初始比率" class="span6" />
                                        <span id="initRateSpan" class="help-inline"></span>
                                    </div>
                                </div>
                                <div class="control-group" id="adjustRuleDiv">
                                    <label class="control-label" for="form-field-1"><span class='red'>*</span>调整规则：</label>
                                    <div class="controls">
                                        <form:select path="obj.adjustRule" id="adjustRule" class="span8" onblur="Editorial.SubsidaryRight.validateAdjustRule();">
                                            <form:option value="">--选择--</form:option>
                                            <c:forEach items="${form.adjustRuleMap}" var="t">
                                                <form:option value="${t.key}">${t.value}</form:option>
                                            </c:forEach>
                                        </form:select>
                                        <span id="adjustRuleSpan" class="help-inline"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
						<form:hidden path="obj.srlicenseId" id="id"/>
						<!-- ------------------表单部分开始----------------------------- -->
						</div>
						
						<c:if test="${form.obj.srlicenseId != null}">
						<!-- TAB页 开始 -->
						<ul class="nav nav-tabs">
				            <li class="active"><a href="#authorizedArea" onclick="Editorial.SubsidaryRight.initAuthorizedAreaDataTable()" data-toggle="tab">授权地域</a></li>
				            <li><a href="#authorizationLanguage" onclick="Editorial.SubsidaryRight.initAuthorizationLanguageDataTable()" data-toggle="tab">授权语种</a></li>
				            <li><a href="#calculationRules" onclick="Editorial.SubsidaryRight.initCrFormulaDataTable()" data-toggle="tab">计算规则</a></li>
				        </ul>
				        <!-- TAB页 结束 -->
				        <!-- TAB页 内容 开始 -->
				        <div class="tab-content">
				        
				        	<!-- authorizedArea 开始 -->
				            <div class="tab-pane active" id="authorizedArea">
				            	<jsp:include page="tabs/tab_authorizedArea.jsp"></jsp:include>
				            </div>
				            <!-- authorizedArea 结束 -->
				            
				            <!-- authorizationLanguage 开始 -->
				            <div class="tab-pane" id="authorizationLanguage">
				            	<jsp:include page="tabs/tab_authorizationLanguage.jsp"></jsp:include>
				            </div>
				            <!-- authorizationLanguage 结束 -->
				            
				            <!-- calculationRules 开始 -->
				            <div class="tab-pane" id="calculationRules">
				            	<jsp:include page="tabs/tab_calculationRules.jsp"></jsp:include>
				            </div>
				            <!-- calculationRules 结束 -->
				            
		            	</div>
		            	<!-- TAB页 内容 结束 -->
		            	</c:if>
						
						<!-- ------------------表单按钮部分开始----------------------------- -->
						
						<div class="form-actions" style="text-align: center; padding-left:0px;">
							<button class="btn btn-success" type="submit" id="save">
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
</body>
</html>
