package hu.co.horizont.service;

import hu.co.horizont.domain.Ad;
import hu.co.horizont.domain.Category;
import hu.co.horizont.domain.FileInfo;
import hu.co.horizont.domain.User;
import hu.co.horizont.repository.AdRepository;
import hu.co.horizont.repository.CategoryRepository;
import hu.co.horizont.repository.ImageRepository;
import hu.co.horizont.repository.LocationRepository;
import hu.co.horizont.repository.UserRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class AdService {

	@Autowired
	private AdRepository adRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;
	
	@Autowired
	private LocationRepository locationRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ImageRepository imageRepository;

	public List<Ad> getAds() {
		return adRepository.getAds();
	}
	
	public List<Ad> getAdsByUser(String user_id) {
		return adRepository.getAdsByUser(user_id);
	}
	
	public void saveAd(Ad ad){
		adRepository.saveAd(ad);
	}
	
	public void saveUser(User user){
		userRepository.saveUser(user);
	}
	
	public User getUserByEmail(String email){
		return userRepository.getUserByEmail(email);
	}
	
	public List<User> getUsers() {
		return userRepository.getUsers();
	}
	
	public List<Category> getCategories() {
		return categoryRepository.getCategories();
	}
	
	public void saveCategory(Category cat){
		categoryRepository.saveCategory(cat);
	}
	
	public List<FileInfo> getFileInfosToUser(String user_id){
		return imageRepository.getFileInfosToUser(user_id);
	}
	
	public FileInfo getFileInfo(String id){
		return imageRepository.getFileInfo(id);
	}
	
	public void insertFileInfo(FileInfo info){
		imageRepository.insert(info);
	}
	
	public void deleteFileInfo(String id){
		imageRepository.delete(id);
	}
}
