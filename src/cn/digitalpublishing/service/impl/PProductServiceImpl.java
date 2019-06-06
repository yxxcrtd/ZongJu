package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.service.PProductService;
import cn.digitalpublishing.util.TwoDimensionCode;

public class PProductServiceImpl extends BaseServiceImpl implements PProductService {

    @Override
    public void updateProduct(PProduct obj, String id, String[] properties) throws Exception {

        try {
            this.daoFacade.getProductDao().update(obj, PProduct.class.getName(), id, properties);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "exhibit.info.updateEExhibit.error", e);
        }

    }
    
    public void auditUpdateProduct(PProduct obj, String id,String ip,int port,String path,String projectName,String[] properties) throws Exception {

        try {
        	String metaId = "http://"+ ip + ":" + port+projectName+"/resource/view?id="+obj.getId();
        	obj.setMetaId(metaId);
            this.daoFacade.getProductDao().update(obj, PProduct.class.getName(), id, properties);
			//设置唯一标识  可以生成二维码 规则是ISBN isbn 系统当前时间
//			String metaId = "ISBN" + "_" + pi.getIsbn() + "_" + prefix;
            System.err.println(metaId.length());
			
			// 生成二维码
			createTwoDimension(metaId, path);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "exhibit.info.updateEExhibit.error", e);
        }

    }

    @Override
    public void insertProduct(PProduct obj,String ip,int port,String path,String projectName) throws Exception {
        try {
            this.daoFacade.getProductDao().insert(obj);
            
            String metaId = "http://"+ ip + ":" + port+projectName+"/resource/view?id="+obj.getId();
			//设置唯一标识  可以生成二维码 规则是ISBN isbn 系统当前时间
//			String metaId = "ISBN" + "_" + pi.getIsbn() + "_" + prefix;
            System.err.println(metaId.length());
            obj.setMetaId(metaId);
			
			// 生成二维码
			createTwoDimension(metaId, path);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.insertCTransaction.error", e);
        }

    }
    
    @Override
    public void insertProduct(PProduct obj) throws Exception {
        try {
            this.daoFacade.getProductDao().insert(obj);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.insertCTransaction.error", e);
        }

    }

    @Override
    public void deletecProduct(PProduct obj) throws Exception {

        try {
            this.daoFacade.getProductDao().update(obj, PProduct.class.getName(), obj.getId(), null);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.deletecTransAction.error", e);
        }
    }
    
    @Override
    public void auditProduct(PProduct obj) throws Exception {

        try {
            this.daoFacade.getProductDao().update(obj, PProduct.class.getName(), obj.getId(), null);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "产品审核失败", e);
        }
    }

    @Override
    public List<PProduct> getProductPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

        List<PProduct> list = null;
        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductDao").get("getPagingList");
        try {
            list = this.daoFacade.getProductDao().getProductPagingList(condition, sort, pageCount, page, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionList.error", e);
        }
        return list;
    }

    @Override
    public Integer getProductCount(Map<String, Object> condition) throws Exception {

        Integer num = 0;
        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductDao").get("getCount");
        try {
            num = this.daoFacade.getProductDao().getCount(condition, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
        }
        return num;
    }

    public PProduct getProduct(String id) throws Exception {

        PProduct cla = null;
        try {
            cla = (PProduct) this.daoFacade.getProductDao().get(PProduct.class.getName(), id);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransaction.error", e);
        }
        return cla;
    }

    public PProduct getProductByIsbn(Map<String, Object> condition) throws Exception {

        HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductDao").get("getByIsbn");
        try {
            PProduct product = this.daoFacade.getProductDao().getProductByIsbn(condition, hqlBean);
            return product;
        } catch (Exception e) {
            throw new CcsException(
                    (e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionList.error", e);
        }
    }

    public List<PProduct> getList(Map<String, Object> condition, String sort) throws Exception {
        List<PProduct> list = null;
        try {
            HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.PProductDao").get("getList");
            list = this.daoFacade.getProductDao().getList(condition, sort, hqlBean);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "PProduct.getList.error", e);
        }
        return list;
    }
    
    
	/**
	 * 生成二维码
	 */
	@RequestMapping(value="form/createTwoDimension")
	@ResponseBody
	public void createTwoDimension(String metaId, String twoDimensionPath) throws Exception {
		try{
			TwoDimensionCode handler = new TwoDimensionCode();  
			handler.createTwoDimensionCode(metaId, twoDimensionPath, "png");
		}
		catch(Exception e){
			throw e;
		}
	}


}