package com.userauthentication.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.ResourceAccessException;

import com.userauthentication.entity.ERole;
import com.userauthentication.entity.Role;
import com.userauthentication.entity.User;
import com.userauthentication.exceptions.CustomMessageException;
import com.userauthentication.jwt.JwtUtils;
import com.userauthentication.repository.RoleRepository;
import com.userauthentication.repository.UserRepository;
import com.userauthentication.request.LoginRequest;
import com.userauthentication.request.SignupRequest;
import com.userauthentication.request.UpdateRequest;
import com.userauthentication.response.JwtResponse;
import com.userauthentication.response.MessageResponse;
import com.userauthentication.service.UserDetailsImpl;

import jakarta.validation.Valid;

@CrossOrigin()
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	Logger logger = LogManager.getLogger(AuthController.class);
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	UserRepository userRepository;

	@Autowired
	RoleRepository roleRepository;

	@Autowired
	PasswordEncoder encoder;

	@Autowired
	JwtUtils jwtUtils;

	// User login with user id & password
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
		logger.info("Method Entry - authenticateUser()");
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

				if(!authentication.isAuthenticated()){
					throw new CustomMessageException("Invalid Credentials");
				}

		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = jwtUtils.generateJwtToken(authentication);
		UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
		List<String> roles = userDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		logger.info("Method Exit - authenticateUser()");
		return ResponseEntity.ok(
				new JwtResponse(jwt, userDetails.getId(), userDetails.getUsername(), userDetails.getSiteId(), roles));
	}
	
	// Register new user with necessary details
	@PostMapping("/signup")
	public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signUpRequest) {
		logger.info("Method Entry - registerUser()");
		if (userRepository.existsByUsernameIgnoreCase(signUpRequest.getUsername())) {
			throw new CustomMessageException("Username is already taken!");
		}
		/*
		 * if (userRepository.existsByEmail(signUpRequest.getEmail())) { return
		 * ResponseEntity .badRequest() .body(new
		 * MessageResponse("Error: Email is already in use!")); }
		 */

		// Create new user's account
		User user = new User(signUpRequest.getUsername(), signUpRequest.getSiteId(),
				encoder.encode(signUpRequest.getPassword()));

		Set<String> strRoles = signUpRequest.getRoles();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_DATAENTRY)
					.orElseThrow(() -> new RuntimeException("Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "ROLE_ADMIN":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(adminRole);

					break;
				case "ROLE_REVIEWER":
					Role modRole = roleRepository.findByName(ERole.ROLE_REVIEWER)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(modRole);

					break;
				case "ROLE_SPONSOR":
					Role sponsorRole = roleRepository.findByName(ERole.ROLE_SPONSOR)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(sponsorRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_DATAENTRY)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(userRole);
				}
			});
		}

		user.setRoles(roles);
		userRepository.save(user);
		logger.info("Method Exit - registerUser()");
		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}

	// Update specific user details
	@PutMapping("/user/{userId}")
	public ResponseEntity<?> updateUser(@PathVariable Integer userId, @Valid @RequestBody UpdateRequest updateRequest)
			{
		logger.info("Method Entry - updateUser()");
		/*
		 * if (userRepository.existsByUsername(signUpRequest.getUsername())) { return
		 * ResponseEntity .badRequest() .body(new
		 * MessageResponse("Error: Username is already taken!")); }
		 * 
		 * if (userRepository.existsByEmail(signUpRequest.getEmail())) { return
		 * ResponseEntity .badRequest() .body(new
		 * MessageResponse("Error: Email is already in use!")); }
		 */
		User currentUser = userRepository.findById(Long.valueOf(userId))
				.orElseThrow(() -> new ResourceAccessException("User is not found."));
		// Create new user's account

		Set<String> strRoles = updateRequest.getRoles();
		
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_DATAENTRY)
					.orElseThrow(() -> new RuntimeException("Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "ROLE_ADMIN":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(adminRole);

					break;
				case "ROLE_REVIEWER":
					Role modRole = roleRepository.findByName(ERole.ROLE_REVIEWER)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(modRole);

					break;
				case "ROLE_SPONSOR":
					Role sponsorRole = roleRepository.findByName(ERole.ROLE_SPONSOR)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(sponsorRole);

					break;
				case "ROLE_PI":
					Role pIRole = roleRepository.findByName(ERole.ROLE_PI)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(pIRole);
					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_DATAENTRY)
							.orElseThrow(() -> new RuntimeException("Role is not found."));
					roles.add(userRole);
				}
			});
		}

		currentUser.setSiteId(updateRequest.getSiteId());
		currentUser.setPassword(encoder.encode(updateRequest.getPassword()));
		currentUser.setUsername(updateRequest.getUsername());
		currentUser.setRoles(roles);
		currentUser.setSiteId(updateRequest.getSiteId());
		try {
			userRepository.save(currentUser);
		} catch (DataAccessException e) {
			logger.error(e.getMessage());
			throw new CustomMessageException("Can't update user details");

		}
		logger.info("Method Exit - updateUser()");
		return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
	}

	// Get list of all users
	@GetMapping("/users")
	public ResponseEntity<List<User>> getAllUsers() {
		logger.info("Method Entry - getAllUsers()");
		return ResponseEntity.ok(userRepository.findAll());

	}
	
	// Delete specific user details
		@DeleteMapping("/user/{userId}")
		public ResponseEntity<?> deleteUser(@PathVariable Integer userId)
				{
			logger.info("Method Entry - deleteUser()");
			/*
			 * if (userRepository.existsByUsername(signUpRequest.getUsername())) { return
			 * ResponseEntity .badRequest() .body(new
			 * MessageResponse("Error: Username is already taken!")); }
			 * 
			 * if (userRepository.existsByEmail(signUpRequest.getEmail())) { return
			 * ResponseEntity .badRequest() .body(new
			 * MessageResponse("Error: Email is already in use!")); }
			 */
			User currentUser = userRepository.findById(Long.valueOf(userId))
					.orElseThrow(() -> new ResourceAccessException("User is not found."));
			// Create new user's account

			try {
				userRepository.deleteById(Long.valueOf(userId));
			} catch (DataAccessException e) {
				logger.error(e.getMessage());
				throw new CustomMessageException("Can't delete user");

			}
			logger.info("Method Exit - deleteUser()");
			return ResponseEntity.ok(new MessageResponse("Record deleted successfully!"));
		}
}
