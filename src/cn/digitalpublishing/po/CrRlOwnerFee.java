package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;
import java.math.BigDecimal;

/**
 * @name 预付款及固定费用
 * @table CR_RL_OWNER_FEE
 */
@SuppressWarnings("serial")
public class CrRlOwnerFee implements Serializable {

	private String fixfeeId; // 费用ID
	private String expenseType; // 费用类型
	private BigDecimal fixfeeVal; // 费用值
	private CrRlOwner rlOwner; // 权利授权者
	@JsonIgnore
	private Set<CrRlFixfeePaymentTerm> rlFixfeePaymentTermSet = new HashSet<CrRlFixfeePaymentTerm>(); // 固定费用付款条款

	public String getFixfeeId() {
		return fixfeeId;
	}

	public void setFixfeeId(String fixfeeId) {
		this.fixfeeId = fixfeeId;
	}

	public String getExpenseType() {
		return expenseType;
	}

	public void setExpenseType(String expenseType) {
		this.expenseType = expenseType;
	}

	public BigDecimal getFixfeeVal() {
		return fixfeeVal;
	}

	public void setFixfeeVal(BigDecimal fixfeeVal) {
		this.fixfeeVal = fixfeeVal;
	}

	public CrRlOwner getRlOwner() {
		return rlOwner;
	}

	public void setRlOwner(CrRlOwner rlOwner) {
		this.rlOwner = rlOwner;
	}

	public Set<CrRlFixfeePaymentTerm> getRlFixfeePaymentTermSet() {
		return rlFixfeePaymentTermSet;
	}

	public void setRlFixfeePaymentTermSet(Set<CrRlFixfeePaymentTerm> rlFixfeePaymentTermSet) {
		this.rlFixfeePaymentTermSet = rlFixfeePaymentTermSet;
	}
}