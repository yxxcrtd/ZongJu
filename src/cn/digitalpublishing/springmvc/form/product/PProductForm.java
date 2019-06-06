package cn.digitalpublishing.springmvc.form.product;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.po.PProductType;
import org.springframework.web.multipart.commons.CommonsMultipartFile;
import cn.digitalpublishing.po.BSubject;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.springmvc.form.DataTableForm;

public class PProductForm extends DataTableForm<PProduct> {

	private PProduct product;
	private String productId;
	private String name;
	private String tid;
	private String queryIsbn;
	private String title;
	private Map<String, Object> map;
	private String[] typePropIds;
	private String[] propsValue;
	private String code;
	private String keyword;
	private Map<String, Map<String, String>> dicMap;
	private List<BSubject> subjectList;
	private String subIds;
	private String[] subjectIds;
    private List<PProductType> productTypeList;
    private List<PProductLicense> productLicenseList;
	private CommonsMultipartFile txtFile = null;
    private CommonsMultipartFile upLoadFile = null;
	private CommonsMultipartFile upLoadFilePDF = null;
	private CommonsMultipartFile upLoadFileXML = null;

    private String classId;

	private String txtFormat = "xls,xlsx";

	private String flag;

	private String codeType;

	private String createCode;

	private Map<String, String> languageMap;

	private Map<String, String> bindingMap;

	private String uploadType;

	private Map<String, String> productMap;

	private String listIsbn;

	private String listIsbnNot;

	private String deadline;
	private String taskId;
	private String taskFlag;
	
	private String theme;
	private String activityId;
	
	private String productProposal;
	private Map<String,String> productProposalMap;
    private String assigneeName;
    private String assignee;
    private String parentId;
    private String productType;
    private String orgId;
    private String projectCode;
    private String author;
    private String typeId;
    
	public String getTaskFlag() {
		return taskFlag;
	}

	public void setTaskFlag(String taskFlag) {
		this.taskFlag = taskFlag;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public Map<String, Object> getMap() {
		return map;
	}

	public void setMap(Map<String, Object> map) {
		this.map = map;
	}

	public String[] getSubjectIds() {
		return subjectIds;
	}

	public void setSubjectIds(String[] subjectIds) {
		this.subjectIds = subjectIds;
	}

	public String getSubIds() {
		return subIds;
	}

	public void setSubIds(String subIds) {
		this.subIds = subIds;
	}

	public List<BSubject> getSubjectList() {
		return subjectList;
	}

	public void setSubjectList(List<BSubject> subjectList) {
		this.subjectList = subjectList;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getTid() {
		return tid;
	}

	public void setTid(String tid) {
		this.tid = tid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String[] getTypePropIds() {
		return typePropIds;
	}

	public void setTypePropIds(String[] typePropIds) {
		this.typePropIds = typePropIds;
	}

	public String[] getPropsValue() {
		return propsValue;
	}

	public void setPropsValue(String[] propsValue) {
		this.propsValue = propsValue;
	}

	public Map<String, Map<String, String>> getDicMap() {
		return dicMap;
	}

	public void setDicMap(Map<String, Map<String, String>> dicMap) {
		this.dicMap = dicMap;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getKeyword() {
		return keyword;
	}

	public void setKeyword(String keyword) {
		this.keyword = keyword;
	}

	public String getTxtFormat() {
		return txtFormat;
	}

	public void setTxtFormat(String txtFormat) {
		this.txtFormat = txtFormat;
	}

	public CommonsMultipartFile getTxtFile() {
		return txtFile;
	}

	public void setTxtFile(CommonsMultipartFile txtFile) {
		this.txtFile = txtFile;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getCodeType() {
		return codeType;
	}

	public void setCodeType(String codeType) {
		this.codeType = codeType;
	}

	public String getCreateCode() {
		return createCode;
	}

	public void setCreateCode(String createCode) {
		this.createCode = createCode;
	}

	public String getQueryIsbn() {
		return queryIsbn;
	}

	public void setQueryIsbn(String queryIsbn) {
		this.queryIsbn = queryIsbn;
	}

	public Map<String, String> getLanguageMap() {
		return languageMap;
	}

	public void setLanguageMap(Map<String, String> languageMap) {
		this.languageMap = languageMap;
	}

	public Map<String, String> getBindingMap() {
		return bindingMap;
	}

	public void setBindingMap(Map<String, String> bindingMap) {
		this.bindingMap = bindingMap;
	}

	public String getUploadType() {
		return uploadType;
	}

	public void setUploadType(String uploadType) {
		this.uploadType = uploadType;
	}

	public PProduct getProduct() {
		return product;
	}

	public void setProduct(PProduct product) {
		this.product = product;
	}

	public Map<String, String> getProductMap() {
		return productMap;
	}

	public void setProductMap(Map<String, String> productMap) {
		this.productMap = productMap;
	}

	public String getListIsbn() {
		return listIsbn;
	}

	public void setListIsbn(String listIsbn) {
		this.listIsbn = listIsbn;
	}

	public String getListIsbnNot() {
		return listIsbnNot;
	}

	public void setListIsbnNot(String listIsbnNot) {
		this.listIsbnNot = listIsbnNot;
	}

	public String getDeadline() {
		return deadline;
	}

	public void setDeadline(String deadline) {
		this.deadline = deadline;
	}

	public String getTheme() {
		return theme;
	}

	public void setTheme(String theme) {
		this.theme = theme;
	}

	public String getActivityId() {
		return activityId;
	}

	public void setActivityId(String activityId) {
		this.activityId = activityId;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getProductProposal() {
		return productProposal;
	}

	public void setProductProposal(String productProposal) {
		this.productProposal = productProposal;
	}

    public Map<String, String> getProductProposalMap() {
        return productProposalMap;
    }

    public void setProductProposalMap(Map<String, String> productProposalMap) {
        this.productProposalMap = productProposalMap;
    }

    public String getClassId() {
        return classId;
    }

    public void setClassId(String classId) {
        this.classId = classId;
    }

    public String getAssigneeName() {
        return assigneeName;
    }

    public void setAssigneeName(String assigneeName) {
        this.assigneeName = assigneeName;
    }

    public String getAssignee() {
        return assignee;
    }

    public void setAssignee(String assignee) {
        this.assignee = assignee;
    }

    public List<PProductType> getProductTypeList() {
        return productTypeList;
    }

    public void setProductTypeList(List<PProductType> productTypeList) {
        this.productTypeList = productTypeList;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public String getProductType() {
        return productType;
    }

    public void setProductType(String productType) {
        this.productType = productType;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }

    public String getProjectCode() {
        return projectCode;
    }

    public void setProjectCode(String projectCode) {
        this.projectCode = projectCode;
    }

    public List<PProductLicense> getProductLicenseList() {
        return productLicenseList;
    }

    public void setProductLicenseList(List<PProductLicense> productLicenseList) {
        this.productLicenseList = productLicenseList;
    }

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}

	public CommonsMultipartFile getUpLoadFile() {
		return upLoadFile;
	}

	public void setUpLoadFile(CommonsMultipartFile upLoadFile) {
		this.upLoadFile = upLoadFile;
	}

	public CommonsMultipartFile getUpLoadFilePDF() {
		return upLoadFilePDF;
	}

	public void setUpLoadFilePDF(CommonsMultipartFile upLoadFilePDF) {
		this.upLoadFilePDF = upLoadFilePDF;
	}

	public CommonsMultipartFile getUpLoadFileXML() {
		return upLoadFileXML;
	}

	public void setUpLoadFileXML(CommonsMultipartFile upLoadFileXML) {
		this.upLoadFileXML = upLoadFileXML;
	}

	public String getTypeId() {
		return typeId;
	}

	public void setTypeId(String typeId) {
		this.typeId = typeId;
	}
	
}