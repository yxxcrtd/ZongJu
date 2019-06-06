package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.exception.CcsException;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.Section;

/**
 * DataManagerService
 * 
 * @author yul
 */
public interface SectionService extends BaseService {
	
	Integer getCount(Map<String, Object> map) throws Exception;
	
	void update(Section section, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;

	void insert(Section section) throws Exception;
	
	Section findById(String id) throws CcsException;

	List<Section> getList(Map<String, Object> condition, String sort) throws Exception;

	void finishAndSave(PProduct product, Section section) throws Exception;

}