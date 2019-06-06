package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.form.product.PStructureForm;
import cn.digitalpublishing.util.TreeNode;

public interface PStructureService {

	void edit(PStructureForm form) throws Exception;

	void editSubmit(PStructureForm form) throws Exception;

	List<TreeNode> getChildTreeNodes(PStructureForm form) throws Exception;

	void save(PStructureForm form) throws Exception;

	void update(PStructureForm form) throws Exception;

	void delete(PStructureForm form) throws Exception;
	
	/**
	 * 检查编码是否可用
	 * @param type
	 * @return
	 * @throws Exception
	 */
	public boolean checkCodeAvailable(PStructure structure)throws Exception;
	
	public PStructure getByCode(String code) throws Exception;
	
	byte[] getChapterBytes(PStructureForm form, String context)throws Exception;
	
	void splitXML(String isbn) throws Exception;
	
	Integer getCount(Map<String, Object> condition) throws Exception;
	
	List<PProductStructureRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
}