package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.RecordCompress;

public interface RecordCompressService extends BaseService {
	
	/**
	 * 新增打包记录信息
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void insert(RecordCompress obj) throws Exception;
	
	/**
	 * 根据ID删除记录
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void delete(String id) throws Exception;
	
	/**
	 * 获取打包记录分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<RecordCompress> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	/**
	 * 获取打包记录信息个数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getCount(Map<String, Object> condition) throws Exception;
	
	/**
	 * 根据ID获取打包记录
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public RecordCompress getId(String id) throws Exception;
	
}