package hu.co.horizont.domain;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.Transient;

public class Ad {

	private String id;
	private String category_id;
	private String location_id;
	private String location_name;
	private String location_lat;
	private String location_long;
	
	private String user_id;
	private String image_id;
	private String image_path;
	private String name;
	private Timestamp updated;
	
	@Transient
	private String username;
	
	@Transient
	private String useremail;
	
	@Transient
	private String userphone;
	
	@Transient
	private String categoryname;
	
	private String description;
	private BigDecimal price;
	private boolean targetPrice;//irányár-e
	private boolean offer;//keres vagy kínál?
	
	private boolean _destroy;
	private int rev;
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getCategory_id() {
		return category_id;
	}
	public void setCategory_id(String category_id) {
		this.category_id = category_id;
	}
	public String getLocation_id() {
		return location_id;
	}
	public void setLocation_id(String location_id) {
		this.location_id = location_id;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUserId(String user_id) {
		this.user_id = user_id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public BigDecimal getPrice() {
		return price;
	}
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	public boolean isTargetPrice() {
		return targetPrice;
	}
	public void setTargetPrice(boolean targetPrice) {
		this.targetPrice = targetPrice;
	}
	public boolean isOffer() {
		return offer;
	}
	public void setOffer(boolean offer) {
		this.offer = offer;
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
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getUseremail() {
		return useremail;
	}
	public void setUseremail(String useremail) {
		this.useremail = useremail;
	}
	public String getUserphone() {
		return userphone;
	}
	public void setUserphone(String userphone) {
		this.userphone = userphone;
	}
	public String getCategoryname() {
		return categoryname;
	}
	public void setCategoryname(String categoryname) {
		this.categoryname = categoryname;
	}
	public String getImage_id() {
		return image_id;
	}
	public void setImage_id(String image_id) {
		this.image_id = image_id;
	}
	public String getImage_path() {
		return image_path;
	}
	public void setImage_path(String image_path) {
		this.image_path = image_path;
	}
	public Timestamp getUpdated() {
		return updated;
	}
	public void setUpdated(Timestamp updated) {
		this.updated = updated;
	}
	public String getLocation_name() {
		return location_name;
	}
	public void setLocation_name(String location_name) {
		this.location_name = location_name;
	}
	public String getLocation_lat() {
		return location_lat;
	}
	public void setLocation_lat(String location_lat) {
		this.location_lat = location_lat;
	}
	public String getLocation_long() {
		return location_long;
	}
	public void setLocation_long(String location_long) {
		this.location_long = location_long;
	}
	
	
}
