
package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;

public interface BDicClassService extends BaseService {

	/************************************************** 数据字典BDicClass **************************************************/
	/**
	 * 根据ID更新数据字典分类
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void updateDicClass(BDicClass obj, String id, String[] properties) throws Exception;

	/**
	 * 新增数据字典分类
	 * 
	 * @param obj
	 * @throws Exception
	 */
	public void insertDicClass(BDicClass obj) throws Exception;

	/**
	 * 根据ID删除数据字典分类
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void deleteDicClass(BDicClass obj, String id, String[] properties) throws Exception;

	/**
	 * 根据条件获取数据字典分类分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<BDicClass> getDicClassPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	/**
	 * 根据条件获取数据字典分类个数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getDicClassCount(Map<String, Object> condition) throws Exception;

	/**
	 * 根据ID获取数据字典分类
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public BDicClass getDicClass(String id) throws Exception;

	/**
	 * 根据条件获取数据字典分类列表
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public List<BDicClass> getDicClassList(Map<String, Object> condition) throws Exception;

	/**
	 * 检查数据字典分类code是否唯一
	 * 
	 * @param id
	 * @param code
	 * @return
	 * @throws Exception
	 */
	public boolean checkDicClassCodeUnique(String id, String code) throws Exception;

	/************************************************** 数据字典BDic **************************************************/
	/**
	 * 根据ID更新数据字典
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void updateDic(BDic obj, String id, String[] properties) throws Exception;

	/**
	 * 新增数据字典
	 * 
	 * @param obj
	 * @throws Exception
	 */
	public void insertDic(BDic obj) throws Exception;

	/**
	 * 根据ID删除数据字典
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void deleteDic(BDic obj, String id, String[] properties) throws Exception;

	/**
	 * 根据条件获取数据字典分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<BDic> getDicPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	/**
	 * 根据条件获取数据字典个数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getDicCount(Map<String, Object> condition) throws Exception;

	/**
	 * 根据ID获取数据字典
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public BDic getDic(String id) throws Exception;

	/**
	 * 根据条件获取数据字典列表
	 * 
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public List<BDic> getDicList(Map<String, Object> condition, String sort) throws Exception;

	/**
	 * 检查数据字典code是否唯一
	 * 
	 * @param id
	 * @param classId
	 * @param code
	 * @return
	 * @throws Exception
	 */
	public boolean checkDicCodeUnique(String id, String classId, String code) throws Exception;

	/************************************************** 数据字典缓存 **************************************************/
	/**
	 * 获取cache中的数据字段数据
	 * 
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public List<BDic> getDicCacheData(Map<String, Object> condition, String sort) throws Exception;

	/**
	 * 获取序列值中type code值
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public List<BDic> getDicBySequence(Map<String, Object> condition) throws Exception;

	/**
	 * 验证排序
	 * 
	 * @param id
	 * @param classId
	 * @param order
	 * @return
	 * @throws Exception
	 *             by Ma Guoqing
	 */
	public boolean dicOrderUnique(String id, String classId, Integer order) throws Exception;
	
}
