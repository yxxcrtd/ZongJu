package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Strings;

import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.Order;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.po.ShoppingCart;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.UserForm;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.Pager;

/**
 * 门户
 * 
 * @author YangXinXin
 */
@Controller
public class WebsiteController extends BaseController {
	
	/**
	 * 整站门户
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("index")
	public ModelAndView index(PProductForm form, @RequestParam(value = "p", required = true, defaultValue = "1") int p, @RequestParam(value = "c", required = false) String c, @RequestParam(value = "keyWord", required = false) String keyWord, @RequestParam(value = "keyType", required = false) String keyType) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<PProduct> resourceList = new ArrayList<PProduct>();
		User user = (User) session.getAttribute("user");
		
		// 1，图书分类
		map.put("parentId", "");
		List<PProductType> propTypeList = this.productTypeService.getProductTypeList(map, " order by a.treeCode ");
		
		// 2，图书列表
		form.setiTotalRecords(productService.getProductCount(map));
		form.setiTotalDisplayRecords(form.getiTotalRecords());
		if (!Strings.isNullOrEmpty(form.getTypeId())) {
			map.put("productTypeId", form.getTypeId());
		}
		
		//搜索条件查询--"标题"、"ISBN"、"作者"、"出版社"
		if (!Strings.isNullOrEmpty(keyWord)&&"1".equals(keyType)) {
			map.put("keyword", "%" + keyWord + "%");
		}
		if ("2".equals(keyType)) {
			map.put("title", "%" + keyWord + "%");
		}
		if ("3".equals(keyType)) {
			map.put("isbn", "%" + keyWord + "%");
		}
		if ("4".equals(keyType)) {
			map.put("author", "%" + keyWord + "%");
		}
		if ("5".equals(keyType)) {
			map.put("publisher", "%" + keyWord + "%");
		}
		
		map.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
		map.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
//		map.put("productType", c);
		if (null != user) {
			if (2 == user.getRole()) {
//				if ("".equals(c)) {
					map.put("productType", user.getProductTypeId().getId());
//				}
			}
		}
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(productService.getProductCount(map));
		resourceList = productService.getProductPagingList(map, "", pager.getPageSize(), pager.getOffset());
		map.clear();
		
		// 3，显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		map.put("unPayCount", unPayCount);
		map.put("propTypeList", propTypeList);
		map.put("resourceList", resourceList);
		map.put("active", "index");
		map.put("pager", pager);
		
		return new ModelAndView("website/Index.ftl", map);
	}
	
	/**
	 * 个人门户
	 * 
	 * @param request
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("profile")
	public ModelAndView profile() throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String forwardString = "website/Profile.ftl";
		
		// 必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		
		// 统计我的订单数
		map.put("status", "");
		int orderCount = shoppingCartService.getUnPayCount(map);
		map.put("orderCount", orderCount);
		
		map.put("unPayCount", unPayCount);
		map.put("active", "profile");
		map.put("current", "profile");
		return new ModelAndView(forwardString, map);
	}
	
	/**
	 * 我的购物车
	 * 
	 * @param p
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("mycart")
	public ModelAndView mycart(@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String forwardString = "website/MyCart.ftl";
		
		// 1，必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 2，我的购物车（未支付列表）
		List<ShoppingCart> shoppingCartList = new ArrayList<ShoppingCart>();
		map.put("userId", user.getId());
		map.put("status", 0);
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(shoppingCartService.getUnPayCount(map));
		shoppingCartList = shoppingCartService.getShoppingCartPagingList(map, "", pager.getPageSize(), pager.getOffset());

		// 3，显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		map.put("unPayCount", unPayCount);
		map.put("pager", pager);
		map.put("active", "mycart");
		map.put("current", "mycart");
		map.put("shoppingCartList", shoppingCartList);
		return new ModelAndView(forwardString, map);
	}
	
	/**
	 * 我的订单
	 * 
	 * @param p
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("myorder")
	public ModelAndView myorder(@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String forwardString = "website/MyOrder.ftl";
		
		// 必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 我的订单列表
		List<Order> orderList = new ArrayList<Order>();
		map.put("userId", user.getId());
		map.put("status", 2);
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(orderService.getCount(map));
		orderList = orderService.getPagingList(map, "", pager.getPageSize(), pager.getOffset());
		
		// 3，显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		map.put("unPayCount", unPayCount);
		map.put("pager", pager);
		map.put("active", "profile");
		map.put("current", "myorder");
		map.put("orderList", orderList);
		return new ModelAndView(forwardString, map);
	}
	
	/**
	 * 我的支付
	 * 
	 * @param p
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("mypay")
	public ModelAndView mypay(@RequestParam(value = "p", required = false, defaultValue = "1") int p) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		String forwardString = "website/MyPay.ftl";
		
		// 1，必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			forwardString = "redirect:/login";
			return new ModelAndView(forwardString);
		}
		
		// 2，我的购物车（所有列表）
		List<ShoppingCart> shoppingCartList = new ArrayList<ShoppingCart>();
		map.put("userId", user.getId());
		Pager pager = new Pager();
		pager.setPageNo(p);
		pager.setTotalCount(shoppingCartService.getUnPayCount(map));
		shoppingCartList = shoppingCartService.getShoppingCartPagingList(map, "", pager.getPageSize(), pager.getOffset());
		
		// 3，显示购物中未支付的商品个数
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		map.put("unPayCount", unPayCount);
		map.put("pager", pager);
		map.put("active", "profile");
		map.put("current", "mypay");
		map.put("shoppingCartList", shoppingCartList);
		return new ModelAndView(forwardString, map);
	}
	
	/**
	 * 查看用户个人信息
	 * 
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("personal")
	public ModelAndView personal(UserForm form) throws Exception {
		String forwardString = "website/Personal.ftl";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			// 修改
			String id = request.getParameter("id");
			if (!Strings.isNullOrEmpty(id)) {
				form.setObj(this.userService.getUserId(id));
				form.setId(id);
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	@ResponseBody
	@RequestMapping("getCategoryById")
	public List<PProductType> getCategoryById(@RequestParam(value = "id", required = true) String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		List<PProductType> typeList = new ArrayList<PProductType>();
		map.put("parentId", id);
		try {
			typeList = productTypeService.getProductTypeListById(map, " order by a.treeCode ");		
		} catch (Exception e) {
			e.printStackTrace();
		}
		return typeList;
	}

}
