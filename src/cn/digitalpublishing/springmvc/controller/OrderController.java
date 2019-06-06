package cn.digitalpublishing.springmvc.controller;

import java.awt.Color;
import java.io.File;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.com.daxtech.framework.model.Param;
import cn.digitalpublishing.po.Integral;
import cn.digitalpublishing.po.Order;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.ShoppingCart;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.po.Watermark;
import cn.digitalpublishing.util.io.PdfHelper;

import com.alipay.util.AlipayNotify;
import com.alipay.util.AlipaySubmit;

/**
 * 订单
 * 
 * @author YangXinXin
 */
@Controller
public class OrderController extends BaseController {

	/**
	 * 支付
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("alipaySubmit")
	public String alipaySubmit(HttpServletRequest request, HttpServletResponse response, @RequestParam(value = "id", required = true) String id) throws Exception {
		Map<String, String> sParaTemp = new HashMap<String, String>();
		
		// 1，如果没有id传递过来，则直接返回错误
		if (null == id || "".equals(id)) {
			return FAILURE;
		}
		
		// 2，获取用户信息
		User user = (User) session.getAttribute("user");
		// 登录超时
		if (null == user) {
			return TIMEOUT;
		}
		
		// 3，根据购物车ID获取购物车对象
		ShoppingCart shoppingCart = shoppingCartService.findById(id);
		
		// 4，生成订单记录
		Order order = null;
		PProduct product = productService.getProduct(shoppingCart.getProduct().getId());
		if (null != shoppingCart) {
			order = new Order();
			order.setMoney(shoppingCart.getMoney());
			order.setProduct(product);
			order.setStatus(0); // 0：未支付；1：支付失败；2：支付成功
			order.setUserId(user.getId());
			orderService.insert(order);
		}
		
		// 5，获取订单ID
		
		// 防钓鱼时间戳--若要使用请调用类文件submit中的query_timestamp函数
		String anti_phishing_key = "";
		
		// 客户端的IP地址 - 非局域网的外网IP地址，如：221.0.0.1
		String exter_invoke_ip = "";
		
		if (null != order) {
			// 把请求参数打包成数组
		    sParaTemp.put("payment_type", "1"); // 支付类型 1=商品购买,2=服务购买,... - 必填，不能修改
			sParaTemp.put("service", "create_direct_pay_by_user"); // 默认值
			sParaTemp.put("partner", Param.getParam("content.alipay.map").get("partner")); // 合作身份者ID，以2088开头由16位纯数字组成的字符串
			sParaTemp.put("key", Param.getParam("content.alipay.map").get("key")); // 合作身份者秘钥
			sParaTemp.put("_input_charset", Param.getParam("content.alipay.map").get("input_charset"));
			sParaTemp.put("sign_type", Param.getParam("content.alipay.map").get("sign_type")); // 签名方式 - 不需修改
			sParaTemp.put("notify_url", Param.getParam("content.alipay.map").get("notify_url")); // 客户付款后,支付宝调用的页面 - 需http://格式的完整路径，不能加?id=123这类自定义参数
			sParaTemp.put("return_url", Param.getParam("content.alipay.map").get("return_url")); // 客户付款成功后,显示给客户的页面 - 需http://格式的完整路径，不能加?id=123这类自定义参数，不能写成http://localhost/
			sParaTemp.put("seller_email", Param.getParam("content.alipay.map").get("subject")); // 卖家支付宝帐户--必填
			sParaTemp.put("out_trade_no", String.valueOf(order.getId())); // 商户订单号-- 商户网站订单系统中唯一订单号，必填
			sParaTemp.put("total_fee", String.valueOf(order.getMoney())); // 商户付款金额--必填
			sParaTemp.put("subject", Param.getParam("content.alipay.map").get("subject")); // 订单主题（从配置文件获取）
			sParaTemp.put("body", Param.getParam("content.alipay.map").get("body")); // 订单描述（从配置文件获取）
			sParaTemp.put("show_url", Param.getParam("content.alipay.map").get("show_url"));  // 商品展示地址--需以http://开头的完整路径，例如：http://www.xxx.com/myorder.html
			sParaTemp.put("anti_phishing_key", anti_phishing_key);
			sParaTemp.put("exter_invoke_ip", exter_invoke_ip);

			// 建立请求
			String sHtmlText = AlipaySubmit.buildRequest(sParaTemp, "get", "确认");
			Map<String, Object> model = new HashMap<String, Object>();
			model.put("htmlcode", sHtmlText);
			
			// 根据支付宝返回结果修改状态   TODO 目前默认是正常返回
			// 1，这个需要在 支付宝放回方法中实现（alipayReturn）
			// 2，并且需要在 Service Implementation 中完成更改状态
			
			// 修改订单状态
			Order o = orderService.findById(order.getId());
			o.setTradeNumber("这里是支付宝返回的交易号");
			o.setStatus(2);
			orderService.update(o, Order.class.getName(), order.getId(), null);
			
			// 修改购物车状态
			ShoppingCart sc = shoppingCartService.findById(id);
			sc.setStatus(2);
			shoppingCartService.update(sc, ShoppingCart.class.getName(), id, null);
			
			// 增加用户的积分
			Integral integral = new Integral();
			integral.setUser(user);
			integral.setSource("在线购书");
			integral.setIntegral(Integer.valueOf(new BigDecimal(shoppingCart.getMoney().toString()).setScale(0, BigDecimal.ROUND_HALF_UP).toString()));
			integralService.insert(integral);
			
			// 修改用户的个人积分
			user.setIntegral(user.getIntegral() + Integer.valueOf(new BigDecimal(shoppingCart.getMoney().toString()).setScale(0, BigDecimal.ROUND_HALF_UP).toString()));
			userService.update(user, user.getId(), null);
		}
		return SUCCESS;
	}

	/**
	 * 支付宝返回
	 * 
	 * @param request
	 * @param response
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings({ "rawtypes", "unused" })
	@RequestMapping("alipayReturn")
	public ModelAndView alipayReturn(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String, Object> model = new HashMap<String, Object>();
		String forwardString = "order/return_url";
		try {
			// 获取支付宝GET过来反馈信息
			Map<String, String> params = new HashMap<String, String>();
			Map requestParams = request.getParameterMap();
			for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
				String name = (String) iter.next();
				String[] values = (String[]) requestParams.get(name);
				String valueStr = "";
				for (int i = 0; i < values.length; i++) {
					valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
				}
				// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
				valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
				params.put(name, valueStr);
			}

			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8"); // 商户订单号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8"); // 支付宝交易号
			String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8"); // 交易状态
			// 计算得出通知验证结果
			boolean verify_result = AlipayNotify.verify(params);
			if (verify_result) {
				// 验证成功
				if (trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")) {
					Map<String, Object> Ordercondition = new HashMap<String, Object>();
					Ordercondition.put("code", out_trade_no);
//					List<Order> listOrder = orderService.getOrderList(Ordercondition, "");
//					if (listOrder != null && listOrder.size() > 0) {
//						// 根绝ID查询订单信息
//						for (Order order : listOrder) {
//							model.put("order", order);
//							// 根据条件查询订单明细
//							Map<String, Object> condition = new HashMap<String, Object>();
//							condition.put("orderId", order.getId());
//							// condition.put("parentId",
//							// form.getParentId()==null?"0":form.getParentId());
//							List<OrderDetail> list = this.orderService.getDetailList(condition, "");
//							model.put("detailList", list);
//						}
//					}
				}
			}
		} catch (Exception e) {
			forwardString = "error";
		}
		return new ModelAndView(forwardString, model);
	}

	/**
	 * 支付宝通知
	 * 
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("alipayNotify")
	public void alipayNotify(HttpServletRequest request, HttpServletResponse response) throws Exception {
		response.setContentType("text/html;charset=utf-8");
		response.setCharacterEncoding("utf-8");
		try {
			// 获取支付宝GET过来反馈信息
			Map<String, String> params = new HashMap<String, String>();
			Map requestParams = request.getParameterMap();
			for (Iterator iter = requestParams.keySet().iterator(); iter.hasNext();) {
				String name = (String) iter.next();
				String[] values = (String[]) requestParams.get(name);
				String valueStr = "";
				for (int i = 0; i < values.length; i++) {
					valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
				}
				// 乱码解决，这段代码在出现乱码时使用。如果mysign和sign不相等也可以使用这段代码转化
				valueStr = new String(valueStr.getBytes("ISO-8859-1"), "utf-8");
				params.put(name, valueStr);
			}
			String out_trade_no = new String(request.getParameter("out_trade_no").getBytes("ISO-8859-1"), "UTF-8");// 商户订单号
			String trade_no = new String(request.getParameter("trade_no").getBytes("ISO-8859-1"), "UTF-8");// 支付宝交易号
			String trade_status = new String(request.getParameter("trade_status").getBytes("ISO-8859-1"), "UTF-8");// 交易状态
			// 计算得出通知验证结果
			boolean verify_result = AlipayNotify.verify(params);
			if (verify_result) {// 验证成功
				if (trade_status.equals("TRADE_FINISHED") || trade_status.equals("TRADE_SUCCESS")) {
					// 更新同步支付宝回执信息
					System.out.println("==========out_trade_no====================" + out_trade_no);
					System.out.println("==========trade_no====================" + trade_no);
					// orderService.alipayReturnNotity(out_trade_no, trade_no); TODO
				}
				response.getWriter().print("success"); // 不能更改success
			} else {
				response.getWriter().print("fail"); // 不能更改fail
			}
		} catch (Exception e) {
			response.getWriter().print("fail"); // 不能更改fail
		}
	}
	
	/**
	 * 删除我的订单
	 * 
	 * @param p
	 * @return
	 * @throws Exception
	 */
	@ResponseBody
	@RequestMapping("myorderd")
	public String myorderd(@RequestParam(value = "id", required = true) String id) throws Exception {
		// 1，必须是登录用户才能进个人信息页面
		User user = (User) session.getAttribute("user");
		if (null == user) {
			return "redirect:/login";
		}
		
		// 2，获取订单对象
		Order sc = orderService.findById(id);
		if (null != sc) {
			orderService.delete(Order.class.getName(), id);
		} else {
			return FAILURE;
		}
		return SUCCESS;
	}
	
	/**
	 * PDF下载
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("download")
	public ResponseEntity<byte[]> downloadFile(@RequestParam(value = "id", required = true) String id) throws Exception {
		byte[] data = null;
		Map<String, Object> condition = new HashMap<String, Object>();
		HttpHeaders header = new HttpHeaders();
		try {
			PProduct product = this.productService.getProduct(id);
			// 取得文件存储路径
			String storePath = new StringBuffer(getUploadPath()).append(File.separator).append(product.getIsbn()).append(File.separator).toString();
			File file = new File(storePath + product.getBookPDFSystemName());
			if (!file.exists()) {
				throw new Exception("文件不存在!");
			} else {
				// 1，加水印存储目录
				File targatefile = new File(storePath + "_" + product.getBookPDFSystemName());
				if(!targatefile.exists()) {
					targatefile.createNewFile();
				}
				
				// 2，加水印
				condition.put("active", 1);
				Watermark watermark = (Watermark) watermarkService.getActive(condition,"");
				float fontSize = (float) watermark.getFont();
				System.out.println(targatefile.toString());
				System.out.println(storePath + product.getBookPDFSystemName());
				PdfHelper.textMark(watermark.getContent(), fontSize, request.getRemoteAddr(), storePath + product.getBookPDFSystemName(), targatefile.toString(), Color.LIGHT_GRAY, "STSong-Light", "UniGB-UCS2-H", true);
				
				String orderid = request.getParameter("orderid");
				Order order = this.orderService.findById(orderid);
				// 3，文件加密
				String secretKey = this.coderService.encodeFile(id,id);
				PdfHelper.CoderPDF(targatefile.toString(), secretKey);
				
				// 4，保存密码
				order.setSecretKey(secretKey);
				this.orderService.update(order, Order.class.getName(), orderid, null);
				
				// 5，下载加过水印的pdf文件
				String name = new String(product.getBookPDFOriginName().getBytes("gbk"), "iso-8859-1");
				header.setContentType(MediaType.parseMediaType("application/x-msdownload"));
				header.set("Content-Disposition", "attachment; filename=" + name);
				data = FileUtils.readFileToByteArray(targatefile);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<byte[]>(data, header, HttpStatus.OK);
	}

}
