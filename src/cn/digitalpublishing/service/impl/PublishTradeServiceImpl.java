package cn.digitalpublishing.service.impl;

import java.io.InputStream;
import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

import org.apache.poi.xssf.usermodel.XSSFCell;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.PublishTrade;
import cn.digitalpublishing.service.PublishTradeService;
import cn.digitalpublishing.util.DateFormatUitl;


public class PublishTradeServiceImpl extends BaseServiceImpl implements PublishTradeService{
	
	public void update(PublishTrade obj, String id, String[] properties) throws Exception {

		try {
			this.daoFacade.getPublishTradeDao().update(obj, PublishTrade.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "更新失败", e);
		}

	}

	public void insert(PublishTrade obj) throws Exception {

		try {
			this.daoFacade.getPublishTradeDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增失败", e);
		}
	}

	public void delete(String id) throws Exception {

		try {
			this.daoFacade.getPublishTradeDao().delete(PublishTrade.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除失败", e);
		}
	}

	public List<PublishTrade> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<PublishTrade> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PublishTradeDao").get("getPagingList");
			list = this.daoFacade.getPublishTradeDao().getPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}
	
	public Integer getCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PublishTradeDao").get("getCount");
		try {
			num = this.daoFacade.getPublishTradeDao().getCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}

	public PublishTrade getTradeId(String id) throws Exception {

		PublishTrade publishTrade = null;
		try {
			publishTrade = (PublishTrade) this.daoFacade.getPublishTradeDao().get(PublishTrade.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return publishTrade;
	}
	
	public void upload(InputStream inputStream, String sourceId) throws Exception {
        try {
            XSSFWorkbook xwb = new XSSFWorkbook(inputStream);
            XSSFSheet sheet = xwb.getSheetAt(0);
            
            PProduct product = this.daoFacade.getProductDao().get(PProduct.class.getName(), sourceId);
            for (int i = sheet.getFirstRowNum(); i <= sheet.getPhysicalNumberOfRows(); i++) {
                XSSFRow row = sheet.getRow(i);
                if (row != null) {
                    XSSFCell version = row.getCell(0);
                    XSSFCell downPayment = row.getCell(1);
                    XSSFCell proportion = row.getCell(2);
                    XSSFCell tradeDate = row.getCell(3);
                    
                    
                    PublishTrade trade = new PublishTrade();
                    trade.setSourceId(product);
                    trade.setVersion(version.toString());
                    trade.setDownPayment(new BigDecimal(downPayment.toString()));
                    trade.setProportion(proportion.toString());
                    //trade.setTradeDate(tradeDate.getDateCellValue());
                    trade.setTradeDate(DateFormatUitl.stringToDatetime(tradeDate.toString(), "YYYY/MM/DD"));
                    this.daoFacade.getProductTypeDao().insert(trade);
                }
            }
        } catch (Exception ex) {
            ex.printStackTrace();
            throw new CcsException("解析Excel出错！");
        }
    }
	
}
