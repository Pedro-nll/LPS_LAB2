package com.lps.back.exceptions;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class InvalidInformationExceptionTest {

    @Test
    void testDefaultConstructor() {
        InvalidInformationException exception = new InvalidInformationException();
        assertNotNull(exception);
        assertNull(exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    void testConstructorWithMessage() {
        String errorMessage = "Invalid information provided";
        InvalidInformationException exception = new InvalidInformationException(errorMessage);
        assertNotNull(exception);
        assertEquals(errorMessage, exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    void testConstructorWithMessageAndCause() {
        String errorMessage = "Invalid information provided";
        Throwable cause = new IllegalArgumentException("Invalid input");
        InvalidInformationException exception = new InvalidInformationException(errorMessage, cause);
        assertNotNull(exception);
        assertEquals(errorMessage, exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    void testExceptionInheritance() {
        InvalidInformationException exception = new InvalidInformationException();
        assertTrue(exception instanceof RuntimeException);
    }

    @Test
    void testNullMessage() {
        InvalidInformationException exception = new InvalidInformationException(null);
        assertNull(exception.getMessage());
    }

    @Test
    void testEmptyMessage() {
        String errorMessage = "";
        InvalidInformationException exception = new InvalidInformationException(errorMessage);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void testNullCause() {
        InvalidInformationException exception = new InvalidInformationException("Test", null);
        assertNull(exception.getCause());
    }
}