package hu.co.horizont.exceptions;

import javax.servlet.http.HttpServletResponse;

public class AuthenticationException extends Exception{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String msg;
	private int status = HttpServletResponse.SC_INTERNAL_SERVER_ERROR;
	
	public AuthenticationException(String msg){
		this.msg = msg;
	}

	@Override
	public String getMessage() {
		return msg;
	}

	public int getStatus(){
		return status;
	}
}
