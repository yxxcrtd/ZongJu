package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;

import cn.digitalpublishing.po.CrContract;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrContractForm extends DataTableForm<CrContract> {

	private CrContract crContract;
	/*private String contractId;*/ // 合同ID
	private String contractType; // 合同类型
	private String contractName; // 合同名称
	private String contractDate; // 合同签订日期
/*	private String contractSource; // 合同来源
	private String contractReason; // 合同原因
*/	private String contractExpired; // 合同过期日期
/*	private Integer contractDays; // 合同过期天数
	private String contractStatus; // 合同状态
	private String contractLicenseDuration; // 合同License时间
*/	private String contractLicenseStartOn; // 合同License开始日期
	private String contractLicenseEndOn; // 合同License到期日期
/*	private String contractLicenseOption; // 合同License开始选项
	private Integer contractAuthorCount; // 合同作者获取免费样书个数
	private Integer contractProxyCount; // 合同代理商获取免费样书个数
	private BigDecimal contractBailAmount; // 合同保证金
	private BigDecimal contractMaxAmount; // 合同最多金额
	private BigDecimal contractMinAmount; // 合同最少金额
	private BigDecimal contractProxyAmount; // 合同代理费
*/	
	private Map<String, String> contractTypeMap =  new HashMap<String, String>();
	
	public Map<String, String> getContractTypeMap() {
		return contractTypeMap;
	}

	public void setContractTypeMap(Map<String, String> contractTypeMap) {
		this.contractTypeMap = contractTypeMap;
	}

	public CrContract getCrContract() {
		return crContract;
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

	public void setCrContract(CrContract crContract) {
		this.crContract = crContract;
	}

	public String getContractDate() {
		return contractDate;
	}

	public void setContractDate(String contractDate) {
		this.contractDate = contractDate;
	}

	public String getContractExpired() {
		return contractExpired;
	}

	public void setContractExpired(String contractExpired) {
		this.contractExpired = contractExpired;
	}

	public String getContractLicenseStartOn() {
		return contractLicenseStartOn;
	}

	public void setContractLicenseStartOn(String contractLicenseStartOn) {
		this.contractLicenseStartOn = contractLicenseStartOn;
	}

	public String getContractLicenseEndOn() {
		return contractLicenseEndOn;
	}

	public void setContractLicenseEndOn(String contractLicenseEndOn) {
		this.contractLicenseEndOn = contractLicenseEndOn;
	}

	
}
