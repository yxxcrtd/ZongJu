package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * @name 01_结构
 * @table P_STRUCTURE
 */
@SuppressWarnings("serial")
public class PStructure implements Serializable {

	private String id; // 结构ID
	private String code; // 结构编号
	private String name; // 结构名称
    private String status; // 结构状态
    private String keyword; // 结构关键字
    private String path; // 结构路径
    @JsonIgnore
    private Set<PProductStructureRelationship> productStructureRelationshipSet = new HashSet<PProductStructureRelationship>(); // 01_产品和结构关系

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<PProductStructureRelationship> getProductStructureRelationshipSet() {
        return productStructureRelationshipSet;
    }

    public void setProductStructureRelationshipSet(Set<PProductStructureRelationship> productStructureRelationshipSet) {
        this.productStructureRelationshipSet = productStructureRelationshipSet;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }
}