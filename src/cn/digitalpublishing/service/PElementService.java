package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.form.product.PElementForm;

public interface PElementService {

	Integer getCount(Map<String, Object> condition) throws Exception;
	
	List<PStructure> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	void selectElementSubmit(PElementForm form) throws Exception;
	
	void insert(PStructure element, PProductStructureRelationship structure, PProduct product, String khids) throws Exception;
}