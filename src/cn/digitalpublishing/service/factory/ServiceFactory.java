package cn.digitalpublishing.service.factory;

import cn.digitalpublishing.service.BDicClassService;
import cn.digitalpublishing.service.PProductService;

public interface ServiceFactory {

	/**
	 * 数据字典分类Service
	 * @return
	 */
	public BDicClassService getDicClassService();

	/**
	 * 产品Service
	 * @return
	 */
	public PProductService getProductService();
	

}