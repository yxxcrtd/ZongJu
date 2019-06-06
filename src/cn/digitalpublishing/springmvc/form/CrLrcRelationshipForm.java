package cn.digitalpublishing.springmvc.form;

import java.util.List;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLrcRelationship;
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrLrcRelationshipForm extends DataTableForm<CrLrcRelationship> {

	private CrLrcRelationship lrcRelationship = new CrLrcRelationship();
	private List<CrLrcRelationship> crLrcList; // 语种权利合同关系
	private List<BDic> languageList;
	private BDic language; // 语种
	private CrRight right; // 权利授权

	public CrLrcRelationship getLrcRelationship() {
		return lrcRelationship;
	}

	public void setLrcRelationship(CrLrcRelationship lrcRelationship) {
		this.lrcRelationship = lrcRelationship;
	}

	public List<CrLrcRelationship> getCrLrcList() {
		return crLrcList;
	}

	public void setCrLrcList(List<CrLrcRelationship> crLrcList) {
		this.crLrcList = crLrcList;
	}

	public List<BDic> getLanguageList() {
		return languageList;
	}

	public void setLanguageList(List<BDic> languageList) {
		this.languageList = languageList;
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