package cn.digitalpublishing.po;

import java.util.Date;
import java.util.Set;

public class Chapter {
	
	/**
	 * 图书主键id
	 */
	private String id;
	/**
	 * 图书章名称
	 */
	private String name;
	/**
	 * 修改时间
	 */
	private Date updateTime = new Date();
	/**
	 * 图书对象
	 */
	private Article article;
	
	/**
	 * 章数
	 */
	private String number;
	
	/**
	 * 图书id
	 */
	private String bookid;
	
	/**
	 * 节记录集合
	 */
	private Set<Section> sections;
	
	/**
	 * 审批状态
	 */
	private String flowStatus;
	
	/**
	 * 章码
	 */
	private String coder;
	
	public String getCoder() {
		return coder;
	}

	public void setCoder(String coder) {
		this.coder = coder;
	}

	public String getFlowStatus() {
		return flowStatus;
	}

	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}

	public Set<Section> getSections() {
		return sections;
	}

	public void setSections(Set<Section> sections) {
		this.sections = sections;
	}

	public String getBookid() {
		return bookid;
	}

	public void setBookid(String bookid) {
		this.bookid = bookid;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public Article getArticle() {
		return article;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 创建时间
	 */
	private Date createTime = new Date();
	
}
