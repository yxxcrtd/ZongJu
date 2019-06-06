package cn.digitalpublishing.springmvc.form.base;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class BDicClassForm extends DataTableForm<BDicClass> {
	private String code;
	private String name;
	private String internationCode;
	private Integer status;
	private List<BDicClass> dicClassList;
	private Map<String, String> dicMap;
	private BDicClass obj;
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getInternationCode() {
		return internationCode;
	}
	public void setInternationCode(String internationCode) {
		this.internationCode = internationCode;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public BDicClass getObj() {
		return obj;
	}
	public void setObj(BDicClass obj) {
		this.obj = obj;
	}
	public List<BDicClass> getDicClassList() {
		return dicClassList;
	}
	public void setDicClassList(List<BDicClass> dicClassList) {
		this.dicClassList = dicClassList;
	}
	public Map<String, String> getDicMap() {
		return dicMap;
	}
	public void setDicMap(Map<String, String> dicMap) {
		this.dicMap = dicMap;
	}
	
}
