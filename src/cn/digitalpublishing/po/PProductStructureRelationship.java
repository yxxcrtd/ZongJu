package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * @name 01_产品和结构关系
 * @table P_PRODUCT_STRUCTURE_RELATIONSHIP
 */
@SuppressWarnings("serial")
public class PProductStructureRelationship implements Serializable {

	private String id; // 产品和结构关系ID
    private String status; // 产品和结构关系状态
    private String name; // 产品和结构关系名称
    private Integer structureOrder; // 产品和结构关系结构顺序
    private Integer elementOrder; // 产品和结构关系素材顺序
	private PProduct product; // 01_产品基础信息
	private PProductStructureRelationship parentProductStructureRelationship; // 01_产品和结构关系
	private PStructure structure; // 01_结构
	@JsonIgnore
	private Set<PProductStructureRelationship> productStructureRelationshipSet = new HashSet<PProductStructureRelationship>(); // 01_产品和结构关系
	private Long childSize;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public PProductStructureRelationship getParentProductStructureRelationship() {
		return parentProductStructureRelationship;
	}

	public void setParentProductStructureRelationship(PProductStructureRelationship parentProductStructureRelationship) {
		this.parentProductStructureRelationship = parentProductStructureRelationship;
	}

	public PStructure getStructure() {
		return structure;
	}

	public void setStructure(PStructure structure) {
		this.structure = structure;
	}

	public Set<PProductStructureRelationship> getProductStructureRelationshipSet() {
		return productStructureRelationshipSet;
	}

	public void setProductStructureRelationshipSet(Set<PProductStructureRelationship> productStructureRelationshipSet) {
		this.productStructureRelationshipSet = productStructureRelationshipSet;
	}

	public Long getChildSize() {
		return childSize;
	}

	public void setChildSize(Long childSize) {
		this.childSize = childSize;
	}

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getStructureOrder() {
        return structureOrder;
    }

    public void setStructureOrder(Integer structureOrder) {
        this.structureOrder = structureOrder;
    }

    public Integer getElementOrder() {
        return elementOrder;
    }

    public void setElementOrder(Integer elementOrder) {
        this.elementOrder = elementOrder;
    }
}