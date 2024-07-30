package com.userauthentication.request;

import java.util.Set;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class UpdateRequest {
	
	private String id;
  @NotBlank
  @Size(min = 3, max = 20)
  private String username;

  @NotBlank
  @Size(max = 50)
  
  private String siteId;

  private String password;

  private Set<String> roles;

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
