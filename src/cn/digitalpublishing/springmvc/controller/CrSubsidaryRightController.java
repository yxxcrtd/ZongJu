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
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.springmvc.form.CrSubsidaryRightForm;
import cn.digitalpublishing.util.DicCache;

@Controller
@RequestMapping("/pages/rightLicense/subsidaryRight")
public class CrSubsidaryRightController extends BaseController {

	@RequestMapping(value = "/form/index")
	public ModelAndView index(CrSubsidaryRightForm form) throws Exception {
		String forwardString = "rightLicense/subsidaryRight/list";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			model.put("form", form);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		return new ModelAndView(forwardString, model);
	}

	/**
	 * 获取版税附属权利信息
	 * @param form
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public CrSubsidaryRightForm manager(CrSubsidaryRightForm form) throws Exception {
		CrRight right = form.getRight();
		Map<String, Object> condition = new HashMap<String, Object>();
		List<CrSubsidaryRight> list = new ArrayList<CrSubsidaryRight>();
		try {
			condition.put("right_rlicenseId", right.getRlicenseId());
			form.setiTotalDisplayRecords(this.subsidaryRightService.getCount(condition, ""));
			form.setiTotalRecords(form.getiTotalDisplayRecords());
			if (form.getiTotalRecords() > 0) {
				list = this.subsidaryRightService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(list);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

	/**
	 * 新增/修改 版税附属权利信息
	 * @param form
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	@RequestMapping(value = "/form/edit")
	public ModelAndView edit(CrSubsidaryRightForm form) throws Exception {
		Map<String, Object> model = new HashMap<String, Object>();
		String forwardString = "rightLicense/subsidaryRight/edit";
		String id = request.getParameter("eid");
		try {
            Map<String,Object> condition = new HashMap<String, Object>();
            condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
            condition.put("flowStatus", DicCache.getIdByCode(DicConstants.DIC_FLOW_STATUS, DicConstants.FLOW_STATUS_END));
            List<PProduct> productList = this.productService.getList(condition, "");
			if (id != null && !"".equals(id)) {
				CrSubsidaryRight subsidaryRight = this.subsidaryRightService.getCrSubsidaryRight(id);
				if (subsidaryRight != null) {
					form.setObj(subsidaryRight);
				}
			}
            condition.clear();
            condition.put("licenseTypeStatus", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
            List<CrLicenseType> licenseTypeList = this.crLicenseTypeService.getList(condition);
            form.setLicenseTypeList(licenseTypeList);
            form.setProductList(productList);
            form.setLevelMap(DicCache.getDicData(DicConstants.CR_ATTACHED_RIGHT_LEVEL));
            form.setStatusMap(DicCache.getDicData(DicConstants.CR_ATTACHED_RIGHT_STATUS));
            form.setRoyaltyRuleMap(DicCache.getDicData(DicConstants.CR_ROYALTY_RULE));
            form.setAdjustRuleMap(DicCache.getDicData(DicConstants.CR_ADJUST_RULE));
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	/**
	 * 增加/修改 版税附属权利信息
	 * @param form
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public CrSubsidaryRightForm editSubmit(CrSubsidaryRightForm form) throws Exception {
		CrSubsidaryRight subsidaryRight = form.getObj();
		try {
			if (subsidaryRight != null) {
                if ("".equals(subsidaryRight.getStructure().getId())) {
                    subsidaryRight.setStructure(null);
                }
//                if ("".equals(subsidaryRight.getStructureType().getId())) {
//                    subsidaryRight.setStructureType(null);
//                }
//                if ("".equals(subsidaryRight.getPersonTypeRelationship().getId())) {
//                    subsidaryRight.setPersonTypeRelationship(null);
//                }
                if ("".equals(subsidaryRight.getProduct().getId())) {
                    subsidaryRight.setProduct(null);
                }
				if (subsidaryRight.getSrlicenseId() != null && !subsidaryRight.getSrlicenseId().equals("")) {
					this.subsidaryRightService.update(subsidaryRight, CrSubsidaryRight.class.getName(), subsidaryRight.getSrlicenseId(), null);
					form.setIsSuccess(SUCCESS);
					form.setMsg("修改成功！");
				} else {
					this.subsidaryRightService.insert(subsidaryRight);
					form.setIsSuccess(SUCCESS);
					form.setMsg("添加成功！");
				}
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

	/**
	 * 删除版税附属权利信息
	 * @param form
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public CrSubsidaryRightForm delete(CrSubsidaryRightForm form) throws Exception {
		CrSubsidaryRight subsidaryRight = new CrSubsidaryRight();
		subsidaryRight.setSrlicenseId(form.getId());
		try {
			this.subsidaryRightService.delete(subsidaryRight);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除成功 ！");
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

    /**
     * 查询当前产品关联的所有贡献者和素材类型
     * @param form
     * @return
     * @throws Exception
     * @author Ben
     */
    @RequestMapping(value = "/form/filterAuthorAndStructureType")
    @ResponseBody
    public CrSubsidaryRightForm filterAuthorAndStructureType(CrSubsidaryRightForm form) throws Exception {
        try {
            Map<String,Object> condition = new HashMap<String, Object>();
            condition.put("productId", form.getObj().getProduct().getId());
//            List<PProductPersonRelationship> productPersonRelationshipList = this.productPersonRelationshipService.getList(condition);
//            form.setProductPersonRelationshipList(productPersonRelationshipList);

            condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
//            List<PProductStructureRelationship> productStructureRelationshipDistinctTypeList = this.structureService.getDistinctStructureTypeList(condition, "");
//            form.setProductStructureRelationshipDistinctTypeList(productStructureRelationshipDistinctTypeList);

            form.setIsSuccess(SUCCESS);
        } catch (Exception e) {
            form.setIsSuccess(FAILURE);
            form.setMsg(exMsg(e));
        }
        return form;
    }

//    /**
//     * 选择素材
//     * @param form
//     * @return
//     * @throws Exception
//     * @author Ben
//     */
//    @RequestMapping(value = "/form/selectStructure")
//    public ModelAndView selectStructure(PProductStructureRelationshipForm form) throws Exception {
//        String forwardString = "rightLicense/subsidaryRight/select_list";
//        Map<String, Object> model = new HashMap<String, Object>();
//        try {
//            PStructureType elementType = new PStructureType();
//            elementType.setId(request.getParameter("id"));
//            form.setElementType(elementType);
//            model.put("form", form);
//        } catch (Exception e) {
//            form.setIsSuccess(FAILURE);
//            form.setMsg(exMsg(e));
//            forwardString = "msg";
//        }
//        return new ModelAndView(forwardString, model);
//    }

//    /**
//     * 查看素材列表
//     * @param form
//     * @return
//     * @throws Exception
//     * @author Ben
//     */
//    @RequestMapping(value = "/form/structureManager", headers = "Accept=application/json")
//    @ResponseBody
//    public PProductStructureRelationshipForm structureManager(PProductStructureRelationshipForm form) throws Exception {
//        Map<String, Object> condition = form.getCondition();
//        List<PProductStructureRelationship> list = new ArrayList<PProductStructureRelationship>();
//        try {
//            condition.put("structureType_id", form.getElementType().getId());
//            condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
//            form.setiTotalDisplayRecords(this.structureService.getCount(condition));
//            form.setiTotalRecords(form.getiTotalDisplayRecords());
//            if (form.getiTotalRecords() > 0) {
//                list = this.structureService.getPagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
//            }
//            form.setAaData(list);
//        } catch (Exception e) {
//            form.setIsSuccess(FAILURE);
//            form.setMsg(exMsg(e));
//        }
//        return form;
//    }

}