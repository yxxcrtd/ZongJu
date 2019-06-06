package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.BCountry;
import cn.digitalpublishing.po.CrCrcRelationship;
import cn.digitalpublishing.po.CrRight;

public interface CrCrcRelationshipService extends BaseService {

	public void delete(List<CrCrcRelationship> list) throws Exception;

	public List<CrCrcRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;
	
	public void selectCountrySubmit(List<BCountry> countryList, CrRight right) throws Exception;
}