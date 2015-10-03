package hu.co.horizont.domain;

import java.io.Serializable;

import javax.persistence.Transient;
import javax.persistence.Version;

public class User implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String id;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private String phone;
	private boolean company;
	private boolean admin;
	
	@Transient
	private boolean _destroy;
	
	@Version
	private int rev;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getFirstname() {
		return firstname;
	}
	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}
	public String getLastname() {
		return lastname;
	}
	public void setLastname(String lastname) {
		this.lastname = lastname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public boolean isCompany() {
		return company;
	}
	public void setCompany(boolean company) {
		this.company = company;
	}
	public boolean is_destroy() {
		return _destroy;
	}
	public void set_destroy(boolean _destroy) {
		this._destroy = _destroy;
	}
	public int getRev() {
		return rev;
	}
	public void setRev(int rev) {
		this.rev = rev;
	}
	public boolean isAdmin() {
		return admin;
	}
	public void setAdmin(boolean admin) {
		this.admin = admin;
	}

	
}
