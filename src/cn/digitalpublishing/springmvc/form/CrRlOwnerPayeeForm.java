package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.po.CrRlOwnerPayee;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlOwnerPayeeForm extends DataTableForm<CrRlOwnerPayee> {

	private CrRlOwnerPayee crOwnerPayee = new CrRlOwnerPayee();
	private CrRlOwner crOwner;
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlOwnerPayee getCrOwnerPayee() {
		return crOwnerPayee;
	}

	public void setCrOwnerPayee(CrRlOwnerPayee crOwnerPayee) {
		this.crOwnerPayee = crOwnerPayee;
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