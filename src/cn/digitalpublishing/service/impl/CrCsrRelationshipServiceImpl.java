package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.service.CrCsrRelationshipService;

import com.google.common.base.Strings;

public class CrCsrRelationshipServiceImpl extends BaseServiceImpl implements CrCsrRelationshipService {

	@Override
	public void insert(CrCsrRelationship csrRelationship) throws Exception {
		try {
			daoFacade.getCsrRelationshipDao().insert(csrRelationship);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.insertCsrRelationship.error", e);
		}
	}

	@Override
	public void update(CrCsrRelationship csrRelationship) throws Exception {
		try {
			daoFacade.getCsrRelationshipDao().update(csrRelationship, CrCsrRelationship.class.getName(), csrRelationship.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.updateCsrRelationship.error", e);
		}
	}

	@Override
	public void delete(List<CrCsrRelationship> list) throws Exception {
		try {
			for (CrCsrRelationship relationship : list) {
				if (!Strings.isNullOrEmpty(relationship.getId())) {
					daoFacade.getCsrRelationshipDao().delete(CrCsrRelationship.class.getName(), relationship.getId());
				}
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crcRelationshipService.info.deleteCrcRelationship.error", e);
		}
	}

	@Override
	public List<CrCsrRelationship> getList(Map<String, Object> condition) throws Exception {
		List<CrCsrRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrCsrRelationshipDao")
				.get("getList");
		try {
			list = daoFacade.getCsrRelationshipDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.getCsrRelationshipList.error", e);
		}
		return list;
	}

	@Override
	public List<CrCsrRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrCsrRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrCsrRelationshipDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCsrRelationshipDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.getCsrRelationshipPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrCsrRelationshipDao")
					.get("getCount");
			num = daoFacade.getCsrRelationshipDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.getCsrRelationshipCount.error", e);
		}
		return num;
	}

	@Override
	public CrCsrRelationship get(CrCsrRelationship csrRelationship) throws Exception {
		try {
			csrRelationship = daoFacade.getCsrRelationshipDao().get(CrCsrRelationship.class.getName(), csrRelationship.getId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "csrRelationshipService.info.getCsrRelationship.error", e);
		}
		return csrRelationship;
	}

	@Override
	public void selectCountrySubmit(List<BCountry> countryList, CrSubsidaryRight subsidaryRight) throws Exception {
		for (BCountry country : countryList) {
			if (!Strings.isNullOrEmpty(country.getId())) {
				CrCsrRelationship relationship = new CrCsrRelationship();
				//relationship.setCountry(country);
				relationship.setSubsidaryRight(subsidaryRight);
				daoFacade.getCsrRelationshipDao().insert(relationship);
			}
		}
	}
}