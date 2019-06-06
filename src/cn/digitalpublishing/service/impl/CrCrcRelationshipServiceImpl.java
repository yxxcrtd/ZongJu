package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;
import com.google.common.base.Strings;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCrcRelationship;
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.service.CrCrcRelationshipService;

public class CrCrcRelationshipServiceImpl extends BaseServiceImpl implements CrCrcRelationshipService {

	@Override
	public void delete(List<CrCrcRelationship> list) throws Exception {
		try {
			for (CrCrcRelationship relationship : list) {
				if (!Strings.isNullOrEmpty(relationship.getId())) {
					daoFacade.getCrcRelationshipDao().delete(CrCrcRelationship.class.getName(), relationship.getId());
				}
			}
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crcRelationshipService.info.deleteCrcRelationship.error", e);
		}
	}

	@Override
	public List<CrCrcRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrCrcRelationship> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrCrcRelationshipDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrcRelationshipDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crcRelationshipService.info.getCrcRelationshipPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrCrcRelationshipDao")
					.get("getCount");
			num = daoFacade.getCrcRelationshipDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crcRelationshipService.info.getCrcRelationshipCount.error", e);
		}
		return num;
	}

	@Override
	public void selectCountrySubmit(List<BCountry> countryList, CrRight right) throws Exception {
		for (BCountry country : countryList) {
			if (!Strings.isNullOrEmpty(country.getId())) {
				CrCrcRelationship relationship = new CrCrcRelationship();
//				relationship.setCountry(country);
				relationship.setRight(right);
				daoFacade.getCrcRelationshipDao().insert(relationship);
			}
		}
	}
}