package hu.co.horizont.repository;

import hu.co.horizont.domain.Location;

import java.util.List;

public interface LocationRepository {
	
	public List<Location> getLocations();

	public Location getLocation(String id);

	public void saveLocation(Location location);
}
