package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Copyright;

/**
 * Copyright Form
 * 
 * @author YangXinXin
 */
public class CopyrightForm extends DataTableForm<Copyright> {
	
	private Copyright obj;
	
	private String belong;
	
	private String property;
	
	private String tradeInfo;
	
	private String deadline;
	
	private String under;
	
	private String sourceId;

	public Copyright getObj() {
		return obj;
	}

	public void setObj(Copyright obj) {
		this.obj = obj;
	}

	public String getBelong() {
		return belong;
	}

	public String getProperty() {
		return property;
	}

	public String getTradeInfo() {
		return tradeInfo;
	}

	public String getDeadline() {
		return deadline;
	}

	public String getUnder() {
		return under;
	}

	public void setBelong(String belong) {
		this.belong = belong;
	}

	public void setProperty(String property) {
		this.property = property;
	}

	public void setTradeInfo(String tradeInfo) {
		this.tradeInfo = tradeInfo;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public void setUnder(String under) {
		this.under = under;
	}

	public String getSourceId() {
		return sourceId;
	}

	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}
 
}
