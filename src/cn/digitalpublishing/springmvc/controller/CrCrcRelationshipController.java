package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.CrCrcRelationship;
import cn.digitalpublishing.springmvc.form.CrCrcRelationshipForm;

@Controller
@RequestMapping(value = "/pages/rightLicense/crcRelationship")
public class CrCrcRelationshipController extends BaseController {

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrCrcRelationshipForm manager(CrCrcRelationshipForm form) throws Exception {
		List<CrCrcRelationship> list = new ArrayList<CrCrcRelationship>();
		try {
//			BCountry country = form.getCountry();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("right_id", form.getRight().getRlicenseId());
//			if (!Strings.isNullOrEmpty(country.getEnName())) {
//				condition.put("country_enName", "%"+ country.getEnName() +"%");
//			}
//			
//			if (!Strings.isNullOrEmpty(country.getCnName())) {
//				condition.put("country_cnName", "%"+ country.getCnName() +"%");
//			}
			
			form.setiTotalRecords(this.crcRelationshipService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crcRelationshipService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public CrCrcRelationshipForm delete(CrCrcRelationshipForm form) throws Exception {
		try {
			this.crcRelationshipService.delete(form.getCrccList());
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除授权地域成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/selectCountry")
	public ModelAndView selectCountry(CrCrcRelationshipForm form) throws Exception {
		String forwardString = "rightLicense/crRight/select_country_list";
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/selectCountrySubmit")
	@ResponseBody
	public CrCrcRelationshipForm selectCountrySubmit(CrCrcRelationshipForm form) throws Exception {
		try {
			this.crcRelationshipService.selectCountrySubmit(form.getCountryList(), form.getRight());
			form.setIsSuccess(SUCCESS);
			form.setMsg("授权成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
}