package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import com.google.common.base.Strings;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.service.CrLsrRelationshipService;

public class CrLsrRelationshipServiceImpl extends BaseServiceImpl implements CrLsrRelationshipService {

	@Override
	public void insert(CrLsrRelationship lsrRelationship) throws Exception {
		try {
			daoFacade.getLsrRelationshipDao().insert(lsrRelationship);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.insertLsrRelationship.error", e);
		}
	}

	@Override
	public void update(CrLsrRelationship lsrRelationship) throws Exception {
		try {
			daoFacade.getLsrRelationshipDao().update(lsrRelationship, CrLsrRelationship.class.getName(), lsrRelationship.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.updateLsrRelationship.error", e);
		}
	}

	@Override
	public void delete(List<CrLsrRelationship> list) throws Exception {
		try {
			for (CrLsrRelationship relationship : list) {
				if (!Strings.isNullOrEmpty(relationship.getId())) {
					daoFacade.getLsrRelationshipDao().delete(CrLsrRelationship.class.getName(), relationship.getId());
				}
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.deleteLsrRelationship.error", e);
		}
	}

	@Override
	public List<CrLsrRelationship> getList(Map<String, Object> condition) throws Exception {
		List<CrLsrRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrLsrRelationshipDao")
				.get("getList");
		try {
			list = daoFacade.getLsrRelationshipDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.getLsrRelationshipList.error", e);
		}
		return list;
	}

	@Override
	public List<CrLsrRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrLsrRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrLsrRelationshipDao")
				.get("getPagingList");
		try {
			list = daoFacade.getLsrRelationshipDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.getLsrRelationshipPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrLsrRelationshipDao")
					.get("getCount");
			num = daoFacade.getLsrRelationshipDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.getLsrRelationshipCount.error", e);
		}
		return num;
	}

	@Override
	public CrLsrRelationship get(CrLsrRelationship lsrRelationship) throws Exception {
		try {
			lsrRelationship = daoFacade.getLsrRelationshipDao().get(CrLsrRelationship.class.getName(), lsrRelationship.getId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lsrRelationshipService.info.getLsrRelationship.error", e);
		}
		return lsrRelationship;
	}

	@Override
	public void selectLanguageSubmit(List<BDic> languageList, CrSubsidaryRight subsidaryRight) throws Exception {
		for (BDic language : languageList) {
			if (!Strings.isNullOrEmpty(language.getId())) {
				CrLsrRelationship relationship = new CrLsrRelationship();
				relationship.setLanguage(language);
				relationship.setSubsidaryRight(subsidaryRight);
				daoFacade.getLsrRelationshipDao().insert(relationship);
			}
		}
	}
}