package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;
import java.math.BigDecimal;

/**
 * @name 人员版税计算规则
 * @table CR_RL_OWNER_ROYALTY
 */
@SuppressWarnings("serial")
public class CrRlOwnerRoyalty implements Serializable {

	private String rloRoyaltyId; // 人员版税计算ID
	private BigDecimal royaltyDiscount; // 版税折扣
	private String royaltyText; // 版税信息
	private Boolean reserveReturn; // 退货预留
	private Boolean royaltyIndividual; // 独特的
	private Integer chapterRateRise; // 意率上升，作废
	private BigDecimal initRate; // 初始比率
	private String market; // 市场
	private String priceType; // 价格类型
	private String taxDescription; // 税务说明
	private String rulesState; // 规则状态
	private String royaltyType; // 版税类型
	private String adjustRule; // 调整规则
	private CrRlOwner rlOwner; // 权利授权者
	private CrRlRoyaltyRule rlRoyaltyRule; // 版税规则库
	@JsonIgnore
	private Set<CrRlFormula> rlFormulaSet = new HashSet<CrRlFormula>(); // 计算公式

	public String getRloRoyaltyId() {
		return rloRoyaltyId;
	}

	public void setRloRoyaltyId(String rloRoyaltyId) {
		this.rloRoyaltyId = rloRoyaltyId;
	}

	public BigDecimal getRoyaltyDiscount() {
		return royaltyDiscount;
	}

	public void setRoyaltyDiscount(BigDecimal royaltyDiscount) {
		this.royaltyDiscount = royaltyDiscount;
	}

	public String getRoyaltyText() {
		return royaltyText;
	}

	public void setRoyaltyText(String royaltyText) {
		this.royaltyText = royaltyText;
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

	public BigDecimal getInitRate() {
		return initRate;
	}

	public void setInitRate(BigDecimal initRate) {
		this.initRate = initRate;
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

	public String getAdjustRule() {
		return adjustRule;
	}

	public void setAdjustRule(String adjustRule) {
		this.adjustRule = adjustRule;
	}

	public CrRlOwner getRlOwner() {
		return rlOwner;
	}

	public void setRlOwner(CrRlOwner rlOwner) {
		this.rlOwner = rlOwner;
	}

	public CrRlRoyaltyRule getRlRoyaltyRule() {
		return rlRoyaltyRule;
	}

	public void setRlRoyaltyRule(CrRlRoyaltyRule rlRoyaltyRule) {
		this.rlRoyaltyRule = rlRoyaltyRule;
	}

	public Set<CrRlFormula> getRlFormulaSet() {
		return rlFormulaSet;
	}

	public void setRlFormulaSet(Set<CrRlFormula> rlFormulaSet) {
		this.rlFormulaSet = rlFormulaSet;
	}
}