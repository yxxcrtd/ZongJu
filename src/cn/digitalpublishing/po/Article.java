package cn.digitalpublishing.po;

import java.util.Date;
import java.util.List;
import java.util.Set;

public class Article {
	/**
	 * 图书主键id
	 */
	private String id;
	/**
	 * 图书名称
	 */
	private String bookName;
	/**
	 * 图书摘要
	 */
	private String bookAbstract;
	/**
	 * 图书正文
	 */
	private String content;
	/**
	 * 修改时间
	 */
	private Date updateTime = new Date();
	/**
	 * tpf图书地址
	 */
	private String pdfPath;
	/**
	 * 用户
	 */
	private User user;
	
	/**
	 * 资源分类
	 */
	private PProductType productType;
	
	/**
	 * 审批状态
	 */
	private String flowStatus;
	
	/**
	 * 图书章
	 */
	private Set<Chapter> chapters;
	
	/**
	 * 图书章列表 非po字段
	 */
	private List<Chapter> chapterList;
	
	public PProductType getProductType() {
		return productType;
	}
	public void setProductType(PProductType productType) {
		this.productType = productType;
	}
	
	public List<Chapter> getChapterList() {
		return chapterList;
	}
	public void setChapterList(List<Chapter> chapterList) {
		this.chapterList = chapterList;
	}
	public Set<Chapter> getChapters() {
		return chapters;
	}
	public void setChapters(Set<Chapter> chapters) {
		this.chapters = chapters;
	}
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getBookName() {
		return bookName;
	}
	public void setBookName(String bookName) {
		this.bookName = bookName;
	}
	public String getBookAbstract() {
		return bookAbstract;
	}
	public void setBookAbstract(String bookAbstract) {
		this.bookAbstract = bookAbstract;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getPdfPath() {
		return pdfPath;
	}
	public void setPdfPath(String pdfPath) {
		this.pdfPath = pdfPath;
	}
	public String getFlowStatus() {
		return flowStatus;
	}
	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}
}
