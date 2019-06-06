<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/common/taglibs.jsp" %>
<%@ include file="/pages/common/alert.jsp" %>
<%@ include file="/pages/common/context.jsp" %>
<%@ include file="/pages/common/ajaxMsg.jsp" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title><ingenta-tag:LanguageTag sessionKey="lang"
                                    key="Global.Label.Title"/></title>
    <link rel="stylesheet"
          href="${ctx }/ztree/css/zTreeStyle/zTreeStyle.css" type="text/css"></link>
    <script type="text/javascript"
            src="${ctx }/ztree/js/jquery.ztree.core-3.4.js"></script>
    <script src="${ctx}/js/common.js"></script>
    <script src="${ctx}/pages/component/person.js"></script>
    <script src="${ctx}/pages/product/product/edit.js"></script>

    <style type="text/css">

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
    </style>
</head>
<body>
<form id="corpHiddenForm" commandName="form" class="form-horizontal">
    <input type="hidden" id="corpId"/>
</form>
<div class="clearfix">
    <div id="page-content" class="clearfix">
        <div class="row-fluid">
            <div class="page-header position-relative">
                <h1>
                    雇员信息
                </h1>
            </div>
            <div id="sidebarDiv">
                <div id="sidebar">
                    <div id="sidebar-collapse"
                         onclick="Editorial.Component.Person.Tree.hideTree();">
                        <i class="icon-double-angle-left"></i>
                    </div>
                    <div id="sidebar-shortcuts">
                        <div class="zTreeDemoBackground left">
                            <ul id="treeDemo" class="ztree"></ul>
                        </div>
                        <div id="shadow"></div>
                        <div id="rMenu">
                            <ul>
                                <li id="property"
                                    onclick='Editorial.Component.Person.Tree.showList();'
                                    onmouseover="this.style.backgroundColor='#b6bdd2';"
                                    onmouseout="this.style.backgroundColor='';">雇员列表
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="main-content" class="clearfix">
                <div id="classifyContent" class="hide">
                    <div class="clearfix">
                        <div id="page-content" class="clearfix">
                            <div class="row-fluid">
                                <!-- ------------------导航页面部分开始----------------------------- -->
                                <!-- ------------------导航页面部分结束----------------------------- -->
                                <div class="row-fluid">
                                    <!-- ------------------功能页面部分开始----------------------------- -->
                                    <!-- ------------------功能按钮开始----------------------------- -->
                                    <div class="ace-thumbnails">
                                        <button class="btn btn-small btn-primary"
                                                onclick="Editorial.Component.Person.Tree.saveAndClose();">
                                            <i class="icon-save bigger-125"></i> 保存
                                        </button>
                                    </div>
                                    <!-- ------------------功能按钮结束----------------------------- -->

                                    <!-- ------------------功能页面部分结束----------------------------- -->
                                    <!-- ------------------列表页面部分开始----------------------------- -->

                                    <div class="table-header"><i class="icon-flag"></i>&nbsp;&nbsp;雇员列表</div>
                                    <table id="table_classify"
                                           class="table table-striped table-bordered table-hover">
                                        <thead>
                                        <tr>
                                            <th width='4%' align='center'></th>
                                            <th width='4%' align='center'></th>
                                            <th width='20%' align='center'></th>
                                            <th width='20%' align='center'></th>

                                        </tr>
                                        </thead>
                                        <tbody align='center'
                                               style="line-height: 18px; border: 1px solid #97bbdc;">

                                        </tbody>
                                        <tfoot>
                                        <tr>
                                            <th width='4%' align='center'></th>
                                            <th width='4%' align='center'></th>
                                            <th width='20%' align='center'></th>
                                            <th width='20%' align='center'></th>
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