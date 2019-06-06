package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 点卡充值记录
 * 
 * @author cuixian
 */
@SuppressWarnings("serial")
public class Recharge implements Serializable {

	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 充值金额
	 */
	private BigDecimal money;

	/**
	 * 充值时间
	 */
	private Date tradeDate = new Date();
	
	/**
	 * 映射表
	 */
	private User user;


	/**
	 * Default Constructor
	 */
	public Recharge() {

	}


	public String getId() {
		return id;
	}


	public void setId(String id) {
		this.id = id;
	}


	public BigDecimal getMoney() {
		return money;
	}


	public void setMoney(BigDecimal money) {
		this.money = money;
	}


	public Date getTradeDate() {
		return tradeDate;
	}


	public void setTradeDate(Date tradeDate) {
		this.tradeDate = tradeDate;
	}


	public User getUser() {
		return user;
	}


	public void setUser(User user) {
		this.user = user;
	}
	
}