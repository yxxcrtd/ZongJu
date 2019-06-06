package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Compress;
import cn.digitalpublishing.service.CompressService;


public class CompressServiceImpl extends BaseServiceImpl implements CompressService {
	
	public void insert(Compress obj) throws Exception {
		
		try {
				this.daoFacade.getCompressDao().insert(obj);
			} catch (Exception e) {
				throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增失败", e);
			}
		}
	
	public void update(Compress obj, String id, String[] properties) throws Exception {

		try {
			this.daoFacade.getCompressDao().update(obj, Compress.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "更新失败", e);
		}

	}

	public void delete(String id) throws Exception {

		try {
			this.daoFacade.getCompressDao().delete(Compress.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除失败", e);
		}
	}
	
	public List<Compress> getCompressPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<Compress> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CompressZipDao").get("getCompressPagingList");
			list = this.daoFacade.getCompressDao().getCompressPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}
	
	public Integer getCompressCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.CompressZipDao").get("getCompressCount");
		try {
			num = this.daoFacade.getCompressDao().getCompressCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}
	
	public Compress getId(String id) throws Exception {

		Compress compress = null;
		try {
			compress = (Compress) this.daoFacade.getCompressDao().get(Compress.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return compress;
	}

}