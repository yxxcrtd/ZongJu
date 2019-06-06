package cn.digitalpublishing.po;

import java.io.Serializable;

/**
 * @name 语种权利合同关系
 * @table CR_LRC_RELATIONSHIP
 */
@SuppressWarnings("serial")
public class CrLrcRelationship implements Serializable {

	private String id; // 语种权利合同关系ID
	private BDic language; // 语种
	private CrRight right; // 权利授权

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

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}
}