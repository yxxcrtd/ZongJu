package cn.digitalpublishing.service;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.PublishTrade;

/**
 * PublishTradeService
 * 
 * @author cuixian
 */
public interface PublishTradeService extends BaseService {
	
	/**
	 * 根据ID更新版权交易信息
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void update(PublishTrade obj, String id, String[] properties) throws Exception;

	/**
	 * 新增版权交易信息
	 * 
	 * @param obj
	 * @throws Exception
	 */
	public void insert(PublishTrade obj) throws Exception;

	/**
	 * 根据ID删除版权交易信息
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void delete(String id) throws Exception;

	/**
	 * 根据条件获取版权交易信息分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<PublishTrade> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	/**
	 * 根据条件获取版权交易信息个数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getCount(Map<String, Object> condition) throws Exception;
	
	/**
	 * 根据ID获取版权交易信息
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public PublishTrade getTradeId(String id) throws Exception;
	
	/**
	 * 上传excel导入版权交易信息
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public void upload(InputStream inputStream, String sourceId) throws Exception;

}
