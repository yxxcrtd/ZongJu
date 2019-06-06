package cn.digitalpublishing.springmvc.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.ShoppingCart;
import cn.digitalpublishing.po.User;

/**
 * 购物车
 * 
 * @author YangXinXin
 */
@Controller
public class ShoppingCartController extends BaseController {

	/**
	 * 加入购物车
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("buy")
	public String save(@RequestParam(value = "resourceId", required = true) String resourceId) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		
		if (!"".equals(resourceId) && null != resourceId) {
			try {
				User user = (User) session.getAttribute("user"); // TODO 还需要判断登录用户的Session失效情况
				PProduct product = productService.getProduct(resourceId);
				if (null != product) {
					ShoppingCart shoppingCart = null;
					
					// 1，先要判断是否已经购买过
					condition.put("product", resourceId);
					condition.put("userId", user.getId());
					condition.put("status", 0); // 状态是未支付的
					
					List<ShoppingCart> scList = shoppingCartService.getList(condition);
					if (0 < scList.size()) {
						shoppingCart = (ShoppingCart) scList.get(0); // 只可能放回一条数据
					}
					
					// 2，没有购买的直接是新增操作
					if (null == shoppingCart) {
						shoppingCart = new ShoppingCart();
						shoppingCart.setUserId(user.getId());
						shoppingCart.setProduct(product);
						shoppingCart.setCount(1);
						shoppingCart.setMoney(product.getPrice());
						shoppingCart.setStatus(0);
						shoppingCartService.insert(shoppingCart);
					} else { // 修改购物车中的商品数量和价格
						shoppingCart.setCount(shoppingCart.getCount() + 1);
						shoppingCart.setMoney(shoppingCart.getMoney().add(product.getPrice())); // 两个BigDecimal值得相加
						shoppingCartService.update(shoppingCart, ShoppingCart.class.getName(), shoppingCart.getId(), null);
					}
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			return SUCCESS;
		} else {
			return FAILURE;
		}
	}
	
	/**
	 * 删除购物车中的商品
	 * 
	 * @param p
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("mycartd")
	public String mycartd(@RequestParam(value = "id", required = true) String id) throws Exception {
		// 1，必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			return "redirect:/login";
		}
		
		// 2，获取购物车对象
		ShoppingCart sc = shoppingCartService.findById(id);
		if (null != sc) {
			shoppingCartService.delete(ShoppingCart.class.getName(), id);
		} else {
			return FAILURE;
		}
		return SUCCESS;
	}

}
