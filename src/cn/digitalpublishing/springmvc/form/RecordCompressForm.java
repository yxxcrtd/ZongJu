package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.RecordCompress;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class RecordCompressForm extends DataTableForm<RecordCompress> {
	
	private RecordCompress obj;

	private String name;
	
	private String bname;

	public RecordCompress getObj() {
		return obj;
	}

	public void setObj(RecordCompress obj) {
		this.obj = obj;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getBname() {
		return bname;
	}

	public void setBname(String bname) {
		this.bname = bname;
	}
	
}