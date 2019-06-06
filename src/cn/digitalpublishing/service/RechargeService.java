package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.Recharge;

/**
 * RechargeService
 * 
 * @author CuiXian
 */
public interface RechargeService extends BaseService {
	
	/**
	 **新增充值记录信息
	 * 
	 * @param obj
	 * @throws Exception
	 */
	public void insert(Recharge obj) throws Exception;

	/**
	 * 根据条件获取充值记录信息分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<Recharge> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	/**
	 * 根据条件获取充值记录信息列表总数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getCount(Map<String, Object> condition) throws Exception;
	
	/**
	 * 根据ID查找用户相应的充值记录信息
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public Recharge getId(String id) throws Exception;

}
