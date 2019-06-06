package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Recharge;

public class RechargeForm extends DataTableForm<Recharge> {
	
	private Recharge obj;
	
	private String userId;

	public Recharge getObj() {
		return obj;
	}

	public void setObj(Recharge obj) {
		this.obj = obj;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
