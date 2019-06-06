package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.CrLrcRelationship;
import cn.digitalpublishing.po.CrRight;

public interface CrLrcRelationshipService extends BaseService {

	public void delete(List<CrLrcRelationship> list) throws Exception;

	public List<CrLrcRelationship> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public void selectLanguageSubmit(List<BDic> languageList, CrRight right) throws Exception;
}