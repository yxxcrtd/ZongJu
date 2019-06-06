package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import cn.digitalpublishing.po.CrRlRoyaltyRule;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlRoyaltyRuleForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crRoyaltyRule")
public class CrRlRoyaltyRuleController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlRoyaltyRuleForm form) throws Exception {
		String forwardString = "rightLicense/crRoyaltyRule/list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			this.crRoyaltyRuleService.edit(null, form.getDic());
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrRlRoyaltyRuleForm manager(CrRlRoyaltyRuleForm form) throws Exception {
		List<CrRlRoyaltyRule> list = new ArrayList<CrRlRoyaltyRule>();
		try {
			CrRlRoyaltyRule crRoyaltyRule = form.getCrRoyaltyRule();
			Map<String, Object> condition = new HashMap<String, Object>();
			
			if (!Strings.isNullOrEmpty(crRoyaltyRule.getRoyaltyType())) {
				condition.put("royaltyType", crRoyaltyRule.getRoyaltyType());
			}
			
			if (!Strings.isNullOrEmpty(crRoyaltyRule.getMarket())) {
				condition.put("market", crRoyaltyRule.getMarket());
			}
			
			if (!Strings.isNullOrEmpty(crRoyaltyRule.getPriceType())) {
				condition.put("priceType", crRoyaltyRule.getPriceType());
			}
			
			form.setiTotalRecords(this.crRoyaltyRuleService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crRoyaltyRuleService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlRoyaltyRuleForm form) throws Exception {
		String forwardString = "rightLicense/crRoyaltyRule/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			CrRlRoyaltyRule crRoyaltyRule = form.getCrRoyaltyRule();
			this.crRoyaltyRuleService.edit(crRoyaltyRule, form.getDic());
			if (!Strings.isNullOrEmpty(crRoyaltyRule.getRoyaltyRuleId())) {
				crRoyaltyRule = this.crRoyaltyRuleService.get(crRoyaltyRule);
			}
			form.setCrRoyaltyRule(crRoyaltyRule);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlRoyaltyRuleForm editSubmit(CrRlRoyaltyRuleForm form) throws Exception {
		CrRlRoyaltyRule crRoyaltyRule = form.getCrRoyaltyRule();
		try {
			if (Strings.isNullOrEmpty(crRoyaltyRule.getRoyaltyRuleId())) {
				this.crRoyaltyRuleService.insert(crRoyaltyRule);
				form.setMsg("新增版税规则库成功！");
			} else {
				this.crRoyaltyRuleService.update(crRoyaltyRule);
				form.setMsg("修改版税规则库成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护版税规则库出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlRoyaltyRuleForm delete(CrRlRoyaltyRuleForm form) throws Exception {
		CrRlRoyaltyRule crRoyaltyRule = form.getCrRoyaltyRule();
		try {
			this.crRoyaltyRuleService.delete(crRoyaltyRule);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除版税规则库成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}