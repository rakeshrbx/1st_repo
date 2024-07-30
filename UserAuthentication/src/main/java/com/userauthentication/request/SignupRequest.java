package com.userauthentication.request;

import java.util.Set;

import jakarta.validation.constraints.*;

public class SignupRequest {
	
	private String id;
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  
  private String siteId;

  private Set<String> roles;

  @NotBlank
  @Size(min = 6, max = 40)
  private String password;

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

public String getSiteId() {
	return siteId;
}

public void setSiteId(String siteId) {
	this.siteId = siteId;
}

public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

public Set<String> getRoles() {
	return roles;
}

public void setRoles(Set<String> roles) {
	this.roles = roles;
}

public String getId() {
	return id;
}

public void setId(String id) {
	this.id = id;
}
  
}
