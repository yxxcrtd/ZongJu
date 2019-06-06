package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * @name 00_数据字典分类
 * @table B_DIC_CLASS
 */
@SuppressWarnings("serial")
public class BDicClass implements Serializable {

	private String id; // 数据字典分类ID
	private String code; // 数据字典分类编号
	private String name; // 数据字典分类名称
	private String status; // 数据字典分类状态
	private String internationCode; // 国际化参数
	@JsonIgnore
	private Set<BDic> dicSet = new HashSet<BDic>(); // 00_数据字典

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

	public Set<BDic> getDicSet() {
		return dicSet;
	}

	public void setDicSet(Set<BDic> dicSet) {
		this.dicSet = dicSet;
	}
}