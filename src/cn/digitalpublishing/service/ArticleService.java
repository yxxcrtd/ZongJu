package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.exception.CcsException;
import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;
import cn.digitalpublishing.po.PProduct;

/**
 * DataManagerService
 * 
 * @author yul
 */
public interface ArticleService extends BaseService {
	
	Integer getCount(Map<String, Object> map) throws Exception;

	List<Article> getArticlePagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;
	
	void update(Article article, String className, String id, String[] properties) throws Exception;
	
	void delete(String className, String id) throws Exception;

	void insert(Article article) throws Exception;

	Article findById(String id) throws CcsException;

	void finishAndSave(PProduct product, Article article) throws CcsException;

	void finishAndSave(PProduct product, Chapter chapter) throws CcsException;

}