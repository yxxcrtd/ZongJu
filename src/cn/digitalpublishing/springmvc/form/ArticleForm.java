package cn.digitalpublishing.springmvc.form;

import java.util.List;

import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;

public class ArticleForm extends DataTableForm<Article>{
	
	
	private Article obj;
	
	private String id;

	private Chapter chapter;
	
	private List<Chapter> chapterList ;

	public List<Chapter> getChapterList() {
		return chapterList;
	}

	public void setChapterList(List<Chapter> chapterList) {
		this.chapterList = chapterList;
	}

	public Chapter getChapter() {
		return chapter;
	}

	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}

	public Article getObj() {
		return obj;
	}

	public void setObj(Article obj) {
		this.obj = obj;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
