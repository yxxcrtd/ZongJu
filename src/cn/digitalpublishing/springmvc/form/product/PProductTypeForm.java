package cn.digitalpublishing.springmvc.form.product;

import org.springframework.web.multipart.commons.CommonsMultipartFile;

import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.springmvc.form.DataTableForm;
import cn.digitalpublishing.util.TreeNode;


public class PProductTypeForm extends DataTableForm<PProductType> {

	private PProductType productType;
	private String name;
	private String code;
	
	private String fatherId;
	
	private TreeNode node;
	
	private String tid;//类型Id
	
	private CommonsMultipartFile txtFile = null;
	
	private String txtFormat = "xls,xlsx";
	
	public TreeNode getNode() {
		return node;
	}

	public void setNode(TreeNode node) {
		this.node = node;
	}

	public PProductType getProductType() {
		return productType;
	}

	public void setProductType(PProductType productType) {
		this.productType = productType;
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

	public String getFatherId() {
		return fatherId;
	}

	public void setFatherId(String fatherId) {
		this.fatherId = fatherId;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public CommonsMultipartFile getTxtFile() {
		return txtFile;
	}

	public void setTxtFile(CommonsMultipartFile txtFile) {
		this.txtFile = txtFile;
	}

	public String getTxtFormat() {
		return txtFormat;
	}

	public void setTxtFormat(String txtFormat) {
		this.txtFormat = txtFormat;
	}
	
}
