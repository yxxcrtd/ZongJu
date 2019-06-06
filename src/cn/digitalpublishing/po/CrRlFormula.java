package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;

/**
 * @name 计算公式
 * @table CR_RL_FORMULA
 */
@SuppressWarnings("serial")
public class CrRlFormula implements Serializable {

	private String formulaId; // 版税公式ID
	private BigDecimal breakPoint; // 分割值
	private BigDecimal rateValue; // 比率值
	private String formulaType; // 公式类型，1：版税计算，2：附属版权计算
	private CrRlOwnerRoyalty rlOwnerRoyalty; // 人员版税计算规则
	private CrSubsidaryRight subsidaryRight; // 版税附属权利

	public String getFormulaId() {
		return formulaId;
	}

	public void setFormulaId(String formulaId) {
		this.formulaId = formulaId;
	}

	public BigDecimal getBreakPoint() {
		return breakPoint;
	}

	public void setBreakPoint(BigDecimal breakPoint) {
		this.breakPoint = breakPoint;
	}

	public BigDecimal getRateValue() {
		return rateValue;
	}

	public void setRateValue(BigDecimal rateValue) {
		this.rateValue = rateValue;
	}

	public String getFormulaType() {
		return formulaType;
	}

	public void setFormulaType(String formulaType) {
		this.formulaType = formulaType;
	}

	public CrRlOwnerRoyalty getRlOwnerRoyalty() {
		return rlOwnerRoyalty;
	}

	public void setRlOwnerRoyalty(CrRlOwnerRoyalty rlOwnerRoyalty) {
		this.rlOwnerRoyalty = rlOwnerRoyalty;
	}

	public CrSubsidaryRight getSubsidaryRight() {
		return subsidaryRight;
	}

	public void setSubsidaryRight(CrSubsidaryRight subsidaryRight) {
		this.subsidaryRight = subsidaryRight;
	}
}