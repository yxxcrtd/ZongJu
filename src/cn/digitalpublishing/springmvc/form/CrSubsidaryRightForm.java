package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.*;
import cn.digitalpublishing.springmvc.form.DataTableForm;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CrSubsidaryRightForm extends DataTableForm<CrSubsidaryRight> {

	private CrSubsidaryRight obj = new CrSubsidaryRight();
	private CrRight right;

    private List<PProduct> productList = new ArrayList<PProduct>();
//    private List<PProductPersonRelationship> productPersonRelationshipList = new ArrayList<PProductPersonRelationship>();
    private List<PProductStructureRelationship> productStructureRelationshipDistinctTypeList = new ArrayList<PProductStructureRelationship>();
    private List<PProductStructureRelationship> productStructureRelationshipList = new ArrayList<PProductStructureRelationship>();
    private List<PStructure> structureList = new ArrayList<PStructure>();
    private List<CrLicenseType> licenseTypeList = new ArrayList<CrLicenseType>();

    private Map<String, String> statusMap = new HashMap<String, String>();
    private Map<String, String> royaltyRuleMap = new HashMap<String, String>();
    private Map<String, String> adjustRuleMap = new HashMap<String, String>();
    private Map<String, String> levelMap = new HashMap<String, String>();

    public CrSubsidaryRight getObj() {
        return obj;
    }

    public void setObj(CrSubsidaryRight obj) {
        this.obj = obj;
    }

    public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}

	public List<PProduct> getProductList() {
        return productList;
    }

    public void setProductList(List<PProduct> productList) {
        this.productList = productList;
    }

    public List<PProductStructureRelationship> getProductStructureRelationshipList() {
        return productStructureRelationshipList;
    }

    public void setProductStructureRelationshipList(List<PProductStructureRelationship> productStructureRelationshipList) {
        this.productStructureRelationshipList = productStructureRelationshipList;
    }

    public List<PStructure> getStructureList() {
        return structureList;
    }

    public void setStructureList(List<PStructure> structureList) {
        this.structureList = structureList;
    }

    public List<CrLicenseType> getLicenseTypeList() {
        return licenseTypeList;
    }

    public void setLicenseTypeList(List<CrLicenseType> licenseTypeList) {
        this.licenseTypeList = licenseTypeList;
    }

    public Map<String, String> getStatusMap() {
        return statusMap;
    }

    public void setStatusMap(Map<String, String> statusMap) {
        this.statusMap = statusMap;
    }

    public Map<String, String> getRoyaltyRuleMap() {
        return royaltyRuleMap;
    }

    public void setRoyaltyRuleMap(Map<String, String> royaltyRuleMap) {
        this.royaltyRuleMap = royaltyRuleMap;
    }

    public Map<String, String> getAdjustRuleMap() {
        return adjustRuleMap;
    }

    public void setAdjustRuleMap(Map<String, String> adjustRuleMap) {
        this.adjustRuleMap = adjustRuleMap;
    }

    public Map<String, String> getLevelMap() {
        return levelMap;
    }

    public void setLevelMap(Map<String, String> levelMap) {
        this.levelMap = levelMap;
    }

    public List<PProductStructureRelationship> getProductStructureRelationshipDistinctTypeList() {
        return productStructureRelationshipDistinctTypeList;
    }

    public void setProductStructureRelationshipDistinctTypeList(List<PProductStructureRelationship> productStructureRelationshipDistinctTypeList) {
        this.productStructureRelationshipDistinctTypeList = productStructureRelationshipDistinctTypeList;
    }
}
