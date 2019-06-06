package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * @name 国别附属权利关系
 * @table CR_CSR_RELATIONSHIP
 */
@SuppressWarnings("serial")
public class CrCsrRelationship implements Serializable {

	private String id; // 国别附属权利关系ID
//	private BCountry country; // 国别
	private CrSubsidaryRight subsidaryRight; // 版税附属权利

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

//	public BCountry getCountry() {
//		return country;
//	}
//
//	public void setCountry(BCountry country) {
//		this.country = country;
//	}

	public CrSubsidaryRight getSubsidaryRight() {
		return subsidaryRight;
	}

	public void setSubsidaryRight(CrSubsidaryRight subsidaryRight) {
		this.subsidaryRight = subsidaryRight;
	}
}