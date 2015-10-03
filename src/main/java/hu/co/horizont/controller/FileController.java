package hu.co.horizont.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.servlet.http.HttpServletResponse;

import hu.co.horizont.domain.FileInfo;
import hu.co.horizont.domain.User;
import hu.co.horizont.service.AdService;
import hu.co.horizont.util.Image;
import hu.co.horizont.util.ImageLoader;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

@Controller
public class FileController {
	protected static Logger logger = Logger.getLogger("FileController logger");

	private @Value("${pathdirectory}")
	String path;

	@Autowired
	private AdService adService;

	@RequestMapping(value = "/upload/picture", method = RequestMethod.POST)
	public @ResponseBody
	String uploadDocument(MultipartHttpServletRequest request,
			HttpServletResponse response,
			@RequestParam("upl") MultipartFile file) throws Exception {

		String saveDirectory = path;
		Authentication auth = SecurityContextHolder.getContext()
				.getAuthentication();
		User siteUser = (User) auth.getPrincipal();

		try {
			// check whether target directory exists or not
			File dir = new File(saveDirectory + "/" + siteUser.getEmail());

			if (!dir.exists()) {
				dir.mkdir();
			}

			if (!file.getOriginalFilename().equals("")) {
				String root = saveDirectory + "/" + siteUser.getEmail();
				File original = new File(root + "/"
						+ file.getOriginalFilename());
				file.transferTo(original);
				// generate thumbnails
				createThumbnails((root + "/t_" + file.getOriginalFilename()),
						original);

				FileInfo info = new FileInfo();
				info.setId(UUID.randomUUID().toString());
				info.setName(original.getName());
				info.setPath("api/files/"+siteUser.getEmail()+"/");
				info.setUser_id(siteUser.getId());
				//save to db
				adService.insertFileInfo(info);
			}

		} catch (Exception e) {
			// return new ModelMap("success", e.toString());
			e.printStackTrace();
		}

		return "OK";
	}

	public void createThumbnails(String fileName, File originalFile) {

		try {
			Image img = ImageLoader.fromFile(originalFile);
			Image square = img.getResizedToSquare(200, 0.0).soften(0.08f);
			File out = new File(fileName);
			square.writeToJPG(out, 0.95f);
		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	 @RequestMapping(value="/gallery", method = RequestMethod.GET)
	 public @ResponseBody
	 List<FileInfo> getFileInfos() {
		 Authentication auth = SecurityContextHolder.getContext()
					.getAuthentication();
			User siteUser = (User) auth.getPrincipal();
	 return adService.getFileInfosToUser(siteUser.getId());
	 }
	 
	 @RequestMapping(value="/gallery/{id}", method = RequestMethod.GET)
	 public @ResponseBody
	 FileInfo getFileInfo(@PathVariable("id") String id) {
		 return adService.getFileInfo(id);
	 }
	 
	 @RequestMapping(value="/gallery/delete", method = RequestMethod.GET)
	 public 
	 void deleteFileInfo(@RequestParam("item") String id) {
		 adService.deleteFileInfo(id);
	 }
	 
	//
	// @RequestMapping(value="/categories",method = RequestMethod.POST, consumes
	// = "application/json")
	// public @ResponseBody
	// void saveCategory(@RequestBody Category cat, HttpServletRequest request,
	// HttpServletResponse response){
	//
	// logger.info("CategoryController saveCategory method entered.");
	// adService.saveCategory(cat);
	// }
}
