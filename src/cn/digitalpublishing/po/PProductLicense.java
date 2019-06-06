package cn.digitalpublishing.po;

import org.codehaus.jackson.annotate.JsonIgnore;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @name 01_产品许可
 * @table P_PRODUCT_LICENSE
 */
@SuppressWarnings("serial")
public class PProductLicense implements Serializable {

	private String licenseId; // 产品许可ID
	private String licenseType; // 产品许可类型
	private String licenseName; // 产品许可名称
	private Date licenseStartOn; // 产品许可开始时间
	private Date licenseEndOn; // 产品许可结束时间
    private Integer licenseMax; // 产品许可并发数
    private String licenseMode; // 产品许可授权方式
	private PProductType productType; // 01_产品类型
	@JsonIgnore
	private Set<PProduct> productSet = new HashSet<PProduct>(); // 01_产品


	public String getLicenseId() {
		return licenseId;
	}

	public void setLicenseId(String licenseId) {
		this.licenseId = licenseId;
	}

	public String getLicenseType() {
		return licenseType;
	}

	public void setLicenseType(String licenseType) {
		this.licenseType = licenseType;
	}

	public String getLicenseName() {
		return licenseName;
	}

	public void setLicenseName(String licenseName) {
		this.licenseName = licenseName;
	}

	public Date getLicenseStartOn() {
		return licenseStartOn;
	}

	public void setLicenseStartOn(Date licenseStartOn) {
		this.licenseStartOn = licenseStartOn;
	}

	public Date getLicenseEndOn() {
		return licenseEndOn;
	}

	public void setLicenseEndOn(Date licenseEndOn) {
		this.licenseEndOn = licenseEndOn;
	}

	public PProductType getProductType() {
		return productType;
	}

	public void setProductType(PProductType productType) {
		this.productType = productType;
	}

    public Integer getLicenseMax() {
        return licenseMax;
    }

    public void setLicenseMax(Integer licenseMax) {
        this.licenseMax = licenseMax;
    }

    public String getLicenseMode() {
        return licenseMode;
    }

    public void setLicenseMode(String licenseMode) {
        this.licenseMode = licenseMode;
    }

    public Set<PProduct> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<PProduct> productSet) {
        this.productSet = productSet;
    }
}
