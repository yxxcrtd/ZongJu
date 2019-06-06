package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * @name 语种附属权利关系
 * @table CR_LSR_RELATIONSHIP
 */
@SuppressWarnings("serial")
public class CrLsrRelationship implements Serializable {

	private String id; // 语种附属权利关系ID
	private BDic language; // 语种
	private CrSubsidaryRight subsidaryRight; // 版税附属权利

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public BDic getLanguage() {
		return language;
	}

	public void setLanguage(BDic language) {
		this.language = language;
	}

	public CrSubsidaryRight getSubsidaryRight() {
		return subsidaryRight;
	}

	public void setSubsidaryRight(CrSubsidaryRight subsidaryRight) {
		this.subsidaryRight = subsidaryRight;
	}
}