package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.User;

/**
 * RegisterService
 * 
 * @author cuixian
 */
public interface UserService extends BaseService {
	
	/**
	 * 修改用户
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void update(User obj, String id, String[] properties) throws Exception;

	/**
	 * 新增用户
	 * 
	 * @param obj
	 * @throws Exception
	 */
	public void insert(User obj) throws Exception;

	/**
	 * 根据ID删除用户
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void delete(User obj) throws Exception;
	
	/**
	 * 根据ID审核用户
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void verify(User obj) throws Exception;

	/**
	 * 根据ID重置用户密码
	 * 
	 * @param obj
	 * @param id
	 * @param properties
	 * @throws Exception
	 */
	public void reset(User obj) throws Exception;
	
	/**
	 * 根据条件获取用户分页列表
	 * 
	 * @param condition
	 * @param sort
	 * @param pageCount
	 * @param countStart
	 * @return
	 * @throws Exception
	 */
	public List<User> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	/**
	 * 根据条件获取用户列表总数
	 * 
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public Integer getCount(Map<String, Object> condition) throws Exception;
	
	/**
	 * 根据ID查找相应用户
	 * 
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public User getUserId(String id) throws Exception;

	/**
	 * 根据条件查找用户列表
	 * 
	 * @param condition
	 * @param sort
	 * @return
	 * @throws Exception
	 */
	public List<User> getUserList(Map<String, Object> condition, String sort) throws Exception;

}
