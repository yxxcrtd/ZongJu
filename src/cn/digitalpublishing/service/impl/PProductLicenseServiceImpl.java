package cn.digitalpublishing.service.impl;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.PProductLicense;
import cn.digitalpublishing.po.PProductType;
import cn.digitalpublishing.service.PProductLicenseService;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by huangchenxi on 14-6-25.
 */
public class PProductLicenseServiceImpl extends BaseServiceImpl implements PProductLicenseService {
    @Override
    public void upload(InputStream inputStream, String productTypeId) throws Exception {
        try {
            XSSFWorkbook xwb = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = xwb.getSheetAt(0);

            Map<String, Object> condition = new HashMap<String, Object>();

            PProductType productType = this.daoFacade.getProductTypeDao().get(PProductType.class.getName(), productTypeId);
            for (int i = sheet.getFirstRowNum() + 1; i <= sheet.getPhysicalNumberOfRows(); i++) {
                XSSFRow row = sheet.getRow(i);
                if (row != null) {
                    XSSFCell licenseType = row.getCell(0);
                    XSSFCell licenseName = row.getCell(1);
                    XSSFCell licenseMax = row.getCell(2);
                    XSSFCell licenseMode = row.getCell(3);

                    condition.clear();
                    condition.put("dicClassCode", DicConstants.DIC_LICENSE_TYPE);
                    condition.put("name", licenseType.toString().trim());
                    List<BDic> typeDicList = null;
                    HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getDicList");
                    typeDicList = this.daoFacade.getDicDao().getList(condition, null, hqlBean);
                    String licenseTypeId = typeDicList.get(0).getId();

                    condition.clear();
                    condition.put("dicClassCode", DicConstants.DIC_LICENSE_MODE);
                    condition.put("name", licenseMode.toString().trim());
                    List<BDic> modeDicList = null;
                    HqlBean modeHqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.BDicDao").get("getDicList");
                    modeDicList = this.daoFacade.getDicDao().getList(condition, null, modeHqlBean);
                    String licenseModeId = modeDicList.get(0).getId();

                    PProductLicense productLicense = new PProductLicense();
                    productLicense.setProductType(productType);
                    productLicense.setLicenseMax(Integer.valueOf(licenseMax.toString()));
                    productLicense.setLicenseName(licenseName.toString());
                    productLicense.setLicenseMode(licenseModeId);
                    productLicense.setLicenseType(licenseTypeId);

                    this.daoFacade.getProductLicenseDao().insert(productLicense);

                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new CcsException("解析Excel出错！");
        }
    }

    @Override
    public List<PProductLicense> getLicencePagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {
        List<PProductLicense> list = null;
        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductLicenseDao").get("getPagingList");
        try {
            list = this.daoFacade.getProductLicenseDao().getPagingList(condition, sort, pageCount, page, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionList.error", e);
        }
        return list;
    }

    @Override
    public Integer getLicenceCount(Map<String, Object> condition) throws Exception {
        Integer num = 0;
        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductLicenseDao").get("getCount");
        try {
            num = this.daoFacade.getProductLicenseDao().getCount(condition, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
        }
        return num;
    }

    @Override
    public void updateLicence(PProductLicense obj, String id, String[] properties) throws Exception {
        try {
            this.daoFacade.getProductLicenseDao().update(obj, PProductLicense.class.getName(), id, null);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "cost.info.updatePProductLicense.error", e);
        }
    }

    @Override
    public void insertLicence(PProductLicense obj) throws Exception {
        try {
            this.daoFacade.getProductLicenseDao().insert(obj);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "cost.info.insertPProductLicense.error", e);
        }
    }

    @Override
    public PProductLicense getLicence(String id) throws Exception {
        PProductLicense aCost = null;
        try {
            aCost = (PProductLicense) this.daoFacade.getProductLicenseDao().get(
                    PProductLicense.class.getName(), id);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "cost.info.getPProductLicense.error", e);
        }
        return aCost;
    }

    @Override
    public List<PProductLicense> getList(Map<String, Object> condition) throws Exception {
        List<PProductLicense> list = null;
        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductLicenseDao").get("getList");
        try {
            list = this.daoFacade.getProductLicenseDao().getList(condition, null, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionList.error", e);
        }
        return list;
    }

    @Override
    public void deleteLicence(String id) throws Exception {
        try {
            this.daoFacade.getProductLicenseDao().delete(PProductLicense.class.getName(), id);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "cost.info.deletePProductLicense.error", e);
        }
    }
}
