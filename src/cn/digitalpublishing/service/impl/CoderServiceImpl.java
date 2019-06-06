package cn.digitalpublishing.service.impl;

import java.math.BigInteger;
import java.security.MessageDigest;

import javax.crypto.KeyGenerator;
import javax.crypto.Mac;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;

import cn.digitalpublishing.service.CoderService;

import sun.misc.BASE64Decoder;
import sun.misc.BASE64Encoder;



public class CoderServiceImpl implements CoderService {
	public static final String KEY_SHA = "SHA";
	public static final String KEY_MD5 = "MD5";
	public static final String KEY_MAC = "HmacMD5";
	
	/**
	 * BASE64解密
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static byte[] decryptBASE64(String key)throws Exception{
		return (new BASE64Decoder()).decodeBuffer(key);
	}
	/**
	 * BASE64加密
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public static String encryptBASE64(byte[] key)throws Exception{
		return (new BASE64Encoder()).encodeBuffer(key);
	}
	/**
	 * MD5加密
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptMD5(byte[]data)throws Exception{
		MessageDigest md5 = MessageDigest.getInstance(KEY_MD5);
		md5.update(data);
		return md5.digest();
	}
	/**
	 * sha加密
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static byte[] encryptSHA(byte[]data)throws Exception{
		MessageDigest sha = MessageDigest.getInstance(KEY_SHA);
		sha.update(data);
		return sha.digest();
	}
	/**
	 * 初始化mac地址加密
	 * @return
	 * @throws Exception
	 */
	public static String initMacKey()throws Exception{
		KeyGenerator keyGenerator = KeyGenerator.getInstance(KEY_MAC);
		SecretKey secretKey = keyGenerator.generateKey();
		return encryptBASE64(secretKey.getEncoded());
	}
	
	public static byte[] encryptHMAC(byte[]data,String key)throws Exception{
		SecretKey secreKey = new SecretKeySpec(decryptBASE64(key), KEY_MAC);
		Mac mac = Mac.getInstance(secreKey.getAlgorithm());
		mac.init(secreKey);
		return mac.doFinal();
	}
	@Override
	public String encodeFile(String str,String macAddress) throws Exception {
		//base64加密
//		String base64 = encryptBASE64(str.getBytes());
//		System.out.println("base64  :  "+base64);
		//MD5加密
		byte[]md5 = encryptMD5(str.getBytes());
		
		//mac 加密
		BigInteger mac = new BigInteger(encryptHMAC(md5,str));
		String finalKey = mac.toString(32);
		return finalKey;
	}
}
