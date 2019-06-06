package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * @name 11_合同
 * @table CR_CONTRACT
 */
@SuppressWarnings("serial")
public class CrContract implements Serializable {

	private String contractId; // 合同ID
	private String contractType; // 合同类型
	private String contractName; // 合同名称
	private Date contractDate; // 合同签订日期
	private String contractSource; // 合同来源
	private String contractReason; // 合同原因
	private Date contractExpired; // 合同过期日期
	private Integer contractDays; // 合同过期天数
	private String contractStatus; // 合同状态
	private String contractLicenseDuration; // 合同License时间
	private Date contractLicenseStartOn; // 合同License开始日期
	private Date contractLicenseEndOn; // 合同License到期日期
	private String contractLicenseOption; // 合同License开始选项
	private Integer contractAuthorCount; // 合同作者获取免费样书个数
	private Integer contractProxyCount; // 合同代理商获取免费样书个数
	private BigDecimal contractBailAmount; // 合同保证金
	private BigDecimal contractMaxAmount; // 合同最多金额
	private BigDecimal contractMinAmount; // 合同最少金额
	private BigDecimal contractProxyAmount; // 合同代理费


	public String getContractId() {
		return contractId;
	}

	public void setContractId(String contractId) {
		this.contractId = contractId;
	}

	public String getContractType() {
		return contractType;
	}

	public void setContractType(String contractType) {
		this.contractType = contractType;
	}

	public String getContractName() {
		return contractName;
	}

	public void setContractName(String contractName) {
		this.contractName = contractName;
	}

	public Date getContractDate() {
		return contractDate;
	}

	public void setContractDate(Date contractDate) {
		this.contractDate = contractDate;
	}

	public String getContractSource() {
		return contractSource;
	}

	public void setContractSource(String contractSource) {
		this.contractSource = contractSource;
	}

	public String getContractReason() {
		return contractReason;
	}

	public void setContractReason(String contractReason) {
		this.contractReason = contractReason;
	}

	public Date getContractExpired() {
		return contractExpired;
	}

	public void setContractExpired(Date contractExpired) {
		this.contractExpired = contractExpired;
	}

	public Integer getContractDays() {
		return contractDays;
	}

	public void setContractDays(Integer contractDays) {
		this.contractDays = contractDays;
	}

	public String getContractStatus() {
		return contractStatus;
	}

	public void setContractStatus(String contractStatus) {
		this.contractStatus = contractStatus;
	}

	public String getContractLicenseDuration() {
		return contractLicenseDuration;
	}

	public void setContractLicenseDuration(String contractLicenseDuration) {
		this.contractLicenseDuration = contractLicenseDuration;
	}

	public Date getContractLicenseStartOn() {
		return contractLicenseStartOn;
	}

	public void setContractLicenseStartOn(Date contractLicenseStartOn) {
		this.contractLicenseStartOn = contractLicenseStartOn;
	}

	public Date getContractLicenseEndOn() {
		return contractLicenseEndOn;
	}

	public void setContractLicenseEndOn(Date contractLicenseEndOn) {
		this.contractLicenseEndOn = contractLicenseEndOn;
	}

	public String getContractLicenseOption() {
		return contractLicenseOption;
	}

	public void setContractLicenseOption(String contractLicenseOption) {
		this.contractLicenseOption = contractLicenseOption;
	}

	public Integer getContractAuthorCount() {
		return contractAuthorCount;
	}

	public void setContractAuthorCount(Integer contractAuthorCount) {
		this.contractAuthorCount = contractAuthorCount;
	}

	public Integer getContractProxyCount() {
		return contractProxyCount;
	}

	public void setContractProxyCount(Integer contractProxyCount) {
		this.contractProxyCount = contractProxyCount;
	}

	public BigDecimal getContractBailAmount() {
		return contractBailAmount;
	}

	public void setContractBailAmount(BigDecimal contractBailAmount) {
		this.contractBailAmount = contractBailAmount;
	}

	public BigDecimal getContractMaxAmount() {
		return contractMaxAmount;
	}

	public void setContractMaxAmount(BigDecimal contractMaxAmount) {
		this.contractMaxAmount = contractMaxAmount;
	}

	public BigDecimal getContractMinAmount() {
		return contractMinAmount;
	}

	public void setContractMinAmount(BigDecimal contractMinAmount) {
		this.contractMinAmount = contractMinAmount;
	}

	public BigDecimal getContractProxyAmount() {
		return contractProxyAmount;
	}

	public void setContractProxyAmount(BigDecimal contractProxyAmount) {
		this.contractProxyAmount = contractProxyAmount;
	}
}