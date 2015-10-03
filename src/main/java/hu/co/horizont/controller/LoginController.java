package hu.co.horizont.controller;

import java.io.IOException;

import hu.co.horizont.domain.User;
import hu.co.horizont.service.AdService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class LoginController {
	protected static Logger logger = Logger
			.getLogger("LoginController logger");
	@Autowired
	private AdService adService;
	
	@RequestMapping(value="login" ,method = RequestMethod.GET)
	public @ResponseBody
	String login() {
		logger.info("LoginController login method entered.");
		return "teszt";
	}
	@RequestMapping(value="check" ,method = RequestMethod.GET)
	public @ResponseBody
	boolean check(@RequestParam String email, HttpServletRequest request, HttpServletResponse response) {
		//létezik-e ilyen email-címmel felhasználó?
				User userForCheck = adService.getUserByEmail(email);
				if(userForCheck!=null){
						
						return false;
				}return true;
	}
	
	@RequestMapping(value="register" ,method = RequestMethod.POST)
	public @ResponseBody
	boolean register(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {

		logger.info("LoginController register method entered.");
		
		adService.saveUser(user);
		return true;
	}
	
	@RequestMapping(method = RequestMethod.GET, value="testsession")
	public void testsession(HttpServletRequest request, HttpServletResponse response){

		logger.info("LoginController testsession method entered.");
	}
	
	@RequestMapping(method = RequestMethod.GET, value="test401")
	public void test(HttpServletRequest request, HttpServletResponse response){

		logger.info("LoginController test method entered.");
		HttpSession session = request.getSession(false);
		session.invalidate();
		response.setStatus(401);
	}
}