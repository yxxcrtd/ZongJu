package cn.digitalpublishing.springmvc.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrLicenseType;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrLicenseTypeForm;
import cn.digitalpublishing.util.DicCache;

import com.google.common.base.Strings;

@Controller
@RequestMapping(value = "/pages/rightLicense/crLicenseType")
public class CrLicenseTypeController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrLicenseTypeForm form) throws Exception {
		String forwardString = "rightLicense/crLicenseType/list";
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
	public CrLicenseTypeForm manager(CrLicenseTypeForm form) throws Exception {
		List<CrLicenseType> list = new ArrayList<CrLicenseType>();
		try {
			CrLicenseType crLicenseType = form.getCrLicenseType();
			Map<String, Object> condition = new HashMap<String, Object>();
			String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
			condition.put("licenseTypeStatus", statusAvailable);
			
			if (!Strings.isNullOrEmpty(crLicenseType.getLicenseTypeName())) {
				condition.put("licenseTypeName", "%" + crLicenseType.getLicenseTypeName() + "%");
			}
			
			if (!Strings.isNullOrEmpty(crLicenseType.getLicenseTypeCode())) {
				condition.put("licenseTypeCode", "%" + crLicenseType.getLicenseTypeCode() + "%");
			}
			
			form.setiTotalRecords(this.crLicenseTypeService.getCount(condition));
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.crLicenseTypeService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
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
	public ModelAndView edit(CrLicenseTypeForm form) throws Exception {
		String forwardString = "rightLicense/crLicenseType/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		try {			
			CrLicenseType crLicenseType = form.getCrLicenseType();
			if (!Strings.isNullOrEmpty(crLicenseType.getLicenseTypeId())) {
				crLicenseType = this.crLicenseTypeService.get(crLicenseType);
			}
			form.setCrLicenseType(crLicenseType);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrLicenseTypeForm editSubmit(CrLicenseTypeForm form) throws Exception {
		CrLicenseType crLicenseType = form.getCrLicenseType();
		try {
			if (Strings.isNullOrEmpty(crLicenseType.getLicenseTypeId())) {
				this.crLicenseTypeService.insert(crLicenseType);
				form.setMsg("新增授权类型成功！");
			} else {
				this.crLicenseTypeService.update(crLicenseType);
				form.setMsg("修改授权类型成功！");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg("维护授权类型出错！");
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrLicenseTypeForm delete(CrLicenseTypeForm form) throws Exception {
		CrLicenseType crLicenseType = form.getCrLicenseType();
		try {
			this.crLicenseTypeService.delete(crLicenseType);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除授权类型成功！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}