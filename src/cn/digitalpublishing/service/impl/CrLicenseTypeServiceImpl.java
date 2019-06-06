package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrLicenseType;
import cn.digitalpublishing.service.CrLicenseTypeService;
import cn.digitalpublishing.util.DicCache;

public class CrLicenseTypeServiceImpl extends BaseServiceImpl implements CrLicenseTypeService {

	@Override
	public void insert(CrLicenseType crLicenseType) throws Exception {
		try {
			String statusAvailable = DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE);
			crLicenseType.setLicenseTypeStatus(statusAvailable);
			daoFacade.getCrLicenseTypeDao().insert(crLicenseType);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.insertCrLicenseType.error", e);
		}
	}

	@Override
	public void update(CrLicenseType crLicenseType) throws Exception {
		try {
			daoFacade.getCrLicenseTypeDao().update(crLicenseType, CrLicenseType.class.getName(), crLicenseType.getLicenseTypeId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.updateCrLicenseType.error", e);
		}
	}

	@Override
	public void delete(CrLicenseType crLicenseType) throws Exception {
		try {
			daoFacade.getCrLicenseTypeDao().delete(CrLicenseType.class.getName(), crLicenseType.getLicenseTypeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.deleteCrLicenseType.error", e);
		}
	}

	@Override
	public List<CrLicenseType> getList(Map<String, Object> condition) throws Exception {
		List<CrLicenseType> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrLicenseTypeDao")
				.get("getList");
		try {
			list = daoFacade.getCrLicenseTypeDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.getCrLicenseTypeList.error", e);
		}
		return list;
	}

	@Override
	public List<CrLicenseType> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrLicenseType> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrLicenseTypeDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrLicenseTypeDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.getCrLicenseTypePagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrLicenseTypeDao")
					.get("getCount");
			num = daoFacade.getCrLicenseTypeDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.getCrLicenseTypeCount.error", e);
		}
		return num;
	}

	@Override
	public CrLicenseType get(CrLicenseType crLicenseType) throws Exception {
		try {
			crLicenseType = daoFacade.getCrLicenseTypeDao().get(CrLicenseType.class.getName(), crLicenseType.getLicenseTypeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crLicenseTypeService.info.getCrLicenseType.error", e);
		}
		return crLicenseType;
	}
}