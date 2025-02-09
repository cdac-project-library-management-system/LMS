package com.lms.exceptions;

//Custom exception for user not found scenario
public class UserNotFoundException extends RuntimeException {
	
 public UserNotFoundException(String message) {
     super(message);
 }
 
}
