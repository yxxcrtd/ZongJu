package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;
import java.math.BigDecimal;

/**
 * @name 版税附属权利
 * @table CR_SUBSIDARY_RIGHT
 */
@SuppressWarnings("serial")
public class CrSubsidaryRight implements Serializable {

	private String srlicenseId; // 附属权利ID
	private BigDecimal retainPercent; // 预留百分比
	private BigDecimal ownerPercent; // 所有者百分比
	private BigDecimal initRate; // 初始比率
	private String level; // 附属权利级别
	private String status; // 附属权利状态
	private String royaltyRule; // 版税规则
	private String adjustRule; // 调整规则
	private CrRight right; // 权利授权
	private CrLicenseType licenseType; // 授权类型
	private PProduct product; // 产品基础信息
	private PStructure structure; // 结构
	@JsonIgnore
	private Set<CrLsrRelationship> lsrRelationshipSet = new HashSet<CrLsrRelationship>(); // 语种附属权利关系
	@JsonIgnore
	private Set<CrCsrRelationship> csrRelationshipSet = new HashSet<CrCsrRelationship>(); // 国别附属权利关系
	@JsonIgnore
	private Set<CrRlFormula> rlFormulaSet = new HashSet<CrRlFormula>(); // 计算公式

	public String getSrlicenseId() {
		return srlicenseId;
	}

	public void setSrlicenseId(String srlicenseId) {
		this.srlicenseId = srlicenseId;
	}

	public BigDecimal getRetainPercent() {
		return retainPercent;
	}

	public void setRetainPercent(BigDecimal retainPercent) {
		this.retainPercent = retainPercent;
	}

	public BigDecimal getOwnerPercent() {
		return ownerPercent;
	}

	public void setOwnerPercent(BigDecimal ownerPercent) {
		this.ownerPercent = ownerPercent;
	}

	public BigDecimal getInitRate() {
		return initRate;
	}

	public void setInitRate(BigDecimal initRate) {
		this.initRate = initRate;
	}

	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getRoyaltyRule() {
		return royaltyRule;
	}

	public void setRoyaltyRule(String royaltyRule) {
		this.royaltyRule = royaltyRule;
	}

	public String getAdjustRule() {
		return adjustRule;
	}

	public void setAdjustRule(String adjustRule) {
		this.adjustRule = adjustRule;
	}

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}

	public CrLicenseType getLicenseType() {
		return licenseType;
	}

	public void setLicenseType(CrLicenseType licenseType) {
		this.licenseType = licenseType;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public PStructure getStructure() {
		return structure;
	}

	public void setStructure(PStructure structure) {
		this.structure = structure;
	}

	public Set<CrLsrRelationship> getLsrRelationshipSet() {
		return lsrRelationshipSet;
	}

	public void setLsrRelationshipSet(Set<CrLsrRelationship> lsrRelationshipSet) {
		this.lsrRelationshipSet = lsrRelationshipSet;
	}

	public Set<CrCsrRelationship> getCsrRelationshipSet() {
		return csrRelationshipSet;
	}

	public void setCsrRelationshipSet(Set<CrCsrRelationship> csrRelationshipSet) {
		this.csrRelationshipSet = csrRelationshipSet;
	}

	public Set<CrRlFormula> getRlFormulaSet() {
		return rlFormulaSet;
	}

	public void setRlFormulaSet(Set<CrRlFormula> rlFormulaSet) {
		this.rlFormulaSet = rlFormulaSet;
	}
}