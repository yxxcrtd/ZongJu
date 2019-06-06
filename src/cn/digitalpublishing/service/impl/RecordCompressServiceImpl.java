package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.RecordCompress;
import cn.digitalpublishing.service.RecordCompressService;


public class RecordCompressServiceImpl extends BaseServiceImpl implements RecordCompressService {
	
	public void insert(RecordCompress obj) throws Exception {
		
		try {
				this.daoFacade.getRecordCompressDao().insert(obj);
			} catch (Exception e) {
				throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增失败", e);
			}
		}

	public void delete(String id) throws Exception {

		try {
			this.daoFacade.getRecordCompressDao().delete(RecordCompress.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除失败", e);
		}
	}
	
	public List<RecordCompress> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<RecordCompress> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.RecordCompressDao").get("getPagingList");
			list = this.daoFacade.getRecordCompressDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}
	
	public Integer getCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.RecordCompressDao").get("getCount");
		try {
			num = this.daoFacade.getRecordCompressDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}
	
	public RecordCompress getId(String id) throws Exception {

		RecordCompress record = null;
		try {
			record = (RecordCompress) this.daoFacade.getRecordCompressDao().get(RecordCompress.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return record;
	}

}