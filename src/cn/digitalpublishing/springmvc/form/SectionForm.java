package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Article;
import cn.digitalpublishing.po.Section;

public class SectionForm extends DataTableForm<Article>{
	
	
	private String id;
	
	private Section obj;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public Section getObj() {
		return obj;
	}

	public void setObj(Section obj) {
		this.obj = obj;
	}
	

	

	
	
}
