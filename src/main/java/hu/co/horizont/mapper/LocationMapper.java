package hu.co.horizont.mapper;

import hu.co.horizont.domain.Location;

import java.util.List;

import org.apache.ibatis.annotations.Param;


public interface LocationMapper {

	  public List<Location> getLocations();
	  
	  public Location getLocation(@Param("id") String id);
	  
	  public void insert(Location location);
	  
	  public void update(Location location);
	  
	  public void delete(@Param("id") String id);
	  
}