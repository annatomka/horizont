package hu.co.horizont.domain;

public class Category {

	private String id;
	private String name;
	
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
