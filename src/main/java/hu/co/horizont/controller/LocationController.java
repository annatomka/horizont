package hu.co.horizont.controller;

import hu.co.horizont.service.AdService;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;

@Controller("/locations")
public class LocationController {
	protected static Logger logger = Logger
			.getLogger("LocationController logger");
	@Autowired
	private AdService adService;
	
}
