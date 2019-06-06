package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * @name 01_产品类型
 * @table P_PRODUCT_TYPE
 */
@SuppressWarnings("serial")
public class PProductType implements Serializable {

    private String id; // 产品类型ID
    private String name; // 产品类型名称
    private String code; // 产品类型编号
    private Integer order; // 产品类型排序
    private String status; // 产品类型状态
    private String treeCode; // 产品类型树形编码
    private String internationCode; // 国际化参数
    // 父ID（仅仅是查询用）
    private String parentId;
    private PProductType parentProductType; // 01_产品类型
    @JsonIgnore
    private Set<PProductType> productTypeSet = new HashSet<PProductType>(); // 01_产品类型
    @JsonIgnore
    private Set<PProduct> productSet = new HashSet<PProduct>(); // 01_产品基础信息

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public Integer getOrder() {
        return order;
    }

    public void setOrder(Integer order) {
        this.order = order;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getTreeCode() {
        return treeCode;
    }

    public void setTreeCode(String treeCode) {
        this.treeCode = treeCode;
    }

    public String getInternationCode() {
        return internationCode;
    }

    public void setInternationCode(String internationCode) {
        this.internationCode = internationCode;
    }

    public PProductType getParentProductType() {
        return parentProductType;
    }

    public void setParentProductType(PProductType parentProductType) {
        this.parentProductType = parentProductType;
    }

    public Set<PProductType> getProductTypeSet() {
        return productTypeSet;
    }

    public void setProductTypeSet(Set<PProductType> productTypeSet) {
        this.productTypeSet = productTypeSet;
    }

    public Set<PProduct> getProductSet() {
        return productSet;
    }

    public void setProductSet(Set<PProduct> productSet) {
        this.productSet = productSet;
    }

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}
    
}