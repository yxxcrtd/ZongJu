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
import cn.digitalpublishing.po.CrRlOwnerPayee;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlOwnerPayeeForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crOwnerPayee")
public class CrRlOwnerPayeeController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlOwnerPayeeForm form) throws Exception {
		String forwardString = "crOwnerPayee/list";
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
	public CrRlOwnerPayeeForm manager(CrRlOwnerPayeeForm form) throws Exception {
		List<CrRlOwnerPayee> list = new ArrayList<CrRlOwnerPayee>();
		try {
			CrRlOwner crOwner = form.getCrOwner();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("rlOwner_rlownerId", crOwner.getRlownerId());
			form.setiTotalRecords(this.crOwnerPayeeService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crOwnerPayeeService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlOwnerPayeeForm form) throws Exception {
		String forwardString = "rightLicense/crRight/crOwner/edit_crOwnerPayee";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrRlOwnerPayee crOwnerPayee = form.getCrOwnerPayee();
			if (!Strings.isNullOrEmpty(crOwnerPayee.getFeePayeeId())) {
				crOwnerPayee = this.crOwnerPayeeService.get(crOwnerPayee);
			}
			form.setCrOwnerPayee(crOwnerPayee);
			this.crOwnerPayeeService.edit(crOwnerPayee, form.getDic());
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlOwnerPayeeForm editSubmit(CrRlOwnerPayeeForm form) throws Exception {
		CrRlOwnerPayee crOwnerPayee = form.getCrOwnerPayee();
		try {
			if (Strings.isNullOrEmpty(crOwnerPayee.getFeePayeeId())) {
				this.crOwnerPayeeService.insert(crOwnerPayee);
				form.setMsg("新增收款人成功！");
			} else {
				this.crOwnerPayeeService.update(crOwnerPayee);
				form.setMsg("修改收款人成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护收款人出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlOwnerPayeeForm delete(CrRlOwnerPayeeForm form) throws Exception {
		CrRlOwnerPayee crOwnerPayee = form.getCrOwnerPayee();
		try {
			this.crOwnerPayeeService.delete(crOwnerPayee);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除收款人成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
//	/**
//	 * 选择收款人
//	 * @param form
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/form/selectOwnerPayeePerson")
//	public ModelAndView selectOwnerPayeePerson(CrmPersonTypeRelationshipForm form) throws Exception {
//		String forwardString = "rightLicense/crRight/crOwner/edit_crOwnerPayee_select_person_list";
//		Map<String, Object> model = new HashMap<String, Object>();
//		model.put("form", form);
//		return new ModelAndView(forwardString, model);
//	}
}