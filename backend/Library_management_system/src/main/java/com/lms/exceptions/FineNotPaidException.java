package com.lms.exceptions;

public class FineNotPaidException extends RuntimeException {
    public FineNotPaidException(String message) {
        super(message);
    }
}