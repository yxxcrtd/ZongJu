package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwnerFee;

public interface CrRlOwnerFeeService extends BaseService {

	public void edit(CrRlOwnerFee crOwnerFee, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlOwnerFee crOwnerFee) throws Exception;

	public void update(CrRlOwnerFee crOwnerFee) throws Exception;

	public void delete(CrRlOwnerFee crOwnerFee) throws Exception;

	public List<CrRlOwnerFee> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlOwnerFee> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlOwnerFee get(CrRlOwnerFee crOwnerFee) throws Exception;
}