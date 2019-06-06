package cn.digitalpublishing.dao;

import java.util.List;
import java.util.Map;
import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.util.hql.DaoHelper;
import cn.digitalpublishing.po.CrSubsidaryRight;

public class CrSubsidaryRightDao extends CommonDao<CrSubsidaryRight, String> {

	public List<CrSubsidaryRight> getList(Map<String, Object> condition, String sort,HqlBean hqlBean) throws Exception {
		List<CrSubsidaryRight> list = null;
		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where "+helper.getWhere(hqlBean.getConditions(), condition);
			list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql()+where,helper.getCondition()==null?null:helper.getCondition().toArray(),sort+hqlBean.getOrder(), hqlBean.getClassName());
		} catch (Exception e) {
			throw e;
		}
		return list;
	}

	public List<CrSubsidaryRight> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page,HqlBean hqlBean) throws Exception {
		List<CrSubsidaryRight> list = null;
		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where "+helper.getWhere(hqlBean.getConditions(), condition);
			list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql()+where,helper.getCondition()==null?null:helper.getCondition().toArray(),hqlBean.getOrder(), hqlBean.getClassName(), pageCount, page);
		} catch (Exception e) {
			throw e;
		}
		return list;
	}

	public Integer getCount(Map<String, Object> condition, String sort,HqlBean hqlBean) throws Exception {
		List<CrSubsidaryRight> list = null;
		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where "+helper.getWhere(hqlBean.getConditions(), condition);
			list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql()+where,helper.getCondition()==null?null:helper.getCondition().toArray(),sort+hqlBean.getOrder(), hqlBean.getClassName());
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		return list == null ? 0 : Integer.parseInt(list.get(0).getSrlicenseId());
	}

}
