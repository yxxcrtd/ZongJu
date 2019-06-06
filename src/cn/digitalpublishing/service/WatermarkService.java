package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.Watermark;

/**
 * WatermarkService
 * 
 * @author hejiaojiao
 */
public interface WatermarkService extends BaseService {

	void update(Watermark obj, String id, String[] properties) throws Exception;

	void insert(Watermark obj) throws Exception;

	void delete(String id) throws Exception;
	
	List<Watermark> getPagingList(Map<String, Object> condition,
			String sort, Integer pageCount, Integer countStart)
			throws Exception;

	Integer getCount(Map<String, Object> condition) throws Exception;
	
	 Watermark getId(String id) throws Exception;
	
	 List<Watermark> getByContent(Map<String, Object> condition, String sort) throws Exception;
	 List<Watermark> getByActive(Map<String, Object> condition, String sort) throws Exception;
	 Watermark getActive(Map<String, Object> condition, String sort) throws Exception;

}