package cn.digitalpublishing.po;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 素材ZIP打包信息
 * 
 * @author CuiXian
 */
@SuppressWarnings("serial")
public class Compress implements Serializable {
	
	/**
	 * 主键
	 */
	private String id;

	/**
	 * 包名
	 */
	private String name;
	
	/**
	 * 内容简介
	 */
	private String remark;
	
	/**
	 * 价格
	 */
	private BigDecimal price;
	
	/**
	 * 存放路径
	 */
	private String path;
	
	/**
	 * 状态（0,待打包 1,成品包）
	 */
	private Integer status;
	
	/**
	 * 生成日期
	 */
	private Date dateTime = new Date();
	
	/**
	 * Default Constructor
	 */
	public Compress() {
		// 
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}
	
}
