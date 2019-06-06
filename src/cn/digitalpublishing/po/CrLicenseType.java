package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * @name 授权类型
 * @table CR_LICENSE_TYPE
 */
@SuppressWarnings("serial")
public class CrLicenseType implements Serializable {

	private String licenseTypeId; // 授权类型ID
	private String licenseTypeName; // 授权类型名称
	private String licenseTypeCode; // 授权类型编号
	private String licenseTypeStatus; // 授权类型状态
	@JsonIgnore
	private Set<CrRight> rightSet = new HashSet<CrRight>(); // 权利授权
	@JsonIgnore
	private Set<CrSubsidaryRight> subsidaryRightSet = new HashSet<CrSubsidaryRight>(); // 版税附属权利

	public String getLicenseTypeId() {
		return licenseTypeId;
	}

	public void setLicenseTypeId(String licenseTypeId) {
		this.licenseTypeId = licenseTypeId;
	}

	public String getLicenseTypeName() {
		return licenseTypeName;
	}

	public void setLicenseTypeName(String licenseTypeName) {
		this.licenseTypeName = licenseTypeName;
	}

	public String getLicenseTypeCode() {
		return licenseTypeCode;
	}

	public void setLicenseTypeCode(String licenseTypeCode) {
		this.licenseTypeCode = licenseTypeCode;
	}

	public String getLicenseTypeStatus() {
		return licenseTypeStatus;
	}

	public void setLicenseTypeStatus(String licenseTypeStatus) {
		this.licenseTypeStatus = licenseTypeStatus;
	}

	public Set<CrRight> getRightSet() {
		return rightSet;
	}

	public void setRightSet(Set<CrRight> rightSet) {
		this.rightSet = rightSet;
	}

	public Set<CrSubsidaryRight> getSubsidaryRightSet() {
		return subsidaryRightSet;
	}

	public void setSubsidaryRightSet(Set<CrSubsidaryRight> subsidaryRightSet) {
		this.subsidaryRightSet = subsidaryRightSet;
	}
}