package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.Integral;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.util.Pager;

/**
 * 积分获取记录
 * 
 * @author CuiXian
 */
@Controller
public class IntegralController extends BaseController {
	
	/**
	 * 积分记录信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("myintegral")
	public ModelAndView integral(@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		String forwardString = "website/MyIntegral.ftl";
		
		// 必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 我的积分记录
		List<Integral> integralList = new ArrayList<Integral>();
		condition.put("userId", user.getId());
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(integralService.getCount(condition));
		integralList = integralService.getPagingList(condition, "", pager.getPageSize(), pager.getOffset());
		
		// 3，显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			condition.put("userId", user.getId());
			condition.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(condition);
		}
		condition.put("unPayCount", unPayCount);
		
		condition.put("pager", pager);
		condition.put("active", "profile");
		condition.put("current", "myintegral");
		condition.put("integralList", integralList);
		return new ModelAndView(forwardString, condition);
	}

}
