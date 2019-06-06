package cn.digitalpublishing.service;

import cn.digitalpublishing.po.PProductLicense;

import java.io.InputStream;
import java.util.List;
import java.util.Map;

/**
 * Created by huangchenxi on 14-6-25.
 */
public interface PProductLicenseService extends BaseService {
    public List<PProductLicense> getLicencePagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;

    public Integer getLicenceCount(Map<String, Object> condition) throws Exception;
    public List<PProductLicense> getList(Map<String, Object> condition) throws Exception;

    public void updateLicence(PProductLicense obj, String id, String[] properties) throws Exception;

    public void insertLicence(PProductLicense obj) throws Exception;

    public PProductLicense getLicence(String id) throws Exception;

    public void deleteLicence(String id) throws Exception;

    public void upload(InputStream inputStream, String productTypeId) throws Exception;
}
