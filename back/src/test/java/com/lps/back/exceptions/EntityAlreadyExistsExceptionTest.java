package com.lps.back.exceptions;

import static org.junit.jupiter.api.Assertions.*;
import org.junit.jupiter.api.Test;

class EntityAlreadyExistsExceptionTest {

    @Test
    void testConstructorWithMessage() {
        String errorMessage = "Entity already exists";
        EntityAlreadyExistsException exception = new EntityAlreadyExistsException(errorMessage);
        
        assertNotNull(exception);
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void testExceptionInheritance() {
        EntityAlreadyExistsException exception = new EntityAlreadyExistsException("Test");
        assertTrue(exception instanceof RuntimeException);
    }

    @Test
    void testMessageRetrieval() {
        String errorMessage = "User with email 'test@example.com' already exists";
        EntityAlreadyExistsException exception = new EntityAlreadyExistsException(errorMessage);
        
        assertEquals(errorMessage, exception.getMessage());
    }

    @Test
    void testNullMessage() {
        EntityAlreadyExistsException exception = new EntityAlreadyExistsException(null);
        
        assertNull(exception.getMessage());
    }

    @Test
    void testEmptyMessage() {
        String errorMessage = "";
        EntityAlreadyExistsException exception = new EntityAlreadyExistsException(errorMessage);
        
        assertEquals(errorMessage, exception.getMessage());
    }
}