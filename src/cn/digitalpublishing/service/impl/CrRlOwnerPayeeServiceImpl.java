package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlOwnerPayee;
import cn.digitalpublishing.service.CrRlOwnerPayeeService;
import cn.digitalpublishing.util.DicCache;

public class CrRlOwnerPayeeServiceImpl extends BaseServiceImpl implements CrRlOwnerPayeeService {

//    @Autowired
//    @Qualifier("currencyService")
//    protected BCurrencyService currencyService;
    
	@Override
	public void insert(CrRlOwnerPayee crOwnerPayee) throws Exception {
		try {
			daoFacade.getCrOwnerPayeeDao().insert(crOwnerPayee);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.insertCrOwnerPayee.error", e);
		}
	}

	@Override
	public void update(CrRlOwnerPayee crOwnerPayee) throws Exception {
		try {
			daoFacade.getCrOwnerPayeeDao().update(crOwnerPayee, CrRlOwnerPayee.class.getName(), crOwnerPayee.getFeePayeeId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.updateCrOwnerPayee.error", e);
		}
	}

	@Override
	public void delete(CrRlOwnerPayee crOwnerPayee) throws Exception {
		try {
			daoFacade.getCrOwnerPayeeDao().delete(CrRlOwnerPayee.class.getName(), crOwnerPayee.getFeePayeeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.deleteCrOwnerPayee.error", e);
		}
	}

	@Override
	public List<CrRlOwnerPayee> getList(Map<String, Object> condition) throws Exception {
		List<CrRlOwnerPayee> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerPayeeDao")
				.get("getList");
		try {
			list = daoFacade.getCrOwnerPayeeDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.getCrOwnerPayeeList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlOwnerPayee> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlOwnerPayee> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerPayeeDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrOwnerPayeeDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.getCrOwnerPayeePagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlOwnerPayeeDao")
					.get("getCount");
			num = daoFacade.getCrOwnerPayeeDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.getCrOwnerPayeeCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlOwnerPayee get(CrRlOwnerPayee crOwnerPayee) throws Exception {
		try {
			crOwnerPayee = daoFacade.getCrOwnerPayeeDao().get(CrRlOwnerPayee.class.getName(), crOwnerPayee.getFeePayeeId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerPayeeService.info.getCrOwnerPayee.error", e);
		}
		return crOwnerPayee;
	}

	@Override
	public void edit(CrRlOwnerPayee crOwnerPayee, Map<String, Object> dic) throws Exception {
//		Map<String, Object> condition = new HashMap<String, Object>();
//		dic.put("crOwnerPayeeCurrencyList", this.currencyService.getList(condition, ""));
		dic.put("PayeeStatus", DicCache.getDicData(DicConstants.PAYEE_STATUS));
	}
}