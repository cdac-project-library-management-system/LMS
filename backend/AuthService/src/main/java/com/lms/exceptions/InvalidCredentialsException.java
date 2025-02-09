package com.lms.exceptions;

//Custom exception for invalid credentials during login
public class InvalidCredentialsException extends RuntimeException {
	
 public InvalidCredentialsException(String message) {
     super(message);
 }
 
}


