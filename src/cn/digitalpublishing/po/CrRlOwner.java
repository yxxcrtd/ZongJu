package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;

import org.codehaus.jackson.annotate.JsonIgnore;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import cn.digitalpublishing.util.converter.CustomDateSerializer;

import java.util.Date;
import java.math.BigDecimal;

/**
 * @name 权利授权者
 * @table CR_RL_OWNER
 */
@SuppressWarnings("serial")
public class CrRlOwner implements Serializable {

	private String rlownerId; // 授权者ID
	private Date lastedDate; // 最近结算日期
	private Integer owerCopy; // 作者副本数
	private Integer agentCopy; // 代理商副本数
	private BigDecimal owerDiscount; // 作者购买折扣
	private Integer paymentTrem; // 付款条款
	private BigDecimal ownerPercent; // 所占百分比
	private Integer retainPeriod; // 预留期次
	private Integer retainUntil; // 预留到期次，作废
	private BigDecimal retainPercent; // 每次预留百分比
	private BigDecimal minRetain; // 每次最小预留
	private String rlperiod; // 版税报告周期
	private String status; // 贡献者状态
	private CrRlProduct rlProduct; // 权利授权产品
	@JsonIgnore
	private Set<CrRlOwnerFee> rlOwnerFeeSet = new HashSet<CrRlOwnerFee>(); // 预付款及固定费用
	@JsonIgnore
	private Set<CrRlOwnerPayee> rlOwnerPayeeSet = new HashSet<CrRlOwnerPayee>(); // 付款对象
	@JsonIgnore
	private Set<CrRlOwnerRoyalty> rlOwnerRoyaltySet = new HashSet<CrRlOwnerRoyalty>(); // 人员版税计算规则

	public String getRlownerId() {
		return rlownerId;
	}

	public void setRlownerId(String rlownerId) {
		this.rlownerId = rlownerId;
	}

	@JsonSerialize(using = CustomDateSerializer.class)
	public Date getLastedDate() {
		return lastedDate;
	}

	public void setLastedDate(Date lastedDate) {
		this.lastedDate = lastedDate;
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

	public BigDecimal getOwerDiscount() {
		return owerDiscount;
	}

	public void setOwerDiscount(BigDecimal owerDiscount) {
		this.owerDiscount = owerDiscount;
	}

	public Integer getPaymentTrem() {
		return paymentTrem;
	}

	public void setPaymentTrem(Integer paymentTrem) {
		this.paymentTrem = paymentTrem;
	}

	public BigDecimal getOwnerPercent() {
		return ownerPercent;
	}

	public void setOwnerPercent(BigDecimal ownerPercent) {
		this.ownerPercent = ownerPercent;
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

	public String getRlperiod() {
		return rlperiod;
	}

	public void setRlperiod(String rlperiod) {
		this.rlperiod = rlperiod;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public CrRlProduct getRlProduct() {
		return rlProduct;
	}

	public void setRlProduct(CrRlProduct rlProduct) {
		this.rlProduct = rlProduct;
	}

	public Set<CrRlOwnerFee> getRlOwnerFeeSet() {
		return rlOwnerFeeSet;
	}

	public void setRlOwnerFeeSet(Set<CrRlOwnerFee> rlOwnerFeeSet) {
		this.rlOwnerFeeSet = rlOwnerFeeSet;
	}

	public Set<CrRlOwnerPayee> getRlOwnerPayeeSet() {
		return rlOwnerPayeeSet;
	}

	public void setRlOwnerPayeeSet(Set<CrRlOwnerPayee> rlOwnerPayeeSet) {
		this.rlOwnerPayeeSet = rlOwnerPayeeSet;
	}

	public Set<CrRlOwnerRoyalty> getRlOwnerRoyaltySet() {
		return rlOwnerRoyaltySet;
	}

	public void setRlOwnerRoyaltySet(Set<CrRlOwnerRoyalty> rlOwnerRoyaltySet) {
		this.rlOwnerRoyaltySet = rlOwnerRoyaltySet;
	}
}