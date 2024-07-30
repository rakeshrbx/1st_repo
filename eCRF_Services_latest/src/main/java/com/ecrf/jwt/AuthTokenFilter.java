package com.ecrf.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {
	
	@Autowired
	private JwtUtils jwtUtils;

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {

			String jwt = parseJwt(request);

			if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
				// String username = jwtUtils.getUserNameFromJwtToken(jwt);
				logger.info("Token is Valid");
				filterChain.doFilter(request, response);
			} else {

				
				  response.setHeader("error", "invalid/expired token"); response.sendError(401,
				  "invalid/expired token");
				 
			}

		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e.getMessage());
			
			  response.setHeader("error", "invalid/expired token"); response.sendError(401,
			  "invalid/expired token");
			 

		}

		
	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7);
		}

		return null;
	}
}
