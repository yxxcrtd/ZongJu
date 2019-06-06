package cn.digitalpublishing.dao;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.util.hql.DaoHelper;
import cn.digitalpublishing.po.PProductLicense;

import java.util.List;
import java.util.Map;

/**
 * Created by huangchenxi on 14-6-25.
 */
public class PProductLicenseDao extends CommonDao<PProductLicense, String> {
    public List<PProductLicense> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer countStart, HqlBean hqlBean) throws Exception {
        try {
            DaoHelper helper = new DaoHelper();
            String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
            List<PProductLicense> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName(), pageCount, countStart);
            return list;
        } catch (Exception e) {
            throw e;
        }
    }


    public Integer getCount(Map<String, Object> condition, HqlBean hqlBean) throws Exception {
        try {
            DaoHelper helper = new DaoHelper();
            String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
            List<PProductLicense> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName());
            return list == null ? 0 : Integer.valueOf(list.get(0).getLicenseId());
        } catch (Exception e) {
            throw e;
        }
    }

    public List<PProductLicense> getList(Map<String, Object> condition, String sort, HqlBean hqlBean) throws Exception {
        try {
            DaoHelper helper = new DaoHelper();
            String where = (helper.getWhere(hqlBean.getConditions(), condition) != null && "".equals(helper.getWhere(hqlBean.getConditions(), condition))) ? helper.getWhere(hqlBean.getConditions(), condition) : " where " + helper.getWhere(hqlBean.getConditions(), condition);
            List<PProductLicense> list = hibernateDao.getListByHql(hqlBean.getProperties(), hqlBean.getFields(), hqlBean.getHql() + where, helper.getCondition() == null ? null : helper.getCondition().toArray(), hqlBean.getOrder(), hqlBean.getClassName());
            return list;
        } catch (Exception e) {
            e.printStackTrace();
            throw e;
        }
    }
}
