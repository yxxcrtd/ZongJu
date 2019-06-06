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
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrRightForm;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crRight")
public class CrRightController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrRightForm form) throws Exception {
		String forwardString = "rightLicense/crRight/list";
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
	public CrRightForm manager(CrRightForm form) throws Exception {
		List<CrRight> list = new ArrayList<CrRight>();
		try {
			CrRight crRight = form.getCrRight();
			Map<String, Object> condition = new HashMap<String, Object>();

			// 权利合同名称
			if (!Strings.isNullOrEmpty(crRight.getRlicenseName())) {
				condition.put("rlicenseName", "%" + crRight.getRlicenseName() + "%");
			}
			
			// 授权开始时间
			if (!Strings.isNullOrEmpty(crRight.getStartOnStr())) {
				condition.put("startOn", crRight.getRlicenseStarton());
			}
			
			// 授权结束时间
			if (!Strings.isNullOrEmpty(crRight.getStopOnStr())) {
				condition.put("endOn", crRight.getRlicenseEndon());
			}
			
			form.setiTotalRecords(this.crRightService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crRightService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrRightForm form) throws Exception {
		String forwardString = "rightLicense/crRight/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			CrRight crRight = form.getCrRight();
			this.crRightService.edit(crRight, form.getDic());
			if (!Strings.isNullOrEmpty(crRight.getRlicenseId())) {
				crRight = this.crRightService.get(crRight);
			}
			form.setCrRight(crRight);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrRightForm editSubmit(CrRightForm form) throws Exception {
		CrRight crRight = form.getCrRight();
		try {
			if (Strings.isNullOrEmpty(crRight.getContract().getContractId())) {
				crRight.setContract(null);
			}
			
			if (Strings.isNullOrEmpty(crRight.getRlicenseId())) {
				this.crRightService.insert(crRight);
				form.setMsg("新增权利授权成功！");
			} else {
				this.crRightService.update(crRight);
				form.setMsg("修改权利授权成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护权利授权出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrRightForm delete(CrRightForm form) throws Exception {
		CrRight crRight = form.getCrRight();
		try {
			this.crRightService.delete(crRight);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除权利授权成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}