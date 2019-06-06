package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRlOwnerForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crOwner")
public class CrRlOwnerController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRlOwnerForm form) throws Exception {
		String forwardString = "crOwner/list";
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
	public CrRlOwnerForm manager(CrRlOwnerForm form) throws Exception {
		List<CrRlOwner> list = new ArrayList<CrRlOwner>();
		try {
			CrRlOwner crOwner = form.getCrOwner();
			CrRight right = form.getRight();
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("rlProduct_right_rlicenseId", right.getRlicenseId());
			
			// 最近结算日期
			
			// 作者副本数
			if (crOwner.getOwerCopy() != null) {
				condition.put("owerCopy", crOwner.getOwerCopy());
			}
			
			// 代理商副本数
			if (crOwner.getAgentCopy() != null) {
				condition.put("agentCopy", crOwner.getAgentCopy());
			}
			
			// 作者购买折扣
			if (crOwner.getOwerDiscount() != null) {
				condition.put("owerDiscount", crOwner.getOwerDiscount());
			}
			
			// 付款条款
			if (crOwner.getPaymentTrem() != null) {
				condition.put("paymentTrem", crOwner.getPaymentTrem());
			}
			
			// 所占百分比
			if (crOwner.getOwnerPercent() != null) {
				condition.put("ownerPercent", crOwner.getOwnerPercent());
			}
			
			// 预留期次
			if (crOwner.getRetainPeriod() != null) {
				condition.put("retainPeriod", crOwner.getRetainPeriod());
			}
			
			// 预留到期次
			if (crOwner.getRetainUntil() != null) {
				condition.put("retainUntil", crOwner.getRetainUntil());
			}
			
			// 每次预留百分比
			if (crOwner.getRetainPercent() != null) {
				condition.put("retainPercent", crOwner.getRetainPercent());
			}
			
			// 每次最小预留
			if (crOwner.getMinRetain() != null) {
				condition.put("minRetain", crOwner.getMinRetain());
			}
			
			form.setiTotalRecords(this.crOwnerService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crOwnerService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRlOwnerForm form) throws Exception {
		String forwardString = "rightLicense/crRight/edit_crOwner";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrRlOwner crOwner = form.getCrOwner();
			if (!Strings.isNullOrEmpty(crOwner.getRlownerId())) {
				crOwner = this.crOwnerService.get(crOwner);
			}
			form.setCrOwner(crOwner);
			this.crOwnerService.edit(crOwner, form.getRight(), form.getDic());
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRlOwnerForm editSubmit(CrRlOwnerForm form) throws Exception {
		CrRlOwner crOwner = form.getCrOwner();
		try {
			if (Strings.isNullOrEmpty(crOwner.getRlownerId())) {
				this.crOwnerService.insert(crOwner);
				form.setMsg("新增权利授权者成功！");
			} else {
				this.crOwnerService.update(crOwner);
				form.setMsg("修改权利授权者成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护权利授权者出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRlOwnerForm delete(CrRlOwnerForm form) throws Exception {
		CrRlOwner crOwner = form.getCrOwner();
		try {
			this.crOwnerService.delete(crOwner);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除权利授权者成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
//	/**
//	 * 选择代理公司
//	 * @param form
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/form/selectCorp")
////	public ModelAndView selectCorp(CrmCorpTypeRelationshipForm form) throws Exception {
//	public ModelAndView selectCorp() throws Exception {
//		String forwardString = "rightLicense/crRight/select_corp_list";
//		Map<String, Object> model = new HashMap<String, Object>();
//		Map<String, Object> condition = new HashMap<String, Object>();
//		model.put("corpTypeList", this.crmCorpTypeService.getCorpTypeTreeList(condition, ""));
////		model.put("form", form);
//		return new ModelAndView(forwardString, model);
//	}
	
//	/**
//	 * 选择联系人
//	 * 
//	 * @param form
//	 * @return
//	 * @throws Exception
//	 */
//	@RequestMapping(value = "/form/selectPerson")
//	public ModelAndView selectPerson(CrmPersonTypeRelationshipForm form) throws Exception {
//		String forwardString = "rightLicense/crRight/select_person_list";
//		Map<String, Object> model = new HashMap<String, Object>();
//		Map<String, Object> condition = new HashMap<String, Object>();
//		model.put("personTypeList", this.crmPersonTypeService.getList(condition, ""));
//		model.put("form", form);
//		return new ModelAndView(forwardString, model);
//	}
}