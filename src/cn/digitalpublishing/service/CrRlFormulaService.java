package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.CrRlFormula;

public interface CrRlFormulaService extends BaseService {

	public void insert(CrRlFormula crFormula) throws Exception;

	public void update(CrRlFormula crFormula) throws Exception;

	public void delete(CrRlFormula crFormula) throws Exception;

	public List<CrRlFormula> getList(Map<String, Object> condition) throws Exception;

	public List<CrRlFormula> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart) throws Exception;

	public Integer getCount(Map<String, Object> condition) throws Exception;

	public CrRlFormula get(CrRlFormula crFormula) throws Exception;
}