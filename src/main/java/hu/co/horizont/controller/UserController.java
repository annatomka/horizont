package hu.co.horizont.controller;

import java.util.List;

import hu.co.horizont.domain.Category;
import hu.co.horizont.domain.User;
import hu.co.horizont.service.AdService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller()
@Scope("session")
public class UserController {
	protected static Logger logger = Logger
			.getLogger("UserController logger");
	
	@Autowired
	private AdService adService;
	
	@RequestMapping(value="user/info" ,method = RequestMethod.GET)
	public @ResponseBody
	User getUserInfo(HttpServletRequest request, HttpServletResponse response) {
		logger.info("UserController getUserInfo method entered.");
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if("anonymousUser".equals(principal))
			return null;
		User user = (User)principal;
		user.setPassword("");
		return user;
	}
	
	@RequestMapping(value="/users", method = RequestMethod.GET)
	public @ResponseBody
	List<User> getUsers() {
		logger.info("UserController getUsers method entered.");
		return adService.getUsers();
	}
	
}
