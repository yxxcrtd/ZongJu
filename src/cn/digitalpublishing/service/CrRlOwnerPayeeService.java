package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwnerPayee;

public interface CrRlOwnerPayeeService extends BaseService {

	public void edit(CrRlOwnerPayee crOwnerPayee, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlOwnerPayee crOwnerPayee) throws Exception;

	public void update(CrRlOwnerPayee crOwnerPayee) throws Exception;

	public void delete(CrRlOwnerPayee crOwnerPayee) throws Exception;

	public List<CrRlOwnerPayee> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlOwnerPayee> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlOwnerPayee get(CrRlOwnerPayee crOwnerPayee) throws Exception;
}