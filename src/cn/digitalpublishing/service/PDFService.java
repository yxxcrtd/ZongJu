package cn.digitalpublishing.service;


/**
 * CoderService
 * 
 * @author yul
 */
public interface PDFService extends BaseService {
	/**
	 * html转化pdf
	 * @param soucePath html文件路径
	 * @param savePath  生成的pdf存储路径
	 * @param enCoding  文件编码
	 * @throws Exception
	 */
	void createPDF(String soucePath,String savePath,String enCoding) throws Exception;
	
}
