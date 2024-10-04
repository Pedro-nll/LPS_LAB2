package com.lps.back.exceptions;
import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class ChangePasswordExceptionTest {

    @Test
    void testDefaultConstructor() {
        ChangePasswordException exception = new ChangePasswordException();
        assertNotNull(exception);
        assertNull(exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    void testConstructorWithMessage() {
        String errorMessage = "Password change failed";
        ChangePasswordException exception = new ChangePasswordException(errorMessage);
        assertNotNull(exception);
        assertEquals(errorMessage, exception.getMessage());
        assertNull(exception.getCause());
    }

    @Test
    void testConstructorWithMessageAndCause() {
        String errorMessage = "Password change failed";
        Throwable cause = new IllegalArgumentException("Invalid password");
        ChangePasswordException exception = new ChangePasswordException(errorMessage, cause);
        assertNotNull(exception);
        assertEquals(errorMessage, exception.getMessage());
        assertEquals(cause, exception.getCause());
    }

    @Test
    void testExceptionInheritance() {
        ChangePasswordException exception = new ChangePasswordException();
        assertTrue(exception instanceof RuntimeException);
    }
}