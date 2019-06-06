package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 购物车对象
 * 
 * @author YangXinXin
 */
@SuppressWarnings("serial")
public class ShoppingCart implements Serializable {

	/**
	 * 主键（购物车ID）
	 */
	private String id;
	
	/**
	 * 用户Id
	 */
	private String userId;
	
	/**
	 * 购物数量
	 */
	private int count;
	
	/**
	 * 购物总金额
	 */
	private BigDecimal money;
	
	/**
	 * 购物车状态（0：未支付；1：支付失败；2：支付成功）
	 */
	private Integer status;
	
	/**
	 * 下单时间
	 */
	private Date createDate = new Date();
	
	/**
	 * 产品对象
	 */
	private PProduct product;

	/**
	 * Default Constructor
	 */
	public ShoppingCart() {
		// 
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public Integer getStatus() {
		return status;
	}

	/**
	 * 订单状态（0：未支付；1：支付失败；2：支付成功）
	 * 
	 * @param status
	 */
	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}
	
}
