package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrLicenseType;

public interface CrLicenseTypeService extends BaseService {

	public void insert(CrLicenseType crLicenseType) throws Exception;

	public void update(CrLicenseType crLicenseType) throws Exception;

	public void delete(CrLicenseType crLicenseType) throws Exception;

	public List<CrLicenseType> getList(Map<String, Object> condition) throws Exception;

	public List<CrLicenseType> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrLicenseType get(CrLicenseType crLicenseType) throws Exception;
}