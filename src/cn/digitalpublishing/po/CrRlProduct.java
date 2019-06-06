package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import cn.digitalpublishing.util.DateFormatUitl;
import cn.digitalpublishing.util.converter.CustomDateSerializer;

/**
 * @name 权利授权产品
 * @table CR_RL_PRODUCT
 */
@SuppressWarnings("serial")
public class CrRlProduct implements Serializable {

	private String rlpId; // 授权与产品关系ID
	private Date firstSaleDate; // 首次销售日期约定
	private String firstSaleStr;
	private Integer sellOutPeriod; // 逾期销售约定
	private Integer returnMonth; // 逾期退货约定
	private Integer printMonth; // 逾期加印约定
	private Date lastEndDate; // 上期结束时间
	private String lastEndStr;
	private Date coprightEndDate; // 版权到期时间
	private String coprightEndStr;
	private Date expiredDate; // 过期时间
	private String expiredStr;
	private String status; // 版税产品状态
	private CrRight right; // 权利授权
	private PProduct product; // 产品基础信息
	@JsonIgnore
	private Set<CrRlOwner> rlOwnerSet = new HashSet<CrRlOwner>(); // 权利授权者


	public String getRlpId() {
		return rlpId;
	}

	public void setRlpId(String rlpId) {
		this.rlpId = rlpId;
	}

	public Date getFirstSaleDate() {
		return firstSaleDate;
	}

	public void setFirstSaleDate(Date firstSaleDate) {
		this.firstSaleDate = firstSaleDate;
	}

	public Integer getSellOutPeriod() {
		return sellOutPeriod;
	}

	public void setSellOutPeriod(Integer sellOutPeriod) {
		this.sellOutPeriod = sellOutPeriod;
	}

	public Integer getReturnMonth() {
		return returnMonth;
	}

	public void setReturnMonth(Integer returnMonth) {
		this.returnMonth = returnMonth;
	}

	public Integer getPrintMonth() {
		return printMonth;
	}

	public void setPrintMonth(Integer printMonth) {
		this.printMonth = printMonth;
	}

	public Date getLastEndDate() {
		return lastEndDate;
	}

	public void setLastEndDate(Date lastEndDate) {
		this.lastEndDate = lastEndDate;
	}

	public Date getCoprightEndDate() {
		return coprightEndDate;
	}

	public void setCoprightEndDate(Date coprightEndDate) {
		this.coprightEndDate = coprightEndDate;
	}

	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getExpiredDate() {
		return expiredDate;
	}

	public void setExpiredDate(Date expiredDate) {
		this.expiredDate = expiredDate;
	}
	
	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public Set<CrRlOwner> getRlOwnerSet() {
		return rlOwnerSet;
	}

	public void setRlOwnerSet(Set<CrRlOwner> rlOwnerSet) {
		this.rlOwnerSet = rlOwnerSet;
	}

	public String getFirstSaleStr() {
		return firstSaleStr;
	}

	public void setFirstSaleStr(String firstSaleStr) {
		this.firstSaleDate = DateFormatUitl.stringToDate(firstSaleStr);
		this.firstSaleStr = firstSaleStr;
	}

	public String getLastEndStr() {
		return lastEndStr;
	}

	public void setLastEndStr(String lastEndStr) {
		this.lastEndDate = DateFormatUitl.stringToDate(lastEndStr);
		this.lastEndStr = lastEndStr;
	}

	public String getCoprightEndStr() {
		return coprightEndStr;
	}

	public void setCoprightEndStr(String coprightEndStr) {
		this.coprightEndDate = DateFormatUitl.stringToDate(coprightEndStr);
		this.coprightEndStr = coprightEndStr;
	}

	public String getExpiredStr() {
		return expiredStr;
	}

	public void setExpiredStr(String expiredStr) {
		this.expiredDate = DateFormatUitl.stringToDate(expiredStr);
		this.expiredStr = expiredStr;
	}
}