package hu.co.horizont.domain;

public class Location {

	private String id;
	private String name;
	private int radius;
	private String lat;
	private String lng;
	
	private boolean _destroy;
	private int rev;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getRadius() {
		return radius;
	}
	public void setRadius(int radius) {
		this.radius = radius;
	}
	public String getLat() {
		return lat;
	}
	public void setLat(String lat) {
		this.lat = lat;
	}
	public String getLng() {
		return lng;
	}
	public void setLng(String lng) {
		this.lng = lng;
	}
	public boolean is_destroy() {
		return _destroy;
	}
	public void set_destroy(boolean _destroy) {
		this._destroy = _destroy;
	}
	public int getRev() {
		return rev;
	}
	public void setRev(int rev) {
		this.rev = rev;
	}
	
	
	
}
