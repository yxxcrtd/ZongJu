package cn.digitalpublishing.springmvc.form;

import java.util.List;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCrcRelationship;
import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrCrcRelationshipForm extends DataTableForm<CrCrcRelationship> {

	private CrCrcRelationship crcRelationship = new CrCrcRelationship();
	private List<CrCrcRelationship> crccList; // 国别权利合同关系集合
	private List<BCountry> countryList;
	private BCountry country; // 国别
	private CrRight right; // 权利授权

	public CrCrcRelationship getCrcRelationship() {
		return crcRelationship;
	}

	public void setCrcRelationship(CrCrcRelationship crcRelationship) {
		this.crcRelationship = crcRelationship;
	}

	public List<CrCrcRelationship> getCrccList() {
		return crccList;
	}

	public void setCrccList(List<CrCrcRelationship> crccList) {
		this.crccList = crccList;
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

	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}
}