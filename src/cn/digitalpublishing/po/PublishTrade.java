package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnore;

import cn.digitalpublishing.util.DateFormatUitl;

/**
 * 版权交易记录信息
 * 
 * @author cuixian
 */
@SuppressWarnings("serial")
public class PublishTrade implements Serializable {

	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 资源ID
	 */
	private PProduct sourceId;
	
	/**
	 * 版本
	 */
	private String version;
	
	/**
	 * 首付
	 */
	private BigDecimal downPayment;
	
	/**
	 * 分成比例
	 */
	private String proportion;

	/**
	 * 交易时间
	 */
	private Date tradeDate;
	private String tradeStr;

	/**
	 * 映射表
	 */
	@JsonIgnore
	private Set<PProduct> product;
	
	/**
	 * Default Constructor
	 */
	public PublishTrade() {

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

	public String getVersion() {
		return version;
	}

	public void setVersion(String version) {
		this.version = version;
	}

	public BigDecimal getDownPayment() {
		return downPayment;
	}

	public void setDownPayment(BigDecimal downPayment) {
		this.downPayment = downPayment;
	}

	public String getProportion() {
		return proportion;
	}

	public void setProportion(String proportion) {
		this.proportion = proportion;
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

	public Set<PProduct> getProduct() {
		return product;
	}

	public void setProduct(Set<PProduct> product) {
		this.product = product;
	}

}
