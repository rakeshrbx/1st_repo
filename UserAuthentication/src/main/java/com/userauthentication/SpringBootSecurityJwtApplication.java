package com.userauthentication;

import java.util.Arrays;
import java.util.Optional;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.userauthentication.entity.ERole;
import com.userauthentication.entity.Role;
import com.userauthentication.repository.RoleRepository;
import com.userauthentication.utilities.RoleCreator;

@SpringBootApplication(scanBasePackages = {"com.userauthentication.controller","com.userauthentication.service","com.userauthentication.security", "com.userauthentication.repository","com.userauthentication.exceptions","com.userauthentication.jwt","com.userauthentication.utilities"})
public class SpringBootSecurityJwtApplication implements CommandLineRunner{
	 private static final Logger logger = LogManager.getLogger(SpringBootSecurityJwtApplication.class);
	public static void main(String[] args) {
    SpringApplication.run(SpringBootSecurityJwtApplication.class, args);
	}
	
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	RoleCreator roleCreator;
	
	@Override
	public void run(String... args) throws Exception {
	
		for (ERole eRole : ERole.values()) {
			roleCreator.createRole(eRole);
			}
		
		roleCreator.createUser("ecrfadmin");
		    
	}
	


}
