package cn.digitalpublishing.service.impl;

import java.util.List;
import java.util.Map;

import cn.com.daxtech.framework.bean.HqlBean;
import cn.com.daxtech.framework.exception.CcsException;
import cn.com.daxtech.framework.util.hql.HqlBeanCacheUtil;
import cn.digitalpublishing.po.User;
import cn.digitalpublishing.service.UserService;

public class UserServiceImpl extends BaseServiceImpl implements UserService{
	
	public void update(User obj, String id, String[] properties) throws Exception {

		try {
			this.daoFacade.getUserDao().update(obj, User.class.getName(), id, properties);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "修改用户信息失败", e);
		}

	}

	public void insert(User obj) throws Exception {

		try {
			this.daoFacade.getUserDao().insert(obj);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "新增用户失败", e);
		}
	}

	public void delete(User obj) throws Exception {

		try {
			this.daoFacade.getUserDao().update(obj, User.class.getName(), obj.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "删除用户信息失败", e);
		}
	}
	
	public void verify(User obj) throws Exception {

		try {
			this.daoFacade.getUserDao().update(obj, User.class.getName(), obj.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "用户审核失败", e);
		}
	}

	public void reset(User obj) throws Exception {

		try {
			this.daoFacade.getUserDao().update(obj, User.class.getName(), obj.getId(), null);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "密码重置失败", e);
		}
	}
	
	public List<User> getPagingList(Map<String, Object> condition, String sort, Integer pageCount, Integer page) throws Exception {

		List<User> list = null;
		try {
			HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.UserDao").get("getPagingList");
			list = this.daoFacade.getUserDao().getUserPagingList(condition, sort, pageCount, page, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取用户列表失败", e);
		}
		return list;
	}
	
	public Integer getCount(Map<String, Object> condition) throws Exception {

		int num = 0;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.UserDao").get("getCount");
		try {
			num = this.daoFacade.getUserDao().getUserCount(condition, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取分页总数失败", e);
		}
		return num;
	}

	public User getUserId(String id) throws Exception {

		User user = null;
		try {
			user = (User) this.daoFacade.getUserDao().get(User.class.getName(), id);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "查找信息失败", e);
		}
		return user;
	}
	
	public List<User> getUserList(Map<String, Object> condition, String sort) throws Exception {

		List<User> list = null;
		HqlBean hqlBean = HqlBeanCacheUtil.gethqlBeanCache().get("cn.digitalpublishing.dao.UserDao").get("getUserList");
		try {
			list = this.daoFacade.getUserDao().getUserList(condition, sort, hqlBean);
		} catch (Exception e) {
			throw new CcsException((e instanceof CcsException) ? ((CcsException) e).getPrompt() : "获取列表失败", e);
		}
		return list;
	}

}
