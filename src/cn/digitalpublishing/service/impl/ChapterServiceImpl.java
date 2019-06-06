package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.service.ChapterService;

public class ChapterServiceImpl extends BaseServiceImpl implements ChapterService {

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#getCount(java.util.Map)
	 */
	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ChapterDao").get("getCount");
		try {
			num = this.daoFacade.getChapterDao().getCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#getResourcePagingList(java.util.Map, java.lang.String, java.lang.Integer, java.lang.Integer)
	 */
	@Override
	public List<Chapter> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<Chapter> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ChapterDao").get("getPagingList");
		try {
			list = this.daoFacade.getChapterDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取版权信息列表失败！", e);
		}
		return list;
	}
	
	
	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#insert(cn.digitalpublishing.po.Resource)
	 */
	@Override
	public void insert(Chapter chapter) throws Exception {
		try {
			this.daoFacade.getChapterDao().insert(chapter);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#update(cn.digitalpublishing.po.Resource, java.lang.String, java.lang.String, java.lang.String[])
	 */
	@Override
	public void update(Chapter chapter, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getProductDao().update(chapter, className, id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#delete(java.lang.String, java.lang.String)
	 */
	@Override
	public void delete(String className, String id) throws Exception {
		try {
			this.daoFacade.getProductDao().delete(className, id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除信息失败！", e);
		}
	}

	@Override
	public Chapter findById(String id) throws CcsException {
		// TODO Auto-generated method stub
		Chapter chapter = null;
		try {
			chapter = (Chapter) this.daoFacade.getChapterDao().get(Chapter.class.getName(), id);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return chapter;
	}

	@Override
	public List<Chapter> getList(Map<String, Object> condition, String sort)
			throws Exception {
		List<Chapter> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ChapterDao").get("getList");
		try {
			list = this.daoFacade.getChapterDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取版权信息列表失败！", e);
		}
		return list;
	}

}