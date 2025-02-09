package com.lms.exceptions;

//Custom exception for user already exists scenario
public class UserAlreadyExistsException extends RuntimeException {
	
 public UserAlreadyExistsException(String message) {
     super(message);
 }
 
}

