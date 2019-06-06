package cn.digitalpublishing.springmvc.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import cn.digitalpublishing.springmvc.form.UserForm;

/**
 * 用户注销
 * 
 * @author YangXinXin
 */
@Controller
public class LogoutController extends BaseController {
	
	/**
	 * 用户退出
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("logout")
	public String logout(UserForm form) throws Exception {
		session.setAttribute("user", null);
		return "redirect:/index";
	}
	
}
