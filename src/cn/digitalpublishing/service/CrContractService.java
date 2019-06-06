package cn.digitalpublishing.service;

import java.util.*;

import cn.digitalpublishing.po.CrContract;

public interface CrContractService extends BaseService {

	public List<CrContract> getPagingList(Map<String, Object> condition, String sort, Integer pageCount,Integer countStart) throws Exception;

	public List<CrContract> getList(Map<String, Object> condition, String sort) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrContract getSystemById(String id) throws Exception;

	public void update(CrContract obj, String id,String[] properties) throws Exception;

	public void insert(CrContract obj) throws Exception;

	public void delete(String id) throws Exception;

}
