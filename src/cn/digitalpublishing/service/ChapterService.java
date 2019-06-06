package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.exception.CcsException;
import cn.digitalpublishing.po.Chapter;

/**
 * DataManagerService
 * 
 * @author yul
 */
public interface ChapterService extends BaseService {
	
	Integer getCount(Map<String, Object> map) throws Exception;

	List<Chapter> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	List<Chapter> getList(Map<String, Object> condition, String sort) throws Exception;
	
	void update(Chapter article, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;

	void insert(Chapter article) throws Exception;

	Chapter findById(String id) throws CcsException;

}