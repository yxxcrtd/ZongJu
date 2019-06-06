package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.CrRlFormula;
import cn.digitalpublishing.service.CrRlFormulaService;
import cn.digitalpublishing.util.DicCache;

public class CrRlFormulaServiceImpl extends BaseServiceImpl implements CrRlFormulaService {

	@Override
	public void insert(CrRlFormula crFormula) throws Exception {
		try {
			String type = DicCache.getIdByCode(DicConstants.CR_FORMULA_TYPE, crFormula.getFormulaType());
			crFormula.setFormulaType(type);
			daoFacade.getCrFormulaDao().insert(crFormula);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.insertCrFormula.error", e);
		}
	}

	@Override
	public void update(CrRlFormula crFormula) throws Exception {
		try {
			crFormula.setFormulaType(null);
			crFormula.setRlOwnerRoyalty(null);
			crFormula.setSubsidaryRight(null);
			daoFacade.getCrFormulaDao().update(crFormula, CrRlFormula.class.getName(), crFormula.getFormulaId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.updateCrFormula.error", e);
		}
	}

	@Override
	public void delete(CrRlFormula crFormula) throws Exception {
		try {
			daoFacade.getCrFormulaDao().delete(CrRlFormula.class.getName(), crFormula.getFormulaId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.deleteCrFormula.error", e);
		}
	}

	@Override
	public List<CrRlFormula> getList(Map<String, Object> condition) throws Exception {
		List<CrRlFormula> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlFormulaDao")
				.get("getList");
		try {
			list = daoFacade.getCrFormulaDao().getList(condition, "", hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.getCrFormulaList.error", e);
		}
		return list;
	}

	@Override
	public List<CrRlFormula> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception {
		List<CrRlFormula> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
				.get("cn.digitalpublishing.dao.CrRlFormulaDao")
				.get("getPagingList");
		try {
			list = daoFacade.getCrFormulaDao().getPagingList(condition, sort, pageCount, countStart, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.getCrFormulaPagingList.error", e);
		}
		return list;
	}

	@Override
	public Integer getCount(Map<String, Object> condition) throws Exception {
		Integer num = 0;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache()
					.get("cn.digitalpublishing.dao.CrRlFormulaDao")
					.get("getCount");
			num = daoFacade.getCrFormulaDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.getCrFormulaCount.error", e);
		}
		return num;
	}

	@Override
	public CrRlFormula get(CrRlFormula crFormula) throws Exception {
		try {
			crFormula = daoFacade.getCrFormulaDao().get(CrRlFormula.class.getName(), crFormula.getFormulaId());
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "crFormulaService.info.getCrFormula.error", e);
		}
		return crFormula;
	}
}