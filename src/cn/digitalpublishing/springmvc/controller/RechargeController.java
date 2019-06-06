package cn.digitalpublishing.springmvc.controller;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.Recharge;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.UserForm;
import cn.digitalpublishing.util.Pager;

/**
 * 点卡充值记录
 * 
 * @author CuiXian
 */
@Controller
public class RechargeController extends BaseController {
	
	/**
	 * 充值记录信息列表
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("recharge")
	public ModelAndView integral(@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		String forwardString = "website/Balance.ftl";
		
		// 必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 我的充值记录
		List<Recharge> rechargeList = new ArrayList<Recharge>();
		condition.put("userId", user.getId());
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(rechargeService.getCount(condition));
		rechargeList = rechargeService.getPagingList(condition, "", pager.getPageSize(), pager.getOffset());
		
		condition.put("pager", pager);
		condition.put("active", "profile");
		condition.put("current", "recharge");
		condition.put("rechargeList", rechargeList);
		return new ModelAndView(forwardString, condition);
	}
	
	/**
	 * 显示充值界面
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value="topup")
	public ModelAndView topup() throws Exception {
		return new ModelAndView("website/Recharge.ftl");
	}
	
	/**
	 * 更新用户点卡余额信息
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/recharge/save")
	public UserForm save(UserForm form) throws Exception {
		Map<String,Object> condition = new HashMap<String,Object>();
		User user = form.getObj();
		try {
			condition.put("username", user.getUsername());
			condition.put("isnotdel", "2");
			List<User> userList = this.userService.getUserList(condition, "");
			if (null != user.getUsername() && !"".equals(user.getUsername()) && 0 < userList.size()){
				//将充值记录插入到充值记录表
				Recharge recharge = new Recharge();
				recharge.setUser(userList.get(0));
				recharge.setMoney(user.getBalance());
				//新增充值记录
				this.rechargeService.insert(recharge);
				
				//用户点卡余额
				BigDecimal acont = null;
				acont = userList.get(0).getBalance();
				if(acont==null){
					user.setBalance(user.getBalance());
				}else{
					user.setBalance(acont.add(user.getBalance()));
				}
				//更新用户点卡余额信息
				this.userService.update(user, userList.get(0).getId(), null);
				
			    form.setMsg("充值成功！");
			    form.setIsSuccess("true");
			}else{
				form.setMsg("充值失败！该用户不存在或输入用户名有误！");
			}	
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
}
