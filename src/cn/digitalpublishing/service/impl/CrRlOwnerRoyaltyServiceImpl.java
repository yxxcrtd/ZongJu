package cn.digitalpublishing.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlOwnerRoyalty;
import cn.digitalpublishing.service.CrRlOwnerRoyaltyService;
import cn.digitalpublishing.service.CrRlRoyaltyRuleService;
import cn.digitalpublishing.util.DicCache;

public class CrRlOwnerRoyaltyServiceImpl extends BaseServiceImpl implements CrRlOwnerRoyaltyService {

    @Autowired
    @Qualifier("crRoyaltyRuleService")
    protected CrRlRoyaltyRuleService crRoyaltyRuleService;
    
	@Override
	public void insert(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception {
		try {
			daoFacade.getCrOwnerRoyaltyDao().insert(crOwnerRoyalty);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.insertCrOwnerRoyalty.error", e);
		}
	}

	@Override
	public void update(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception {
		try {
			daoFacade.getCrOwnerRoyaltyDao().update(crOwnerRoyalty, CrRlOwnerRoyalty.class.getName(), crOwnerRoyalty.getRloRoyaltyId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.updateCrOwnerRoyalty.error", e);
		}
	}

	@Override
	public void delete(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception {
		try {
			daoFacade.getCrOwnerRoyaltyDao().delete(CrRlOwnerRoyalty.class.getName(), crOwnerRoyalty.getRloRoyaltyId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.deleteCrOwnerRoyalty.error", e);
		}
	}

	@Override
	public List<CrRlOwnerRoyalty> getList(Map<String, Object> condition) throws Exception {
		List<CrRlOwnerRoyalty> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerRoyaltyDao")
				.get("getList");
		try {
			list = daoFacade.getCrOwnerRoyaltyDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.getCrOwnerRoyaltyList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlOwnerRoyalty> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlOwnerRoyalty> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerRoyaltyDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrOwnerRoyaltyDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.getCrOwnerRoyaltyPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlOwnerRoyaltyDao")
					.get("getCount");
			num = daoFacade.getCrOwnerRoyaltyDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.getCrOwnerRoyaltyCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlOwnerRoyalty get(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception {
		try {
			crOwnerRoyalty = daoFacade.getCrOwnerRoyaltyDao().get(CrRlOwnerRoyalty.class.getName(), crOwnerRoyalty.getRloRoyaltyId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerRoyaltyService.info.getCrOwnerRoyalty.error", e);
		}
		return crOwnerRoyalty;
	}

	@Override
	public void edit(CrRlOwnerRoyalty crOwnerRoyalty, Map<String, Object> dic) throws Exception {
		dic.put("RoyaltyType", DicCache.getDicData(DicConstants.ROYALTY_TYPE));
		dic.put("Market", DicCache.getDicData(DicConstants.MARKET));
		dic.put("PriceType", DicCache.getDicData(DicConstants.PRICE_TYPE));
		dic.put("TaxFlag", DicCache.getDicData(DicConstants.TAX_FLAG));
		dic.put("AdjustRule", DicCache.getDicData(DicConstants.ADJUST_RULE));
		dic.put("RuleStatus", DicCache.getDicData(DicConstants.RULE_STATUS));
		
		Map<String, Object> condition = new HashMap<String, Object>();
		dic.put("royaltyRuleList", this.crRoyaltyRuleService.getList(condition)); // 版税规则库
	}
}