package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;
import java.math.BigDecimal;

/**
 * @name 版税规则库
 * @table CR_RL_ROYALTY_RULE
 */
@SuppressWarnings("serial")
public class CrRlRoyaltyRule implements Serializable {

	private String royaltyRuleId; // 版税规则ID
	private String royaltyRuleName; // 规则名称
	private String royaltyRuleCode; // 规则编号
	private Boolean royaltyRuleLock; // 规则锁定
	private String royaltyText; // 版税信息
	private BigDecimal royaltyDiscount; // 版税折扣
	private Boolean reserveReturn; // 退货预留
	private Boolean royaltyIndividual; // 独特的
	private Integer chapterRateRise; // 意率上升，作废
	private String market; // 市场
	private String priceType; // 价格类型
	private String taxDescription; // 税务说明
	private String rulesState; // 规则状态
	private String royaltyType; // 版税类型
	@JsonIgnore
	private Set<CrRlOwnerRoyalty> rlOwnerRoyaltySet = new HashSet<CrRlOwnerRoyalty>(); // 人员版税计算规则

	public String getRoyaltyRuleId() {
		return royaltyRuleId;
	}

	public void setRoyaltyRuleId(String royaltyRuleId) {
		this.royaltyRuleId = royaltyRuleId;
	}

	public String getRoyaltyRuleName() {
		return royaltyRuleName;
	}

	public void setRoyaltyRuleName(String royaltyRuleName) {
		this.royaltyRuleName = royaltyRuleName;
	}

	public String getRoyaltyRuleCode() {
		return royaltyRuleCode;
	}

	public void setRoyaltyRuleCode(String royaltyRuleCode) {
		this.royaltyRuleCode = royaltyRuleCode;
	}

	public Boolean getRoyaltyRuleLock() {
		return royaltyRuleLock;
	}

	public void setRoyaltyRuleLock(Boolean royaltyRuleLock) {
		this.royaltyRuleLock = royaltyRuleLock;
	}

	public String getRoyaltyText() {
		return royaltyText;
	}

	public void setRoyaltyText(String royaltyText) {
		this.royaltyText = royaltyText;
	}

	public BigDecimal getRoyaltyDiscount() {
		return royaltyDiscount;
	}

	public void setRoyaltyDiscount(BigDecimal royaltyDiscount) {
		this.royaltyDiscount = royaltyDiscount;
	}

	public Boolean getReserveReturn() {
		return reserveReturn;
	}

	public void setReserveReturn(Boolean reserveReturn) {
		this.reserveReturn = reserveReturn;
	}

	public Boolean getRoyaltyIndividual() {
		return royaltyIndividual;
	}

	public void setRoyaltyIndividual(Boolean royaltyIndividual) {
		this.royaltyIndividual = royaltyIndividual;
	}

	public Integer getChapterRateRise() {
		return chapterRateRise;
	}

	public void setChapterRateRise(Integer chapterRateRise) {
		this.chapterRateRise = chapterRateRise;
	}

	public String getMarket() {
		return market;
	}

	public void setMarket(String market) {
		this.market = market;
	}

	public String getPriceType() {
		return priceType;
	}

	public void setPriceType(String priceType) {
		this.priceType = priceType;
	}

	public String getTaxDescription() {
		return taxDescription;
	}

	public void setTaxDescription(String taxDescription) {
		this.taxDescription = taxDescription;
	}

	public String getRulesState() {
		return rulesState;
	}

	public void setRulesState(String rulesState) {
		this.rulesState = rulesState;
	}

	public String getRoyaltyType() {
		return royaltyType;
	}

	public void setRoyaltyType(String royaltyType) {
		this.royaltyType = royaltyType;
	}

	public Set<CrRlOwnerRoyalty> getRlOwnerRoyaltySet() {
		return rlOwnerRoyaltySet;
	}

	public void setRlOwnerRoyaltySet(Set<CrRlOwnerRoyalty> rlOwnerRoyaltySet) {
		this.rlOwnerRoyaltySet = rlOwnerRoyaltySet;
	}
}