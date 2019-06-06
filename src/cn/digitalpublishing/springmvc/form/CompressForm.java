package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.Compress;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CompressForm extends DataTableForm<Compress> {
	
	private Compress obj;
	
	private String name;
	
	private String remark;
	
	private String[] ids;
	
	private String compressId;

	public Compress getObj() {
		return obj;
	}

	public void setObj(Compress obj) {
		this.obj = obj;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public String[] getIds() {
		return ids;
	}

	public void setIds(String[] ids) {
		this.ids = ids;
	}

	public String getCompressId() {
		return compressId;
	}

	public void setCompressId(String compressId) {
		this.compressId = compressId;
	}

}