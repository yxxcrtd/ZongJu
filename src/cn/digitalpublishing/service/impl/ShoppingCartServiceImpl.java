package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.ShoppingCart;
import cn.digitalpublishing.service.ShoppingCartService;

/**
 * ShoppingCart Service Implement
 * 
 * @author YangXinXin
 */
public class ShoppingCartServiceImpl extends BaseServiceImpl implements ShoppingCartService {

	@Override
	public void insert(ShoppingCart shoppingCart) throws Exception {
		try {
			this.daoFacade.getShoppingCartDao().insert(shoppingCart);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	@Override
	public Integer getUnPayCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ShoppingCartDao").get("getUnPayCount");
		try {
			num = this.daoFacade.getShoppingCartDao().getUnPayCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取当前用户未支付的商品数失败！", e);
		}
		return num;
	}
	
	@Override
	public List<ShoppingCart> getShoppingCartPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<ShoppingCart> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ShoppingCartDao").get("getPagingList");
		try {
			list = this.daoFacade.getShoppingCartDao().getShoppingCartPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取当前用户未支付的商品列表失败！", e);
		}
		return list;
	}

	@Override
	public ShoppingCart findById(String id) throws Exception {
		ShoppingCart shoppingCart = null;
		try {
			shoppingCart = (ShoppingCart) this.daoFacade.getShoppingCartDao().get(ShoppingCart.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "根据ID获取版权信息失败！", e);
		}
		return shoppingCart;
	}

	@Override
	public void update(ShoppingCart shoppingCart, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getShoppingCartDao().update(shoppingCart, className, id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	@Override
	public void delete(String className, String id) throws Exception {
		try {
			this.daoFacade.getShoppingCartDao().delete(className, id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除信息失败！", e);
		}
	}
	
	public List<ShoppingCart> getList(Map<String, Object> condition) throws Exception {
		List<ShoppingCart> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ShoppingCartDao").get("getList");
		try {
			list = this.daoFacade.getShoppingCartDao().getShoppingCartList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}

}