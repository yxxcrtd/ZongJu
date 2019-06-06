package cn.digitalpublishing.springmvc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.Integral;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.UserForm;

/**
 * 登录
 * 
 * @author YangXinXin
 */
@Controller
public class LoginController extends BaseController {

	/**
	 * 显示登录
	 * 
	 * @throws Exception
	 */
	@RequestMapping("login")
	public ModelAndView land() throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("active", "login");
		return new ModelAndView("website/Login.ftl", map);
	}
	
	/**
	 * 登录检查
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("loginCheck")
	public UserForm login(UserForm form) throws Exception {
		Map<String,Object> condition = new HashMap<String,Object>();
		User user = form.getObj();
		try {
			if(null==user.getUsername() && "".equals(user.getUsername()) || null==user.getPassword() && "".equals(user.getPassword())){
				form.setMsg("用户名密码不能为空！");
			}else{
				condition.put("username", user.getUsername());
				condition.put("password", user.getPassword());
				condition.put("isnotdel", "2");
				List<User> userList = this.userService.getUserList(condition, "");
				if (0 < userList.size()) {
					if("1".equals(userList.get(0).getStatus())){
						//用户登录积分
						User userInte = new User();
						Integer acont = null;
						acont = userList.get(0).getIntegral();
						if(acont==null){
							userInte.setIntegral(new Integer(1));
						}else{
							userInte.setIntegral(++acont);
						}
						//用户积分更新
						this.userService.update(userInte, userList.get(0).getId(), null);
						//获取登陆信息插入到积分表
						Integral integral = new Integral();
						integral.setUser(userList.get(0));
						integral.setSource("登录奖励");
						integral.setIntegral(1);
						//积分信息插入
						this.integralService.insert(integral);
						
						User u = userList.get(0);
						form.setMsg("登录成功！");
						form.setIsSuccess("true");
						session.setAttribute("user", u);
					}else{
						form.setMsg("该用户未审核或审核未通过，暂时不能登录！");
					}
				}else{
					form.setMsg("用户名或密码错误!");
				}
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

}
