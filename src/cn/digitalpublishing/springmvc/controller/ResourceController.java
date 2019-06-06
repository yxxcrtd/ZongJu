package cn.digitalpublishing.springmvc.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.PDF2SWF;

/**
 * 资源
 * 
 * @author YangXinXin
 */
@Controller
@RequestMapping("resource")
public class ResourceController extends BaseController {
	
	@RequestMapping("view")
	public ModelAndView view(PProductForm form, @RequestParam(value = "id", required = true) String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		PProduct product = null;
		
		// 根据ID查找对象
		if (!"".equals(id) && null != id) {
			product = productService.getProduct(id);
			if (null != product) {
				map.put("resource", product);
				
				String fileName = product.getBookPDFSystemName();
				fileName = fileName.substring(0, fileName.lastIndexOf("."));
				String publicPath = new StringBuffer(getUploadPath()).append(File.separator).append(product.getIsbn()).append(File.separator).toString();
				File _sourcePath = new File(new StringBuffer(publicPath).append("s").append(fileName).append(".swf").toString());
				File sourcePath = new File(new StringBuffer(publicPath).append(fileName).append(".swf").toString());
				
				// 先检查swf试读文件是否存在，如果不存在则需要将pdf文件转换成swf试读文件
				if (!_sourcePath.exists()) {
					int returnValue = PDF2SWF.convertPDF2SWF(getSwftoolsPath(), publicPath + product.getBookPDFSystemName(), publicPath, "s" + fileName, getXpdfPath(), getConfigByPage());
					System.out.println("PDF2SWF转换试读文件后返回的值：" + returnValue);
				}
				
				// 先检查swf全文文件是否存在，如果不存在则需要将pdf文件转换成swf文件
				if (!sourcePath.exists()) {
					int returnValue = PDF2SWF.convertPDF2SWF(getSwftoolsPath(), publicPath + product.getBookPDFSystemName(), publicPath, fileName, getXpdfPath(), "");
					System.out.println("PDF2SWF转换全文文件后返回的值：" + returnValue);
				}
				map.put("fileName", fileName);
			}
		}
		return new ModelAndView("website/ResourceView.ftl", map);
	}
	
	@RequestMapping("detail")
	public ModelAndView detail(PProductForm form, @RequestParam(value = "id", required = true) String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		PProduct product = null;
		
		// 根据ID查找对象
		if (!"".equals(id) && null != id) {
			product = productService.getProduct(id);
			if (null != product) {
				map.put("r", product);
			}
		}
		
		// 如果有用户信息就显示购物车中的商品数量
		User user = (User) session.getAttribute("user");
		int unPayCount = 0;
		if (null != user) {
			map.put("userId", user.getId());
			map.put("status", 0);
			unPayCount = shoppingCartService.getUnPayCount(map);
		}
		map.put("unPayCount", unPayCount);
		return new ModelAndView("website/ResourceDetail.ftl", map);
	}
	
	@RequestMapping("buy")
	public ModelAndView buy(PProductForm form, @RequestParam(value = "id", required = true) String id) throws Exception {
		Map<String, Object> map = new HashMap<String, Object>();
		
		return new ModelAndView("website/ResourceBuy.ftl", map);
	}

}
