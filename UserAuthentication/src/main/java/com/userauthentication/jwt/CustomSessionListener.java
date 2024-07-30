package com.userauthentication.jwt;

import org.springframework.context.ApplicationListener;
import org.springframework.security.authentication.event.AuthenticationSuccessEvent;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.session.HttpSessionCreatedEvent;
import org.springframework.stereotype.Component;

@Component
public class CustomSessionListener implements ApplicationListener<HttpSessionCreatedEvent>

 {

    @Override
    public void onApplicationEvent(HttpSessionCreatedEvent event) {
       
    
    }
}
