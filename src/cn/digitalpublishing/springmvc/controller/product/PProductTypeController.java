package cn.digitalpublishing.springmvc.controller.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.product.PProductTypeForm;
import cn.digitalpublishing.util.TreeNode;

import com.google.common.base.Strings;

@Controller
@RequestMapping("/pages/productType")
public class PProductTypeController extends BaseController {

	public Logger log = Logger.getLogger(this.getClass());

	/**
	 * 获取产品类型信息
	 * 
	 * @param form
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/form/getPropTypeTree")
	@ResponseBody
	public List<TreeNode> getPropTypeTree(PProductTypeForm form) throws Exception {
		String fatherId = request.getParameter("id");

		Map<String, Object> condition = new HashMap<String, Object>();
		List<TreeNode> nodes = new ArrayList<TreeNode>();
		List<PProductType> propTypeList = null;
		condition.put("parentId", fatherId);
		propTypeList = this.productTypeService.getProductTypeTreeList(condition, " order by a.treeCode ");
		if (propTypeList != null && !propTypeList.isEmpty()) {
			TreeNode node = null;
			for (PProductType type : propTypeList) {
				condition.put("parentId", type.getId());
				int count = this.productTypeService.getProductTypeCount(condition);
				if (count != 0) {
					node = new TreeNode(type.getId(), type.getName(), true, null, null);
				} else {
					node = new TreeNode(type.getId(), type.getName(), false, null, null);
				}
				nodes.add(node);
			}
		}
		return nodes;
	}

	@RequestMapping(value = "/form/index")
	public ModelAndView index(PProductTypeForm form) throws Exception {
		String forwardString = "product/productType/tree";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			model.put("form", form);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			forwardString = "msg";
		}
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public PProductTypeForm manage(PProductTypeForm form) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		try {
			if (!Strings.isNullOrEmpty(form.getCode())) {
				condition.put("code", "%" + form.getCode() + "%");
			}
			if (!Strings.isNullOrEmpty(form.getName())) {
				condition.put("name", "%" + form.getName() + "%");
			}
			form.setiTotalDisplayRecords(this.productTypeService.getProductTypeCount(condition));
			form.setiTotalRecords(form.getiTotalDisplayRecords());
			List<PProductType> productTypeList = new ArrayList<PProductType>();
			if (form.getiTotalRecords() > 0) {
				productTypeList = this.productTypeService.getProductTypePagingList(condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}

			form.setAaData(productTypeList);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return form;
	}

	@RequestMapping(value = "/form/edit")
	public ModelAndView edit(PProductTypeForm form) throws Exception {
		String forwardString = "product/productType/edit";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			// 修改
			String id = request.getParameter("id");
			if (!Strings.isNullOrEmpty(id)) {
				form.setId(id);
				PProductType productType = this.productTypeService.getProductType(id);
				form.setProductType(productType);
			}
		} catch (Exception e) {
			form.setMsg("获取数据出错！");
		}
		model.put("form", form);
		return new ModelAndView(forwardString, model);
	}

	@RequestMapping(value = "/form/editSubmit")
	@ResponseBody
	public PProductTypeForm editSubmit(PProductTypeForm form) throws Exception {
		try {
			PProductType pt = form.getProductType();
			// 修改
			if (!Strings.isNullOrEmpty(form.getId())) {
				TreeNode node = new TreeNode(null, pt.getName(), false, false, null);
				form.setNode(node);
				this.productTypeService.updateProductType(pt, form.getId(), null);
				form.setMsg("修改产品类型信息成功！");
			} else {
				if (form.getFatherId() != null && !"root".equals(form.getFatherId())) {
					PProductType parentPType = new PProductType();
					parentPType.setId(form.getFatherId());
					pt.setParentProductType(parentPType);
				} else {
					pt.setParentProductType(null);
				}
				this.productTypeService.insertProductType(pt);
				TreeNode node = new TreeNode(pt.getId(), pt.getName(), false, false, null);
				form.setNode(node);
				form.setMsg("新增产品类型信息成功!");
			}
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setMsg("新增产品类型信息出错！");
			form.setIsSuccess(FAILURE);
		}
		return form;
	}

	@ResponseBody
	@RequestMapping(value = "/form/delete")
	public PProductTypeForm delete(PProductTypeForm form) throws Exception {
		try {
			this.productTypeService.deletecProductType(form.getId());
			form.setMsg("分类删除成功！");
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setMsg(exMsg(e));
			form.setIsSuccess(FAILURE);
		}
		return form;
	}

	@RequestMapping(value = "/form/codeUnique")
	@ResponseBody
	public PProductTypeForm codeUnique(PProductTypeForm form) throws Exception {
		try {
			String id = request.getParameter("id");
			if (this.productTypeService.codeUnique(id, form.getCode())) {
				form.setIsSuccess(SUCCESS);
				form.setMsg("通过验证");
			} else {
				form.setIsSuccess(FAILURE);
				form.setMsg("已存在相同编码值");
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}

}