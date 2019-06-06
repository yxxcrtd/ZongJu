package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Chapter;

public class ChapterForm extends DataTableForm<Article>{
	
	
	
	private String id;

	private Chapter chapter;
	
	public Chapter getChapter() {
		return chapter;
	}

	public void setChapter(Chapter chapter) {
		this.chapter = chapter;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
	
	
}
