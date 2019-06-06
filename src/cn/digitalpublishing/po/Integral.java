package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;

/**
 * 会员积分获取记录
 * 
 * @author cuixian
 */
@SuppressWarnings("serial")
public class Integral implements Serializable {

	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 来源
	 */
	private String source;
	
	/**
	 * 会员积分
	 */
	private Integer integral;

	/**
	 * 积分获得时间
	 */
	private Date createDate = new Date();
	
	/**
	 * 映射表
	 */
	private User user;


	/**
	 * Default Constructor
	 */
	public Integral() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public Integer getIntegral() {
		return integral;
	}

	public void setIntegral(Integer integral) {
		this.integral = integral;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}