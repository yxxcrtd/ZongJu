package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;
import cn.digitalpublishing.po.CrRlRoyaltyRule;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlRoyaltyRuleForm extends DataTableForm<CrRlRoyaltyRule> {

	private CrRlRoyaltyRule crRoyaltyRule = new CrRlRoyaltyRule();
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlRoyaltyRule getCrRoyaltyRule() {
		return crRoyaltyRule;
	}

	public void setCrRoyaltyRule(CrRlRoyaltyRule crRoyaltyRule) {
		this.crRoyaltyRule = crRoyaltyRule;
	}

	public Map<String, Object> getDic() {
		return dic;
	}

	public void setDic(Map<String, Object> dic) {
		this.dic = dic;
	}
}