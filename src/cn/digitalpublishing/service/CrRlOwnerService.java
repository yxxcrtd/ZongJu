package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.CrRight;
import cn.digitalpublishing.po.CrRlOwner;

public interface CrRlOwnerService extends BaseService {

	public void edit(CrRlOwner crOwner, CrRight right, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlOwner crOwner) throws Exception;

	public void update(CrRlOwner crOwner) throws Exception;

	public void delete(CrRlOwner crOwner) throws Exception;

	public List<CrRlOwner> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlOwner> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlOwner get(CrRlOwner crOwner) throws Exception;
}