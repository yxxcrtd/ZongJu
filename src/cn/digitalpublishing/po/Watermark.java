package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * Watermark 对象
 * 
 * @author hejiaojiao
 */
@SuppressWarnings("serial")
public class Watermark implements Serializable {

	/**
	 * 主键ID
	 */
	private String id;

	/**
	 * 内容
	 */
	private String content;

	/**
	 * 字体大小（默认是50像素）
	 */
	private Integer font;

	/**
	 * 激活（默认0是未激活；1是激活）
	 */
	private Integer active;
	
	/**
	 * Default Constructor
	 */
	public Watermark() {
		// 
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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
	
}
