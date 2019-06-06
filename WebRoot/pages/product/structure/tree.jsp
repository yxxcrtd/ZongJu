<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/common.jsp"%>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>产品结构</title>
    <link rel="stylesheet" href="${ctx}/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
    <script type="text/javascript" src="${ctx}/ztree/js/jquery.ztree.core-3.4.js"></script>
    <script src="${ctx}/js/common.js"></script>
    <script type="text/javascript" src="${ctx}/pages/product/structure/tree.js"></script>
    <script type="text/javascript" src="${ctx}/pages/product/structure/tree_init.js"></script>
    
    <style type="text/css">
	    #page-content .width41 {
			margin-left: 41%;
			margin-right: 0;
			margin-top: 0;
			min-height: 100%;
			padding: 0
		}
	    
    	#sidebarDiv .width500 {
    		width:40%;
    	}
    
        #sidebarDiv #sidebar:before {
            content: initial;
            border-right: 1px solid #ccc;
        }

        #sidebarDiv #sidebar-shortcuts {
            line-height: 0px;
            max-height: 0px;
        }

        div#rMenu {
            visibility: hidden;
            position: absolute;
            top: 0;
            text-align: left;
            padding: 2px;
            backgroundColor: #FFFFFF;
        }

        div#rMenu ul {
            listStyle: none;
            margin: 0px;
            background-color: #FFFFFF;
            border: 1px solid #999;
            width: 140px;
            padding: 1px;
        }

        div#rMenu ul li {
            margin: 0px;
            color: #000;
            display: block;
            cursor: default;
            padding: 1px;
            border: 1px solid #fff;
            background-color: transparent;
            font: normal 12px arial, tahoma, helvetica, sans-serif;
        }

        div#rMenu ul li img {
            vertical-align: middle;
        }

        div#shadow {
            background-color: #b6bdd2;
            position: absolute;
            opacity: 0.2;
            zIndex: 499;
        }
        
        .achide {
			display: block;
			word-break:keep-all;
			white-space:nowrap;
			overflow:hidden;
			text-overflow:ellipsis;
		}
    </style>
</head>
<body>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div id="sidebarDiv">
                <div id="sidebar" class="width500">
                    <div id="sidebar-collapse"
                         onclick="Editorial.Product.Structure.hideTree()">
                        <i class="icon-double-angle-left"></i>
                    </div>
                    <div id="sidebar-shortcuts">
                        <div class="zTreeDemoBackground left">
                            <ul id="treeManage" class="ztree"></ul>
                        </div>
                        <div id="shadow"></div>
                        <div id="rMenu">
                            <ul>
                            	
                            	<li id="elementView"
                                    onclick="Editorial.Product.Structure.elementView()" 
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">查看素材
                                </li>
                            	
                            	<li id="selectExist"
                                    onclick="Editorial.Product.Structure.selectExist()" 
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">选取已有素材
                                </li>
                                
                            	<li id="add"
                                    onclick="Editorial.Product.Structure.add()" 
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">添加
                                </li>
                                
                                <li id="edit"
                                    onclick="Editorial.Product.Structure.update()" 
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">修改
                                </li>
                                
                                <li id="delete"
                                    onclick="Editorial.Product.Structure.remove()" 
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">删除
                                </li>
                            	
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="main-content" class="clearfix width41">
                <div id="content" class="hide">
                    <div class="clearfix">
                        <div id="page-content" class="clearfix">
                            <div class="row-fluid">
                            	
                         <div class="row-fluid">
							<!-- ------------------表单部分开始----------------------------- -->
							<form:form id="structureForm" commandName="form" class="form-horizontal">
								<form:hidden path="product.id" id="product_id" />
								<form:hidden path="product.title" id="product_title" />
								<form:hidden path="productStructureRelation.id" id="productStructureRelation_id" />
								<form:hidden path="parentProductStructureRelation.id" id="parentProductStructureRelation_id" />
															
								<div class="table-header on" id="main_data_btn">
									<i class="icon-caret-down"></i>&nbsp;&nbsp;基本信息
								</div>
								<div id="main_data_div" class="on-down">

								<div class="row-fluid">

									<div class="control-group" id="structure_name_div">
										<label class="control-label" for="form-field-1">产品结构名称：</label>
										<div class="controls">
											<form:input path="productStructureRelation.name" id="structure_name" placeholder="结构名称" class="span6" onblur="Editorial.Product.Structure.validate_name()" />
											<span id="structure_name_span" class="help-inline"></span>
										</div>
									</div>
									
								</div>
								
								
								</div>
								
								<div class="row-fluid" id="productStructure"></div>
								
								<!-- ------------------表单部分结束----------------------------- -->
								<!-- ------------------表单按钮部分开始----------------------------- -->
								<div class="form-actions"
									style="text-align: center; padding-left: 0px;">
									<button class="btn btn-success" id="save" type="submit">
										<i class="icon-save bigger-110"></i> 保存
									</button>
									&nbsp; &nbsp; &nbsp;
									<button class="btn btn-inverse" id="reset"
										onclick="BMEP.Client.ClientInfo.Tree.clearCustomer()">
										<i class="icon-undo bigger-110"></i> 清空
									</button>
								</div>
							</form:form>
							
							<!-- ------------------表单按钮部分结束----------------------------- -->
						</div>
                            
                            </div>
                        </div>
                    </div>
                </div><!-- content end -->
                
                <div id="elementsTableContent" class="hide">
                	<input type="hidden" id="queryStructureId" />
				     <div class="clearfix">
						<div id="page-content" class="clearfix">
							<div class="row-fluid">
				
								<!-- ------------------导航页面部分结束----------------------------- -->
								<div class="row-fluid">
									<!-- ------------------功能页面部分开始----------------------------- -->
									<!-- ------------------功能按钮开始----------------------------- -->
									<div class="ace-thumbnails">
										<button type="button" class="btn btn-small btn-primary" onclick="Editorial.Product.Structure.createElement()">
											<i class="icon-plus-sign bigger-125"></i>创建素材
										</button>
									</div>
									
									<!-- ------------------功能按钮结束----------------------------- -->
				
									<!-- ------------------查询开始----------------------------- -->
					<div class="table-header on">
						<i class="icon-caret-down"></i>&nbsp;&nbsp;查询条件
					</div>
					<div class="on-down">
						<form:form id="form" commandName="form" action="manager" class="form-horizontal">
						<div class="row-fluid">
							<div class="row-fluid">
								
								<div class="control-group span4">
									<label class="control-label" for="form-field-1">关键字：</label>
									<div class="controls">
										<form:input path="structure.keyword" id="query_element_keyword" cssClass="span10" onkeydown="if (13 == event.keyCode) { $('.btn-success').focus(); }"/>
									</div>
								</div>
								
							</div>

							<div style="text-align: center;">
								<button class="btn btn-small btn-success" type="button" onclick="Editorial.Product.Structure.query()">
									<i class="icon-save bigger-110"></i>查询
								</button>
								&nbsp;&nbsp;
								<button type="reset" class="btn btn-small btn-inverse">
									<i class="icon-print bigger-110"></i>重置
								</button>
							</div>
						</div>
					</form:form>
					</div>
									<!-- ------------------查询结束----------------------------- -->
									<!-- ------------------功能页面部分结束----------------------------- -->
									<!-- ------------------列表页面部分开始----------------------------- -->
									<div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;素材列表</div>
									<table style="table-layout: fixed;" id="table_report" class="table table-striped table-bordered table-hover">
										<thead>
											<tr>
												<th width='10%' align='center'></th>
												<th width='90%' align='center'></th>
											</tr>
										</thead>
										<tbody align='center' style="line-height: 18px; border: 1px solid #97bbdc;">
				
										</tbody>
										<tfoot>
											<tr>
												<th width='10%' align='center'></th>
												<th width='90%' align='center'></th>
											</tr>
										</tfoot>
									</table>
									<!-- ------------------列表页面部分结束----------------------------- -->
								</div>
							</div>
						</div>
					</div>
                	
                	
                </div>
                
                
                
            </div>
        </div>
    </div>
</div>
</body>
</html>