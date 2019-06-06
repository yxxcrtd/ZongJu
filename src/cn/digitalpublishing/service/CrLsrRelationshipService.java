package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLsrRelationship;
import cn.digitalpublishing.po.CrSubsidaryRight;

public interface CrLsrRelationshipService extends BaseService {

	public void insert(CrLsrRelationship lsrRelationship) throws Exception;

	public void update(CrLsrRelationship lsrRelationship) throws Exception;

	public void delete(List<CrLsrRelationship> list) throws Exception;

	public List<CrLsrRelationship> getList(Map<String, Object> condition) throws Exception;

	public List<CrLsrRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrLsrRelationship get(CrLsrRelationship lsrRelationship) throws Exception;
	
	public void selectLanguageSubmit(List<BDic> languageList, CrSubsidaryRight subsidaryRight) throws Exception;
}