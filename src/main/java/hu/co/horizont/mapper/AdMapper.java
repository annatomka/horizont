package hu.co.horizont.mapper;

import hu.co.horizont.domain.Ad;

import java.util.List;

import org.apache.ibatis.annotations.Param;


public interface AdMapper {

	  public List<Ad> getAds();
	  
	  public Ad getAd(@Param("id") String id);
	  
	  public List<Ad> getAdsByUser(@Param("user_id") String user_id);
	  
	  public void insert(Ad ad);
	  
	  public void update(Ad ad);
	  
	  public void delete(@Param("id") String id);
	  
}
