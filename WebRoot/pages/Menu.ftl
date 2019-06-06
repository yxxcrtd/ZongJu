<div class="taxonomy">
	<ul class="classUl" id="menu">
		<#if ("1" == user.role)><#-- 1 是作者，只有作者才有我的作品、在线创作等  TODO
			<li><a href="javascript:;">【我的作品】</a>
				<ul>
					<li><a href="${request.contextPath!}/article/manager">在线创作</a></li>
					<li><a href="#">我的作品</a></li>
					<li><a href="#">我的积分</a></li>
				</ul>
			</li>
			-->
		</#if>
		<li><a href="javascript:;">【我的导航】</a>
			<ul>
				<li><a href="profile" <#if ("profile" == current)>class="downline"</#if>>我的个人信息</a></li>
				<li><a href="mycart" <#if ("mycart" == current)>class="downline"</#if>>我的购物车</a></li>
				<li><a href="mypay" <#if ("mypay" == current)>class="downline"</#if>>我的支付</a></li>
				<li><a href="myorder" <#if ("myorder" == current)>class="downline"</#if>>我的订单</a></li>
				<li><a href="myintegral" <#if ("myintegral" == current)>class="downline"</#if>>我的积分</a></li>
				<li><a href="recharge" <#if ("recharge" == current)>class="downline"</#if>>我的充值</a></li>
			</ul>
		</li>
	</ul>
</div>

<script type="text/javascript" src="${request.contextPath}/js/jquery-1.9.1.min.js"></script>
<script type="text/javascript">
<!--
$(function() {
	initMenu();
});
function initMenu() {
	// $("#menu ul").hide();
	$("#menu ul:first").show();
	$("#menu li a").click(
		function() {
			var checkElement = $(this).next();
			if((checkElement.is("ul")) && (!checkElement.is(":visible"))) {
				$("#menu ul:visible").slideUp("normal");
				checkElement.slideDown("normal");
				return false;
			} else {
				$(checkElement).slideToggle("normal");
			}
		}
	);
}
//-->
</script>