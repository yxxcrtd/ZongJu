package cn.digitalpublishing.config;

public class ProcessQueue {
	
	/**
	 * rest:rest服务 ws:webservice服务 ftp:ftp服务
	 */
	public static String interfaceService = "rest";
	
	/**
	 * WEBROOT
	 */
	public static String WEBROOT = "";
	
	/**
	 * png后缀
	 */
	public static final String SUFFIX_PNG = ".png";

	/**
	 * 图片存储目录
	 */
	public static final String IMAGE = "image";

	/**
	 * 视频存储目录
	 */
	public static final String VDIEO = "vdieo";
	
	/**
	 * 素材打包文件存储目录
	 */
	public static final String COMPRESS = "compress";

	/**
	 * PDF图书存储目录
	 */
	public static final String WATERMARK = "waterMark";
	
	/**
	 * 临时存储HTML目录
	 */
	public static final String TEMPHTML = "temphtml";

}
