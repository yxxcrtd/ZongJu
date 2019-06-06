package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;

/**
 * @name 固定费用付款条款
 * @table CR_RL_FIXFEE_PAYMENT_TERM
 */
@SuppressWarnings("serial")
public class CrRlFixfeePaymentTerm implements Serializable {

	private String fixfeePayId; // 固定费用付款条款ID
	private Date payDueDate; // 预计时间
	private Date paidDate; // 付款日期
	private String paidReference; // 付款参考
	private String invoiceNumber; // 发票编号
	private Date invoiceDate; // 发票日期
	private CrRlOwnerFee rlOwnerFee; // 预付款及固定费用


	public String getFixfeePayId() {
		return fixfeePayId;
	}

	public void setFixfeePayId(String fixfeePayId) {
		this.fixfeePayId = fixfeePayId;
	}

	public Date getPayDueDate() {
		return payDueDate;
	}

	public void setPayDueDate(Date payDueDate) {
		this.payDueDate = payDueDate;
	}

	public Date getPaidDate() {
		return paidDate;
	}

	public void setPaidDate(Date paidDate) {
		this.paidDate = paidDate;
	}

	public String getPaidReference() {
		return paidReference;
	}

	public void setPaidReference(String paidReference) {
		this.paidReference = paidReference;
	}

	public String getInvoiceNumber() {
		return invoiceNumber;
	}

	public void setInvoiceNumber(String invoiceNumber) {
		this.invoiceNumber = invoiceNumber;
	}

	public Date getInvoiceDate() {
		return invoiceDate;
	}

	public void setInvoiceDate(Date invoiceDate) {
		this.invoiceDate = invoiceDate;
	}

	public CrRlOwnerFee getRlOwnerFee() {
		return rlOwnerFee;
	}

	public void setRlOwnerFee(CrRlOwnerFee rlOwnerFee) {
		this.rlOwnerFee = rlOwnerFee;
	}
}