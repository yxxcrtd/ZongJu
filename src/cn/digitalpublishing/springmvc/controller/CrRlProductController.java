package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrRlProduct;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlProductForm;
import cn.digitalpublishing.springmvc.form.product.PProductForm;
import cn.digitalpublishing.util.DicCache;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crProduct")
public class CrRlProductController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlProductForm form) throws Exception {
		String forwardString = "crProduct/list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrRlProductForm manager(CrRlProductForm form) throws Exception {
		List<CrRlProduct> list = new ArrayList<CrRlProduct>();
		try {
			CrRlProduct crProduct = form.getCrProduct();
			CrRight right = form.getRight();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("right_rlicenseId", right.getRlicenseId());

			// 逾期销售约定
			if (crProduct.getSellOutPeriod() != null) {
				condition.put("sellOutPeriod", crProduct.getSellOutPeriod());
			}

			// 逾期退货约定
			if (crProduct.getReturnMonth() != null) {
				condition.put("returnMonth", crProduct.getReturnMonth());
			}

			// 逾期加印约定
			if (crProduct.getPrintMonth() != null) {
				condition.put("printMonth", crProduct.getPrintMonth());
			}

			form.setiTotalRecords(this.crProductService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crProductService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		form.setAaData(list);
		return form;
	}

	@RequestMapping(value = "/form/edit")
	public ModelAndView edit(CrRlProductForm form) throws Exception {
		String forwardString = "rightLicense/crRight/edit_crProduct";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			CrRlProduct crProduct = form.getCrProduct();
			crProduct.setSellOutPeriod(0);
			crProduct.setReturnMonth(0);
			crProduct.setPrintMonth(9999999);
			
			this.crProductService.edit(crProduct, form.getDic());
			if (!Strings.isNullOrEmpty(crProduct.getRlpId())) {
				crProduct = this.crProductService.get(crProduct);
				form.setCrProduct(crProduct);
			}
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlProductForm editSubmit(CrRlProductForm form) throws Exception {
		CrRlProduct crProduct = form.getCrProduct();
		try {
			if (Strings.isNullOrEmpty(crProduct.getRlpId())) {
				this.crProductService.insert(crProduct);
				form.setMsg("新增签约产品成功！");
			} else {
				this.crProductService.update(crProduct);
				form.setMsg("修改签约产品成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护签约产品出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlProductForm delete(CrRlProductForm form) throws Exception {
		try {
			this.crProductService.delete(form.getId());
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除签约产品成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/selectProduct")
	public ModelAndView index(PProductForm form) throws Exception {
		String forwardString = "rightLicense/crRight/select_product_list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/productManager", headers = "Accept=application/json")
	@ResponseBody
	public PProductForm productManager(PProductForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PProduct> list = new ArrayList<PProduct>();
		try {
			PProduct product = form.getProduct();
            if (!Strings.isNullOrEmpty(product.getIsbn())) {
            	condition.put("isbn", product.getIsbn());
			}
            
            if (!Strings.isNullOrEmpty(product.getTitle())) {
            	condition.put("title", "%"+ product.getTitle() +"%");
            }
            condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
			form.setiTotalRecords(this.productService.getProductCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.productService.getProductPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		form.setAaData(list);
		return form;
	}
}