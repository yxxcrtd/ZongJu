package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.po.CrRlOwnerFee;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlOwnerFeeForm extends DataTableForm<CrRlOwnerFee> {

	private CrRlOwnerFee crOwnerFee = new CrRlOwnerFee();
	private CrRlOwner crOwner;
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlOwnerFee getCrOwnerFee() {
		return crOwnerFee;
	}

	public void setCrOwnerFee(CrRlOwnerFee crOwnerFee) {
		this.crOwnerFee = crOwnerFee;
	}
	
	public CrRlOwner getCrOwner() {
		return crOwner;
	}

	public void setCrOwner(CrRlOwner crOwner) {
		this.crOwner = crOwner;
	}

	public Map<String, Object> getDic() {
		return dic;
	}

	public void setDic(Map<String, Object> dic) {
		this.dic = dic;
	}
}