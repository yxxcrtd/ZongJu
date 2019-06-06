package cn.digitalpublishing.springmvc.form;

import java.util.HashMap;
import java.util.Map;

import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrRlProduct;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class CrRlProductForm extends DataTableForm<CrRlProduct> {

	private CrRlProduct crProduct = new CrRlProduct();
	private PProduct product;
	private CrRight right; // 权利授权
	private Map<String, Object> dic = new HashMap<String, Object>();

	public CrRlProduct getCrProduct() {
		return crProduct;
	}

	public void setCrProduct(CrRlProduct crProduct) {
		this.crProduct = crProduct;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}
	
	public CrRight getRight() {
		return right;
	}

	public void setRight(CrRight right) {
		this.right = right;
	}

	public Map<String, Object> getDic() {
		return dic;
	}

	public void setDic(Map<String, Object> dic) {
		this.dic = dic;
	}
}