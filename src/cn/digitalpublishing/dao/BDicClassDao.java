
package cn.digitalpublishing.dao;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.util.hql.DaoHelper;
import cn.digitalpublishing.po.BDicClass;

public class BDicClassDao extends CommonDao<BDicClass, String> {

	public List<BDicClass> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart, HqlBean hqlBean) throws Exception {

		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
			List<BDicClass> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName(), pageCount, countStart);
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}

	}

	public Integer getCount(Map<String, Object> condition, HqlBean hqlBean) throws Exception {

		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
			List<BDicClass> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName());
			return list == null ? 0 : Integer.valueOf(list.get(0).getId());
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	public List<BDicClass> getList(Map<String, Object> condition, HqlBean hqlBean) throws Exception {

		try {
			DaoHelper helper = new DaoHelper();
			String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
			List<BDicClass> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName());
			return list;
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

}
