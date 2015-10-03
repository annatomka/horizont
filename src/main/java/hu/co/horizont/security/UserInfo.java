package hu.co.horizont.security;

import java.security.Principal;

public class UserInfo implements Principal{

	private String firstname;
	private String lastname;
	private String email;
	private String phone;
	private boolean company;
	private boolean admin;
	
	public UserInfo(String firstname, String lastname, String email,
			String phone, boolean company, boolean admin) {
		super();
		this.firstname = firstname;
		this.lastname = lastname;
		this.email = email;
		this.phone = phone;
		this.company = company;
		this.admin = admin;
	}

	@Override
	public String getName() {
		return lastname + " " + firstname;
	}
	
}