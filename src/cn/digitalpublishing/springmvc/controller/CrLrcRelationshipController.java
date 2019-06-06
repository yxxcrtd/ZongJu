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
import cn.digitalpublishing.po.CrLrcRelationship;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrLrcRelationshipForm;

@Controller
@RequestMapping(value = "/pages/rightLicense/lrcRelationship")
public class CrLrcRelationshipController extends BaseController {

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrLrcRelationshipForm manager(CrLrcRelationshipForm form) throws Exception {
		List<CrLrcRelationship> list = new ArrayList<CrLrcRelationship>();
		try {
			BDic language = form.getLanguage();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("right_id", form.getRight().getRlicenseId());
			if (!Strings.isNullOrEmpty(language.getCode())) {
				condition.put("language_code", "%"+ language.getCode() +"%");
			}
			
			if (!Strings.isNullOrEmpty(language.getName())) {
				condition.put("language_name", "%"+ language.getName() +"%");
			}
			
			form.setiTotalRecords(this.lrcRelationshipService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.lrcRelationshipService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public CrLrcRelationshipForm delete(CrLrcRelationshipForm form) throws Exception {
		try {
			this.lrcRelationshipService.delete(form.getCrLrcList());
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除授权语种成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/selectLanguage")
	public ModelAndView selectLanguage(CrLrcRelationshipForm form) throws Exception {
		String forwardString = "rightLicense/crRight/select_language_list";
		Map<String, Object> model = new HashMap<String, Object>();
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}
	
	@RequestMapping(value = "/form/selectLanguageSubmit")
	@ResponseBody
	public CrLrcRelationshipForm selectLanguageSubmit(CrLrcRelationshipForm form) throws Exception {
		try {
			this.lrcRelationshipService.selectLanguageSubmit(form.getLanguageList(), form.getRight());
			form.setIsSuccess(SUCCESS);
			form.setMsg("授权成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}