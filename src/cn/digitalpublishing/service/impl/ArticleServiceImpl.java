package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.service.ArticleService;

public class ArticleServiceImpl extends BaseServiceImpl implements ArticleService {

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#getCount(java.util.Map)
	 */
	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ArticleDao").get("getCount");
		try {
			num = this.daoFacade.getArticleDao().getCount(map, hqlBean);
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
	public List<Article> getArticlePagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
		List<Article> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.ArticleDao").get("getPagingList");
		try {
			list = this.daoFacade.getArticleDao().getArticlePagingList(condition, sort, pageCount, page, hqlBean);
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
	public void insert(Article article) throws Exception {
		try {
			this.daoFacade.getProductDao().insert(article);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#update(cn.digitalpublishing.po.Resource, java.lang.String, java.lang.String, java.lang.String[])
	 */
	@Override
	public void update(Article article, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getProductDao().update(article, className, id, properties);
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
	public Article findById(String id) throws CcsException {
		// TODO Auto-generated method stub
		Article article = null;
		try {
			article = (Article) this.daoFacade.getArticleDao().get(Article.class.getName(), id);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return article;
	}

	@Override
	public void finishAndSave(PProduct product, Article article) throws CcsException {
		// TODO Auto-generated method stub
		try {
			this.daoFacade.getProductDao().insert(product);
			this.daoFacade.getProductDao().update(article, Article.class.getName(), article.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "图书完成失败！", e);
		}
	}

	@Override
	public void finishAndSave(PProduct product, Chapter chapter) throws CcsException {
		// TODO Auto-generated method stub
		try {
			this.daoFacade.getProductDao().insert(product);
			this.daoFacade.getProductDao().update(chapter, Chapter.class.getName(), chapter.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "图书完成失败！", e);
		}
	}

}