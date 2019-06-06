package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlRoyaltyRule;

public interface CrRlRoyaltyRuleService extends BaseService {

	public void edit(CrRlRoyaltyRule crRoyaltyRule, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlRoyaltyRule crRoyaltyRule) throws Exception;

	public void update(CrRlRoyaltyRule crRoyaltyRule) throws Exception;

	public void delete(CrRlRoyaltyRule crRoyaltyRule) throws Exception;

	public List<CrRlRoyaltyRule> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlRoyaltyRule> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlRoyaltyRule get(CrRlRoyaltyRule crRoyaltyRule) throws Exception;
}