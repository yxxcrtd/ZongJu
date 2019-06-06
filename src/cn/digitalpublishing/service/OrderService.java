package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.Order;

/**
 * Order Service
 * 
 * @author YangXinXin
 */
public interface OrderService extends BaseService {
	
	void insert(Order order) throws Exception;

	Integer getCount(Map<String, Object> map) throws Exception;
	
	List<Order> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	Order findById(String id) throws Exception;
	
	void update(Order order, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;
	
	List<Order> getList(Map<String, Object> condition, String sort) throws Exception;

}