<#assign ingentatag=JspTaglibs["/WEB-INF/taglib/ingenta-taglib.tld"] />
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8" />
		<!--basic styles-->
		<link href="${request.contextPath}/css/bootstrap.min.css" rel="stylesheet" />
		<link href="${request.contextPath}/css/bootstrap-responsive.min.css" rel="stylesheet" />
		<link rel="stylesheet" href="${request.contextPath}/css/font-awesome.min.css" />
		<!--page specific plugin styles-->
		<link rel="stylesheet" href="${request.contextPath}/css/colorbox.css" type="text/css" />
		<link href="${request.contextPath}/css/font-awesome.css" rel="stylesheet" type="text/css">
	    <link rel="stylesheet" href="${request.contextPath}/css/jquery-ui-1.10.3.custom.min.css" />
	    <link rel="stylesheet" href="${request.contextPath}/css/chosen.css" />
	    <link rel="stylesheet" href="${request.contextPath}/css/bootstrap-datetimepicker.min.css" />
	    <link rel="stylesheet" href="${request.contextPath}/css/daterangepicker.css" />
	    <link rel="stylesheet" href="${request.contextPath}/css/colorpicker.css" />    
		<!--fonts-->

		<!--ace styles-->
		<link rel="stylesheet" href="${request.contextPath}/css/ace.min.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ace-responsive.min.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ace-skins.min.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ColReorder.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ColVis.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ace.digital.css" />
		<link rel="stylesheet" href="${request.contextPath}/css/ace.new.min.css" />
		<!--basic scripts-->
		<script type="text/javascript">
			window.jQuery || document.write("<script src='${request.contextPath}/js/jquery-1.9.1.min.js'>"+"<"+"/script>");
		</script>
		<script src="${request.contextPath}/js/jquery.online.min.js"></script>
		<script src="${request.contextPath}/js/jquery-migrate-1.2.1.js"></script>
		<script src="${request.contextPath}/js/MAP.js"></script>
		<script src="${request.contextPath}/js/StringBuffer.js"></script>
		<!-- namespace -->
		<script src="${request.contextPath}/js/jquery.namespace.js"></script>
		<script src="${request.contextPath}/js/bootstrap.min.js"></script>
	    <script src="${request.contextPath}/js/jquery.dataTables.min.js"></script>
		<script src="${request.contextPath}/js/jquery.dataTables.bootstrap.js"></script>
	    <script src="${request.contextPath}/js/ColReorder.min.js"></script>
	    <script src="${request.contextPath}/js/ColVis.min.js"></script>
		
		<!--ace scripts-->
		<script src="${request.contextPath}/js/ace-elements.min.js"></script>
		<script src="${request.contextPath}/js/ace.min.js"></script>
		<script src="${request.contextPath}/js/fuelux/fuelux.wizard.min.js"></script>
		<script src="${request.contextPath}/js/ace.digital.wizard.js"></script>

		<!-- modal -->
		<script src="${request.contextPath}/js/bootstrap-modal.js"></script>
		<script src="${request.contextPath}/js/bootstrap-alert.js"></script>
		<!-- form -->
		<script type="text/javascript" src="${request.contextPath}/js/jquery.form.js"></script>
		<script type="text/javascript" src="${request.contextPath}/js/bootstrap-datetimepicker.min.js"></script>
		
		<script src="${request.contextPath}/js/dialog.js"></script>
		<script src="${request.contextPath}/js/dragable.js"></script>
		
		<script src="${request.contextPath}/js/customProperty.js"></script>
		
		<script type="text/javascript">
			<#-- 分页国际化 -->
			var Global_Paging_Search = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Search'/>";
			var Global_Paging_First = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.First'/>";
			var Global_Paging_Last = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Last'/>";
			var Global_Paging_Next = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Next'/>";
			var Global_Paging_Prev = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Prev'/>";
			var Global_Paging_Length_Menu = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Length.Menu'/>";
			var Global_Paging_Info = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Info'/>";
			var Global_Paging_Info_Filtered = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Info.Filtered'/>";
			var Global_Paging_Zero_Records = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Zero.Records'/>";
			var Global_Paging_Empty_Table = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Empty.Table'/>";
			var Global_Paging_Processing = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Paging.Processing'/>";
			<#-- 其他公共国际化 -->
			var Global_Prompt_Operating = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Prompt.Operating'/>";
			var Global_Prompt_Delete_Message = "<@ingentatag.LanguageTag sessionKey='lang' key='Global.Prompt.Delete.Message'/>";
		</script>
	</head>

</html>