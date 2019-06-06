package cn.digitalpublishing.springmvc.form.product;

import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.form.DataTableForm;
import cn.digitalpublishing.util.TreeNode;

public class PStructureForm extends DataTableForm<PProductStructureRelationship> {
	
	private PStructure structure;
	private PProductStructureRelationship productStructureRelation;
	private PProductStructureRelationship parentProductStructureRelation;
	private PProduct product; // 产品
	private String action; // 操作类型
	private TreeNode node; // 当前操作的树节点对象

	public PStructure getStructure() {
		return structure;
	}

	public void setStructure(PStructure structure) {
		this.structure = structure;
	}
	
	public PProductStructureRelationship getProductStructureRelation() {
		return productStructureRelation;
	}

	public void setProductStructureRelation(PProductStructureRelationship productStructureRelation) {
		this.productStructureRelation = productStructureRelation;
	}

	public PProductStructureRelationship getParentProductStructureRelation() {
		return parentProductStructureRelation;
	}

	public void setParentProductStructureRelation(
			PProductStructureRelationship parentProductStructureRelation) {
		this.parentProductStructureRelation = parentProductStructureRelation;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

	public TreeNode getNode() {
		return node;
	}

	public void setNode(TreeNode node) {
		this.node = node;
	}

}