package hu.co.horizont.mapper;

import hu.co.horizont.domain.User;

import java.util.List;

import org.apache.ibatis.annotations.Param;


public interface UserMapper {

	  public List<User> getUsers();
	  
	  public User getUser(@Param("id") String id);
	  
	  public User getUserByEmail(@Param("email") String email);
	  
	  public void insert(User user);
	  
	  public void update(User user);
	  
	  public void delete(@Param("id") String id);
	  
}
