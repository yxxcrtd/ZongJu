package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Copyright;
import cn.digitalpublishing.service.CopyrightService;

public class CopyrightServiceImpl extends BaseServiceImpl implements CopyrightService {

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#getCount(java.util.Map)
	 */
	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CopyrightDao").get("getCount");
		try {
			num = this.daoFacade.getCopyrightDao().getCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#getCopyrightPagingList(java.util.Map, java.lang.String, java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public List<Copyright> getCopyrightPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<Copyright> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CopyrightDao").get("getPagingList");
		try {
			list = this.daoFacade.getCopyrightDao().getCopyrightPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取版权信息列表失败！", e);
		}
		return list;
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#findById(java.lang.String)
	 */
	@Override
	public Copyright findById(String id) throws Exception {
		Copyright copyright = null;
		try {
			copyright = (Copyright) this.daoFacade.getCopyrightDao().get(Copyright.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "根据ID获取版权信息失败！", e);
		}
		return copyright;
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#insert(cn.digitalpublishing.po.Copyright)
	 */
	@Override
	public void insert(Copyright copyright) throws Exception {
		try {
			this.daoFacade.getCopyrightDao().insert(copyright);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#update(cn.digitalpublishing.po.Copyright, java.lang.String, java.lang.String, java.lang.String[])
	 */
	@Override
	public void update(Copyright copyright, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getCopyrightDao().update(copyright, className, id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.CopyrightService#delete(java.lang.String, java.lang.String)
	 */
	@Override
	public void delete(String className, String id) throws Exception {
		try {
			this.daoFacade.getCopyrightDao().delete(className, id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除信息失败！", e);
		}
	}
	
	public List<Copyright> getList(Map<String, Object> condition, String sort) throws Exception {
		List<Copyright> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CopyrightDao").get("getList");
		try {
			list = this.daoFacade.copyrightDao.getCopyrightList(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}

}