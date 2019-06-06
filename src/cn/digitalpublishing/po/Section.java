package cn.digitalpublishing.po;

import java.util.Date;

public class Section {
	/**
	 * 图书主键id
	 */
	private String id;
	/**
	 * 图书节名称
	 */
	private String name;
	
	/**
	 * 创建时间
	 */
	private Date createTime = new Date();
	/**
	 * 修改时间
	 */
	private Date updateTime = new Date();
	/**
	 * 章对象
	 */
	private Chapter chapter;
	
	/**
	 * 节内容
	 */
	private String content;
	/**
	 * 没有样式的节内容
	 */
	private String noStyleContent;
	/**
	 * 节数
	 */
	private String number;
	
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
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getNoStyleContent() {
		return noStyleContent;
	}

	public void setNoStyleContent(String noStyleContent) {
		this.noStyleContent = noStyleContent;
	}
}
