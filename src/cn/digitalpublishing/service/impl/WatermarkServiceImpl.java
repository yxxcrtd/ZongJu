package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Watermark;
import cn.digitalpublishing.service.WatermarkService;

public class WatermarkServiceImpl extends BaseServiceImpl implements WatermarkService {

	public void update(Watermark obj, String id, String[] properties) throws Exception {

		try {
			this.daoFacade.getWatermarkDao().update(obj, Watermark.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "修改用户信息失败", e);
		}

	}

	public void insert(Watermark obj) throws Exception {

		try {
			this.daoFacade.getWatermarkDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增用户失败", e);
		}
	}

	public void delete(String id) throws Exception {

		try {
			this.daoFacade.getWatermarkDao().delete(Watermark.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除用户信息失败", e);
		}
	}
	
	public Watermark getId(String id) throws Exception {

		Watermark Watermark = null;
		try {
			Watermark = (Watermark) this.daoFacade.getWatermarkDao().get(Watermark.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找信息失败", e);
		}
		return Watermark;
	}
	
	/* 
	 * 
	 */
	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.WatermarkDao").get("getCount");
		try {
			num = this.daoFacade.getWatermarkDao().getCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}

	@Override
	public List<Watermark> getPagingList(Map<String,Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<Watermark> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.WatermarkDao").get("getPagingList");
		try {
			list = this.daoFacade.getWatermarkDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "失败！", e);
		}
		return list;
	}

	@Override
	public List<Watermark> getByContent(Map<String, Object> condition, String sort) throws Exception {
		List<Watermark> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.WatermarkDao").get("getByContent");
		try {
			list = this.daoFacade.getWatermarkDao().getByContent(condition, sort, hqlBean);
													
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取信息列表失败！", e);
		}
		return list;
	}
	
	
	@Override
	public List<Watermark> getByActive(Map<String, Object> condition, String sort) throws Exception {
		List<Watermark> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.WatermarkDao").get("getByActive");
		try {
			list = this.daoFacade.getWatermarkDao().getByActive(condition, sort, hqlBean);
													
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取信息列表失败！", e);
		}
		return list;
	}

	@Override
	public Watermark getActive(Map<String, Object> condition, String sort)throws Exception {
		Watermark watermark = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.WatermarkDao").get("getActive");
		try {
			watermark = this.daoFacade.getWatermarkDao().getActive(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取信息列表失败！", e);
		}
		return watermark;
	}

	
}