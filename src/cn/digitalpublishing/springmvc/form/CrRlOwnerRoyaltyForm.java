package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.po.CrRlOwnerRoyalty;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlOwnerRoyaltyForm extends DataTableForm<CrRlOwnerRoyalty> {

	private CrRlOwnerRoyalty crOwnerRoyalty = new CrRlOwnerRoyalty();
	private CrRlOwner crOwner;
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlOwnerRoyalty getCrOwnerRoyalty() {
		return crOwnerRoyalty;
	}

	public void setCrOwnerRoyalty(CrRlOwnerRoyalty crOwnerRoyalty) {
		this.crOwnerRoyalty = crOwnerRoyalty;
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