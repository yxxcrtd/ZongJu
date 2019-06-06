package cn.digitalpublishing.util.converter;

import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import org.springframework.core.convert.converter.Converter;

public class DateConverter implements Converter<String, Date> {

	public static SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
	public static SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
	public static SimpleDateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");

	@Override
	public Date convert(String source) {
		if (source == null) {
			return null;
		}
		source = source.trim();

		if (source.equals("")) {
			return null;
		}

		Date date = null;
		try {
			if (source.contains("-") && source.contains(":")) {
				date = dateTimeFormat.parse(source);
			}

			if (source.contains("-") && !source.contains(":")) {
				date = dateFormat.parse(source);
			}

			if (!source.contains("-") && source.contains(":")) {
				date = timeFormat.parse(source);
			}
		} catch (ParseException e) {
			return null;
		}
		return date;
	}
}