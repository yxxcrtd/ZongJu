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
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.service.CrRlOwnerService;
import cn.digitalpublishing.service.CrRlProductService;
import cn.digitalpublishing.util.DicCache;

import com.google.common.base.Strings;

public class CrRlOwnerServiceImpl extends BaseServiceImpl implements CrRlOwnerService {

    @Autowired
    @Qualifier("crProductService")
    protected CrRlProductService crProductService;
    
//    @Autowired
//    @Qualifier("productPersonRelationshipService")
//    protected PProductPersonRelationshipService productPersonRelationshipService;
    
	@Override
	public void edit(CrRlOwner crOwner, CrRight right, Map<String, Object> dic) throws Exception {
		dic.put("SettlePeriod", DicCache.getDicData(DicConstants.SETTLE_PERIOD));
		dic.put("AuthorStatus", DicCache.getDicData(DicConstants.AUTHOR_STATUS));
		
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("right_rlicenseId", right.getRlicenseId());
		dic.put("crProductList", crProductService.getList(condition));
		
		if (!Strings.isNullOrEmpty(crOwner.getRlownerId())) {
			condition.clear();
        	condition.put("productId", crOwner.getRlProduct().getProduct().getId());
//        	dic.put("productPersonList", this.productPersonRelationshipService.getList(condition));
		}
	}

	@Override
	public void insert(CrRlOwner crOwner) throws Exception {
		try {
			daoFacade.getCrOwnerDao().insert(crOwner);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.insertCrOwner.error", e);
		}
	}

	@Override
	public void update(CrRlOwner crOwner) throws Exception {
		try {
			daoFacade.getCrOwnerDao().update(crOwner, CrRlOwner.class.getName(), crOwner.getRlownerId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.updateCrOwner.error", e);
		}
	}

	@Override
	public void delete(CrRlOwner crOwner) throws Exception {
		try {
			daoFacade.getCrOwnerDao().delete(CrRlOwner.class.getName(), crOwner.getRlownerId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.deleteCrOwner.error", e);
		}
	}

	@Override
	public List<CrRlOwner> getList(Map<String, Object> condition) throws Exception {
		List<CrRlOwner> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerDao")
				.get("getList");
		try {
			list = daoFacade.getCrOwnerDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.getCrOwnerList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlOwner> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlOwner> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlOwnerDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrOwnerDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.getCrOwnerPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlOwnerDao")
					.get("getCount");
			num = daoFacade.getCrOwnerDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.getCrOwnerCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlOwner get(CrRlOwner crOwner) throws Exception {
		try {
			crOwner = daoFacade.getCrOwnerDao().get(CrRlOwner.class.getName(), crOwner.getRlownerId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crOwnerService.info.getCrOwner.error", e);
		}
		return crOwner;
	}

}