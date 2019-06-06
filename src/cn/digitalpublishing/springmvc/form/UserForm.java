package cn.digitalpublishing.springmvc.form;

import java.util.List;

import cn.digitalpublishing.po.User;

public class UserForm extends DataTableForm<User> {
	
	private User obj;
	
	private List<User> userList;
	
	private String username;
	
	private String status;
	
	private Integer role;

	public User getObj() {
		return obj;
	}

	public void setObj(User obj) {
		this.obj = obj;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}
	
}
