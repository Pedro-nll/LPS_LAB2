package com.lps.back.controllers;

import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.NoHandlerFoundException;

import com.lps.back.dtos.message.MessageDTO;

import jakarta.persistence.EntityNotFoundException;

@ControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<MessageDTO> handleIllegalArgumentException(IllegalArgumentException e) {
        MessageDTO message = new MessageDTO("IllegalArgumentException", e.getMessage());
        return ResponseEntity.badRequest().body(message);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<MessageDTO> handleEntityNotFoundException(EntityNotFoundException e) {
        MessageDTO message = new MessageDTO("EntityNotFoundException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(NoSuchElementException.class)
    public ResponseEntity<MessageDTO> handleNoSuchElementException(NoSuchElementException e) {
        MessageDTO message = new MessageDTO("NoSuchElementException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(NoHandlerFoundException.class)
    public ResponseEntity<MessageDTO> handleNoHandlerFoundException(NoHandlerFoundException e) {
        MessageDTO message = new MessageDTO("NoHandlerFoundException", e.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(message);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<MessageDTO> runtimeException(RuntimeException e) {
        MessageDTO message = new MessageDTO("Exception", e.getMessage());
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(message);
    }
}
