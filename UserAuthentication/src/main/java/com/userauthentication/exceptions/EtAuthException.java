package com.userauthentication.exceptions;


import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;


public class EtAuthException extends RuntimeException {
    public EtAuthException(String message) {
        super(message);
    }
}
