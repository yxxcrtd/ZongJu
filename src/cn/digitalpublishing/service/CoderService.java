package cn.digitalpublishing.service;


/**
 * CoderService
 * 
 * @author yul
 */
public interface CoderService extends BaseService {
	//下载生成key 加密
	String encodeFile(String id,String macAddress) throws Exception;
}
