package cn.digitalpublishing.util;

/**
 * 用户构造日历数据
 *
 * @author ggh
 */
public class CalendarProp {
    private String title;//展示信息
    private String start;//日期
    private String url;//链接地址
    private String color;//显示颜色

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getStart() {
        return start;
    }

    public void setStart(String start) {
        this.start = start;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public CalendarProp(String title, String start, String url) {
        this.title = title;
        this.start = start;
        this.url = url;
        this.color = "#669533";
    }

    public CalendarProp(String title, String start, String url, String color) {
        this.title = title;
        this.start = start;
        this.url = url;
        this.color = color;
    }
}
