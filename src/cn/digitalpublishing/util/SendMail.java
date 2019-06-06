
package cn.digitalpublishing.util;

import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;

import cn.com.daxtech.mail.po.MailWaitingQueue;

import com.zhima.server.model.ResultObject;
import com.zhima.server.util.restful.Converter;

@SuppressWarnings({ "unused", "rawtypes" })
public class SendMail {

	private String mailUrl;

	public SendMail(String mailUrl) {

		this.mailUrl = mailUrl;
	}

	public static void main(String[] args) {
		SendMail sendMail = new SendMail("http://127.0.0.1:8080/MailService/pages/waitingQueue/insertMailTask.xml");
		Map<String, String> body = new HashMap<String, String>();
		body.put("username", "程瑞雪");
		body.put("content1", "您好");
		body.put("content2", "欢迎您选择知码请点击链接激活用户");
		body.put("request_url", "active");
		body.put("security_code", "BA00192886");
		body.put("security_type", "01");
		body.put("email", "kid-and-kid@yeah.net");
		body.put("date", "2012-06-22");
		Map<String, String> title = new HashMap<String, String>();
		title.put("username", "程瑞雪");
		// sendMail.sendMail(title, body, "51443421", "kid-and-kid@yeah.net",
		// "A1B2", "TemplateA");
	}

	public boolean sendMail(Map<String, String> title, Map<String, String> body, String sysId, String mail, String ccMail, String filePath, String userId, String templateId) {

		Iterator<Entry<String, String>> iter;
		Map.Entry entry;
		String key;
		String value;
		boolean isSuccess = false;
		MailWaitingQueue obj = new MailWaitingQueue();
		// StringBuffer titleBuf = new StringBuffer();
		// StringBuffer bodyBuf = new StringBuffer();
		// if ((title != null) && (!(title.isEmpty()))) {
		// iter = title.entrySet().iterator();
		// while (iter.hasNext()) {
		// entry = (Map.Entry) iter.next();
		// key = (String) entry.getKey();
		// value = (String) entry.getValue();
		// titleBuf.append("#");
		// titleBuf.append(key);
		// titleBuf.append("#:");
		// titleBuf.append(value);
		// if (iter.hasNext())
		// titleBuf.append(";");
		// }
		// }
		// if ((body != null) && (!(body.isEmpty()))) {
		// iter = body.entrySet().iterator();
		// while (iter.hasNext()) {
		// entry = (Map.Entry) iter.next();
		// key = (String) entry.getKey();
		// value = (String) entry.getValue();
		// bodyBuf.append("#");
		// bodyBuf.append(key);
		// bodyBuf.append("#:");
		// bodyBuf.append(value);
		// if (iter.hasNext())
		// bodyBuf.append(";");
		// }
		// }
		obj.setBody(body.get("body"));
		obj.setCreateDate(new Date());
		obj.setFromId(templateId);
		obj.setKeyId(sysId);
		obj.setTitle(title.get("title"));
		obj.setToMail(mail);
		obj.setUserId(userId);
		obj.setCcMail(ccMail);
		obj.setFilePath(filePath);
		Converter<MailWaitingQueue> converter = new Converter<MailWaitingQueue>();
		HashMap<String, Object> map = new HashMap<String, Object>();
		map.put("obj", obj);
		String url = this.mailUrl;
		ResultObject<MailWaitingQueue> result = converter.post(url, map);
		if (result.getType().intValue() == 1)
			isSuccess = true;
		else
			isSuccess = false;

		return isSuccess;
	}

	/**
	 * 模板转换
	 * 
	 * @param map
	 * @return
	 */
	public static Map<String, String> conversion(Map<String, String> map) {

		Map<String, String> result = new HashMap<String, String>();
		try {
			String body = "";
			String title = "";
			String con = map != null && map.containsKey("body") && map.get("body") != null ? map.get("body") : "";
			String[] contents = con.split(";");
			if (contents != null && contents.length > 0) {
				String template = map != null && map.containsKey("bodyTemplate") && map.get("bodyTemplate") != null ? map.get("bodyTemplate") : "";
				for (String content : contents) {
					String[] bodys = content.split(":");
					if (bodys != null && bodys.length == 2) {
						String key = bodys[0];
						String value = bodys[1];
						template = template.replace(key, value);
					}
				}
				body = template;
			} else {
				body = con;
			}
			String tit = map != null && map.containsKey("title") && map.get("title") != null ? map.get("title") : "";
			String[] titles = tit.split(";");
			if (titles != null && titles.length > 0) {
				String template = map != null && map.containsKey("titleTemplate") && map.get("titleTemplate") != null ? map.get("titleTemplate") : "";
				for (String t : titles) {
					String[] ts = t.split(":");
					if (ts != null && ts.length == 2) {
						String key = ts[0];
						String value = ts[1];
						template = template.replace(key, value);
					}
				}
				title = template;
			} else {
				title = tit;
			}
			result.put("body", body);
			result.put("title", title);
		} catch (Exception e) {
			System.out.println(e.getMessage());
		}
		return result;
	}

	public static Map<String, String> pretreatment(Map<String, String> title , Map<String, String> body) {

		Iterator<Entry<String, String>> iter;
		Map.Entry entry;
		String key;
		String value;
		StringBuffer titleBuf = new StringBuffer();
		StringBuffer bodyBuf = new StringBuffer();
		if ((title != null) && (!(title.isEmpty()))) {
			iter = title.entrySet().iterator();
			while (iter.hasNext()) {
				entry = (Map.Entry) iter.next();
				key = (String) entry.getKey();
				value = (String) entry.getValue();
				titleBuf.append("#");
				titleBuf.append(key);
				titleBuf.append("#:");
				titleBuf.append(value);
				if (iter.hasNext())
					titleBuf.append(";");
			}
		}
		if ((body != null) && (!(body.isEmpty()))) {
			iter = body.entrySet().iterator();
			while (iter.hasNext()) {
				entry = (Map.Entry) iter.next();
				key = (String) entry.getKey();
				value = (String) entry.getValue();
				bodyBuf.append("#");
				bodyBuf.append(key);
				bodyBuf.append("#:");
				bodyBuf.append(value);
				if (iter.hasNext())
					bodyBuf.append(";");
			}
		}
		Map<String, String> result = new HashMap<String, String>();
		result.put("title", titleBuf.toString());
		result.put("body", bodyBuf.toString());
		return result;
	}
}