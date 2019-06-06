<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>在线阅读 - ${resource.name!}</title>
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/css/style.css" />
		<link type="text/css" rel="styleSheet" href="${request.contextPath}/flexpaper/css/flexpaper.css" />
		<script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/jquery.extensions.min.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/flexpaper_flash.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/public.js"></script>
	</head>
	
	<body>
		<#include "Banner.ftl" />
		
		<div id="documentViewer" class="flexpaper_viewer flash_plugin"></div>
		<script type="text/javascript">
		<!--
		var fp = new FlexPaperViewer (	
			"${request.contextPath}/flexpaper/FlexPaperViewer.swf",
			"documentViewer", {
				config : {
					DOC : "/upload/${resource.isbn!}/<#if user??><#else>s</#if>${fileName!}.swf",
					ZoomTransition : "easeOut",
					ZoomTime : 0.5,
					ZoomInterval : 0.2,
					FitWidthOnLoad : true,
					PrintEnabled : false,
					SelectEnabled : false,
					FullScreenAsMaxWindow : false,
					ProgressiveLoading : false,
					MinZoomSize : 0.2,
					MaxZoomSize : 5,
					SearchMatchAll : false,
					InitViewMode : "window",
					ViewModeToolsVisible : true,
					ZoomToolsVisible : true,
					NavToolsVisible : true,
					CursorToolsVisible : true,
					SearchToolsVisible : true,
					SearchString : "",
					Reference : "The reference is test",
					SelectVisible : true,
					localeChain: "zh_CN",
					WMode : "transparent",
					key : "@4516c44a3b7f5ec2893$cc3be1a9ff661cfdef6"
				}
			}
		);
		//-->
		</script>
		<#include "Footer.ftl" />
	</body>
</html>
