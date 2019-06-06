package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.CrRlFormula;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlFormulaForm extends DataTableForm<CrRlFormula> {

	private CrRlFormula crFormula = new CrRlFormula();
	private String type;

	public CrRlFormula getCrFormula() {
		return crFormula;
	}

	public void setCrFormula(CrRlFormula crFormula) {
		this.crFormula = crFormula;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
}