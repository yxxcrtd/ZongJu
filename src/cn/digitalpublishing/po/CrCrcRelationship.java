package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * @name 国别权利合同关系
 * @table CR_CRC_RELATIONSHIP
 */
@SuppressWarnings("serial")
public class CrCrcRelationship implements Serializable {

	private String id; // 国别权利合同关系ID
//	private BCountry country; // 国别
	private CrRight right; // 权利授权

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

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}
}