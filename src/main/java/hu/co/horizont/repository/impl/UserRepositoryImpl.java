package hu.co.horizont.repository.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.stereotype.Repository;

import hu.co.horizont.domain.User;
import hu.co.horizont.mapper.UserMapper;
import hu.co.horizont.repository.UserRepository;

@Repository
public class UserRepositoryImpl implements UserRepository{

	@Autowired
	private UserMapper userMapper;
	
	private Md5PasswordEncoder passwordEncoder = new Md5PasswordEncoder();
	
	@Override
	public List<User> getUsers() {
		return userMapper.getUsers();
	}

	@Override
	public User getUser(String id) {
		return userMapper.getUser(id);
	}

	@Override
	public void saveUser(User user) {
		if(user.is_destroy()){
			userMapper.delete(user.getId());
		}else{
			user.setPassword(passwordEncoder.encodePassword(user.getPassword(),user.getEmail()));
			if(user.getRev()==0){
				user.setId(UUID.randomUUID().toString());
				
				user.setRev(1);
				userMapper.insert(user);
			}else{
				userMapper.update(user);
			}
		}
	}

	@Override
	public User getUserByEmail(String email) {
		return userMapper.getUserByEmail(email);
	}

}
