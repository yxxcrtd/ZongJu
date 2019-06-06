package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import cn.digitalpublishing.util.DateFormatUitl;
import cn.digitalpublishing.util.converter.CustomDateSerializer;

import java.util.Date;
import java.math.BigDecimal;

/**
 * @name 权利授权
 * @table CR_RIGHT
 */
@SuppressWarnings("serial")
public class CrRight implements Serializable {

	private String rlicenseId; // 权利授权ID
	private String rlicenseName; // 权利授权名称
	private String rlicenseReference; // 权利授权备注
	private Integer rlicenseNum; // 授权量
	private Date rlicenseStarton; // 授权开始时间
	private String startOnStr;
	private Date rlicenseEndon; // 授权结束时间
	private String stopOnStr;
	private Date manuscriptDelivery; // 稿件提交日期
	private String deliveryStr;
	private Integer pubDeadline; // 出版期限
	private Integer owerCopy; // 作者副本数
	private Integer agentCopy; // 代理商副本数
	private BigDecimal guaranteePayment; // 保证金
	private BigDecimal maxPayment; // 最大付款
	private BigDecimal minPayment; // 最小付款
	private BigDecimal agentPercent; // 代理费比率
	private Date lastedDate; // 最近结算日期
	private String lastStr;
	private Integer paymentTrem; // 付款条款
	private Date firstCloseDate; // 首次结算报告期限
	private String firstStr;
	private BigDecimal retainPercent; // 每次预留百分比
	private BigDecimal minRetain; // 每次最小预留
	private Integer retainPeriod; // 预留期次
	private Integer retainUntil; // 预留到期次
	private Integer periodNum; // 当前期次
	private String status; // 权利合同状态
	private String rcexclusive; // 权利是否独享
	private String start; // 授权开始方式
	private String rlperiod; // 结算公告周期
	private CrLicenseType licenseType; // 授权类型
	private CrContract contract; // 合同
	@JsonIgnore
	private Set<CrCrcRelationship> crcRelationshipSet = new HashSet<CrCrcRelationship>(); // 国别权利合同关系
	@JsonIgnore
	private Set<CrLrcRelationship> lrcRelationshipSet = new HashSet<CrLrcRelationship>(); // 语种权利合同关系
	@JsonIgnore
	private Set<CrRlProduct> rlProductSet = new HashSet<CrRlProduct>(); // 权利授权产品
	@JsonIgnore
	private Set<CrSubsidaryRight> subsidaryRightSet = new HashSet<CrSubsidaryRight>(); // 版税附属权利


	public String getRlicenseId() {
		return rlicenseId;
	}

	public void setRlicenseId(String rlicenseId) {
		this.rlicenseId = rlicenseId;
	}

	public String getRlicenseName() {
		return rlicenseName;
	}

	public void setRlicenseName(String rlicenseName) {
		this.rlicenseName = rlicenseName;
	}

	public String getRlicenseReference() {
		return rlicenseReference;
	}

	public void setRlicenseReference(String rlicenseReference) {
		this.rlicenseReference = rlicenseReference;
	}

	public Integer getRlicenseNum() {
		return rlicenseNum;
	}

	public void setRlicenseNum(Integer rlicenseNum) {
		this.rlicenseNum = rlicenseNum;
	}

	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getRlicenseStarton() {
		return rlicenseStarton;
	}

	public void setRlicenseStarton(Date rlicenseStarton) {
		this.rlicenseStarton = rlicenseStarton;
	}

	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getRlicenseEndon() {
		return rlicenseEndon;
	}

	public void setRlicenseEndon(Date rlicenseEndon) {
		this.rlicenseEndon = rlicenseEndon;
	}

	public Date getManuscriptDelivery() {
		return manuscriptDelivery;
	}

	public void setManuscriptDelivery(Date manuscriptDelivery) {
		this.manuscriptDelivery = manuscriptDelivery;
	}

	public Integer getPubDeadline() {
		return pubDeadline;
	}

	public void setPubDeadline(Integer pubDeadline) {
		this.pubDeadline = pubDeadline;
	}

	public Integer getOwerCopy() {
		return owerCopy;
	}

	public void setOwerCopy(Integer owerCopy) {
		this.owerCopy = owerCopy;
	}

	public Integer getAgentCopy() {
		return agentCopy;
	}

	public void setAgentCopy(Integer agentCopy) {
		this.agentCopy = agentCopy;
	}

	public BigDecimal getGuaranteePayment() {
		return guaranteePayment;
	}

	public void setGuaranteePayment(BigDecimal guaranteePayment) {
		this.guaranteePayment = guaranteePayment;
	}

	public BigDecimal getMaxPayment() {
		return maxPayment;
	}

	public void setMaxPayment(BigDecimal maxPayment) {
		this.maxPayment = maxPayment;
	}

	public BigDecimal getMinPayment() {
		return minPayment;
	}

	public void setMinPayment(BigDecimal minPayment) {
		this.minPayment = minPayment;
	}

	public BigDecimal getAgentPercent() {
		return agentPercent;
	}

	public void setAgentPercent(BigDecimal agentPercent) {
		this.agentPercent = agentPercent;
	}

	public Date getLastedDate() {
		return lastedDate;
	}

	public void setLastedDate(Date lastedDate) {
		this.lastedDate = lastedDate;
	}

	public Integer getPaymentTrem() {
		return paymentTrem;
	}

	public void setPaymentTrem(Integer paymentTrem) {
		this.paymentTrem = paymentTrem;
	}

	public Date getFirstCloseDate() {
		return firstCloseDate;
	}

	public void setFirstCloseDate(Date firstCloseDate) {
		this.firstCloseDate = firstCloseDate;
	}

	public BigDecimal getRetainPercent() {
		return retainPercent;
	}

	public void setRetainPercent(BigDecimal retainPercent) {
		this.retainPercent = retainPercent;
	}

	public BigDecimal getMinRetain() {
		return minRetain;
	}

	public void setMinRetain(BigDecimal minRetain) {
		this.minRetain = minRetain;
	}

	public Integer getRetainPeriod() {
		return retainPeriod;
	}

	public void setRetainPeriod(Integer retainPeriod) {
		this.retainPeriod = retainPeriod;
	}

	public Integer getRetainUntil() {
		return retainUntil;
	}

	public void setRetainUntil(Integer retainUntil) {
		this.retainUntil = retainUntil;
	}

	public Integer getPeriodNum() {
		return periodNum;
	}

	public void setPeriodNum(Integer periodNum) {
		this.periodNum = periodNum;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRcexclusive() {
		return rcexclusive;
	}

	public void setRcexclusive(String rcexclusive) {
		this.rcexclusive = rcexclusive;
	}

	public String getStart() {
		return start;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public String getRlperiod() {
		return rlperiod;
	}

	public void setRlperiod(String rlperiod) {
		this.rlperiod = rlperiod;
	}

	public CrLicenseType getLicenseType() {
		return licenseType;
	}

	public void setLicenseType(CrLicenseType licenseType) {
		this.licenseType = licenseType;
	}

	public CrContract getContract() {
		return contract;
	}

	public void setContract(CrContract contract) {
		this.contract = contract;
	}

	public Set<CrCrcRelationship> getCrcRelationshipSet() {
		return crcRelationshipSet;
	}

	public void setCrcRelationshipSet(Set<CrCrcRelationship> crcRelationshipSet) {
		this.crcRelationshipSet = crcRelationshipSet;
	}

	public Set<CrLrcRelationship> getLrcRelationshipSet() {
		return lrcRelationshipSet;
	}

	public void setLrcRelationshipSet(Set<CrLrcRelationship> lrcRelationshipSet) {
		this.lrcRelationshipSet = lrcRelationshipSet;
	}

	public Set<CrRlProduct> getRlProductSet() {
		return rlProductSet;
	}

	public void setRlProductSet(Set<CrRlProduct> rlProductSet) {
		this.rlProductSet = rlProductSet;
	}

	public Set<CrSubsidaryRight> getSubsidaryRightSet() {
		return subsidaryRightSet;
	}

	public void setSubsidaryRightSet(Set<CrSubsidaryRight> subsidaryRightSet) {
		this.subsidaryRightSet = subsidaryRightSet;
	}

	public String getStartOnStr() {
		return startOnStr;
	}

	public void setStartOnStr(String startOnStr) {
		this.rlicenseStarton = DateFormatUitl.stringToDate(startOnStr);
		this.startOnStr = startOnStr;
	}

	public String getStopOnStr() {
		return stopOnStr;
	}

	public void setStopOnStr(String stopOnStr) {
		this.rlicenseEndon = DateFormatUitl.stringToDate(stopOnStr);
		this.stopOnStr = stopOnStr;
	}

	public String getDeliveryStr() {
		return deliveryStr;
	}

	public void setDeliveryStr(String deliveryStr) {
		this.manuscriptDelivery = DateFormatUitl.stringToDate(deliveryStr);
		this.deliveryStr = deliveryStr;
	}

	public String getLastStr() {
		return lastStr;
	}

	public void setLastStr(String lastStr) {
		this.lastedDate = DateFormatUitl.stringToDate(lastStr);
		this.lastStr = lastStr;
	}

	public String getFirstStr() {
		return firstStr;
	}

	public void setFirstStr(String firstStr) {
		this.firstCloseDate = DateFormatUitl.stringToDate(firstStr);
		this.firstStr = firstStr;
	}
}