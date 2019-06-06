package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * @name 00_数据字典
 * @table B_DIC
 */
@SuppressWarnings("serial")
public class BDic implements Serializable {

	private String id; // 数据字典ID
	private String code; // 数据字典编号
	private String name; // 数据字典名称
	private Integer order; // 数据字典排序
	private String status; // 数据字典状态
	private String internationCode; // 国际化
	private BDicClass dicClass; // 00_数据字典分类

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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

	public Integer getOrder() {
		return order;
	}

	public void setOrder(Integer order) {
		this.order = order;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getInternationCode() {
		return internationCode;
	}

	public void setInternationCode(String internationCode) {
		this.internationCode = internationCode;
	}

	public BDicClass getDicClass() {
		return dicClass;
	}

	public void setDicClass(BDicClass dicClass) {
		this.dicClass = dicClass;
	}
}