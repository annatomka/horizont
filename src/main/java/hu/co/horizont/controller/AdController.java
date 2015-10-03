package hu.co.horizont.controller;

import hu.co.horizont.domain.Ad;
import hu.co.horizont.domain.User;
import hu.co.horizont.service.AdService;
import hu.co.horizont.util.Image;
import hu.co.horizont.util.ImageLoader;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Date;
import java.util.List;
import java.util.Properties;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.io.IOUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;


@Controller
public class AdController {
	protected static Logger logger = Logger
			.getLogger("AdController logger");

	@Autowired
	private AdService adService;
	
	@RequestMapping(value = "/ads", method = RequestMethod.GET)
	public @ResponseBody
	List<Ad> getAds(@RequestParam(value = "user_id",required = false) String user_id) {
		logger.info("AdsController getAds method entered.");
		if(user_id!=null)
			return adService.getAdsByUser(user_id);
		return adService.getAds();
	}

	@RequestMapping(value = "/ads", method = RequestMethod.POST, consumes = "application/json")
	public @ResponseBody
	void saveAd(@RequestBody Ad ad, HttpServletRequest request, HttpServletResponse response){

		logger.info("AdsController saveAd method entered.");
		adService.saveAd(ad);
	}
	
	@RequestMapping(value = "/ads/form", method = RequestMethod.POST)
    public String handleFormUpload(@RequestParam("name") String name,
        @RequestParam("file") MultipartFile file) {

        if (!file.isEmpty()) {
            try {
				byte[] bytes = file.getBytes();
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            // store the bytes somewhere
           return "redirect:uploadSuccess";
       } else {
           return "redirect:uploadFailure";
       }
    }
}
