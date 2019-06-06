package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;

import cn.digitalpublishing.po.PProductType;

public interface PProductTypeService extends BaseService {
	
	public void updateProductType(PProductType obj, String id, String[] properties) throws Exception;
	
	public void insertProductType(PProductType obj) throws Exception;
	
	public void deletecProductType(String id) throws Exception;
	
    public List<PProductType> getProductTypePagingList(Map<String,Object> condition,String sort,Integer pageCount,Integer page)throws Exception;
   /**
    * 获取产品类型tree
    * @param condition
    * @param sort
    * @return
    * @throws Exception
    */
    public List<PProductType> getProductTypeTreeList(Map<String,Object> condition,String sort)throws Exception;
    public List<PProductType> getProductTypeList(Map<String,Object> condition, String sort) throws Exception;
    public List<PProductType> getProductTypeListById(Map<String,Object> condition, String sort) throws Exception;
	
	public Integer getProductTypeCount(Map<String, Object> condition) throws Exception;
	
	public PProductType getProductType(String id) throws Exception;
	
	public PProductType getProductTypeByCode(String code) throws Exception;
	
	/**
	 * 验证code是否唯一
	 * @param id
	 * @param code
	 * @return
	 * @throws Exception
	 */
	public boolean codeUnique(String id,String code)throws Exception;
	
}