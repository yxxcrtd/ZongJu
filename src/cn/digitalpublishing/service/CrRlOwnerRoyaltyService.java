package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlOwnerRoyalty;

public interface CrRlOwnerRoyaltyService extends BaseService {

	public void edit(CrRlOwnerRoyalty crOwnerRoyalty, Map<String, Object> dic) throws Exception;
	
	public void insert(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception;

	public void update(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception;

	public void delete(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception;

	public List<CrRlOwnerRoyalty> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlOwnerRoyalty> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlOwnerRoyalty get(CrRlOwnerRoyalty crOwnerRoyalty) throws Exception;
}