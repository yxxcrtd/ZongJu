package cn.digitalpublishing.service;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.CrSubsidaryRight;

public interface CrSubsidaryRightService extends BaseService{

	/**
	 * 版税附属权利信息   分页
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	public List<CrSubsidaryRight> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;

	/**
	 * 版税附属权利信息
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	public List<CrSubsidaryRight> getList(Map<String, Object> condition, String sort) throws Exception;


	/**
	 * 获取 版税附属权利信息总数
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	public Integer getCount(Map<String, Object> condition, String sort) throws Exception;

	/**
	 * 新增版税附属权利信息
	 * @param obj
	 * @throws Exception
	 * @author Ben
	 */
	public void insert(CrSubsidaryRight obj) throws Exception;
	/**
	 * 更新版税附属权利信息
	 * @param obj
	 * @param className
	 * @param id
	 * @param properties
	 * @throws Exception
	 * @author Ben
	 */
	public void update(Object obj, String className, Serializable id, String[] properties) throws Exception;
	
	
	/**
	 * 获取版税附属权利信息
	 * @param id
	 * @return
	 * @throws Exception
	 * @author Ben
	 */
	public CrSubsidaryRight getCrSubsidaryRight(String id) throws Exception;
	
	/**
	 * 删除版税附属权利信息
	 * @param obj
	 * @throws Exception
	 * @author Ben
	 */
	public void delete(CrSubsidaryRight obj) throws Exception;
}
