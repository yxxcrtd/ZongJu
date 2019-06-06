package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlProduct;
import cn.digitalpublishing.service.CrRlProductService;
import cn.digitalpublishing.util.DicCache;

public class CrRlProductServiceImpl extends BaseServiceImpl implements CrRlProductService {
	
	@Override
	public void edit(CrRlProduct crProduct, Map<String, Object> dic) throws Exception {
		dic.put("RightLicenceProStatus", DicCache.getDicData(DicConstants.RIGHT_LICENCE_PRO_STATUS));
	}
	
	@Override
	public void insert(CrRlProduct crProduct) throws Exception {
		try {
			daoFacade.getCrProductDao().insert(crProduct);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.insertCrProduct.error", e);
		}
	}

	@Override
	public void update(CrRlProduct crProduct) throws Exception {
		try {
			daoFacade.getCrProductDao().update(crProduct, CrRlProduct.class.getName(), crProduct.getRlpId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.updateCrProduct.error", e);
		}
	}

	@Override
	public void delete(String id) throws Exception {
		try {
			daoFacade.getCrProductDao().delete(CrRlProduct.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.deleteCrProduct.error", e);
		}
	}

	@Override
	public List<CrRlProduct> getList(Map<String, Object> condition) throws Exception {
		List<CrRlProduct> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlProductDao")
				.get("getList");
		try {
			list = daoFacade.getCrProductDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.getCrProductList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlProduct> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlProduct> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlProductDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrProductDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.getCrProductPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlProductDao")
					.get("getCount");
			num = daoFacade.getCrProductDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.getCrProductCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlProduct get(CrRlProduct crProduct) throws Exception {
		try {
			crProduct = daoFacade.getCrProductDao().get(CrRlProduct.class.getName(), crProduct.getRlpId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crProductService.info.getCrProduct.error", e);
		}
		return crProduct;
	}
}