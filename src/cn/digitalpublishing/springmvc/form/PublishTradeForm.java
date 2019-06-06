package cn.digitalpublishing.springmvc.form;

import java.util.Date;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import cn.digitalpublishing.po.PublishTrade;
import cn.digitalpublishing.util.DateFormatUitl;


public class PublishTradeForm extends DataTableForm<PublishTrade>{
	
	private PublishTrade obj;
	
	private Date tradeDate;
	
	private String tradeStr;
	
	private String sourceId;
	
	private CommonsMultipartFile txtFile = null;
	
	private String txtFormat = "xls,xlsx";

	public PublishTrade getObj() {
		return obj;
	}

	public void setObj(PublishTrade obj) {
		this.obj = obj;
	}

	public Date getTradeDate() {
		return tradeDate;
	}

	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}

	public String getTradeStr() {
		return tradeStr;
	}

	public void setTradeStr(String tradeStr) {
		this.tradeDate=DateFormatUitl.stringToDate(tradeStr);
		this.tradeStr = tradeStr;
	}

	public String getSourceId() {
		return sourceId;
	}

	public void setSourceId(String sourceId) {
		this.sourceId = sourceId;
	}

	public CommonsMultipartFile getTxtFile() {
		return txtFile;
	}

	public void setTxtFile(CommonsMultipartFile txtFile) {
		this.txtFile = txtFile;
	}

	public String getTxtFormat() {
		return txtFormat;
	}

	public void setTxtFormat(String txtFormat) {
		this.txtFormat = txtFormat;
	}
	
}
