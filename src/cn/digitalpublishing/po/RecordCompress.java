package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;

/**
 * 素材ZIP打包信息记录
 * 
 * @author CuiXian
 */
@SuppressWarnings("serial")
public class RecordCompress implements Serializable {
	
	/**
	 * 主键
	 */
	private String id;
	
	/**
	 * 产品包系统名
	 */
	private String name;
	
	/**
	 * 产品原始名
	 */
	private String originName;
	
	/**
	 * 产品系统名
	 */
	private String systemName;
	
	/**
	 * 生成日期
	 */
	private Date createTime = new Date();
	
	/**
	 * Default Constructor
	 */
	public RecordCompress() {
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

	public String getOriginName() {
		return originName;
	}

	public void setOriginName(String originName) {
		this.originName = originName;
	}

	public String getSystemName() {
		return systemName;
	}

	public void setSystemName(String systemName) {
		this.systemName = systemName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
}
