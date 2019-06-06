package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.google.common.base.Strings;

import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLsrRelationship;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrLsrRelationshipForm;

@Controller
@RequestMapping(value = "/pages/rightLicense/lsrRelationship")
public class CrLsrRelationshipController extends BaseController {

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrLsrRelationshipForm manager(CrLsrRelationshipForm form) throws Exception {
		List<CrLsrRelationship> list = new ArrayList<CrLsrRelationship>();
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			BDic language = form.getLanguage();
			condition.put("subsidaryRight_srlicenseId", form.getSubsidaryRight().getSrlicenseId());
			if (!Strings.isNullOrEmpty(language.getCode())) {
				condition.put("language_code", "%"+ language.getCode() +"%");
			}
			
			if (!Strings.isNullOrEmpty(language.getName())) {
				condition.put("language_name", "%"+ language.getName() +"%");
			}
			
			form.setiTotalRecords(this.lsrRelationshipService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.lsrRelationshipService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public CrLsrRelationshipForm delete(CrLsrRelationshipForm form) throws Exception {
		try {
			this.lsrRelationshipService.delete(form.getCrLsrList());
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/selectLanguage")
	public ModelAndView selectLanguage(CrLsrRelationshipForm form) throws Exception {
		String forwardString = "rightLicense/subsidaryRight/tabs/select_language_list";
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/selectLanguageSubmit")
	@ResponseBody
	public CrLsrRelationshipForm selectLanguageSubmit(CrLsrRelationshipForm form) throws Exception {
		try {
			this.lsrRelationshipService.selectLanguageSubmit(form.getLanguageList(), form.getSubsidaryRight());
			form.setIsSuccess(SUCCESS);
			form.setMsg("授权成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}