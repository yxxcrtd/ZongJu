package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Watermark;

public class WatermarkForm extends DataTableForm<Watermark>{
	
	private String content;
	private Watermark obj;
	private Integer font;
	
	private Integer active;

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getFont() {
		return font;
	}

	public void setFont(Integer font) {
		this.font = font;
	}

	public Integer getActive() {
		return active;
	}

	public void setActive(Integer active) {
		this.active = active;
	}

	public Watermark getObj() {
		return obj;
	}

	public void setObj(Watermark obj) {
		this.obj = obj;
	}
	
	
}
