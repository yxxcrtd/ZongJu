package cn.digitalpublishing.po;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;
import java.util.HashSet;
import org.codehaus.jackson.annotate.JsonIgnore;

import cn.digitalpublishing.util.DateFormatUitl;

import java.math.BigDecimal;

/**
 * @name 01_产品基础信息
 * @table P_PRODUCT
 */
@SuppressWarnings("serial")
public class PProduct implements Serializable {

	private String id; // 产品ID
	private String identityId; //唯一标识
	private String metaId; //二维码路径
	private String twoDimension; //二维码图片
	private String code; // 产品编号
	private String isbn; // 产品ISBN
	private String codeType; // 产品编号类型
	private String title; // 产品题名
	private String translation; // 产品译名
	private String subTitle; // 产品副题名
	private String pubYear; // 产品出版年
	private Integer pageNum; // 产品页数
	private String edition; // 产品版别
	private String binding; // 产品装帧
	private String marcFlag; // 产品是否匹配MARC
	private String keyword; // 产品关键字
	private Date datePublication; //出版日期
	private String dataPublicationStr;
	private String author; //作者
	private String publisher; //出版社
	private String bookCovers; //封面图片
	private String bookPDFOriginName; //pdf原名
	private String bookPDFSystemName; //pdf在系统中的名字（如：20140707021356.pdf）
	private String bookXMLName; //xml名称
	private String proportion; //分成比例
	private String status; // 产品状态
	private String flowStatus;// 审批状态
	private String remark;// 备注
	private BigDecimal price; // 产品目录价格
	private String language; // 产品语种
    private String pubBy; // 产品所属分社
    private String pubName; // 产品所属分社名称(冗余显示字段)
    private String editorBy; // 产品所属责编
    private String editorName; // 产品所属责编名称(冗余显示字段)
    private Date createOn; // 产品创建日期
    private Date updateOn; // 产品修改日期
	private PProduct parentProduct; // 01_产品基础信息
	private PProductType productType; // 01_产品类型
    private PProductLicense productLicense; // 01_产品许可
	private String content;			//在线编辑图书的内容
	//在线编辑用户
	private User user;
	//对象主键id 在线编辑对象
	private String objId;

	//对象名称      在线编辑对象
	private String objName;
	@JsonIgnore
	private Set<PProduct> productSet = new HashSet<PProduct>(); // 01_产品基础信息

    @JsonIgnore
    private Set<PProductStructureRelationship> productStructureRelationshipSet = new HashSet<PProductStructureRelationship>(); // 01_产品和结构关系

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getIsbn() {
		return isbn;
	}

	public void setIsbn(String isbn) {
		this.isbn = isbn;
	}

	public String getCodeType() {
		return codeType;
	}

	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTranslation() {
		return translation;
	}

	public void setTranslation(String translation) {
		this.translation = translation;
	}

	public String getSubTitle() {
		return subTitle;
	}

	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}

	public String getPubYear() {
		return pubYear;
	}

	public void setPubYear(String pubYear) {
		this.pubYear = pubYear;
	}

	public String getPubName() {
		return pubName;
	}

	public void setPubName(String pubName) {
		this.pubName = pubName;
	}

	public Integer getPageNum() {
		return pageNum;
	}

	public void setPageNum(Integer pageNum) {
		this.pageNum = pageNum;
	}

	public String getEdition() {
		return edition;
	}

	public void setEdition(String edition) {
		this.edition = edition;
	}

	public String getBinding() {
		return binding;
	}

	public void setBinding(String binding) {
		this.binding = binding;
	}

	public String getMarcFlag() {
		return marcFlag;
	}

	public void setMarcFlag(String marcFlag) {
		this.marcFlag = marcFlag;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String language) {
		this.language = language;
	}

	public PProduct getParentProduct() {
		return parentProduct;
	}

	public void setParentProduct(PProduct parentProduct) {
		this.parentProduct = parentProduct;
	}

	public PProductType getProductType() {
		return productType;
	}

	public void setProductType(PProductType productType) {
		this.productType = productType;
	}

	public Set<PProduct> getProductSet() {
		return productSet;
	}

	public void setProductSet(Set<PProduct> productSet) {
		this.productSet = productSet;
	}

	public String getRemark() {
		return remark;
	}

	public void setRemark(String remark) {
		this.remark = remark;
	}

    public Set<PProductStructureRelationship> getProductStructureRelationshipSet() {
        return productStructureRelationshipSet;
    }

    public void setProductStructureRelationshipSet(Set<PProductStructureRelationship> productStructureRelationshipSet) {
        this.productStructureRelationshipSet = productStructureRelationshipSet;
    }

    public String getEditorName() {
        return editorName;
    }

    public void setEditorName(String editorName) {
        this.editorName = editorName;
    }

    public PProduct(String id) {
		super();
		this.id = id;
	}

    public PProduct() {
	}

	public String getFlowStatus() {
		return flowStatus;
	}

	public void setFlowStatus(String flowStatus) {
		this.flowStatus = flowStatus;
	}

    public String getPubBy() {
        return pubBy;
    }

    public void setPubBy(String pubBy) {
        this.pubBy = pubBy;
    }

    public String getEditorBy() {
        return editorBy;
    }

    public void setEditorBy(String editorBy) {
        this.editorBy = editorBy;
    }

    public Date getCreateOn() {
        return createOn;
    }

    public void setCreateOn(Date createOn) {
        this.createOn = createOn;
    }

    public Date getUpdateOn() {
        return updateOn;
    }

    public void setUpdateOn(Date updateOn) {
        this.updateOn = updateOn;
    }

    public PProductLicense getProductLicense() {
        return productLicense;
    }

    public void setProductLicense(PProductLicense productLicense) {
        this.productLicense = productLicense;
    }

	public Date getDatePublication() {
		return datePublication;
	}

	public void setDatePublication(Date datePublication) {
		this.datePublication = datePublication;
	}

	public String getDataPublicationStr() {
		return dataPublicationStr;
	}

	public void setDataPublicationStr(String dataPublicationStr) {
		this.datePublication = DateFormatUitl.stringToDate(dataPublicationStr);
		this.dataPublicationStr = dataPublicationStr;
	}

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

	public String getBookCovers() {
		return bookCovers;
	}

	public void setBookCovers(String bookCovers) {
		this.bookCovers = bookCovers;
	}

	public String getBookPDFOriginName() {
		return bookPDFOriginName;
	}

	public void setBookPDFOriginName(String bookPDFOriginName) {
		this.bookPDFOriginName = bookPDFOriginName;
	}

	public String getBookPDFSystemName() {
		return bookPDFSystemName;
	}

	public void setBookPDFSystemName(String bookPDFSystemName) {
		this.bookPDFSystemName = bookPDFSystemName;
	}

	public String getMetaId() {
		return metaId;
	}

	public void setMetaId(String metaId) {
		this.metaId = metaId;
	}

	public String getIdentityId() {
		return identityId;
	}

	public void setIdentityId(String identityId) {
		this.identityId = identityId;
	}

	public String getTwoDimension() {
		return twoDimension;
	}

	public void setTwoDimension(String twoDimension) {
		this.twoDimension = twoDimension;
	}

	public String getBookXMLName() {
		return bookXMLName;
	}

	public void setBookXMLName(String bookXMLName) {
		this.bookXMLName = bookXMLName;
	}

	public String getProportion() {
		return proportion;
	}

	public void setProportion(String proportion) {
		this.proportion = proportion;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}
	
	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	public String getObjId() {
		return objId;
	}

	public void setObjId(String objId) {
		this.objId = objId;
	}

	public String getObjName() {
		return objName;
	}

	public void setObjName(String objName) {
		this.objName = objName;
	}
	
}