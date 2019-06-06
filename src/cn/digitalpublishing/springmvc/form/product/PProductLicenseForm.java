package cn.digitalpublishing.springmvc.form.product;

import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.springmvc.form.DataTableForm;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import java.util.List;

/**
 * Created by huangchenxi on 14-6-25.
 */
public class PProductLicenseForm extends DataTableForm<PProductLicense> {
    private String name;
    private String code;
    private String tid;
    private PProductLicense productLicense;
    private CommonsMultipartFile txtFile = null;
    private List<BDic> typeList;
    private List<BDic> modeList;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getTid() {
        return tid;
    }

    public void setTid(String tid) {
        this.tid = tid;
    }

    public PProductLicense getProductLicense() {
        return productLicense;
    }

    public void setProductLicense(PProductLicense productLicense) {
        this.productLicense = productLicense;
    }

    public List<BDic> getTypeList() {
        return typeList;
    }

    public void setTypeList(List<BDic> typeList) {
        this.typeList = typeList;
    }

    public List<BDic> getModeList() {
        return modeList;
    }

    public void setModeList(List<BDic> modeList) {
        this.modeList = modeList;
    }

    public CommonsMultipartFile getTxtFile() {
        return txtFile;
    }

    public void setTxtFile(CommonsMultipartFile txtFile) {
        this.txtFile = txtFile;
    }
}
