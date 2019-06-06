package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlProduct;

public interface CrRlProductService extends BaseService {

	public void edit(CrRlProduct crProduct, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlProduct crProduct) throws Exception;

	public void update(CrRlProduct crProduct) throws Exception;

	public void delete(String id) throws Exception;

	public List<CrRlProduct> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlProduct> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlProduct get(CrRlProduct crProduct) throws Exception;
}