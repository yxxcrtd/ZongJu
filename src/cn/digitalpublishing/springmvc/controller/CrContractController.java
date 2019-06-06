package cn.digitalpublishing.springmvc.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import com.google.common.base.Strings;
import cn.com.daxtech.framework.Internationalization.Lang;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrContract;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.CrContractForm;

import cn.digitalpublishing.util.DicCache;

@Controller
@RequestMapping("/pages/crContract")
public class CrContractController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrContractForm form)
			throws Exception {
		String forwardString = "contract/crContract/list";
		Map<String, Object> model = new HashMap<String, Object>();
		 
		Map<String, String> dicData = DicCache.getDicData(DicConstants.DIC_CONTRACT_TYPE);
		form.setContractTypeMap(dicData);
		try {
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/managers", headers = "Accept=application/json")
	@ResponseBody
	public CrContractForm managers(CrContractForm form)
			throws Exception {
		List<CrContract> fList = new ArrayList<CrContract>();
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("contractStatus", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			
			if(form.getContractName() != null && !"".equals(form.getContractName()) ){
				condition.put("contractName", form.getContractName());
			}
			if(form.getContractType() != null && !"".equals(form.getContractType())){
				condition.put("contractType", form.getContractType());
			}
			
			if(form.getId() != null && !"".equals(form.getId())){
				condition.put("contractId",  form.getId());
			}
			String productId = request.getParameter("productId");
			if(productId != null && !productId.isEmpty()){
				condition.put("productId", productId);
			}
			
			int i = this.crContractService.getCount(condition);
			form.setiTotalRecords(i);
			form.setiTotalDisplayRecords(form.getiTotalRecords());
			if (form.getiTotalRecords() > 0) {
				fList = this.crContractService
						.getPagingList(condition,
								" ",
								form.getiDisplayLength(),
								form.getiDisplayStart());
			}
		  
			form.setAaData(fList);
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

	@RequestMapping(value = "/form/edits")
	public ModelAndView edits(CrContractForm form)
			throws Exception {
		String forwardString = "contract/crContract/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			Map<String, String> dicData = DicCache.getDicData(DicConstants.DIC_CONTRACT_TYPE);
			form.setContractTypeMap(dicData);
			
			if (!Strings.isNullOrEmpty(form.getId())) {
				form.setCrContract(this.crContractService.getSystemById(request
						.getParameter("id")));
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrContractForm editSubmit(CrContractForm form) throws Exception {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		CrContract crContract = form.getCrContract();
		crContract.setContractStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
		try {
			Date contractDate = form.getContractDate() == null? null: sdf.parse(form.getContractDate()) ; // 合同签订日期
			Date contractExpired = form.getContractExpired() == null ? null : sdf.parse(form.getContractExpired()); // 合同过期日期
		    Date contractLicenseStartOn = form.getContractLicenseStartOn() == null ? null : sdf.parse(form.getContractLicenseStartOn()); // 合同License开始日期
		    Date contractLicenseEndOn = form.getContractLicenseEndOn() == null ? null : sdf.parse(form.getContractLicenseEndOn()); // 合同License到期日期
		    crContract.setContractDate(contractDate);
		    crContract.setContractExpired(contractExpired);
		    crContract.setContractLicenseStartOn(contractLicenseStartOn);
		    crContract.setContractLicenseEndOn(contractLicenseEndOn);
		 
			if (!Strings.isNullOrEmpty(form.getId())) {
				// 修改
				this.crContractService.update(
						form.getCrContract(), form.getId(), null);
				form.setMsg("修改合同成功");
			} else {
				// 新增
				this.crContractService.insert(crContract);
				form.setMsg("创建合同成功");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrContractForm delete(CrContractForm form)
			throws Exception {
		try {
			CrContract c = this.crContractService.getSystemById(form.getId());
			c.setContractStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			this.crContractService.update(c, form.getId(), null);
			form.setMsg(Lang.getLanguage("System.Delete.Success", request
					.getSession().getAttribute("lang").toString()));
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除合同成功");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
}