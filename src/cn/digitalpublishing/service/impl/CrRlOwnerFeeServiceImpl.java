package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlOwnerFee;
import cn.digitalpublishing.service.CrRlOwnerFeeService;
import cn.digitalpublishing.util.DicCache;

public class CrRlOwnerFeeServiceImpl extends BaseServiceImpl implements CrRlOwnerFeeService {

//    @Autowired
//    @Qualifier("currencyService")
//    protected BCurrencyService currencyService;
    
	@Override
	public void insert(CrRlOwnerFee crOwnerFee) throws Exception {
		try {
			daoFacade.getCrOwnerFeeDao().insert(crOwnerFee);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.insertCrOwnerFee.error", e);
		}
	}

	@Override
	public void update(CrRlOwnerFee crOwnerFee) throws Exception {
		try {
			daoFacade.getCrOwnerFeeDao().update(crOwnerFee, CrRlOwnerFee.class.getName(), crOwnerFee.getFixfeeId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.updateCrOwnerFee.error", e);
		}
	}

	@Override
	public void delete(CrRlOwnerFee crOwnerFee) throws Exception {
		try {
			daoFacade.getCrOwnerFeeDao().delete(CrRlOwnerFee.class.getName(), crOwnerFee.getFixfeeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.deleteCrOwnerFee.error", e);
		}
	}

	@Override
	public List<CrRlOwnerFee> getList(Map<String, Object> condition) throws Exception {
		List<CrRlOwnerFee> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerFeeDao")
				.get("getList");
		try {
			list = daoFacade.getCrOwnerFeeDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.getCrOwnerFeeList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlOwnerFee> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlOwnerFee> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerFeeDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrOwnerFeeDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.getCrOwnerFeePagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlOwnerFeeDao")
					.get("getCount");
			num = daoFacade.getCrOwnerFeeDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.getCrOwnerFeeCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlOwnerFee get(CrRlOwnerFee crOwnerFee) throws Exception {
		try {
			crOwnerFee = daoFacade.getCrOwnerFeeDao().get(CrRlOwnerFee.class.getName(), crOwnerFee.getFixfeeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerFeeService.info.getCrOwnerFee.error", e);
		}
		return crOwnerFee;
	}

	@Override
	public void edit(CrRlOwnerFee crOwnerFee, Map<String, Object> dic) throws Exception {
//		Map<String, Object> condition = new HashMap<String, Object>();
		dic.put("ExpenseType", DicCache.getDicData(DicConstants.EXPENSE_TYPE)); // 费用类型
//		dic.put("currencyList", this.currencyService.getList(condition, ""));
	}
}