package cn.digitalpublishing.springmvc.form.base;

import java.util.List;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class BDicForm extends DataTableForm<BDic> {
	private String code;
	private String name;
	private String internationCode;
	private Integer status;
	private List<BDic> dicList;
	private BDic obj;
	private List<BDicClass> dicClassList;
	private String classId;
	
	private Integer order;
	
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
	public BDic getObj() {
		return obj;
	}
	public void setObj(BDic obj) {
		this.obj = obj;
	}
	public List<BDic> getDicList() {
		return dicList;
	}
	public void setDicList(List<BDic> dicList) {
		this.dicList = dicList;
	}
	public List<BDicClass> getDicClassList() {
		return dicClassList;
	}
	public void setDicClassList(List<BDicClass> dicClassList) {
		this.dicClassList = dicClassList;
	}
	public String getClassId() {
		return classId;
	}
	public void setClassId(String classId) {
		this.classId = classId;
	}
	public Integer getOrder() {
		return order;
	}
	public void setOrder(Integer order) {
		this.order = order;
	}
}
