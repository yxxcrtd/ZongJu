package cn.digitalpublishing.springmvc.controller.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.google.common.base.Strings;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.product.PElementForm;
import cn.digitalpublishing.util.DicCache;

/**
 * 产品结构素材
 * @author dongyajie
 */
@Controller
@RequestMapping("/pages/structureElement")
public class PElementController extends BaseController {
	
	@RequestMapping(value = "/form/index")
	public ModelAndView index(PElementForm form) {
		String forwardString = "product/structureElement/list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			
			model.put("form", form);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/selectElement")
	public ModelAndView selectElement(PElementForm form) {
		String forwardString = "product/structureElement/select_list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			model.put("form", form);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/selectElementSubmit")
	@ResponseBody
	public PElementForm selectElementSubmit(PElementForm form) {
		try {
			this.productElementService.selectElementSubmit(form);

			form.setMsg("保存成功");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setMsg("保存失败");
			form.setIsSuccess(FAILURE);
		}
		return form;
	}
	
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public PElementForm manager(PElementForm form) {
		PStructure element = form.getElement();
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PStructure> list = new ArrayList<PStructure>();
		try {
			if (!Strings.isNullOrEmpty(element.getKeyword())) {
				condition.put("keyword", "%"+ element.getKeyword() +"%");
			}
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));

			form.setiTotalDisplayRecords(this.productElementService.getCount(condition));
			form.setiTotalRecords(form.getiTotalDisplayRecords());

			if (form.getiTotalRecords() > 0) {
				list = this.productElementService.getPagingList(condition,
						"", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(list);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/edit")
	public ModelAndView edit(PElementForm form) {
		String forwardString = "product/structureElement/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public PElementForm editSubmit(PElementForm form) {
		try {
			this.productElementService.insert(form.getElement(), form.getStructure(), form.getProduct(), form.getId());
			form.setMsg("创建素材成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("创建素材出错！");
		}
		return form;
	}

}