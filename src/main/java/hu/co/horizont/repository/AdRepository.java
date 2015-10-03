package hu.co.horizont.repository;

import hu.co.horizont.domain.Ad;

import java.util.List;

public interface AdRepository {

	public List<Ad> getAds();

	public List<Ad> getAdsByUser(String user_id);
	
	public Ad getAd(String id);

	public void saveAd(Ad ad);
	
}
