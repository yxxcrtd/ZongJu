package cn.digitalpublishing.springmvc.form;

import java.util.List;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrLsrRelationshipForm extends DataTableForm<CrLsrRelationship> {

	private CrLsrRelationship lsrRelationship = new CrLsrRelationship();
	private List<CrLsrRelationship> crLsrList; // 语种附属权利关系
	private List<BDic> languageList;
	private BDic language; // 语种
	private CrSubsidaryRight subsidaryRight; // 版税附属权利

	public CrLsrRelationship getLsrRelationship() {
		return lsrRelationship;
	}

	public void setLsrRelationship(CrLsrRelationship lsrRelationship) {
		this.lsrRelationship = lsrRelationship;
	}

	public List<CrLsrRelationship> getCrLsrList() {
		return crLsrList;
	}

	public void setCrLsrList(List<CrLsrRelationship> crLsrList) {
		this.crLsrList = crLsrList;
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

	public CrSubsidaryRight getSubsidaryRight() {
		return subsidaryRight;
	}

	public void setSubsidaryRight(CrSubsidaryRight subsidaryRight) {
		this.subsidaryRight = subsidaryRight;
	}
}