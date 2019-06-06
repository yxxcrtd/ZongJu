package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.CrRight;

public interface CrRightService extends BaseService {

	public void edit(CrRight crRight, Map<String, Object> dic) throws Exception;

	public void insert(CrRight crRight) throws Exception;

	public void update(CrRight crRight) throws Exception;

	public void delete(CrRight crRight) throws Exception;

	public List<CrRight> getList(Map<String, Object> condition) throws Exception;

	public List<CrRight> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRight get(CrRight crRight) throws Exception;
}