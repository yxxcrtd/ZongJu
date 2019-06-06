
package cn.digitalpublishing.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.service.BDicClassService;
import cn.digitalpublishing.util.DicCache;

public class BDicClassServiceImpl extends BaseServiceImpl implements BDicClassService {

	public void updateDicClass(BDicClass obj, String id, String[] properties) throws Exception {

		try {
			this.daoFacade.getDicClassDao().update(obj, BDicClass.class.getName(), id, null);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.updateBDicClass.error", e);
		}
		// TODO Auto-generated method stub

	}

	public void insertDicClass(BDicClass obj) throws Exception {

		// TODO Auto-generated method stub
		try {
			obj.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			this.daoFacade.getDicClassDao().insert(obj);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.insertBDicClass.error", e);
		}
	}

	public void deleteDicClass(BDicClass obj, String id, String[] properties) throws Exception {

		// TODO Auto-generated method stub
		try {
			obj.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			this.daoFacade.getDicClassDao().update(obj, BDicClass.class.getName(), id, properties);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.deleteBDicClass.error", e);
		}
	}

	public List<BDicClass> getDicClassPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<BDicClass> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicClassDao").get("getPagingList");
			list = this.daoFacade.getDicClassDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.getBDicClassPagingList.error", e);
		}
		// TODO Auto-generated method stub
		return list;
	}

	public BDicClass getDicClass(String id) throws Exception {

		// TODO Auto-generated method stub
		BDicClass bDicClass = null;
		try {
			bDicClass = (BDicClass) this.daoFacade.getDicClassDao().get(BDicClass.class.getName(), id);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.getBDicClass.error", e);
		}
		return bDicClass;
	}

	public void updateDic(BDic obj, String id, String[] properties) throws Exception {

		// TODO Auto-generated method stub
		try {
			this.daoFacade.getDicDao().update(obj, BDic.class.getName(), id, null);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.updateBDic.error", e);
		}

	}

	public void insertDic(BDic obj) throws Exception {

		// TODO Auto-generated method stub
		try {
			obj.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
			this.daoFacade.getDicDao().insert(obj);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.insertBDic.error", e);
		}
	}

	public void deleteDic(BDic obj, String id, String[] properties) throws Exception {

		// TODO Auto-generated method stub
		try {
			obj.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_UN_AVAILABLE));
			this.daoFacade.getDicDao().update(obj, BDic.class.getName(), id, properties);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.deleteBDic.error", e);
		}

	}

	public List<BDic> getDicPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		// TODO Auto-generated method stub
		List<BDic> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getPagingList");
		try {
			list = this.daoFacade.getDicDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.getBDicPagingList.error", e);
		}
		return list;
	}

	public BDic getDic(String id) throws Exception {

		// TODO Auto-generated method stub
		BDic bDic = null;
		try {
			bDic = (BDic) this.daoFacade.getDicDao().get(BDic.class.getName(), id);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.getBDic.error", e);
		}
		return bDic;
	}

	public List<BDic> getDicList(Map<String, Object> condition, String sort) throws Exception {

		// TODO Auto-generated method stub
		List<BDic> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getDicList");
		try {
			list = this.daoFacade.getDicDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "contractInfo.info.getBContractInfoList.error", e);
		}
		return list;
	}

	public List<BDic> getDicCacheData(Map<String, Object> condition, String sort) throws Exception {

		// TODO Auto-generated method stub
		List<BDic> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getDicCacheData");
		try {
			list = this.daoFacade.getDicDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "contractInfo.info.getDicCacheData.error", e);
		}
		return list;
	}

	public Integer getDicClassCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicClassDao").get("getCount");
		try {
			num = this.daoFacade.getDicClassDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dicClass.info.getDicClassCount.error", e);
		}
		return num;
	}

	public Integer getDicCount(Map<String, Object> condition) throws Exception {

		// TODO Auto-generated method stub
		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getCount");
		try {
			num = this.daoFacade.getDicDao().getCount(condition, hqlBean);
			return num;
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "dic.info.getDicCount.error", e);
		}
	}

	public List<BDicClass> getDicClassList(Map<String, Object> condition) throws Exception {

		// TODO Auto-generated method stub
		List<BDicClass> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicClassDao").get("getDicClassList");
		try {
			list = this.daoFacade.getDicClassDao().getList(condition, hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "contractInfo.info.getDicClassList.error", e);
		}
		return list;
	}

	/**
	 * 验证数据字典分类编码是否唯一
	 */
	public boolean checkDicClassCodeUnique(String id, String code) throws Exception {

		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("code", code);
		condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
		int count = this.getDicClassCount(condition);
		if ("".equals(id)) {
			if (count > 0) {
				return false;
			}
		} else {
			if (count == 1) {
				BDicClass dicId = this.getDicClass(id);
				BDicClass dicCode = this.getDicClassList(condition).get(0);
				if (!dicId.getId().equals(dicCode.getId())) {
					return false;
				}
			} else if (count == 0) {
				return true;
			}
		}
		return true;
	}

	/**
	 * 验证数据字典编码是否唯一
	 */
	public boolean checkDicCodeUnique(String id, String classId, String code) throws Exception {

		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("code", code);
		condition.put("dicClassId", classId);
		condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
		int count = this.getDicCount(condition);
		// 新增时，id为空
		if ("".equals(id)) {
			if (count > 0) {
				return false;
			}
		} else {
			if (count == 1) {
				BDic dicId = this.getDic(id);
				BDic dicCode = this.getDicList(condition, null).get(0);
				if (!dicId.getId().equals(dicCode.getId())) {
					return false;
				}
			} else if (count == 0) {
				return true;
			}
		}
		return true;
	}

	/**
	 * 验证数据字典排序是否唯一
	 */
	public boolean dicOrderUnique(String id, String classId, Integer order) throws Exception {

		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("order", order);
		condition.put("dicClassId", classId);
		condition.put("status", DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
		int count = this.getDicCount(condition);
		// 新增时，id为空
		if ("".equals(id)) {
			if (count > 0) {
				return false;
			}
		} else {
			if (count == 1) {
				BDic dicId = this.getDic(id);
				BDic dicOrder = this.getDicList(condition, null).get(0);
				if (!dicId.getId().equals(dicOrder.getId())) {
					return false;
				}
			} else if (count == 0) {
				return true;
			}
		}
		return true;
	}

	public List<BDic> getDicBySequence(Map<String, Object> condition) throws Exception {

		// TODO Auto-generated method stub
		List<BDic> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getDicBySequence");
		try {
			list = this.daoFacade.getDicDao().getList(condition, null, hqlBean);
		} catch (Exception e) {
			e.printStackTrace();
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "contractInfo.info.getDicBySequence.error", e);
		}
		return list;
	}

}
