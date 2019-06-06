package cn.digitalpublishing.util;

/**
 * 分页对象
 */
public class Pager {

	/** 总记录数 */
	private int totalCount;

	/** 每页显示的行数 */
	private int pageSize = 10;

	/** 当前分页号 */
	private int pageNo = 1;

	/** 分页URL */
	private String pageUrl = "?c={c}&p={p}";

	public Pager() {
		pageNo = 1;
		pageSize = 10;
	}

	public int getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(int totalCount) {
		this.totalCount = totalCount;
	}

	public int getPageSize() {
		return pageSize;
	}

	public void setPageSize(int pageSize) {
		this.pageSize = pageSize;
	}

	public int getPageNo() {
		if (pageNo > getTotalPageCount()) {
			return getTotalPageCount();
		}
		return pageNo;
	}
	
	public int getTotalPageCount() {
		if (0 >= totalCount) {
			return 0;
		}
		if (0 >= pageSize) {
			return 0;
		}
		int i = totalCount / pageSize;
		if ( 0 != (totalCount % pageSize)) {
			i++;
		}
		return i;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public String getPageUrl() {
		return pageUrl;
	}

	public void setPageUrl(String pageUrl) {
		this.pageUrl = pageUrl;
	}
	
	public int getOffset() {
		return (pageNo - 1) * pageSize;
	}

}
