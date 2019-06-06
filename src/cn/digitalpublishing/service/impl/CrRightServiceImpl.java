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
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.service.CrContractService;
import cn.digitalpublishing.service.CrLicenseTypeService;
import cn.digitalpublishing.service.CrRightService;
import cn.digitalpublishing.util.DicCache;

public class CrRightServiceImpl extends BaseServiceImpl implements CrRightService {
	
    @Autowired
    @Qualifier("crLicenseTypeService")
    protected CrLicenseTypeService crLicenseTypeService;
    
//    @Autowired
//    @Qualifier("proposalService")
//    protected PProposalService proposalService;
    
    @Autowired
    @Qualifier("crContractService")
    protected CrContractService crContractService;
	
	@Override
	public void edit(CrRight crRight, Map<String, Object> dic) throws Exception {
		dic.put("RightContractStatus", DicCache.getDicData(DicConstants.RIGHT_CONTRACT_STATUS));
		dic.put("RightExclusiveFlag", DicCache.getDicData(DicConstants.RIGHT_EXCLUSIVE_FLAG));
		dic.put("LicenceStartType", DicCache.getDicData(DicConstants.LICENCE_START_TYPE));
		dic.put("SettlePeriod", DicCache.getDicData(DicConstants.SETTLE_PERIOD));
		
		Map<String, Object> condition = new HashMap<String, Object>();
		dic.put("licenseType", crLicenseTypeService.getList(condition)); // 授权类型
		//dic.put("proposal", proposalService.getPProposalList(condition, "")); // 策划
		dic.put("contract", crContractService.getList(condition, "")); // 合同
		
	}
	
	@Override
	public void insert(CrRight crRight) throws Exception {
		try {
			daoFacade.getCrRightDao().insert(crRight);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.insertCrRight.error", e);
		}
	}

	@Override
	public void update(CrRight crRight) throws Exception {
		try {
			daoFacade.getCrRightDao().update(crRight, CrRight.class.getName(), crRight.getRlicenseId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.updateCrRight.error", e);
		}
	}

	@Override
	public void delete(CrRight crRight) throws Exception {
		try {
			daoFacade.getCrRightDao().delete(CrRight.class.getName(), crRight.getRlicenseId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.deleteCrRight.error", e);
		}
	}

	@Override
	public List<CrRight> getList(Map<String, Object> condition) throws Exception {
		List<CrRight> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRightDao")
				.get("getList");
		try {
			list = daoFacade.getCrRightDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.getCrRightList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRight> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRight> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRightDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrRightDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.getCrRightPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRightDao")
					.get("getCount");
			num = daoFacade.getCrRightDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.getCrRightCount.error", e);
		}
		return num;
	}

	@Override
	public CrRight get(CrRight crRight) throws Exception {
		try {
			crRight = daoFacade.getCrRightDao().get(CrRight.class.getName(), crRight.getRlicenseId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crRightService.info.getCrRight.error", e);
		}
		return crRight;
	}
}