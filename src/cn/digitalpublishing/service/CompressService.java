package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.Compress;

public interface CompressService extends BaseService {
	
	/**
	 * 新增素材包信息
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void insert(Compress obj) throws Exception;
	
	/**
	 * 根据ID更新素材包信息
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void update(Compress obj, String id, String[] properties) throws Exception;
	
	/**
	 * 根据ID删除zip
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void delete(String id) throws Exception;
	
	/**
	 * 获取打包素材分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<Compress> getCompressPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	/**
	 * 获取打包素材信息个数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getCompressCount(Map<String, Object> condition) throws Exception;
	
	/**
	 * 根据ID获取素材库
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Compress getId(String id) throws Exception;
	
}