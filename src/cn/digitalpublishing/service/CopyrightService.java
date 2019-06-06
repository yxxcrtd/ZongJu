package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.Copyright;

/**
 * Copyright Service
 * 
 * @author YangXinXin
 */
public interface CopyrightService extends BaseService {
	
	Integer getCount(Map<String, Object> map) throws Exception;

	List<Copyright> getCopyrightPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	Copyright findById(String id) throws Exception;
	
	void insert(Copyright copyright) throws Exception;
	
	void update(Copyright copyright, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;
	
	List<Copyright> getList(Map<String, Object> condition, String sort) throws Exception;

}