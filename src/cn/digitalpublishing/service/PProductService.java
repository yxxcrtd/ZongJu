package cn.digitalpublishing.service;

import java.util.List;
import java.util.Map;
import cn.digitalpublishing.po.PProduct;

public interface PProductService extends BaseService {

	public void updateProduct(PProduct obj, String id, String[] properties) throws Exception;
	
	public void auditUpdateProduct(PProduct obj, String id,String ip,int port,String path,String projectName,String[] properties) throws Exception;

	public void insertProduct(PProduct obj,String ip,int port,String path,String projectName) throws Exception;

    public void insertProduct(PProduct obj) throws Exception;
	 
	public void deletecProduct(PProduct obj) throws Exception;
	
	public void auditProduct(PProduct obj) throws Exception;

	public List<PProduct> getProductPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception;

	public Integer getProductCount(Map<String, Object> condition) throws Exception;

	public PProduct getProduct(String id) throws Exception;

	public PProduct getProductByIsbn(Map<String, Object> condition) throws Exception;

	public List<PProduct> getList(Map<String, Object> condition, String sort) throws Exception;
	
}