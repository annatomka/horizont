package hu.co.horizont.security;

import hu.co.horizont.domain.User;
import hu.co.horizont.service.AdService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.annotation.Resource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.encoding.Md5PasswordEncoder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

/**
 * A custom authentication manager that grants access if given password and username are correct. 
 */
public class CustomAuthenticationManager implements AuthenticationManager {

	protected static Logger logger = Logger
			.getLogger("Custom Authentication Manager");

	@Autowired
	private AdService adService;

	// Md5 encoder to compare encoded password in database with the given one. 
	private Md5PasswordEncoder passwordEncoder = new Md5PasswordEncoder();

	public Authentication authenticate(Authentication auth)
			throws AuthenticationException {
		
		logger.debug("Performing custom authentication");
//		return new UsernamePasswordAuthenticationToken(auth.getName(),
//				auth.getCredentials(), getAuthorities(1));
		User user = null;

		
			// Retrieve user from database
			user = adService.getUserByEmail(auth.getName());
		if(user == null){
			logger.error("User does not exists!");
			throw new UsernameNotFoundException(auth.getName()+" nevű felhasználó nem létezik a rendszerben.");
		}

		// Compare passwords
		if (passwordEncoder.isPasswordValid(user.getPassword(),
				(String) auth.getCredentials(), user.getEmail()) == false) {
			logger.error("Wrong password!");
			throw new BadCredentialsException("Rossz jelszó!");
		}
		
		if (auth.getName().equals(auth.getCredentials()) == true) {
			logger.debug("Entered username and password are the same!");
			throw new BadCredentialsException(
					"A beírt felhasználónév és jelszó megegyezik!");

		} else {
			Integer role = user.isAdmin() ? 1 : 0;
			UserInfo info = new UserInfo(user.getFirstname(), user.getLastname(), user.getLastname(),
					user.getPhone(), user.isCompany() , user.isAdmin());
			logger.debug("User details are correct");
			
			return new UsernamePasswordAuthenticationToken(user,
					auth.getCredentials(), getAuthorities(role));
		}
	}

	/**
	 * Retrieves list of granted authorities.
	 * @param access
	 * @return
	 */
	public Collection<GrantedAuthority> getAuthorities(Integer access) {
		
		//access == 0 --> user role
		//access == 1 --> admin role
		
		// Create a list of grants for this user
		List<GrantedAuthority> authList = new ArrayList<GrantedAuthority>();

		if (access.compareTo(1) == 0) {
			// User has admin access
			logger.debug("Grant ROLE_ADMIN to this user");
			authList.add(new GrantedAuthorityImpl("ROLE_ADMIN"));
		}
		
		if (access.compareTo(0) == 0){
			//user has user access
			logger.debug("Grant ROLE_USER to this user");
			authList.add(new GrantedAuthorityImpl("ROLE_USER"));
			
		}

		return authList;
	}

}
