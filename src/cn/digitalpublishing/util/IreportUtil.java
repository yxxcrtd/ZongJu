package cn.digitalpublishing.util;

import java.io.BufferedInputStream;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

/**
 * @description 匹配对应properties
 * @author zermls
 */
@SuppressWarnings("unused")
public class IreportUtil {

	private static Map<Object, Object> contains = new HashMap<Object, Object>();
	private static List<String> key = new ArrayList<String>();
	private static List<String> value = new ArrayList<String>();
	private static Properties p = null;

	String isNull = ""; // 默认数据
/**
 * 
 * @param o 报表编号
 * @param url 报表路径
 * @return Map 报表properties中所有元素
 */
	public static Map<Object, Object> comMap(String o,String url) {
		String proName = readConfig(o,url).toString();
		readProperties(proName,url);
		return contains;
	}

	private static void readProperties(String name,String ul) {
		StringBuffer url = new StringBuffer(ul);
		url.append("\\").append(name).append(".properties");
		InputStream in = null;
		try {
			in = new BufferedInputStream(new FileInputStream(url.toString()));
			p = new Properties();
			p.load(in);
			contains = p;

			/*Iterator it = contains.entrySet().iterator();
			while (it.hasNext()) {
				Map.Entry entry = (Map.Entry) it.next();
				key.add(entry.getKey().toString());
				value.add(entry.getValue().toString());
			}*/

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	private static Object readConfig(String name,String ul) {
		StringBuffer url = new StringBuffer(ul);
		url.append("\\config.properties");
		InputStream in = null;
		Object sn = new Object();
		try {
			in = new BufferedInputStream(new FileInputStream(url.toString()));
			Properties ps = new Properties();
			ps.load(in);
			sn = ps.get(name);

		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				in.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return sn;
	}
	public static void main(String[] args) {
		StringBuffer url = new StringBuffer(System.getProperty("user.dir"));
		url.append("\\src\\main\\webapp\\ireport\\file\\").append(1)
				.append(".properties");
		System.out.println(url);
	}
}
