
package cn.digitalpublishing.util;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import cn.digitalpublishing.constants.DicConstants;
import cn.digitalpublishing.po.BDic;
import cn.digitalpublishing.po.BDicClass;
import cn.digitalpublishing.service.factory.ServiceFactory;
import cn.digitalpublishing.service.factory.impl.ServiceFactoryImpl;

/**
 * 
 * @author ggh
 * @since 2013/8/14
 */
public class DicCache {

	static ServiceFactory serviceFactory = null;

	private static DicCache dicCache = null;

	private static Object obj = new Object();

	private static Map<String, Map<String, String>> map = null; // Cache table

	private DicCache() {

		serviceFactory = (ServiceFactory) new ServiceFactoryImpl();
	}

	public static DicCache getInstance() {

		if (dicCache == null) {
			synchronized (obj) {
				if (dicCache == null) {
					dicCache = new DicCache();
				}
			}
		}
		return dicCache;
	}

	// key：字典分类；value：字典数据
	// 通过key获取对应的下拉框数据
	public static Map<String, String> getDicData(String key) {

		if (map == null) {
			synchronized (obj) {
				if (map == null) {
					map = new HashMap<String, Map<String, String>>();
				}
			}
		}
		if (map.containsKey(key)) {
			return map.get(key);
		} else {
			synchronized (obj) {
				if (!map.containsKey(key)) {
					dicCache = DicCache.getInstance();
					dicCache.loadDataSource(key,"");
				}
				return map.get(key);
			}

		}
	}

	/**
	 * 根据 数据字典分类信息， 数据字典 code 值 获取主键
	 * 
	 * @param dicClassName
	 * @param code
	 * @return by Ma Guoqing
	 */

	public static String getIdByCode(String dicClassName, Integer code) {
		if (dicCache == null) {
			getDicData(dicClassName);
		}
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("classCode", dicClassName);
		condition.put("code", code + "");
		BDic dic = null;
		try {
			List<BDic> dicList = serviceFactory.getDicClassService().getDicBySequence(condition);

			dic = ((dicList == null||dicList.isEmpty()) ? null : dicList.get(0));

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return dic == null ? null : dic.getId();
	}
	
	/**
	 * 根据 数据字典分类信息， 数据字典 code 值 获取主键 by String
	 * 
	 * @param dicClassName
	 * @param code
	 * @author Ma Guoqing
	 */
	public static String getIdByCode(String dicClassName, String code) {
		if (dicCache == null) {
			getDicData(dicClassName);
		}
		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("classCode", dicClassName);
		condition.put("code", code);
		BDic dic = null;
		try {
			List<BDic> dicList = serviceFactory.getDicClassService().getDicBySequence(condition);
			dic = ((dicList == null||dicList.isEmpty()) ? null : dicList.get(0));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return dic == null ? null : dic.getId();
	}

	/**
	 * 当数据字典项变化时，主动更新数据
	 * 
	 * @param key
	 */
	public static void reloadDicData(String id) {

		BDicClass dc = null;
		try {
			dc = serviceFactory.getDicClassService().getDicClass(id);
			dicCache = DicCache.getInstance();
			dicCache.loadDataSource(dc.getCode());
		} catch (Exception e) {

		}
	}

	/*
	 * Load data from data source.
	 */
	protected void loadDataSource(String key) {

		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("classCode", key);
		condition.put("status",getIdByCode(DicConstants.DIC_STATUS,  DicConstants.DATA_STATUS_AVAILABLE));
		try {
			List<BDic> list = serviceFactory.getDicClassService().getDicCacheData(condition," order by a.order asc ");
			SequenceUtil<Object> util = new SequenceUtil<Object>();
			Map<Object, Object> oldmap = SequenceUtil.getMap(list, "id", "name");
			Map<String, String> dicData = util.paramOrder(oldmap, Sort.Asc, Item.VAL);
			map.put(key, dicData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	protected void loadDataSource(String key,String orderType) {

		Map<String, Object> condition = new HashMap<String, Object>();
		condition.put("classCode", key);
		condition.put("status",getIdByCode(DicConstants.DIC_STATUS,  DicConstants.DATA_STATUS_AVAILABLE));
		try {
			List<BDic> list = serviceFactory.getDicClassService().getDicCacheData(condition," order by a.order asc ");
			SequenceUtil<Object> util = new SequenceUtil<Object>();
			LinkedHashMap<Object, Object> oldmap = SequenceUtil.getMap(list, "id", "name");
			LinkedHashMap<String, String> dicData = util.paramOrder(oldmap, Sort.NoSort, Item.VAL);
			map.put(key, dicData);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
