package com.userauthentication.utilities;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.userauthentication.entity.ERole;
import com.userauthentication.entity.Role;
import com.userauthentication.entity.User;
import com.userauthentication.repository.RoleRepository;
import com.userauthentication.repository.UserRepository;

@Component
public class RoleCreator {
	Logger logger = LogManager.getLogger(RoleCreator.class);

	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	UserRepository userRepository;

	public Role createRole(ERole eRole) {
		logger.info("Method Entry - createRole()");
		Role createdRole = null;
		Optional<Role> existingRole = roleRepository.findByName(eRole);
		if (!existingRole.isPresent()) {
			Role role = new Role();
			role.setName(eRole);

			createdRole = roleRepository.save(role);
			logger.info("Role added succesfully " + eRole);

		} else {
			
			logger.info("Role exists in DB " + eRole);
		}
		return createdRole;
	}
	
	public User createUser(String userName) {
		logger.info("Method Entry - createUser()");
		User createdUser = null;
		Set<Role> roles = new HashSet<>();
		Optional<User> existingUser = userRepository.findByUsername(userName);
		if (!existingUser.isPresent()) {
			
			User user = new User(userName, null,
					encoder.encode("admin@123"));
			Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Role is not found."));;
			roles.add(adminRole);
			user.setRoles(roles);
			createdUser = userRepository.save(user);
			logger.info("Default admin user created succesfully " + userName);

		} else {
			
			logger.info("Default admin user exists in DB " + userName);
		}
		return createdUser;
	}
}
