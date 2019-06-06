package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Order;
import cn.digitalpublishing.service.OrderService;

/**
 * Order Service Implement
 * 
 * @author YangXinXin
 */
public class OrderServiceImpl extends BaseServiceImpl implements OrderService {

	@Override
	public void insert(Order order) throws Exception {
		try {
			this.daoFacade.getOrderDao().insert(order);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.OrderDao").get("getCount");
		try {
			num = this.daoFacade.getOrderDao().getCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取当前用户的订单数失败！", e);
		}
		return num;
	}
	
	@Override
	public List<Order> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<Order> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.OrderDao").get("getPagingList");
		try {
			list = this.daoFacade.getOrderDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取当前用户的订单列表失败！", e);
		}
		return list;
	}

	@Override
	public Order findById(String id) throws Exception {
		Order order = null;
		try {
			order = (Order) this.daoFacade.getOrderDao().get(Order.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "根据ID获取对象信息失败！", e);
		}
		return order;
	}

	@Override
	public void update(Order order, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getOrderDao().update(order, className, id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	@Override
	public void delete(String className, String id) throws Exception {
		try {
			this.daoFacade.getOrderDao().delete(className, id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除信息失败！", e);
		}
	}
	
	public List<Order> getList(Map<String, Object> condition, String sort) throws Exception {
		List<Order> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.OrderDao").get("getList");
		try {
			list = this.daoFacade.getOrderDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}

}