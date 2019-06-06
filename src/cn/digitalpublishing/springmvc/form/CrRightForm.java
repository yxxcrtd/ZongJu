package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;

import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRightForm extends DataTableForm<CrRight> {

	private CrRight crRight = new CrRight();
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRight getCrRight() {
		return crRight;
	}

	public void setCrRight(CrRight crRight) {
		this.crRight = crRight;
	}

	public Map<String, Object> getDic() {
		return dic;
	}

	public void setDic(Map<String, Object> dic) {
		this.dic = dic;
	}
}