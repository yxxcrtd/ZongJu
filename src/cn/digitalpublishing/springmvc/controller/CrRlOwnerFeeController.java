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
import cn.digitalpublishing.po.CrRlOwnerFee;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlOwnerFeeForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crOwnerFee")
public class CrRlOwnerFeeController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlOwnerFeeForm form) throws Exception {
		String forwardString = "crOwnerFee/list";
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
	public CrRlOwnerFeeForm manager(CrRlOwnerFeeForm form) throws Exception {
		List<CrRlOwnerFee> list = new ArrayList<CrRlOwnerFee>();
		try {
			CrRlOwner crOwner = form.getCrOwner();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("rlOwner_rlownerId", crOwner.getRlownerId());
			form.setiTotalRecords(this.crOwnerFeeService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crOwnerFeeService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlOwnerFeeForm form) throws Exception {
		String forwardString = "rightLicense/crRight/crOwner/edit_crOwnerFee";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrRlOwnerFee crOwnerFee = form.getCrOwnerFee();
			if (!Strings.isNullOrEmpty(crOwnerFee.getFixfeeId())) {
				crOwnerFee = this.crOwnerFeeService.get(crOwnerFee);
			}
			form.setCrOwnerFee(crOwnerFee);
			this.crOwnerFeeService.edit(crOwnerFee, form.getDic());
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlOwnerFeeForm editSubmit(CrRlOwnerFeeForm form) throws Exception {
		CrRlOwnerFee crOwnerFee = form.getCrOwnerFee();
		try {
			if (Strings.isNullOrEmpty(crOwnerFee.getFixfeeId())) {
				this.crOwnerFeeService.insert(crOwnerFee);
				form.setMsg("新增预付及费用成功！");
			} else {
				this.crOwnerFeeService.update(crOwnerFee);
				form.setMsg("修改预付及费用成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护预付及费用出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlOwnerFeeForm delete(CrRlOwnerFeeForm form) throws Exception {
		CrRlOwnerFee crOwnerFee = form.getCrOwnerFee();
		try {
			this.crOwnerFeeService.delete(crOwnerFee);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除预付及费用成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}