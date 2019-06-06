package cn.digitalpublishing.springmvc.form;

import java.util.List;

import cn.digitalpublishing.po.Integral;

public class IntegralForm extends DataTableForm<Integral> {
	
	private Integral obj;
	
	private List<Integral> integralList;
	
	private String userId;

	public Integral getObj() {
		return obj;
	}

	public void setObj(Integral obj) {
		this.obj = obj;
	}

	public List<Integral> getIntegralList() {
		return integralList;
	}

	public void setIntegralList(List<Integral> integralList) {
		this.integralList = integralList;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
}
