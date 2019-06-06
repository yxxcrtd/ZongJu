package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;

import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrRlOwner;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlOwnerForm extends DataTableForm<CrRlOwner> {

	private CrRlOwner crOwner = new CrRlOwner();
	private CrRight right;
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlOwner getCrOwner() {
		return crOwner;
	}

	public void setCrOwner(CrRlOwner crOwner) {
		this.crOwner = crOwner;
	}

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}

	public Map<String, Object> getDic() {
		return dic;
	}

	public void setDic(Map<String, Object> dic) {
		this.dic = dic;
	}
}