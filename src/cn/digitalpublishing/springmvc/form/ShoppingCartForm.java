package cn.digitalpublishing.springmvc.form;

import cn.digitalpublishing.po.ShoppingCart;

/**
 * ShoppingCart Form
 * 
 * @author YangXinXin
 */
public class ShoppingCartForm extends DataTableForm<ShoppingCart> {
	
	private ShoppingCart obj;

	public ShoppingCart getObj() {
		return obj;
	}

	public void setObj(ShoppingCart obj) {
		this.obj = obj;
	}
 
}
