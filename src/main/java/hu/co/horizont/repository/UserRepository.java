package hu.co.horizont.repository;

import hu.co.horizont.domain.User;

import java.util.List;

public interface UserRepository {
	
	public List<User> getUsers();

	public User getUser(String id);

	public User getUserByEmail(String email);
	
	public void saveUser(User user);
}
