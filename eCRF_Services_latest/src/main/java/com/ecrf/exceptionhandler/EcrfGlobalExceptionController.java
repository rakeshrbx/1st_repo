package com.ecrf.exceptionhandler;

import java.time.format.DateTimeParseException;
import java.util.HashMap;
import java.util.Map;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
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
	   logger.info("Method Entry - HttpMessageNotReadableException()");
       Map<String, Object> body = new HashMap<>();
       body.put("error", "Invalid Data Format");
      
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = CustomMessageException.class)
   public ResponseEntity<Object> handleDataException(CustomMessageException ex) {
	   logger.info("Method Entry - CustomMessageException()");
       Map<String, Object> body = new HashMap<>();
       body.put("error", ex.getLocalizedMessage());
       logger.info("Method Entry - CustomMessageException");
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = DateTimeParseException.class)
   public ResponseEntity<Object> handleDataException(DateTimeParseException ex) {
	   logger.info("Method Entry - DateTimeParseException");
       Map<String, Object> body = new HashMap<>();
       body.put("error", "Invalid Date Format");
      
      logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
   
   @ExceptionHandler(value = Exception.class)
   public ResponseEntity<Object> handleDataException(Exception ex) {
       Map<String, Object> body = new HashMap<>();
       body.put("error", ex.getMessage());
       logger.info("Method Entry - Exception");
       logger.error("exception occured "+ex.getMessage());
       return new ResponseEntity<>(body, HttpStatus.BAD_REQUEST);
   }
      
}