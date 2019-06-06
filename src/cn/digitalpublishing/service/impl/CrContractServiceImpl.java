package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.CrContract;
import cn.digitalpublishing.service.CrContractService;

public class CrContractServiceImpl extends BaseServiceImpl implements CrContractService {

	@Override
	public List<CrContract> getPagingList(
			Map<String, Object> condition, String sort, Integer pageCount,
			Integer countStart) throws Exception {
		List<CrContract> list = null;
		try {
			Map<String, Map<String, HqlBean>> a = HqlBeanCacheUtil
					.gethqlBeanCache();
			Map<String, HqlBean> b = a
					.get("cn.digitalpublishing.dao.CrContractDao");
			HqlBean hqlBean = b.get("getPagingList");
			list = daoFacade.getCrcontractDao().getPagingList(condition,
					sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Paging.Error", e);
		}
		return list;
	}

	@Override
	public List<CrContract> getList(
			Map<String, Object> condition, String sort) throws Exception {
		List<CrContract> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrContractDao")
					.get("getList");
			list = daoFacade.getCrcontractDao().getList(condition, sort,
					hqlBean);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.List.Error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition)
			throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CrContractDao").get("getCount");
			num = daoFacade.getCrcontractDao().getCount(condition,
					hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			/*throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Count.Error", e);*/
		}
		return num;
	}

	@Override
	public CrContract getSystemById(String id) throws Exception {
		CrContract user = null;
		try {
			user = (CrContract) this.daoFacade.getCrcontractDao()
					.get(CrContract.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Get.Error", e);
		}
		return user;
	}

	@Override
	public void update(CrContract obj, String id,
			String[] properties) throws Exception {
		try {
			this.daoFacade.getCrcontractDao().update(obj,
					CrContract.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Update.Error", e);
		}
	}

	@Override
	public void insert(CrContract obj) throws Exception {
		try {
			this.daoFacade.getCrcontractDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Add.Error", e);
		}
	}

	@Override
	public void delete(String id) throws Exception {
		try {
			this.daoFacade.getCrcontractDao().delete(
					CrContract.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException(
					(e instanceof CcsException) ? ((CcsException) e).getPrompt()
							: "System.Info.Delete.Error", e);
		}
	}

}
