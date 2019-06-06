package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;

public interface CrCsrRelationshipService extends BaseService {

	public void insert(CrCsrRelationship csrRelationship) throws Exception;

	public void update(CrCsrRelationship csrRelationship) throws Exception;

	public void delete(List<CrCsrRelationship> list) throws Exception;

	public List<CrCsrRelationship> getList(Map<String, Object> condition) throws Exception;

	public List<CrCsrRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrCsrRelationship get(CrCsrRelationship csrRelationship) throws Exception;
	
	public void selectCountrySubmit(List<BCountry> countryList, CrSubsidaryRight subsidaryRight) throws Exception;
}