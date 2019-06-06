package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.po.CrRlOwnerRoyalty;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlOwnerRoyaltyForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crOwnerRoyalty")
public class CrRlOwnerRoyaltyController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlOwnerRoyaltyForm form) throws Exception {
		String forwardString = "crOwnerRoyalty/list";
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
	public CrRlOwnerRoyaltyForm manager(CrRlOwnerRoyaltyForm form) throws Exception {
		List<CrRlOwnerRoyalty> list = new ArrayList<CrRlOwnerRoyalty>();
		try {
			CrRlOwner crOwner = form.getCrOwner();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("rlOwner_rlownerId", crOwner.getRlownerId());
			
			form.setiTotalRecords(this.crOwnerRoyaltyService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crOwnerRoyaltyService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlOwnerRoyaltyForm form) throws Exception {
		String forwardString = "rightLicense/crRight/crOwner/edit_crOwnerRoyalty";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrRlOwnerRoyalty crOwnerRoyalty = form.getCrOwnerRoyalty();
			if (!Strings.isNullOrEmpty(crOwnerRoyalty.getRloRoyaltyId())) {
				crOwnerRoyalty = this.crOwnerRoyaltyService.get(crOwnerRoyalty);
			}
			form.setCrOwnerRoyalty(crOwnerRoyalty);
			this.crOwnerRoyaltyService.edit(crOwnerRoyalty, form.getDic());
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlOwnerRoyaltyForm editSubmit(CrRlOwnerRoyaltyForm form) throws Exception {
		CrRlOwnerRoyalty crOwnerRoyalty = form.getCrOwnerRoyalty();
		try {
			if (Strings.isNullOrEmpty(crOwnerRoyalty.getRloRoyaltyId())) {
				this.crOwnerRoyaltyService.insert(crOwnerRoyalty);
				form.setMsg("新增人员版税计算规则成功！");
			} else {
				this.crOwnerRoyaltyService.update(crOwnerRoyalty);
				form.setMsg("修改人员版税计算规则成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护人员版税计算规则出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlOwnerRoyaltyForm delete(CrRlOwnerRoyaltyForm form) throws Exception {
		CrRlOwnerRoyalty crOwnerRoyalty = form.getCrOwnerRoyalty();
		try {
			this.crOwnerRoyaltyService.delete(crOwnerRoyalty);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除人员版税计算规则成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}