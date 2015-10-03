package hu.co.horizont.repository.impl;

import java.util.List;
import java.util.UUID;

import hu.co.horizont.domain.Ad;
import hu.co.horizont.mapper.AdMapper;
import hu.co.horizont.repository.AdRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class AdRepositoryImpl implements AdRepository{

	@Autowired
	private AdMapper adMapper;
	
	@Override
	public List<Ad> getAds() {
		return adMapper.getAds();
	}

	@Override
	public Ad getAd(String id) {
		return adMapper.getAd(id);
	}

	@Override
	public void saveAd(Ad ad) {
		if(ad.is_destroy()){
			adMapper.delete(ad.getId());
		}else{
			if(ad.getRev()==0){
				ad.setId(UUID.randomUUID().toString());
				ad.setRev(1);
				adMapper.insert(ad);
			}else{
				adMapper.update(ad);
			}
		}
	}

	@Override
	public List<Ad> getAdsByUser(String user_id) {
		return adMapper.getAdsByUser(user_id);
	}

}
