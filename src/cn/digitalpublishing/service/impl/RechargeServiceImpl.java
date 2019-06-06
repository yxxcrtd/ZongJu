package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Recharge;
import cn.digitalpublishing.service.RechargeService;

public class RechargeServiceImpl extends BaseServiceImpl implements RechargeService{
	
	public void insert(Recharge obj) throws Exception {

		try {
			this.daoFacade.getRechargeDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增充值记录失败", e);
		}
	}
	
	public List<Recharge> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<Recharge> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.RechargeDao").get("getPagingList");
			list = this.daoFacade.getRechargeDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取充值记录信息列表失败", e);
		}
		return list;
	}
	
	public Integer getCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.RechargeDao").get("getCount");
		try {
			num = this.daoFacade.getRechargeDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}

	public Recharge getId(String id) throws Exception {

		Recharge recharge = null;
		try {
			recharge = (Recharge) this.daoFacade.getRechargeDao().get(Recharge.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找信息失败", e);
		}
		return recharge;
	}

}
