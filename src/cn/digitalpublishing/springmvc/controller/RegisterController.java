package cn.digitalpublishing.springmvc.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.UserForm;

/**
 * 用户注册
 * 
 * @author YangXinXin
 */
@Controller
public class RegisterController extends BaseController {
	
	/**
	 * 显示注册
	 * 
	 * @throws Exception
	 */
	@RequestMapping("register")
	public ModelAndView edit() throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("active", "register");
		return new ModelAndView("website/Register.ftl", map);
	}
	
	/**
	 * 新增用户
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("/register/save")
	public UserForm save(UserForm form) throws Exception {
		Map<String,Object> condition = new HashMap<String,Object>();
		User user = form.getObj();
		try {
			//修改
			if(form.getObj().getId() != null&&!"".equals(form.getObj().getId())){
			     this.userService.update(user, form.getObj().getId(), null);
		         form.setMsg("信息修改成功！");
		         form.setIsSuccess("true");
			}else{
			     user.setStatus("0");
			     user.setIntegral(0);
			     BigDecimal zero = new BigDecimal("0");
			     user.setBalance(zero);
			     condition.put("username", user.getUsername());
			     List<User> getUserList = this.userService.getUserList(condition, "");
			
			     if(0 < getUserList.size()){
				     form.setMsg("此名称已被其他人使用!");
			     }else{
				     // 新增用户
				     this.userService.insert(user);
				     form.setMsg("恭喜你！新用户注册成功！请等待审核后再登录，谢谢！");
				     form.setIsSuccess("true");
			     }
		   }
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
}
