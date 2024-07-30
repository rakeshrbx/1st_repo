package com.userauthentication.exceptions;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class EcrfGlobalExceptionController {
	
Logger logger = LogManager.getLogger(EcrfGlobalExceptionController.class);
   @ExceptionHandler(value = HttpMessageNotReadableException.class)
   public ResponseEntity<Object> handleException(HttpMessageNotReadableException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", "Invalid Data Format");
       logger.info("Method Entry - HttpMessageNotReadableException");
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = EtAuthException.class)
   public ResponseEntity<Object> handleDataException(EtAuthException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", ex.getLocalizedMessage());
      // body.put("status", HttpStatus.FORBIDDEN);
       body.put("message", ex.getMessage());
       logger.info("Method Entry - CustomMessageException");
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = DateTimeParseException.class)
   public ResponseEntity<Object> handleDataException(DateTimeParseException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", "Invalid Date Format");      
       logger.info("Method Entry - DateTimeParseException");
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = Exception.class)
   public ResponseEntity<Object> handleDataException(Exception ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", ex.getMessage());
       logger.info("Method Entry - Exception");
       logger.error("exception occured "+ex.getMessage());
       ex.printStackTrace();
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = DataIntegrityViolationException.class)
   public ResponseEntity<Object> handleDataException(DataIntegrityViolationException ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", ex.getMessage());
       logger.info("Method Entry - ConstraintViolationException");
       logger.error("exception occured "+ex.getMessage());
       ex.printStackTrace();
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
      
}