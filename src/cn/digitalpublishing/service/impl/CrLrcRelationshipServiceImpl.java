package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLrcRelationship;
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.service.CrLrcRelationshipService;
import com.google.common.base.Strings;

public class CrLrcRelationshipServiceImpl extends BaseServiceImpl implements CrLrcRelationshipService {

	@Override
	public List<CrLrcRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrLrcRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrLrcRelationshipDao")
				.get("getPagingList");
		try {
			list = daoFacade.getLrcRelationshipDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lrcRelationshipService.info.getLrcRelationshipPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrLrcRelationshipDao")
					.get("getCount");
			num = daoFacade.getLrcRelationshipDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lrcRelationshipService.info.getLrcRelationshipCount.error", e);
		}
		return num;
	}

	@Override
	public void delete(List<CrLrcRelationship> list) throws Exception {
		try {
			for (CrLrcRelationship relationship : list) {
				if (!Strings.isNullOrEmpty(relationship.getId())) {
					daoFacade.getLrcRelationshipDao().delete(CrLrcRelationship.class.getName(), relationship.getId());
				}
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "lrcRelationshipService.info.deleteLrcRelationship.error", e);
		}
	}

	@Override
	public void selectLanguageSubmit(List<BDic> languageList, CrRight right) throws Exception {
		for (BDic language : languageList) {
			if (!Strings.isNullOrEmpty(language.getId())) {
				CrLrcRelationship relationship = new CrLrcRelationship();
				relationship.setLanguage(language);
				relationship.setRight(right);
				daoFacade.getLrcRelationshipDao().insert(relationship);
			}
		}
	}
	
}