package cn.digitalpublishing.service.impl;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.service.CrSubsidaryRightService;

public class CrSubsidaryRightServiceImpl extends BaseServiceImpl implements CrSubsidaryRightService {

	@Override
	public List<CrSubsidaryRight> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<CrSubsidaryRight> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CrSubsidaryRightDao").get("getPagingList");
			list = this.daoFacade.getSubsidaryRightDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.getPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition, String sort) throws Exception {
		int num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CrSubsidaryRightDao").get("getCount");
			num = this.daoFacade.getSubsidaryRightDao().getCount(condition, sort, hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.getCount.error", e);
		}
		return num;
	}

	@Override
	public void insert(CrSubsidaryRight obj) throws Exception {
		try {
			this.daoFacade.getSubsidaryRightDao().insert(obj);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.insert.error", e);
		}
	}

	@Override
	public void update(Object obj, String className, Serializable id, String[] properties) throws Exception {
		try {
			this.daoFacade.getSubsidaryRightDao().update(obj, className, id, properties);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.update.error", e);
		}
	}

	@Override
	public List<CrSubsidaryRight> getList(Map<String, Object> condition, String sort) throws Exception {
		List<CrSubsidaryRight> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CrSubsidaryRightDao").get("getList");
			list = this.daoFacade.getSubsidaryRightDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.getList.error", e);
		}
		return list;
	}
	

	@Override
	public CrSubsidaryRight getCrSubsidaryRight(String id) throws Exception {
		CrSubsidaryRight bc = null;
		try {
			bc = (CrSubsidaryRight) this.daoFacade.getSubsidaryRightDao().get(CrSubsidaryRight.class.getName(), id);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.getCrSubsidaryRight.error", e);
		}
		return bc;
	}

	@Override
	public void delete(CrSubsidaryRight obj) throws Exception {
		try {
			this.daoFacade.getSubsidaryRightDao().update(obj, CrSubsidaryRight.class.getName(), obj.getSrlicenseId(), null);
		} catch (Exception e) {
			e.printStackTrace();
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt()	: "CrSubsidaryRight.update.error", e);
		}
	}

}
