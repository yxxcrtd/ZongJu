package cn.digitalpublishing.service.factory.impl;

import cn.com.daxtech.framework.web.service.SpringBeanService;
import cn.digitalpublishing.service.BDicClassService;
import cn.digitalpublishing.service.PProductService;
import cn.digitalpublishing.service.factory.ServiceFactory;

public class ServiceFactoryImpl implements ServiceFactory {

	public BDicClassService getDicClassService() {
		return (BDicClassService) SpringBeanService.getService("dicClassService");
	}

	public PProductService getProductService() {
		return (PProductService) SpringBeanService.getService("productService");
	}
}