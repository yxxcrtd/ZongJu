package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.CrLicenseType;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrLicenseTypeForm extends DataTableForm<CrLicenseType> {

	private CrLicenseType crLicenseType = new CrLicenseType();

	public CrLicenseType getCrLicenseType() {
		return crLicenseType;
	}

	public void setCrLicenseType(CrLicenseType crLicenseType) {
		this.crLicenseType = crLicenseType;
	}
}