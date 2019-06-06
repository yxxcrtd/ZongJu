package cn.digitalpublishing.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.service.PProductTypeService;

public class PProductTypeServiceImpl extends BaseServiceImpl implements PProductTypeService {
	
	@Override
	public void updateProductType(PProductType obj, String id,
			String[] properties) throws Exception {
		try {
			this.daoFacade.getProductTypeDao().update(obj,PProductType.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "exhibit.info.updateEExhibit.error", e);
		}
	}

	@Override
	public void insertProductType(PProductType obj) throws Exception {
		try {
			//获取  code 值
			String code = getNextCode(obj);
			obj.setTreeCode(code);
			//获取  order 值
			Integer order = getNextOrder(obj);
			obj.setOrder(order);
			this.daoFacade.getProductTypeDao().insert(obj);
//			//每新增一个产品类型--就为该类型下新增一个默认的--基本类型属性分类
//			PTypePropClassify ptpc = new PTypePropClassify();
//			ptpc.setProductType(obj);
//			ptpc.setName("基本分类");
//			ptpc.setCode(obj.getCode());
//			ptpc.setOrder(0);
//			ptpc.setInternalCode(obj.getCode());
//			ptpc.setStatus(DicCache.getIdByCode(DicConstants.DIC_STATUS, DicConstants.DATA_STATUS_AVAILABLE));
//			this.typePropClassifyService.insertClassify(ptpc);
	} catch (Exception e) {
		throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.insertCTransaction.error", e);
		}
		
	}

	@Override
	public void deletecProductType(String id) throws Exception {
		try {
			this.daoFacade.getProductTypeDao().delete(PProductType.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.deletecTransAction.error", e);
		}
		
	}

	@Override
	public List<PProductType> getProductTypePagingList(Map<String, Object> condition, String sort, Integer pageCount,Integer page) throws Exception {
		List<PProductType> list=null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getPagingList");
		try{
			list=this.daoFacade.getProductTypeDao().getProductTypePagingList(condition,sort,pageCount,page,hqlBean);
		}catch(Exception e){
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.getCTransactionList.error", e);
		}
		return list;
	}

	@Override
	public Integer getProductTypeCount(Map<String, Object> condition)
			throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getCount");
		try {
			num = this.daoFacade.getProductTypeDao().getCount(condition,hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}
	
    public PProductType getProductType(String id) throws Exception{
    	PProductType cla = null;
		try {
			cla = (PProductType) this.daoFacade.getProductTypeDao().get(PProductType.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.getCTransaction.error", e);
		}
		return cla;
    }

	@Override
	public PProductType getProductTypeByCode(String code) throws Exception {
		PProductType cla = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getList");
		try {
			Map<String, Object> condition = new HashMap<String,Object>();
			condition.put("code", code);
			cla = (PProductType) this.daoFacade.getProductTypeDao().getProductTypeList(condition,"",hqlBean).get(0);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "transaction.info.getCTransaction.error", e);
		}
		return cla;
	}
	
	@Override
	public boolean codeUnique(String id, String code) throws Exception {
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("code", code);
		int count  = this.getProductTypeCount(condition);
		if("".equals(id) ){
			if(count>0){
				return false;
			}
		}else{
			if(count==1){
				PProductType typeById = this.getProductType(id);
				PProductType typeByCode = this.getProductTypeByCode(code);
				if(!typeByCode.getId().equals(typeById.getId())){
					return false;
				}
			}else if(count==0){
				return true;
			}else{
				return false;
			}
		}
		return true;
	}

	@Override
	public List<PProductType> getProductTypeTreeList(
			Map<String, Object> condition, String sort) throws Exception {
		List<PProductType> list=null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getTreeList");
		try{
			list=this.daoFacade.getProductTypeDao().getProductTypeTreeList(condition,sort,hqlBean);
		}catch(Exception e){
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "PProductType.info.getTreeList.error", e);
		}
		return list;
	}

	@Override
	public List<PProductType> getProductTypeList(Map<String, Object> condition, String sort) throws Exception {
		List<PProductType> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getProductTypeList");
		try{
			list = this.daoFacade.getProductTypeDao().getProductTypeTreeList(condition,sort,hqlBean);
		}catch(Exception e){
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "PProductType.info.getTreeList.error", e);
		}
		return list;
	}

	@Override
	public List<PProductType> getProductTypeListById(Map<String, Object> condition, String sort) throws Exception {
		List<PProductType> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getProductTypeListById");
		try{
			list = this.daoFacade.getProductTypeDao().getProductTypeTreeList(condition,sort,hqlBean);
		}catch(Exception e){
			throw new CcsException((e instanceof CcsException) ? ((CcsException)e).getPrompt() : "PProductType.info.getTreeList.error", e);
		}
		return list;
	}
	
	private String getNextCode(PProductType obj) throws CcsException{
		String code = "";
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("parentId", obj.getParentProductType() == null ? "root" : obj.getParentProductType().getId());
		try{
			String parCode = "";
			if (obj.getParentProductType() != null) {
				PProductType propType = (PProductType) this.daoFacade.getProductTypeDao().get(PProductType.class.getName(), obj.getParentProductType().getId());
				parCode = propType.getTreeCode();
			}
			
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getTreeList");
			List<PProductType> list = this.daoFacade.getProductTypeDao().getProductTypeList(condition, " order by a.treeCode desc ", hqlBean);
			code = ((list == null || list.isEmpty()) ? "001" : list.get(0) == null ? "001" : list.get(0).getTreeCode());
			if (list != null && !list.isEmpty()) {
				if (parCode.trim().length() > 0) {
					code = code.substring(parCode.length());
				}
				int num = Integer.valueOf(code).intValue();
				num++;
				String mid = String.valueOf(num);
				if (mid.length() == 1) {
					code = "00" + mid;
				}
				if (mid.length() == 2) {
					code = "0" + mid;
				}
				if (mid.length() == 3) {
					code = mid;
				}
			}
			code = parCode + code;
		}catch(Exception e){
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "PProductType.getNextCode.error", e);
		}
		return code;
	}
	
	private Integer getNextOrder(PProductType obj) throws Exception {
		Integer order = 1;
		try {
			Map<String, Object> condition = new HashMap<String, Object>();
			condition.put("parentSubject", obj.getParentProductType() == null ? "root" : obj.getParentProductType().getId());
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductTypeDao").get("getTreeList");
			List<PProductType> list = this.daoFacade.getProductTypeDao().getProductTypeList(condition, " order by a.order desc ", hqlBean);

			order=((list==null||list.isEmpty())?1:list.get(0)==null?1:(list.get(0).getOrder()+1));
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "PProductType.getNextOrder.error", e);
		}
		return order;
	}
	
}