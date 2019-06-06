package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.CrCsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.springmvc.form.CrCsrRelationshipForm;

@Controller
@RequestMapping(value = "/pages/rightLicense/csrRelationship")
public class CrCsrRelationshipController extends BaseController {

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrCsrRelationshipForm manager(CrCsrRelationshipForm form) throws Exception {
		List<CrCsrRelationship> list = new ArrayList<CrCsrRelationship>();
		try {
			CrSubsidaryRight subsidaryRight = form.getSubsidaryRight();
//			BCountry country = form.getCountry();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("subsidaryRight_srlicenseId", subsidaryRight.getSrlicenseId());
//			if (!Strings.isNullOrEmpty(country.getEnName())) {
//				condition.put("country_enName", "%"+ country.getEnName() +"%");
//			}
//			
//			if (!Strings.isNullOrEmpty(country.getCnName())) {
//				condition.put("country_cnName", "%"+ country.getCnName() +"%");
//			}
			
			form.setiTotalRecords(this.csrRelationshipService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.csrRelationshipService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		form.setAaData(list);
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrCsrRelationshipForm delete(CrCsrRelationshipForm form) throws Exception {
		try {
			this.csrRelationshipService.delete(form.getCrCsrList());
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除附属权利授权地域信息成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/selectCountry")
	public ModelAndView selectCountry(CrCsrRelationshipForm form) throws Exception {
		String forwardString = "rightLicense/subsidaryRight/tabs/select_country_list";
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/selectCountrySubmit")
	@ResponseBody
	public CrCsrRelationshipForm selectCountrySubmit(CrCsrRelationshipForm form) throws Exception {
		try {
			this.csrRelationshipService.selectCountrySubmit(form.getCountryList(), form.getSubsidaryRight());
			form.setIsSuccess(SUCCESS);
			form.setMsg("授权成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}