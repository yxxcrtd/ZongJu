package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlRoyaltyRule;
import cn.digitalpublishing.service.CrRlRoyaltyRuleService;
import cn.digitalpublishing.util.DicCache;

public class CrRlRoyaltyRuleServiceImpl extends BaseServiceImpl implements CrRlRoyaltyRuleService {
	
	@Override
	public void edit(CrRlRoyaltyRule crRoyaltyRule, Map<String, Object> dic) throws Exception {
		dic.put("Market", DicCache.getDicData(DicConstants.MARKET)); // 市场
		dic.put("PriceType", DicCache.getDicData(DicConstants.PRICE_TYPE)); // 价格类型
		dic.put("TaxFlag", DicCache.getDicData(DicConstants.TAX_FLAG)); // 税务说明
		dic.put("RoyaltyType", DicCache.getDicData(DicConstants.ROYALTY_TYPE)); // 版税类型
		dic.put("RuleStatus", DicCache.getDicData(DicConstants.RULE_STATUS)); // 规则状态
	}
	
	@Override
	public void insert(CrRlRoyaltyRule crRoyaltyRule) throws Exception {
		try {
			daoFacade.getCrRoyaltyRuleDao().insert(crRoyaltyRule);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.insertCrRoyaltyRule.error", e);
		}
	}

	@Override
	public void update(CrRlRoyaltyRule crRoyaltyRule) throws Exception {
		try {
			daoFacade.getCrRoyaltyRuleDao().update(crRoyaltyRule, CrRlRoyaltyRule.class.getName(), crRoyaltyRule.getRoyaltyRuleId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.updateCrRoyaltyRule.error", e);
		}
	}

	@Override
	public void delete(CrRlRoyaltyRule crRoyaltyRule) throws Exception {
		try {
			daoFacade.getCrRoyaltyRuleDao().delete(CrRlRoyaltyRule.class.getName(), crRoyaltyRule.getRoyaltyRuleId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.deleteCrRoyaltyRule.error", e);
		}
	}

	@Override
	public List<CrRlRoyaltyRule> getList(Map<String, Object> condition) throws Exception {
		List<CrRlRoyaltyRule> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlRoyaltyRuleDao")
				.get("getList");
		try {
			list = daoFacade.getCrRoyaltyRuleDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.getCrRoyaltyRuleList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlRoyaltyRule> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlRoyaltyRule> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlRoyaltyRuleDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrRoyaltyRuleDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.getCrRoyaltyRulePagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlRoyaltyRuleDao")
					.get("getCount");
			num = daoFacade.getCrRoyaltyRuleDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.getCrRoyaltyRuleCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlRoyaltyRule get(CrRlRoyaltyRule crRoyaltyRule) throws Exception {
		try {
			crRoyaltyRule = daoFacade.getCrRoyaltyRuleDao().get(CrRlRoyaltyRule.class.getName(), crRoyaltyRule.getRoyaltyRuleId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRoyaltyRuleService.info.getCrRoyaltyRule.error", e);
		}
		return crRoyaltyRule;
	}
}