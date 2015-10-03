package hu.co.horizont.repository.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import hu.co.horizont.domain.Location;
import hu.co.horizont.mapper.LocationMapper;
import hu.co.horizont.repository.LocationRepository;

@Repository
public class LocationRepositoryImpl implements LocationRepository{
	
	@Autowired
	private LocationMapper locationMapper;

	@Override
	public List<Location> getLocations() {
		return locationMapper.getLocations();
	}

	@Override
	public Location getLocation(String id) {
		return locationMapper.getLocation(id);
	}

	@Override
	public void saveLocation(Location location) {
		if(location.is_destroy()){
			locationMapper.delete(location.getId());
		}else{
			if(location.getRev()==0){
				location.setId(UUID.randomUUID().toString());
				locationMapper.insert(location);
			}else{
				locationMapper.update(location);
			}
		}
	}

}
