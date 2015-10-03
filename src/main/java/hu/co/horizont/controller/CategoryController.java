package hu.co.horizont.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import hu.co.horizont.domain.Ad;
import hu.co.horizont.domain.Category;
import hu.co.horizont.service.AdService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class CategoryController {
	protected static Logger logger = Logger
			.getLogger("CategoryController logger");
	
	@Autowired
	private AdService adService;
	
	@RequestMapping(value="/categories", method = RequestMethod.GET)
	public @ResponseBody
	List<Category> getCategories() {
		logger.info("CategoryController getCategories method entered.");
		return adService.getCategories();
	}
	
	@RequestMapping(value="/categories",method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody
	void saveCategory(@RequestBody Category cat, HttpServletRequest request, HttpServletResponse response){

		logger.info("CategoryController saveCategory method entered.");
		adService.saveCategory(cat);
	}
}
