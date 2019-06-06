package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Integral;
import cn.digitalpublishing.service.IntegralService;

public class IntegralServiceImpl extends BaseServiceImpl implements IntegralService{
	
	public void insert(Integral obj) throws Exception {

		try {
			this.daoFacade.getIntegralDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增积分纪录失败", e);
		}
	}
	
	public List<Integral> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<Integral> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.IntegralDao").get("getPagingList");
			list = this.daoFacade.getIntegralDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取积分记录信息列表失败", e);
		}
		return list;
	}
	
	public Integer getCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.IntegralDao").get("getCount");
		try {
			num = this.daoFacade.getIntegralDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}

	public Integral getId(String id) throws Exception {

		Integral integral = null;
		try {
			integral = (Integral) this.daoFacade.getIntegralDao().get(Integral.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找信息失败", e);
		}
		return integral;
	}

}
