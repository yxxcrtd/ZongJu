package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.PProduct;
import cn.digitalpublishing.po.Section;
import cn.digitalpublishing.service.SectionService;

public class SectionServiceImpl extends BaseServiceImpl implements SectionService {

	
	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#insert(cn.digitalpublishing.po.Resource)
	 */
	@Override
	public void insert(Section section) throws Exception {
		try {
			this.daoFacade.getSectionDao().insert(section);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#update(cn.digitalpublishing.po.Resource, java.lang.String, java.lang.String, java.lang.String[])
	 */
	@Override
	public void update(Section section, String className, String id, String[] properties) throws Exception {
		try {
			this.daoFacade.getSectionDao().update(section, className, id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "保存信息失败！", e);
		}
	}

	/* (non-Javadoc)
	 * 
	 * @see cn.digitalpublishing.service.ResourceService#delete(java.lang.String, java.lang.String)
	 */
	@Override
	public void delete(String className, String id) throws Exception {
		try {
			this.daoFacade.getSectionDao().delete(className, id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除信息失败！", e);
		}
	}

	@Override
	public Section findById(String id) throws CcsException {
		// TODO Auto-generated method stub
		Section section = null;
		try {
			section = (Section) this.daoFacade.getSectionDao().get(Section.class.getName(), id);
		} catch (Exception e) {
			// TODO: handle exception
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找失败", e);
		}
		return section;
	}
	
	@Override
	public Integer getCount(Map<String, Object> map) throws Exception {
		Integer num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.SectionDao").get("getCount");
		try {
			num = this.daoFacade.getSectionDao().getCount(map, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.getCTransactionCount.error", e);
		}
		return num;
	}
	
	@Override
	public List<Section> getList(Map<String, Object> condition, String sort) throws Exception {
		List<Section> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.SectionDao").get("getList");
		try {
			list = this.daoFacade.getSectionDao().getList(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt(): "获取版权信息列表失败！", e);
		}
		return list;
	}

	@Override
	public void finishAndSave(PProduct product, Section section)
			throws Exception {
		// TODO Auto-generated method stub
		try {
			//保存资源
            this.daoFacade.getProductDao().insert(product);
            //修改在线创作为完成状态
            this.daoFacade.getSectionDao().update(section, Section.class.getName(), section.getId(), null);
        } catch (Exception e) {
            throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "transaction.info.insertCTransaction.error", e);
        }
	}
}