package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 订单对象
 * 
 * @author YangXinXin
 */
@SuppressWarnings("serial")
public class Order implements Serializable {

	/**
	 * 主键（订单号）
	 */
	private String id;
	
	/**
	 * 交易号（这里是支付宝交易号）
	 */
	private String tradeNumber;
	
	/**
	 * 订单用户Id
	 */
	private String userId;
	
	/**
	 * 订单总金额
	 */
	private BigDecimal money;
	
	/**
	 * 订单状态（0：未支付；1：支付失败；2：支付成功）
	 */
	private int status;
	
	/**
	 * 订单成交时间
	 */
	private Date createDate = new Date();

	/**
	 * 密钥
	 */
	private String secretKey;
	
	/**
	 * 产品对象
	 */
	private PProduct product;

	/**
	 * Default Constructor
	 */
	public Order() {
		// 
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTradeNumber() {
		return tradeNumber;
	}

	public void setTradeNumber(String tradeNumber) {
		this.tradeNumber = tradeNumber;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public BigDecimal getMoney() {
		return money;
	}

	public void setMoney(BigDecimal money) {
		this.money = money;
	}

	public int getStatus() {
		return status;
	}

	/**
	 * 订单状态（0：未支付；1：支付失败；2：支付成功）
	 * 
	 * @param status
	 */
	public void setStatus(int status) {
		this.status = status;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public String getSecretKey() {
		return secretKey;
	}

	public void setSecretKey(String secretKey) {
		this.secretKey = secretKey;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}
	
}
