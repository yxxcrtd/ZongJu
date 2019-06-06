package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.ShoppingCart;

/**
 * ShoppingCart Service
 * 
 * @author YangXinXin
 */
public interface ShoppingCartService extends BaseService {
	
	void insert(ShoppingCart shoppingCart) throws Exception;

	Integer getUnPayCount(Map<String, Object> map) throws Exception;
	
	List<ShoppingCart> getShoppingCartPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	ShoppingCart findById(String id) throws Exception;
	
	void update(ShoppingCart shoppingCart, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;
	
	List<ShoppingCart> getList(Map<String, Object> condition) throws Exception;

}