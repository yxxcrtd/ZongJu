package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import cn.digitalpublishing.po.CrRlFormula;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlFormulaForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crFormula")
public class CrRlFormulaController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlFormulaForm form) throws Exception {
		String forwardString = "crFormula/list";
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
	public CrRlFormulaForm manager(CrRlFormulaForm form) throws Exception {
		List<CrRlFormula> list = new ArrayList<CrRlFormula>();
		try {
			CrRlFormula crFormula = form.getCrFormula();
			Map<String, Object> condition = new HashMap<String, Object>();
			if (crFormula.getRlOwnerRoyalty() != null) {
				condition.put("rlOwnerRoyalty_rloRoyaltyId", crFormula.getRlOwnerRoyalty().getRloRoyaltyId());
			} else if (crFormula.getSubsidaryRight() != null) {
				condition.put("subsidaryRight_srlicenseId", crFormula.getSubsidaryRight().getSrlicenseId());
			}
			form.setiTotalRecords(this.crFormulaService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crFormulaService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlFormulaForm form) throws Exception {
		String forwardString = "rightLicense/crRight/crOwner/edit_crOwnerRoyalty_crFormula";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrRlFormula crFormula = form.getCrFormula();
			if (!Strings.isNullOrEmpty(crFormula.getFormulaId())) {
				crFormula = this.crFormulaService.get(crFormula);
			}
			form.setCrFormula(crFormula);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlFormulaForm editSubmit(CrRlFormulaForm form) throws Exception {
		CrRlFormula crFormula = form.getCrFormula();
		try {
			if (Strings.isNullOrEmpty(crFormula.getFormulaId())) {
				crFormula.setFormulaType(form.getType());
				this.crFormulaService.insert(crFormula);
				form.setMsg("新增计算公式成功！");
			} else {
				this.crFormulaService.update(crFormula);
				form.setMsg("修改计算公式成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护计算公式出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlFormulaForm delete(CrRlFormulaForm form) throws Exception {
		CrRlFormula crFormula = form.getCrFormula();
		try {
			this.crFormulaService.delete(crFormula);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除计算公式成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}