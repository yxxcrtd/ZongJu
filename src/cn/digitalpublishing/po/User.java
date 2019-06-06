package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.Set;

import org.codehaus.jackson.annotate.JsonIgnore;

/**
 * 用户对象
 * 
 * @author cuixian
 */
@SuppressWarnings("serial")
public class User implements Serializable {

	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 产品分类
	 */
	private PProductType productTypeId ;

	/**
	 * 用户名
	 */
	private String username;

	/**
	 * 密码
	 */
	private String password;
	
	/**
	 * 机构名称
	 */
	private String institutionName;

	/**
	 * 联系方式
	 */
	private String telephone;
	
	/**
	 * 地址
	 */
	private String address;

	/**
	 * 用户状态（0：未审核；1：审核通过；2：已删除）
	 */
	private String status;
	
	/**
	 * 角色（0：普通购书会员；1：写书的作者；2：机构用户；其他的待续......）
	 */
	private Integer role;

	/**
	 * 折扣（机构会员才有折扣，买东西按折扣消费）
	 */
	private Integer discount;
	
	/**
	 * 普通购书会员的积分（一本书多少钱 = 多少积分）（注册时默认为0）
	 */
	private Integer integral;
	
	/**
	 * 点卡余额（注册时默认为0）
	 */
	private BigDecimal balance;

	/**
	 * 注册时间
	 */
	private Date createDate = new Date();
	
	/**
	 * 映射表
	 */
	@JsonIgnore
	private Set<PProductType> productType;

	/**
	 * Default Constructor
	 */
	public User() {

	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public PProductType getProductTypeId() {
		return productTypeId;
	}

	public void setProductTypeId(PProductType productTypeId) {
		this.productTypeId = productTypeId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getInstitutionName() {
		return institutionName;
	}

	public void setInstitutionName(String institutionName) {
		this.institutionName = institutionName;
	}

	public String getTelephone() {
		return telephone;
	}

	public void setTelephone(String telephone) {
		this.telephone = telephone;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public Integer getDiscount() {
		return discount;
	}

	public void setDiscount(Integer discount) {
		this.discount = discount;
	}

	public Integer getIntegral() {
		return integral;
	}

	public void setIntegral(Integer integral) {
		this.integral = integral;
	}

	public BigDecimal getBalance() {
		return balance;
	}

	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}

	public Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}

	public Set<PProductType> getProductType() {
		return productType;
	}

	public void setProductType(Set<PProductType> productType) {
		this.productType = productType;
	}
	
}
