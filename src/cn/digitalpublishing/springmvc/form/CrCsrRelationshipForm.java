package cn.digitalpublishing.springmvc.form;

import java.util.List;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrCsrRelationshipForm extends DataTableForm<CrCsrRelationship> {

	private CrCsrRelationship csrRelationship = new CrCsrRelationship();
	private List<CrCsrRelationship> crCsrList; // 国别附属权利关系
	private List<BCountry> countryList;
	private BCountry country; // 国别
	private CrSubsidaryRight subsidaryRight; // 版税附属权利

	public CrCsrRelationship getCsrRelationship() {
		return csrRelationship;
	}

	public void setCsrRelationship(CrCsrRelationship csrRelationship) {
		this.csrRelationship = csrRelationship;
	}

	public List<CrCsrRelationship> getCrCsrList() {
		return crCsrList;
	}

	public void setCrCsrList(List<CrCsrRelationship> crCsrList) {
		this.crCsrList = crCsrList;
	}

	public List<BCountry> getCountryList() {
		return countryList;
	}

	public void setCountryList(List<BCountry> countryList) {
		this.countryList = countryList;
	}

	public BCountry getCountry() {
		return country;
	}

	public void setCountry(BCountry country) {
		this.country = country;
	}

	public CrSubsidaryRight getSubsidaryRight() {
		return subsidaryRight;
	}

	public void setSubsidaryRight(CrSubsidaryRight subsidaryRight) {
		this.subsidaryRight = subsidaryRight;
	}
}