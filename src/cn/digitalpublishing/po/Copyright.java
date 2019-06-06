package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnore;

import cn.digitalpublishing.util.DateFormatUitl;

/**
 * Copyright 对象
 * 
 * @author YangXinXin
 */
@SuppressWarnings("serial")
public class Copyright implements Serializable {

	/**
	 * 主键ID
	 */
	private String id;
	
	/**
	 * 资源ID
	 */
	private PProduct sourceId;

	/**
	 * 版权所有人
	 */
	private String belong;

	/**
	 * 版权所属地
	 */
	private String property;
	
	/**
	 * 版权开始日期
	 */
	private Date startDate;
	private String startDateStr;
	
	/**
	 * 版权结束日期
	 */
	private Date endDate;
	private String endDateStr;
	
	/**
	 * 版权归属
	 */
	private String under;
	
	/**
	 * 映射表
	 */
	@JsonIgnore
	private Set<PProduct> product;

	public Copyright() {
		// 
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public PProduct getSourceId() {
		return sourceId;
	}

	public void setSourceId(PProduct sourceId) {
		this.sourceId = sourceId;
	}

	public String getBelong() {
		return belong;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}

	public String getProperty() {
		return property;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public Date getStartDate() {
		return startDate;
	}

	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}

	public String getStartDateStr() {
		return startDateStr;
	}

	public void setStartDateStr(String startDateStr) {
		this.startDate=DateFormatUitl.stringToDatetime(startDateStr);
		this.startDateStr = startDateStr;
	}

	public Date getEndDate() {
		return endDate;
	}

	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}

	public String getEndDateStr() {
		return endDateStr;
	}

	public void setEndDateStr(String endDateStr) {
		this.endDate=DateFormatUitl.stringToDatetime(endDateStr);
		this.endDateStr = endDateStr;
	}

	public String getUnder() {
		return under;
	}

	public void setUnder(String under) {
		this.under = under;
	}

	public Set<PProduct> getProduct() {
		return product;
	}

	public void setProduct(Set<PProduct> product) {
		this.product = product;
	}
	
}
