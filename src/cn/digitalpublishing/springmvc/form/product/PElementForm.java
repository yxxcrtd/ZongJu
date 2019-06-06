package cn.digitalpublishing.springmvc.form.product;

import java.util.List;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PProductStructureRelationship;
import cn.digitalpublishing.po.PStructure;
import cn.digitalpublishing.springmvc.form.DataTableForm;
import cn.digitalpublishing.util.TreeNode;

public class PElementForm extends DataTableForm<PStructure> {

	private PStructure element;
	private PProductStructureRelationship structure;
	private PProduct product;
	private TreeNode node;
	private List<TreeNode> nodeList;
	private String action;

	public PStructure getElement() {
		return element;
	}

	public void setElement(PStructure element) {
		this.element = element;
	}

	public PProductStructureRelationship getStructure() {
		return structure;
	}

	public void setStructure(PProductStructureRelationship structure) {
		this.structure = structure;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public TreeNode getNode() {
		return node;
	}

	public void setNode(TreeNode node) {
		this.node = node;
	}

	public List<TreeNode> getNodeList() {
		return nodeList;
	}

	public void setNodeList(List<TreeNode> nodeList) {
		this.nodeList = nodeList;
	}

	public String getAction() {
		return action;
	}

	public void setAction(String action) {
		this.action = action;
	}

}