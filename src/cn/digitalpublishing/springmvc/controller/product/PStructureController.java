package cn.digitalpublishing.springmvc.controller.product;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.apache.commons.io.FilenameUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.controller.BaseController;
import cn.digitalpublishing.springmvc.form.product.PStructureForm;
import cn.digitalpublishing.util.DicCache;
import cn.digitalpublishing.util.TreeNode;
import com.google.common.base.Strings;

/**
 * 产品结构
 * @author dongyajie
 */
@Controller
@RequestMapping("/pages/productStructure")
public class PStructureController extends BaseController {
	
	@RequestMapping(value = "/form/index")
	public ModelAndView index(PStructureForm form) {
		String forwardString = "product/structure/tree";
		Map<String, Object> model = new HashMap<String, Object>();
		try {
			form.setProduct(this.productService.getProduct(form.getProduct().getId()));
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			model.put("form", form);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ModelAndView(forwardString, model);
	}
	
	/**
	 * 获取树形菜单子节点JSON
	 * @param form
	 * @return
	 */
	@RequestMapping(value = "/form/getChildNodes")
	@ResponseBody
	public List<TreeNode> getChildNodes(PStructureForm form) {
		List<TreeNode> list = null;
		try {
			list = this.structureService.getChildTreeNodes(form);
			System.out.println();
		} catch (Exception e) {
			e.printStackTrace();
		}
		return list;
	}
	
	@RequestMapping(value = "/form/editTreeNode")
	@ResponseBody
	public PStructureForm editTreeNode(PStructureForm form) {
		return form;
	}
	
	@RequestMapping(value = "/form/editTreeNodeSubmit")
	@ResponseBody
	public PStructureForm editTreeNodeSubmit(PStructureForm form) {
		try {
			PProductStructureRelationship relation = form.getProductStructureRelation();
			if (Strings.isNullOrEmpty(relation.getId())) {
				form.setAction("add");
				form.setMsg("保存成功。");
			} else {
				form.setAction("update");
				form.setMsg("修改成功。");
			}
			this.structureService.editSubmit(form);
			form.setIsSuccess(SUCCESS);
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg("操作失败。", e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/delete")
	@ResponseBody
	public PStructureForm delete(PStructureForm form) {
		try {
			this.structureService.delete(form);
			form.setIsSuccess(SUCCESS);
			form.setMsg("删除成功");
		} catch (Exception e) {
			form.setMsg("删除失败");
			form.setIsSuccess(FAILURE);
		}
		return form;
	}
	
	/**
	 * 检查编码是否可用
	 * @param form
	 * @return
	 */
	@RequestMapping(value = "/form/checkCodeAvailable")
	@ResponseBody
	public PStructureForm checkCodeAvailable(PStructureForm form) {
		PStructure structure = form.getStructure();
		try {
			boolean result = structureService.checkCodeAvailable(structure);
			if (result) {
				form.setIsSuccess(SUCCESS);
				form.setMsg("通过验证");
			} else {
				form.setIsSuccess(FAILURE);
				form.setMsg("编码已存在");
			}
		} catch (Exception e) {
			form.setIsSuccess(FAILURE);
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
	@RequestMapping(value = "/form/splitXML")
	@ResponseBody
	public String splitXML(PStructureForm form) {
		try {
			structureService.splitXML(form.getProduct().getIsbn());
		} catch (Exception e) {
			e.printStackTrace();
			return e.getMessage();
		}
		return "碎片化成功！";
	}
	
	@RequestMapping(value = "/form/xmlView")
	public ResponseEntity<byte[]> xmlView(PStructureForm form) {
		String extension = FilenameUtils.getExtension(form.getAction());
		HttpHeaders header = new HttpHeaders();
		if(extension.equals("jpg")) {
			header.setContentType(MediaType.IMAGE_JPEG);
		} else if(extension.equals("xml")) {
			header.setContentType(MediaType.APPLICATION_XML);
		}
		byte[] data = null;
		try {
			data = structureService.getChapterBytes(form, getServletContext().getRealPath("/"));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return new ResponseEntity<byte[]>(data, header, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/form/manager", headers = "Accept=application/json")
	@ResponseBody
	public PStructureForm manager(PStructureForm form) {
		PStructure structure = form.getStructure();
		
		Map<String, Object> condition = new HashMap<String, Object>();
		List<PProductStructureRelationship> list = new ArrayList<PProductStructureRelationship>();
		try {
			if (!Strings.isNullOrEmpty(structure.getKeyword())) {
				condition.put("structure_keyword", "%"+ structure.getKeyword() +"%");
			}

			condition.put("parentId", form.getProductStructureRelation().getId());
			condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			
			form.setiTotalDisplayRecords(this.structureService.getCount(condition));
			form.setiTotalRecords(form.getiTotalDisplayRecords());
			
			if (form.getiTotalRecords() > 0) {
				
				list = this.structureService.getPagingList(
						condition, "", form.getiDisplayLength(), form.getiDisplayStart());
			}
			form.setAaData(list);
			
		} catch (Exception e) {
			form.setMsg(exMsg(e));
		}
		return form;
	}
	
}